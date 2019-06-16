package main

import (
	"encoding/json"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/gorilla/mux"
)

// BlogPostNav specifies the Title and Date when rendering the blog post navigation menu
type BlogPostNav struct {
	Title    string
	Date     string
	FullPath string
}

// BlogNavData is a global variable containing Title and Date of a blog post
var BlogNavData []BlogPostNav

// BlogContent contains all the blog data
var BlogContent []byte

// BlogContentString is the collected data from the blog posts
var BlogContentString []byte

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	BlogNavData, BlogContentString = generateNavigation()
	log.Println("Starting API server")
	staticFolder := "./static/"                        // define static content directory
	port := "10020"                                    // Set port constant
	router := mux.NewRouter()                          // Set new router
	router.StrictSlash(false)                          // Make trailing slashes in url optional
	assets := http.Dir(staticFolder)                   // Set asset folder as a http directory
	fileserver := http.FileServer(assets)              // Make assets servable
	static := http.StripPrefix("/static/", fileserver) // Strip /static/ when handling path to directory
	router.PathPrefix("/static/").Handler(static)      // Set path to assets as /static/ in url

	// --- routes ---
	router.HandleFunc("/", indexHandler)               // Serve landing page
	router.HandleFunc("/blog", blogNavHandler)         // Serve blog index page
	router.HandleFunc("/blog/post", blogPostHandler)   // Serve blog article page
	router.HandleFunc("/api/blog/posts", apiBlogPosts) // List all blog posts in JSON
	router.HandleFunc("/api/blog/all", apiBlogAll)     // List all blog posts in JSON

	http.Handle("/", router)                         // Pass routes to http handler
	log.Printf("Server listening 0.0.0.0:%v", port)  // Log output
	log.Fatal(http.ListenAndServe(":"+port, router)) // Bind to a port and pass our router in
}

func indexHandler(writer http.ResponseWriter, req *http.Request) {
	writer.WriteHeader(http.StatusOK)
	tmpl := template.Must(template.ParseGlob("template/*")) // Find all files in templates folder and parse them
	err := tmpl.ExecuteTemplate(writer, "index", "sdf")     // Serve the index template
	if err != nil {
		log.Println(err)
	}
}

func blogNavHandler(writer http.ResponseWriter, req *http.Request) {
	writer.WriteHeader(http.StatusOK)
	tmpl := template.Must(template.ParseGlob("blog/*"))       // Find all files in templates folder and parse them
	err := tmpl.ExecuteTemplate(writer, "index", BlogNavData) // Serve the blog template
	if err != nil {
		log.Println(err)
	}
}

func blogPostHandler(writer http.ResponseWriter, req *http.Request) {
	writer.WriteHeader(http.StatusOK)
	tmpl := template.Must(template.ParseGlob("blog/*")) // Find all files in templates folder and parse them
	err := tmpl.ExecuteTemplate(writer, "article", "")  // Serve the blog template
	if err != nil {
		log.Println(err)
	}
}

func apiBlogPosts(writer http.ResponseWriter, req *http.Request) {
	writer.WriteHeader(http.StatusOK)
	err := json.NewEncoder(writer).Encode(BlogNavData)
	if err != nil {
		log.Println(err)
	}
}

func apiBlogAll(writer http.ResponseWriter, req *http.Request) {
	writer.WriteHeader(http.StatusOK)
	_, err := writer.Write(BlogContentString)
	if err != nil {
		log.Println(err)
	}
}

// FilePathWalkDir returns a list of files in a directory
func FilePathWalkDir(root string) ([]string, error) {
	var files []string
	err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		if !info.IsDir() {
			files = append(files, path)
		}
		return nil
	})
	return files, err
}

// generateNavigation finds all the blog posts and generates the blog post navigation
func generateNavigation() ([]BlogPostNav, []byte) {
	log.Println("Generating blog navigation")
	files, err := FilePathWalkDir("static/posts")
	check(err)

	var blogPostNavData []BlogPostNav

	for _, file := range files {
		fileParsed := strings.Replace(file, "static"+string(os.PathSeparator)+"posts"+string(os.PathSeparator), "", 1) // remove "posts/"
		fileParsed = strings.Replace(fileParsed, ".md", "", 1)                                                         // remove ".md"
		dateTitle := strings.Split(fileParsed, "_")                                                                    // Split date and title

		newItem := BlogPostNav{Title: dateTitle[1], Date: dateTitle[0], FullPath: file}
		blogPostNavData = append(blogPostNavData, newItem)
		log.Println(newItem.Title)

	}

	// reverse order of blog posts to list the latest in the top
	for i := len(blogPostNavData)/2 - 1; i >= 0; i-- {
		opp := len(blogPostNavData) - 1 - i
		blogPostNavData[i], blogPostNavData[opp] = blogPostNavData[opp], blogPostNavData[i]
	}

	// Read all the blog data in the reversed order to display the latest blog post first
	for _, content := range blogPostNavData {
		data, err := ioutil.ReadFile(content.FullPath)
		check(err)
		BlogContent = append(BlogContent[:], data[:]...)
	}

	return blogPostNavData, BlogContent

}

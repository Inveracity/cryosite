package main

import (
	"html/template"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	log.Println("Starting API server")
	staticFolder := "./static/"                        // define static content directory
	port := "8000"                                     // Set port constant
	router := mux.NewRouter()                          // Set new router
	router.StrictSlash(false)                          // Make trailing slashes in url optional
	assets := http.Dir(staticFolder)                   // Set asset folder as a http directory
	fileserver := http.FileServer(assets)              // Make assets servable
	static := http.StripPrefix("/static/", fileserver) // Strip /static/ when handling path to directory
	router.PathPrefix("/static/").Handler(static)      // Set path to assets as /static/ in url
	router.HandleFunc("/", indexHandler)               // Serve landing page
	http.Handle("/", router)                           // Pass routes to http handler
	log.Printf("Server listening 0.0.0.0:%v", port)    // Log output
	log.Fatal(http.ListenAndServe(":"+port, router))   // Bind to a port and pass our router in
}

func indexHandler(writer http.ResponseWriter, req *http.Request) {
	writer.WriteHeader(http.StatusOK)
	log.Println("index")
	tmpl := template.Must(template.ParseGlob("template/*")) // Find all files in templates folder and parse them
	err := tmpl.ExecuteTemplate(writer, "index", "sdf")     // Serve the index template
	if err != nil {
		log.Println(err)
	}
}

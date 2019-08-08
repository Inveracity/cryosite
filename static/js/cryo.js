
var hash = location.hash.substr(1);

$(function () {
  $('[data-toggle="tooltip"]').tooltip({
    animated: 'fade',
    placement: 'bottom',
    html: true
  });
})


// Sets and unsets the hidden class to show and hide content
function content_change(content_name) {
  $('.content-' + content_name).siblings().addClass('hidden');
  $('.content-' + content_name).removeClass('hidden');
}

// Change contents based on hash values in url
// This enables sending direct links to specific content
$(function () {
  if (hash != "") {
    content_change(hash);
  }
});

// Hide and Display content when pressing the navigation links
$(function () {
  $('ul.navbar-nav a').on('click', function () {
    $navlinkclass = $(this).attr('class');
    $content = $navlinkclass.split(" ")[1]; // This is a poor way to get the class name, but it works for now
    content_change($content);
  });
});

var sample_data = {
  "resultsPage": {
    "results": {
      "event": [
        {
          "start": { "datetime": "2019-08-31" },
          "location": { "city": "Roskilde" },
          "venue": { "displayName": "Live fra undergrunden" }
        },
        {
          "start": { "datetime": "2019-09-01" },
          "location": { "city": "Aarhus" },
          "venue": { "displayName": "Headroom Festival" }
        },
        {
          "start": { "datetime": "2019-09-14" },
          "location": { "city": "Rønne" },
          "venue": { "displayName": "Raise Your Horns @ Musikhuzet" }
        },
        {
          "start": { "datetime": "2019-07-25" },
          "location": { "city": "Copenhagen" },
          "venue": { "displayName": "Crazy Town X @ Rust" }
        },
        {
          "start": { "datetime": "2019-06-08" },
          "location": { "city": "Copenhagen" },
          "venue": { "displayName": "Emergenza @ Pumpehuset" }
        },
        {
          "start": { "datetime": "2019-06-01" },
          "location": { "city": "Copenhagen" },
          "venue": { "displayName": "Beta, Amager Bio" }
        },
        {
          "start": { "datetime": "2019-02-01" },
          "location": { "city": "Roskilde" },
          "venue": { "displayName": "Gimle" }
        },
      ]
    }
  }
}


$(document).ready(function () {
  // var data = JSON.parse(sample_data)
  var data = sample_data
  var events = data.resultsPage.results.event

  $.each(events, function (i, event) {

    $('#shows tr:last')
      .after(`
      <tr>
          <td>${event.start.datetime.split('T')[0]}</td>
          <td>${event.location.city}</td>
          <td>${event.venue.displayName}</td>
      </tr>
      `
      );
    if (date_has_passed(event.start.datetime) == true) {
      $('#shows tr:last').addClass("strikeout")
    }

  })
});


// Check whether a live show date has passed, returns a boolean
function date_has_passed(event_date) {
  // Convert event date to an integer for easy comparison
  edate = event_date.replace(/-/g, "")
  var intdate = parseInt(edate)

  // Get the current date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + mm + dd;
  // Convert current date to an integer for easy comparison
  var current = parseInt(today)

  if (current > intdate) {
    return true
  }
  else {
    return false
  }
}

// Render the blog post giving it the path to the file location
function render_blog_post(path_to_post, callback) {
  var href = window.location.origin
  var url = href + "/" + path_to_post
  $.ajax({
    url: url,
    type: 'GET',
    success: function (data) {
      callback(data);
    },
    error: function () {
      callback("# *could not find post*");
    }
  });
};

function render_linked_blog_post() {

  function callback(data) {
    $('#content').html(marked(data))
  };
  var href = window.location.origin;
  var post = window.location.hash.replace("#", "");
  render_blog_post("/static/posts/" + post + ".md", callback);
}

// Render the blog post when clicking a direct link to a post
$(document).ready(function () {
  var post = window.location.href
  if (post.includes("/blog/post#")) {
    render_linked_blog_post()
  }
});

// Get all blog mosts meta data
function get_all_blog_posts(callback) {
  var url = window.location.origin + "/api/blog/all"
  $.get({
    url: url,
    error: function () {
      console.log("error")
    }
  }).done(function (data, textStatus, jqXHR) {
    callback(data);
  });
};

function render_all_blogs_posts(data) {
  function callback(data) {

    $("#all-posts").append(marked(data))
  }

  get_all_blog_posts(callback)
}

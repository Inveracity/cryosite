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
  console.log("changing content to " + content_name)
  $('.content-' + content_name).siblings().addClass('hidden');
  $('.content-' + content_name).removeClass('hidden');
}

// Change contents based on hash values in url
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
          "start": { "datetime": "2019-09-14" },
          "location": { "city": "Rønne" },
          "venue": { "displayName": "Raise Your Horns @ Musikhuzet" }
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
    $('table tr:last')
      .after(`
      <tr>
          <td>${event.start.datetime.split('T')[0]}</td>
          <td>${event.location.city}</td>
          <td>${event.venue.displayName}</td>
      </tr>
      `
      );
  })
});

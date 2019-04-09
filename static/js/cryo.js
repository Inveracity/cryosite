$(function () {
    $('[data-toggle="tooltip"]').tooltip({
        animated: 'fade',
        placement: 'bottom',
        html: true
    });
})


// Hide and Display content when pressing the navigation links
$(function(){
    $('ul.navbar-nav a').on('click', function () {
        $navlinkclass = $(this).attr('class');
        $content = $navlinkclass.split(" ")[1]; // This is a poor way to get the class name, but it works for now
        $('.content-'+$content).siblings().addClass('hidden');
        $('.content-'+$content).removeClass('hidden');
    });
});


var sample_data = {
  "resultsPage": {
    "results": {
      "event": [
        {
          "id":11129128,
          "type":"Concert",
          "uri":"http://www.songkick.com/concerts/11129128-wild-flag-at-fillmore?utm_source=PARTNER_ID&utm_medium=partner",
          "displayName":"Wild Flag at The Fillmore (April 18, 2012)",
          "start": {
            "time":"20:00:00",
            "date":"2012-04-18",
            "datetime":"2012-04-18T20:00:00-0800"
          },
          "performance": [
            {
              "artist": {
                "id":29835,
                "uri":"http://www.songkick.com/artists/29835-wild-flag?utm_source=PARTNER_ID&utm_medium=partner",
                "displayName":"Wild Flag",
                "identifier": []
              },
              "id":21579303,
              "displayName":"Wild Flag",
              "billingIndex":1,
              "billing":"headline"
            }
          ],
          "location": {
            "city":"San Francisco, CA, US",
            "lng":-122.4332937,
            "lat":37.7842398
          },
          "venue": {
            "id":6239,
            "displayName":"The Fillmore",
            "uri":"http://www.songkick.com/venues/6239-fillmore?utm_source=PARTNER_ID&utm_medium=partner",
            "lng":-122.4332937,
            "lat":37.7842398,
            "metroArea": {
              "id":26330,
              "uri":"http://www.songkick.com/metro_areas/26330-us-sf-bay-area?utm_source=PARTNER_ID&utm_medium=partner",
              "displayName":"SF Bay Area",
              "country": { "displayName":"US" },
              "state": { "displayName":"CA" }
            }
          },
          "status":"ok",
          "popularity":0.012763
        },
      ]
    },
    "totalEntries":24,
    "perPage":50,
    "page":1,
    "status":"ok"
  }
}



$(function () {
    console.log("sdfd")
    $('#show-table').append('<tr>...</tr><tr>...</tr>');
})



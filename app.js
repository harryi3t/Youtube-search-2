const API_KEY = "AIzaSyA9fB6iblItObj6algTCtxHkd9MOGtWVwA";

var data;

function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
  $("form").on("submit", function(e) {
    e.preventDefault();
    // prepare the request
    var request = gapi.client.youtube.search.list({
      part: "snippet",
      type: "video",
      q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
      maxResults: 20,
      // order: "viewCount",
      publishedAfter: "2015-01-01T00:00:00Z"
    }); 
    // execute the request
    request.execute(function(response) {
      var results = response.result;
      data = results.items;
      // console.log(data);
      // $("#results").html("");
      // $.each(results.items, function(index, item) {
      //   $.get("item.html", function(data) {
      //     $("#results").append(tplawesome(data, [{"title":item.snippet.title, "publishedAt": item.snippet.publishedAt, "videoid":item.id.videoId}]));
      //   });
      // });
      render();
      
      resetVideoHeight();
    });

  });

  $(window).on("resize", resetVideoHeight);
});

function resetVideoHeight() {
  $(".video").css("height", $("#results").width() * 9/16);
}

function sortName() {
  data.sort((a, b) => {
    var aName = a.snippet.title.toLowerCase();
    var bName = b.snippet.title.toLowerCase(); 
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
  });
  // console.log(data);
  render();
}

function sortDate() {
  data.sort((a, b) => {
    var aName = a.snippet.publishedAt;
    var bName = b.snippet.publishedAt;
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
  });

  // console.log(data);
  render();
}

function init() {
  gapi.client.setApiKey(API_KEY);
  gapi.client.load("youtube", "v3", function() {
    // yt api is ready
  });
}

function render() {
  console.log(data);
  $("#results").html("");
  $.each(data, function(index, item) {
    $.get("item.html", function(data) {
      $("#results").append(tplawesome(data, [{"title":item.snippet.title, "publishedAt": item.snippet.publishedAt, "videoid":item.id.videoId}]));
    });
  });
} 
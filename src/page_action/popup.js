$(document).ready(function() {
  function sendClicks() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "READ_LINKS" }, function(
        response
      ) {
        if (response.links) {
          $("#links").append(`<div class="link-stats">
                                <p class="link-count">Total: ${response.links.length}</p>
                            </div>`);
          response.links.forEach(link => {
            $("#links").append(
              `<div class="link-wrapper"><a href=${link.url} target="_blank">${link.title}</a></div>`
            );
          });
        }
      });
    });

    console.log("avra' inviato?");
  }

  $("#sendclicks").click(function() {
    sendClicks();
  });
});

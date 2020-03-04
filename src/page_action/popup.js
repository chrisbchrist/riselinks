$(document).ready(function() {
  function sendClicks() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "READ_LINKS" }, function(
        response
      ) {
        let lastError = chrome.runtime.lastError;
        if (lastError) {
          console.log(lastError);
          $("#links").append("<h2 class='no-links'>No Links Found</h2>");
          return;
        }
        if (response.links) {
          $("#links").html("");
          $("#links").append(`<div class="link-stats">
                                <p class="link-count">Total: ${response.links.length}</p>
                            </div>`);
          response.links.forEach(link => {
            $("#links").append(
              `<div class="link-wrapper"><a class="rise-link" href=${link.url} target="_blank">${link.title}</a></div>`
            );
          });
        } else {
          $("#links").append("<h2 class='no-links'>No Links Found</h2>")
        }
      });
    });
  }

  function copyLinks() {

  }

  // $("#sendclicks").click(function() {
  //   sendClicks();
  // });
  $("#copy-button").click(function() {
    chrome.tabs.create({url: "src/page_action/page_action.html"});
  })
  sendClicks();
});

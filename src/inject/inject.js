$(document).ready(function() {
	function getLinks() {
		let links = [];
		let items = $(".courses-list-item");
		items.each(function(index, value) {
			const title = $(this).find('.courses-list-item__title').text();
			if (title) {
				let link = {
					title,
					url: `https://rise.articulate.com/author/${$(this).data('ba-course-id')}`
				};
				console.log(link);
				links.push(link);
			}

		});
		return links;
	}

	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			console.log(sender.tab ?
				"from a content script:" + sender.tab.url :
				"from the extension");

			if (request.action === "READ_LINKS") {
				let links = getLinks();
				sendResponse({links});
			}

		});
});


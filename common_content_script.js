function getElementByXpath(path) {
	return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.action == "requestPics") {
		// TODO: check url, use different match rule to return data.
		let a = getElementByXpath("//article[contains(@role,'article')][1]//a[contains(@href,'/photo/')]//img/@src");
		console.log(a);
		sendResponse({dateType: 'urlList', urlList: a});
	} else {
		sendResponse({}); // Send nothing..
	}
});

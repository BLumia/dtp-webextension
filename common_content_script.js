function getElementByXpath(path) {
	return document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.action == "requestPics") {
		// TODO: check url, use different match rule to return data.
		let a = getElementByXpath("(//article[contains(@role,'article')])[1]//a[contains(@href,'/photo/')]//img/@src");
		let arr = [];
		for (i=0; i<a.snapshotLength; i++) {
			arr.push(a.snapshotItem(i).textContent);
		}
// 		console.log(arr);
		sendResponse({dateType: 'urlList', urlList: arr});
	} else {
		sendResponse({}); // Send nothing..
	}
});

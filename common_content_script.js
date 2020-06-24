function getElementByXpath(path) {
	return document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.action == "requestPics") {
		// TODO: check url, use different match rule to return data.
		let a = getElementByXpath("(//article[contains(@role,'article')])[1]//a[contains(@href,'/photo/')]//img/@src");
		let arr = [];
		for (i=0; i<a.snapshotLength; i++) {
			let oneUrl = a.snapshotItem(i).textContent;
			let splited = oneUrl.split('?');
			let baseUrl = splited[0];
			var getParas = new URLSearchParams(splited[1]);
			getParas.set("name", "orig");
			arr.push(baseUrl + '?' + getParas.toString());
		}
// 		console.log(arr);
		sendResponse({dataType: 'urlList', urlList: arr, source: window.location.href});
	} else {
		sendResponse({}); // Send nothing..
	}
});

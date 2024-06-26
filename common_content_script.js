function getElementByXpath(path) {
	return document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function twitterXPath(nth, sendResponse) {
	let a = getElementByXpath(`(//article[contains(@role,'article')])[${nth}]//a[contains(@href,'/photo/')]//img/@src`);
	let arr = [];
	for (i=0; i<a.snapshotLength; i++) {
		let oneUrl = a.snapshotItem(i).textContent;
		let splited = oneUrl.split('?');
		let baseUrl = splited[0];
		var getParas = new URLSearchParams(splited[1]);
		getParas.set("name", "orig");
		arr.push(baseUrl + '?' + getParas.toString());
	}
 		console.log(arr);
	sendResponse({dataType: 'urlList', urlList: arr, source: window.location.href});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action == "requestPics") {
		twitterXPath(1, sendResponse);
	} else if (request.action == "requestPics2") {
		twitterXPath(2, sendResponse);
	} else if (request.action == "requestPics3") {
		twitterXPath(3, sendResponse);
	} else if (request.action == "requestPics4") {
		twitterXPath(4, sendResponse);
	} else {
		sendResponse({dataType: 'test'}); // Send nothing..
	}
});

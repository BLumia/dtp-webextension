let downloadBtn = document.getElementById('download');
// 
// chrome.storage.sync.get('color', function(data) {
// 	changeColor.style.backgroundColor = data.color;
// 	changeColor.setAttribute('value', data.color);
// });

downloadBtn.onclick = function(element) {

// 	chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
// 		console.log(tabs[0].url);
// 	});
	
	chrome.tabs.getSelected(null, function(tab) {
		// Send a request to the content script.
		chrome.tabs.sendRequest(tab.id, {action: "requestPics"}, function(response) {
			console.log(response);
		});
	});
	
// 	let color = element.target.value;
// 	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
// 		chrome.tabs.executeScript(
// 			tabs[0].id,
// 			{code: 'document.body.style.backgroundColor = "' + color + '";'});
// 	});
};

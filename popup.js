let downloadBtn = document.getElementById('download');
let download2Btn = document.getElementById('download2');
let download3Btn = document.getElementById('download3');
let download4Btn = document.getElementById('download4');
// 
// chrome.storage.sync.get('color', function(data) {
// 	changeColor.style.backgroundColor = data.color;
// 	changeColor.setAttribute('value', data.color);
// });

function sendActionAndResponse(actionStr) {
	chrome.tabs.getSelected(null, function(tab) {
		// Send a request to the content script.
		chrome.tabs.sendRequest(tab.id, {action: actionStr}, function(response) {
			console.log(response);
			if (response.dataType == "urlList") {
				const data = new URLSearchParams();
				data.append("source", response.source);
				data.append("urlList", JSON.stringify(response.urlList));
	
				fetch('http://localhost:1704/urlList', {
					method: 'post',
					body: data,
				}).then(data => {
					console.log(data);
				});
			}
		});
	});
}

downloadBtn.onclick = function(element) {

// 	chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
// 		console.log(tabs[0].url);
// 	});

	sendActionAndResponse("requestPics");
	
// 	let color = element.target.value;
// 	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
// 		chrome.tabs.executeScript(
// 			tabs[0].id,
// 			{code: 'document.body.style.backgroundColor = "' + color + '";'});
// 	});
};

download2Btn.onclick = function(element) { sendActionAndResponse("requestPics2"); }
download3Btn.onclick = function(element) { sendActionAndResponse("requestPics3"); }
download4Btn.onclick = function(element) { sendActionAndResponse("requestPics4"); }
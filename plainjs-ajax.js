/**
  * send an AJAX call to a remote server with an "search term" given by the user
  */
function doSearch() {
    var searchString = document.getElementById('searchString').value;
    // create a new XMLHttpRequest object
    myXMLHttpRequest = new XMLHttpRequest();
    if (!myXMLHttpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    // After making a request, you will receive a response back. At this stage, you need to 
    // tell the XMLHttp request object which JavaScript function will handle the response, 
    // by setting the onreadystatechange property of the object and naming it after the 
    // function to call when the request changes state, like this:
    myXMLHttpRequest.onreadystatechange = showSearchResults;
    // onreadystatechange sets an EventHandler that is called whenever the readyState attribute changes.

    // Next, after declaring what happens when you receive the response, you need to actually 
    // make the request, by calling the open() and send() methods of the HTTP request 
    // object, like this:
    myXMLHttpRequest.open('GET', 'https://my-json-server.typicode.com/ofenloch/MyJSONServer/' + searchString);
    myXMLHttpRequest.send();
} // function doSearch()

/**
  * The function specified by XMLHttpRequest.onreadystatechange
  * is an event handler. So it gets an event passed as argument.
  * The event's target is the originating XMLHttpRequest object
  */
function showSearchResults(event) {
    let request = event.target;
    console.log('request.readyState is ' + request.readyState);
    if (request.readyState === XMLHttpRequest.DONE) {
        // the response was received
        let unformatted = document.getElementById('asUnformattedText');
        if (request.status === 200) {
            // the call was successful         
            unformatted.innerHTML = 'Unformatted Response Test:\n' + request.responseText;
        } else {
            // there was something wrong 
            unformatted.innerHTML = '{ "error": "There was a problem with the request.", "status": ' + request.status + '}';
        }
    } // if (httpRequest.readyState === XMLHttpRequest.DONE)
} // function showSearchResults(event)

function doAdvancedSearch() {
    let baseUrl = 'https://my-json-server.typicode.com/ofenloch/MyJSONServer';
    let url = baseUrl + '/db';
    ajaxCallWithXMLHttpRequest('GET', url, processAdvancedSearch);
}

/**
 * make an asynchronous call to the given URL and process response with the given callback function
 * @param {*} method 
 * @param {*} url 
 * @param {*} callback 
 */
function ajaxCallWithXMLHttpRequest(method, url, callback) {
    console.log('sending "' + url + '" ...');
    // create a new XMLHttpRequest object
    let oReq = new XMLHttpRequest();
    if (!oReq) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    // register event handlers for downloads
    oReq.addEventListener('progress', handleDownloadUpdateProgress);
    oReq.addEventListener('load', handleTransferComplete);
    oReq.addEventListener('error', handleTransferFailed);
    oReq.addEventListener('abort', handleTransferCanceled);

    // register event handlers for uploads
    oReq.upload.addEventListener('progress', handleUploadUpdateProgress);
    oReq.upload.addEventListener('load', handleTransferComplete);
    oReq.upload.addEventListener('error', handleTransferFailed);
    oReq.upload.addEventListener('abort', handleTransferCanceled);

    // register event handler for the response
    oReq.onreadystatechange = callback;

    // finally make the request
    oReq.open(method, url);
    oReq.send();
} // function ajaxCallWithXMLHttpRequest(method, url, callback)

// progress on transfers from the server to the client (downloads)
function handleDownloadUpdateProgress(oEvent) {
    if (oEvent.lengthComputable) {
        var percentComplete = oEvent.loaded / oEvent.total * 100;
        console.log('loaded ' + percentComplete + '%');
        // ...
    } else {
        console.log('loading ...');
        // ...
    }
}

// progress on transfers from the server to the client (downloads)
function handleUploadUpdateProgress(oEvent) {
    if (oEvent.lengthComputable) {
        var percentComplete = oEvent.loaded / oEvent.total * 100;
        console.log('sent ' + percentComplete + '%');
        // ...
    } else {
        console.log('sending ...');
        // ...
    }
}

// transfer has completed
function handleTransferComplete(oEvent) {
    console.log('The transfer is complete.');
}

// transfr has failed
function handleTransferFailed(oEvent) {
    console.log('An error occurred while transferring the file.');
}

// transfer has been canceled
function handleTransferCanceled(oEvent) {
    console.log('The transfer has been canceled by the user.');
}

function processAdvancedSearch(oEvent) {
    let request = oEvent.target;
    console.log('request.readyState is ' + request.readyState);
    if (request.readyState === request.DONE) {
        let searchString = document.getElementById('searchString').value;
        let jsonData = JSON.parse(request.responseText);
        // the response was received
        let unformatted = document.getElementById('asUnformattedText');
        if (request.status === 200) {
            // the call was successful         
            unformatted.innerHTML = 'Unformatted Response Test:\n' + searchInJSON(jsonData, searchString);
        } else {
            // there was something wrong 
            unformatted.innerHTML = 'Unformatted Response Test:\n' + '{ "error": "There was a problem with the request.", "status": ' + request.status + '}';
        }
    } // if (httpRequest.readyState === XMLHttpRequest.DONE)
} // function processAdvancedSearch(oEvent)

function searchInJSON(oJSON, searchString) {
    let keys = Object.keys(oJSON);
    let nKeys = keys.length;
    for (let i = 0; i < nKeys; i++) {
        let key = keys[i];
        console.log('processing key "' + key + '" ...');
        let currentJSON = oJSON[key];
        let currentString = JSON.stringify(currentJSON);
        if (currentString.includes(searchString)) {
            console.log(' found search string in ' + currentString);
            let searchResult = '"' + key + '" : ';
            // I just can't figure out how to determine if I am at the lowest level...
            let currentPropertyNames = Object.getOwnPropertyNames(currentJSON);
            let currentKeys = Object.keys(currentJSON);
            let nCurrentKeys = currentKeys.length;
            if (nCurrentKeys < 1) {
                return JSON.stringify(currentJSON);
            } else {
                searchResult += '"' + searchInJSON(currentJSON, searchString) + '"';
                return searchResult;
            }
        } else {
            continue;
        }
    }
    return '';
}
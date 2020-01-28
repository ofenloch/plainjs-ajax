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
        if (request.status === 200) {
            // the call was successful
            //alert(request.responseText);
            let unformatted = document.getElementById('asUnformattedText');
            unformatted.innerHTML = 'Unformatted Response Test:\n' + request.responseText;
        } else {
            // there was something wrong 
            alert('There was a problem with the request. Status was ' + request.status);
        }
    } // if (httpRequest.readyState === XMLHttpRequest.DONE)
} // function showSearchResults(event)
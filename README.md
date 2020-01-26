# AJAX Calls in Javascript with XMLHttpRequest 

This is an example from <https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started.>

## The Original

I created file 'index.html' from the above example:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>AJAX Call with Plain JS</title>
</head>

<body>

  <h1>AJAX Calls using Plain Javascript</h1>

  <p>
    This is an example from <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started"
      target="blank">the AJAX MDN WebDoc</a>
  </p>

  <p>
    The button below makes a simple request to test.html
  </p>

  <p>
    <button id="ajaxButton" type="button">Make a request</button>
  </p>

  <script>
    (function () {
      var httpRequest;
      document.getElementById("ajaxButton").addEventListener('click', makeRequest);

      function makeRequest() {
        // create a new XMLHttpRequest object
        httpRequest = new XMLHttpRequest();

        if (!httpRequest) {
          alert('Giving up :( Cannot create an XMLHTTP instance');
          return false;
        }
        // After making a request, you will receive a response back. At this stage, you need to 
        // tell the XMLHttp request object which JavaScript function will handle the response, 
        // by setting the onreadystatechange property of the object and naming it after the 
        // function to call when the request changes state, like this:
        httpRequest.onreadystatechange = alertContents;

        // Next, after declaring what happens when you receive the response, you need to actually 
        // make the request, by calling the open() and send() methods of the HTTP request 
        // object, like this:
        httpRequest.open('GET', 'test.html');
        httpRequest.send();
      } // function makeRequest()

      function alertContents() {
        // readyState values
        //   0	UNSENT	          Client has been created. open() not called yet.
        //   1	OPENED	          open() has been called.
        //   2	HEADERS_RECEIVED	send() has been called, and headers and status are available.
        //   3	LOADING	          Downloading; responseText holds partial data.
        //   4	DONE	            The operation is complete.
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          // the response was received
          if (httpRequest.status === 200) {
            // the call was successful
            alert(httpRequest.responseText);
          } else {
            // there was something wrong 
            alert('There was a problem with the request. Status was ' + httpRequest.status);
          }
        } // if (httpRequest.readyState === XMLHttpRequest.DONE)
      } // function alertContents()
    })();
  </script>
</body>

</html>
```

## Make things more interesting

When this was working, I set up a remote JSON server (<https://my-json-server.typicode.com/ofenloch/MyJSONServer/> - thanks [typicode](https://github.com/typicode)) and added a seocnd AJXA call.

My second AJAX call in plain JS looks like this

```js
    function doSearch() {
      var searchString = document.getElementById('searchString').value;
      // create a new XMLHttpRequest object
      httpRequest = new XMLHttpRequest();
      if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
      }
      // After making a request, you will receive a response back. At this stage, you need to 
      // tell the XMLHttp request object which JavaScript function will handle the response, 
      // by setting the onreadystatechange property of the object and naming it after the 
      // function to call when the request changes state, like this:
      httpRequest.onreadystatechange = showSearchResults;
      // onreadystatechange sets an EventHandler that is called whenever the readyState attribute changes.

      // Next, after declaring what happens when you receive the response, you need to actually 
      // make the request, by calling the open() and send() methods of the HTTP request 
      // object, like this:
      httpRequest.open('GET', 'https://my-json-server.typicode.com/ofenloch/MyJSONServer/' + searchString);
      httpRequest.send();
    } // function doSearch()
```

And the event handler / callback looks like this

```js
    /**
      * The function specified by XMLHttpRequest.onreadystatechange
      * is an event handler. So it gets an event passed as argument.
      * The event's target is the originating XMLHttpRequest object
      */
    function showSearchResults(event) {
      request = event.target;
      console.log('request.readyState is ' + request.readyState);
      if (request.readyState === XMLHttpRequest.DONE) {
            // the response was received
            if (request.status === 200) {
              // the call was successful
              //alert(request.responseText);
              let unformatted = document.getElementById('asUnformattedText');
              unformatted.innerHTML = 'Unformatted Response Test:\n' + httpRequest.responseText;
            } else {
              // there was something wrong 
              alert('There was a problem with the request. Status was ' + request.status);
            }
          } // if (httpRequest.readyState === XMLHttpRequest.DONE)
    } // function showSearchResults(event)
```

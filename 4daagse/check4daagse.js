function clickBuyElement(elementSelector) {
  var elements = document.querySelectorAll(elementSelector);

  console.log(
    "found",
    elements.length,
    "elements matching selector '" + elementSelector + "' on the page"
  );

  for (let i = 0; i < elements.length; i++) {
    console.log(
      "checking element",
      elements[i],
      "with text",
      elements[i].innerText.toLowerCase()
    );

    if (elements[i].innerText.toLowerCase().includes("buy")) {
      console.log("found buy", elements[i]);

      console.log("Clicking it now");

      elements[i].click();

      return true;
    }
  }

  return false;
}

// Function to attempt to click the "Buy ticket" button
function attemptButtonClick() {
  // Attempt to find and click the "buy ticket" button
  var buyTicketElement = getElementByTextContent("Buy ticket");

  if (buyTicketElement) {
    var timestamp = new Date().toLocaleString(); // Get current timestamp

    console.log(timestamp + " - Buy ticket Element was", buyTicketElement);
// window.open("https://www.youtube.com/watch?v=XEfDYMngJeE");


    if (clickBuyElement("button")) {
      console.log("Clicked 'buy ticket' button");
      numBuyClicksRemaining--;
    } else {
      console.log(
        "Failed to click 'buy ticket' button. Trying to click 'a' element instead"
      );

      if (clickBuyElement("a")) {
        console.log("Clicked 'buy ticket' 'a' element");
        numBuyClicksRemaining--;
      } else {
        console.log("Failed to click 'buy ticket' 'a' element");
      }
    }

    if (numBuyClicksRemaining === 0) {
      console.log("No buy clicks remaining. Stopping.");
      clearInterval(intervalId); // Stop the interval after button click attempt
    }
  } else {
    // If "buy ticket" button not found, try to find and click the "refresh" button

    var refreshButton = getElementByTextContent("Refresh");

    if (refreshButton) {
      refreshButton.click();

      console.log("Clicked 'refresh' button");

      console.log("refresh button was", refreshButton);
    } else {
      console.log("Neither 'buy ticket' nor 'refresh' button found.");
    }
  }
}

// Function to get an element by its text content

function getElementByTextContent(text) {
  var elements = document.body.getElementsByTagName("*");

  for (var i = 0; i < elements.length; i++) {
    if (elements[i].textContent.trim() === text.trim()) {
      return elements[i];
    }
  }

  return null;
}

var numBuyClicksRemaining = 5;

// Execute the attemptButtonClick function every second indefinitely
var intervalId = setInterval(function () {
  for (var i = 0; i < 3; i++) {
    attemptButtonClick();
  }
}, 1000);


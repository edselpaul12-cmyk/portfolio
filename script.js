// this part is the email that gets the messages from the contact form
var myEmail = "edselpaul12@gmail.com";

// this part is the words that will be typed under my name
var words = ["BSIT student.", "online gaming seller.", "JavaScript learner."];

// this part puts the current year in the footer
var year = new Date().getFullYear();
document.getElementById("year").textContent = year;

// this part is the typing effect
var typed = document.getElementById("typed");
var wordNumber = 0;     // which word we are on
var letterNumber = 0;   // how many letters are showing
var erasing = false;    // false = typing, true = erasing

function typeWords() {
  var word = words[wordNumber];

  if (erasing == false) {
    // add one more letter
    letterNumber = letterNumber + 1;
    typed.textContent = word.substring(0, letterNumber);

    if (letterNumber == word.length) {
      erasing = true;
      setTimeout(typeWords, 1500); // wait before erasing
    } else {
      setTimeout(typeWords, 100);
    }
  } else {
    // remove one letter
    letterNumber = letterNumber - 1;
    typed.textContent = word.substring(0, letterNumber);

    if (letterNumber == 0) {
      erasing = false;
      wordNumber = wordNumber + 1;
      if (wordNumber == words.length) {
        wordNumber = 0; // go back to the first word
      }
    }
    setTimeout(typeWords, 50);
  }
}
typeWords();

// this part is the Menu button for phones
var menu = document.getElementById("menu");
var menuBtn = document.getElementById("menuBtn");

menuBtn.onclick = function () {
  menu.classList.toggle("open"); // show or hide the menu
};

// this part closes the phone menu after clicking a link
var menuLinks = document.querySelectorAll("nav a");
for (var i = 0; i < menuLinks.length; i++) {
  menuLinks[i].onclick = function () {
    menu.classList.remove("open");
  };
}

// this part is the dark and light mode button
var themeBtn = document.getElementById("themeBtn");
var root = document.documentElement;

themeBtn.onclick = function () {
  if (root.getAttribute("data-theme") == "dark") {
    root.setAttribute("data-theme", "light");
  } else {
    root.setAttribute("data-theme", "dark");
  }
};

// this part is the contact form
var form = document.getElementById("contactForm");

form.onsubmit = function (event) {
  event.preventDefault(); // stops the page from reloading

  // get what the visitor typed
  var name = document.getElementById("fName").value;
  var email = document.getElementById("fEmail").value;
  var message = document.getElementById("fMsg").value;

  // make the subject and message for the email
  var subject = "Portfolio message from " + name;
  var body = message + "\n\nFrom: " + name + " (" + email + ")";

  // open the visitor's email app with everything filled in
  window.location.href = "mailto:" + myEmail +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);

  document.getElementById("formNote").textContent = "Opening your email app...";
};

// this part is for the email that gets the messages from the contact form
var myEmail = "edselpaul12@gmail.com";

// this part of javascript connects the footer year to the page
document.getElementById("year").textContent = new Date().getFullYear();

// this part of javascript connects the menu and the menu button for phones
var menu = document.getElementById("menu");
var menuBtn = document.getElementById("menuBtn");

// this part is for showing or hiding the menu when the menu button is clicked
menuBtn.onclick = function () {
  menu.classList.toggle("open");
};

// this part of javascript connects all the menu links
var menuLinks = document.querySelectorAll("nav a");

// this part is for closing the phone menu after clicking a link
for (var i = 0; i < menuLinks.length; i++) {
  menuLinks[i].onclick = function () {
    menu.classList.remove("open");
  };
}

// this part of javascript connects the dark and light mode button
var themeBtn = document.getElementById("themeBtn");
var root = document.documentElement;

// this part is for switching between dark mode and light mode
themeBtn.onclick = function () {
  if (root.getAttribute("data-theme") == "dark") {
    root.setAttribute("data-theme", "light");
  } else {
    root.setAttribute("data-theme", "dark");
  }
};

// this part of javascript connects the contact form
var form = document.getElementById("contactForm");

// this part is for sending the message when the visitor clicks send
form.onsubmit = function (event) {
  // this part stops the page from reloading
  event.preventDefault();

  // this part gets what the visitor typed
  var name = document.getElementById("fName").value;
  var email = document.getElementById("fEmail").value;
  var message = document.getElementById("fMsg").value;

  // this part makes the subject and the message for the email
  var subject = "Portfolio message from " + name;
  var body = message + "\n\nFrom: " + name + " (" + email + ")";

  // this part opens the visitor's email app with everything filled in
  window.location.href = "mailto:" + myEmail +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);

  // this part shows a small note under the form
  document.getElementById("formNote").textContent = "Opening your email app...";
};
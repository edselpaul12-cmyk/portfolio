// EDIT: the email that receives messages from the contact form
var MY_EMAIL = "edselpaul12@gmail.com";

// EDIT: the lines that type out under your name
var phrases = ["BSIT student.", "online gaming seller.", "JavaScript learner."];

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Typing effect (shows the first line without animation if reduced motion is on)
var typed = document.getElementById("typed");
var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var p = 0, c = 0, deleting = false;

function type() {
  var text = phrases[p];
  typed.textContent = text.slice(0, c);
  if (!deleting && c < text.length) { c++; setTimeout(type, 90); }
  else if (!deleting) { deleting = true; setTimeout(type, 1400); }
  else if (c > 0) { c--; setTimeout(type, 45); }
  else { deleting = false; p = (p + 1) % phrases.length; setTimeout(type, 300); }
}
if (reduceMotion) { typed.textContent = phrases[0]; } else { type(); }

// Highlight the nav link of the section on screen
var links = document.querySelectorAll("nav a");
var sections = document.querySelectorAll("main section");
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) {
      links.forEach(function (a) {
        a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id);
      });
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(function (s) { io.observe(s); });

// Phone menu open / close
var menu = document.getElementById("menu");
var menuBtn = document.getElementById("menuBtn");
menuBtn.addEventListener("click", function () {
  var open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
links.forEach(function (a) {
  a.addEventListener("click", function () {
    menu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// Dark (default) / light toggle with sun and moon icon, remembered on this device
var themeBtn = document.getElementById("themeBtn");
function updateThemeLabel() {
  var dark = document.documentElement.dataset.theme !== "light";
  themeBtn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
}
updateThemeLabel();
themeBtn.addEventListener("click", function () {
  var root = document.documentElement;
  root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  updateThemeLabel();
});

// Contact form: opens the visitor's email app with the message ready to send
document.getElementById("contactForm").addEventListener("submit", function (ev) {
  ev.preventDefault();
  var name = document.getElementById("fName").value;
  var email = document.getElementById("fEmail").value;
  var msg = document.getElementById("fMsg").value;
  var subject = encodeURIComponent("Portfolio message from " + name);
  var body = encodeURIComponent(msg + "\n\nFrom: " + name + " (" + email + ")");
  window.location.href = "mailto:" + MY_EMAIL + "?subject=" + subject + "&body=" + body;
  document.getElementById("formNote").textContent = "Opening your email app…";
});

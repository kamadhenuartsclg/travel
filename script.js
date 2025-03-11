'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("customBookingModal");
  const closeBtn = document.querySelector(".custom-close-btn");
  const form = document.getElementById("customBookingForm");

  document.querySelectorAll(".custom-booking-btn").forEach(button => {
      button.addEventListener("click", function () {
          document.getElementById("customSelectedPackage").value = this.getAttribute("data-package");
          document.getElementById("customSelectedPrice").value = this.getAttribute("data-price");
          modal.style.display = "flex";
      });
  });

  closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
      if (event.target === modal) {
          modal.style.display = "none";
      }
  });

  form.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("customName").value;
      const email = document.getElementById("customEmail").value;
      const phone = document.getElementById("customPhone").value;
      const packageName = document.getElementById("customSelectedPackage").value;
      const packagePrice = document.getElementById("customSelectedPrice").value;

      // Google Apps Script Web App URL
      const scriptURL = "https://script.google.com/macros/s/AKfycbxjpgpX1PbaxBjzQi5rBp-ak6E4kw2OimlgpEnduLCgwU40Zcrg2_hp3kxYf52KeQh3xw/exec";

      fetch(scriptURL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ 
              name: name, 
              email: email, 
              phone: phone, 
              package: packageName, 
              price: packagePrice 
          })
      })
      .then(response => response.text())
      .then(data => {
          if (data === "Success") {
              alert("Booking Submitted Successfully!");
              modal.style.display = "none";
              form.reset();
          } else {
              alert("Error submitting booking. Please try again.");
          }
      })
      .catch(error => console.error("Error:", error));
  });
});


/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});
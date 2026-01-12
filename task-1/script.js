// Toggle mobile menu
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Optional: Dropdown toggle for mobile
const dropdown = document.querySelector(".dropdown > a");
dropdown.addEventListener("click", (e) => {
  if (window.innerWidth <= 768) {
    e.preventDefault();
    const dropdownMenu = dropdown.nextElementSibling;
    dropdownMenu.classList.toggle("active");
  }
});
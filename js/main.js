// Hamburger menu code

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("nav-open");
    navToggle.classList.toggle("active");
  });
});
//modal selectors
const openOverlay = document.querySelector(".cta-button");
const overlay = document.querySelector(".modal-overlay");
const modal = document.querySelector("#quote-modal");
const close = document.querySelector(".modal-close");

// Only run modal code if these elements exist on the page
if (openOverlay && overlay && modal && close) {
  openOverlay.addEventListener("click", () => {
    if (inquiry) {
      inquiry.value = "";
    }
    overlay.classList.add("active");
  });

  close.addEventListener("click", () => {
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      overlay.classList.remove("active");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      overlay.classList.remove("active");
    }
  });

  const enquireBtns = document.querySelectorAll(".enquire-btn");
  const inquiry = document.querySelector("#inquiry");
  if (enquireBtns.length > 0) {
    enquireBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const productName = btn.dataset.product;
        if (inquiry) {
          inquiry.value = ` Hello, I would like to enquire about: ${productName}`;
        }
        overlay.classList.add("active");
      });
    });
  }
}
//filter buttons on products page
const filterButtons = document.querySelectorAll(".filter-bar button");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    console.log(category);

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    productCards.forEach((card) => {
      if (category === "all") {
        card.classList.remove("hidden");
      } else if (card.dataset.category === category) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

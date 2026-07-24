document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menu
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("nav-open");
    navToggle.classList.toggle("active");
  });

  // Modal selectors
  const openOverlay = document.querySelector(".cta-button");
  const overlay = document.querySelector(".modal-overlay");
  const modal = document.querySelector("#quote-modal");
  const close = document.querySelector(".modal-close");
  const inquiry = document.querySelector("#inquiry");

  if (openOverlay && overlay && modal && close) {
    openOverlay.addEventListener("click", () => {
      if (inquiry) inquiry.value = "";
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
  }

  // Card generation
  const productsGrid = document.querySelector(".products-grid");

  function renderProducts(filter = "all") {
    if (!productsGrid) return;

    productsGrid.innerHTML = "";

    products.forEach((product) => {
      if (filter === "all" || product.category === filter) {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.dataset.category = product.category;

        card.innerHTML = `
          <div class="product-image">
            <img src="" alt="${product.alt}">
          </div>
          <div class="product-info">
            <span class="product-category">${product.category}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <button class="btn-primary enquire-btn" data-product="${product.name} - ${product.description}">
              Enquire Now
            </button>
          </div>
        `;

        productsGrid.appendChild(card);
      }
    });

    // Attach enquire button listeners after cards are rendered
    const enquireBtns = document.querySelectorAll(".enquire-btn");
    enquireBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (inquiry) {
          inquiry.value = `Hello, I would like to enquire about: ${btn.dataset.product}`;
        }
        if (overlay) overlay.classList.add("active");
      });
    });
  }

  // Render all products on page load
  renderProducts();

  // Filter buttons
  const filterButtons = document.querySelectorAll(".filter-bar button");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      renderProducts(button.dataset.category);
    });
  });
});

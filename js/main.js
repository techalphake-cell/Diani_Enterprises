document.addEventListener("DOMContentLoaded", () => {
  // ===== HAMBURGER MENU =====
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("nav-open");
      navToggle.classList.toggle("active");
    });
  }

  // ===== MODAL =====
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

  // ===== PRODUCTS RENDERING =====
  const productsGrid = document.querySelector(".products-grid");

  const categoryLabels = {
    tools: "Tools",
    building: "Building Materials",
    plumbing: "Plumbing",
    electrical: "Electrical",
    "sanitary-ware": "Sanitary Ware",
    "hardware-general": "Hardware",
    "paint-crown": "Crown Paint",
    "paint-basco": "Basco Paint",
    "paint-plascon": "Plascon Paint",
  };

  function renderProducts(filter = "all", paintType = "all") {
    if (!productsGrid) return;

    productsGrid.innerHTML = "";

    products.forEach((product) => {
      const categoryMatch =
        filter === "all" ||
        product.category === filter ||
        (filter === "paint" && product.category.startsWith("paint-"));

      const typeMatch =
        filter !== "paint" || paintType === "all" || product.type === paintType;

      if (categoryMatch && typeMatch) {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.dataset.category = product.category;

        card.innerHTML = `
          <div class="product-image">
            <img src="" alt="${product.alt}">
          </div>
          <div class="product-info">
            <span class="product-category">${categoryLabels[product.category] || product.category}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="card-actions">
              <button class="btn-primary enquire-btn" data-product="${product.name} - ${product.description}">
                Enquire Now
              </button>
              <a href="https://wa.me/254735244889?text=Hello, I would like to order: ${product.name} - ${product.description}" class="btn-whatsapp" target="_blank">
                Order on WhatsApp
              </a>
            </div>
          </div>
        `;

        productsGrid.appendChild(card);
      }
    });

    // Re-attach enquire button listeners after every render
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

  // ===== FILTER BUTTONS =====
  const filterButtons = document.querySelectorAll(".filter-bar button");
  const paintSubfilter = document.querySelector("#paint-subfilter");
  const paintSubButtons = document.querySelectorAll(".paint-subfilter button");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const category = button.dataset.category;

      if (category === "paint") {
        if (paintSubfilter) paintSubfilter.classList.add("visible");
        paintSubButtons.forEach((btn) => btn.classList.remove("active"));
        if (paintSubButtons[0]) paintSubButtons[0].classList.add("active");
        renderProducts("paint", "all");
      } else {
        if (paintSubfilter) paintSubfilter.classList.remove("visible");
        renderProducts(category);
      }
    });
  });

  // ===== PAINT SUB-FILTER BUTTONS =====
  if (paintSubButtons.length > 0) {
    paintSubButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        paintSubButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderProducts("paint", btn.dataset.type);
      });
    });
  }

  // ===== CHECK URL FOR CATEGORY PARAMETER =====
  const params = new URLSearchParams(window.location.search);
  const urlCategory = params.get("category");

  if (urlCategory) {
    renderProducts(urlCategory);
    filterButtons.forEach((btn) => {
      if (btn.dataset.category === urlCategory) {
        btn.classList.add("active");
      }
    });
    if (urlCategory === "paint" && paintSubfilter) {
      paintSubfilter.classList.add("visible");
    }
  } else {
    renderProducts();
  }
});

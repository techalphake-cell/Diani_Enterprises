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

  const categoryBrandsList = {
    tools: [
      "Bosch",
      "Ingco",
      "Total",
      "Tolsen",
      "Raider",
      "Shoshona",
      "Makita",
    ],
    paint: ["Crown", "Duracoat", "Basco", "Plascon"],
    building: ["Doshi", "Tarmal ", "Bamburi", "Duracoat", "Dumuzaz", "Nyumba"],
    plumbing: [
      "Plumber",
      "Miran",
      "Lirlee",
      "Pegler",
      "Pedrollo",
      "Davis & Shirtliff",
    ],
    electrical: [
      "Tronic",
      "Schneider",
      "Chint",
      "Windsor",
      "Carl & Gilberts",
      "Surya",
      "Kings",
    ],

    // add more here as you go — e.g. plumbing: ["...", "..."], electrical: ["...", "..."]
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
        if (product.isInfoCard) {
          card.classList.add("product-card", "info-card");
          card.innerHTML = `
            <div class="info-card-content">
              <div class="info-card-icon">🔧</div>
              <h3>${product.title}</h3>
              <p>${product.description}</p>
              <a href="https://wa.me/254759186527?text=${encodeURIComponent(product.whatsappMessage)}" class="btn-whatsapp info-card-cta" target="_blank">
                ${product.cta}
              </a>
            </div>
          `;
          productsGrid.appendChild(card);
          return; // skip the rest — no size dropdown, no enquire button wiring needed
        }

        card.classList.add("product-card");
        // Build the size control — dropdown for multiple sizes, plain text for one, nothing for none
        let sizeHTML = "";
        if (product.sizes && product.sizes.length > 1) {
          const options = product.sizes
            .map((size) => `<option value="${size}">${size}</option>`)
            .join("");
          sizeHTML = `
            <div class="size-group">
              <label>Size/Model:</label>
              <select class="size-select">${options}</select>
            </div>
          `;
        } else if (product.sizes && product.sizes.length === 1) {
          sizeHTML = `<p class="single-size">Size: ${product.sizes[0]}</p>`;
        }

        card.innerHTML = `
          <div class="product-image">
            <img src="" alt="${product.alt}">
          </div>
          <div class="product-info">
            <span class="product-category">${categoryLabels[product.category] || product.category}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
           
            ${sizeHTML}
            <div class="card-actions">
              <button class="btn-primary enquire-btn">Enquire Now</button>
              <a class="btn-whatsapp" target="_blank">Order on WhatsApp</a>
            </div>
          </div>
        `;

        // Wire up this card's buttons individually, since they need
        // to read THIS card's size dropdown at click time
        const enquireBtn = card.querySelector(".enquire-btn");
        const whatsappBtn = card.querySelector(".btn-whatsapp");
        const sizeSelect = card.querySelector(".size-select");

        function getMessage() {
          let text = `${product.name} - ${product.description}`;
          if (sizeSelect) {
            text += ` (${sizeSelect.value})`;
          } else if (product.sizes && product.sizes.length === 1) {
            text += ` (${product.sizes[0]})`;
          }
          return text;
        }

        enquireBtn.addEventListener("click", () => {
          if (inquiry) {
            inquiry.value = `Hello, I would like to enquire about: ${getMessage()}`;
          }
          if (overlay) overlay.classList.add("active");
        });

        whatsappBtn.addEventListener("click", (event) => {
          event.preventDefault();
          const message = encodeURIComponent(
            `Hello, I would like to order: ${getMessage()}`,
          );
          window.open(`https://wa.me/254735244889?text=${message}`, "_blank");
        });

        productsGrid.appendChild(card);
      }
    });
  }
  const brandsBanner = document.querySelector("#brands-banner");
  const brandsTrack = document.querySelector("#brands-track");

  function updateBrandsBanner(category) {
    if (!brandsBanner || !brandsTrack) return;

    const brands = categoryBrandsList[category];

    if (!brands) {
      brandsBanner.classList.remove("visible");
      return;
    }

    const items = brands
      .map((b) => `<span class="brand-item">${b}</span>`)
      .join("");
    brandsTrack.innerHTML = items + items; // duplicated for the seamless scroll
    brandsBanner.classList.add("visible");
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
      updateBrandsBanner(category);

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
    updateBrandsBanner(urlCategory);
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

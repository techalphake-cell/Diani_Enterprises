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

  // ===== PRODUCTS SETUP =====
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

  // Sub-filter options per main category — add more as you curate each one
  const categorySubtypes = {
    paint: [
      { value: "all", label: "All Paint" },
      { value: "interior", label: "Interior" },
      { value: "exterior", label: "Exterior" },
      { value: "wood", label: "Wood Finishes" },
      { value: "marine", label: "Marine" },
      { value: "specialized", label: "Specialized" },
    ],
    tools: [
      { value: "all", label: "All Tools" },
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" },
    ],
    building: [
      { value: "all", label: "All Products" },
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" },
    ],
    plumbing: [
      { value: "all", label: "All Products" },
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" },
    ],
    electrical: [
      { value: "all", label: "All Products" },
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" },
    ],
    "sanitary-ware": [
      { value: "all", label: "All Products" },
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" },
    ],
    "hardware-general": [
      { value: "all", label: "All Products" },
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" },
    ],
  };

  // Brand banner per main category — add more as you curate each one
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
    building: ["Doshi", "Tarmal", "Bamburi", "Duracoat", "Dumuzaz", "Nyumba"],
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
    "sanitary-ware": ["Miran", "Techplas", "Lirlee", "MIBT", "Valdeno"],
    "hardware-general": [
      "Union",
      "Oxford",
      "Euro",
      "Yale",
      "Solex",
      "Yeti",
      "Assa Abloy",
      "Guli",
    ],
  };

  // ===== RENDER PRODUCTS =====
  function renderProducts(filter = "all", subtype = "all") {
    if (!productsGrid) return;

    productsGrid.innerHTML = "";

    products.forEach((product) => {
      const categoryMatch =
        filter === "all" ||
        product.category === filter ||
        (filter === "paint" && product.category.startsWith("paint-"));

      const typeMatch = subtype === "all" || product.type === subtype;

      if (categoryMatch && typeMatch) {
        const card = document.createElement("div");
        card.dataset.category = product.category;

        // Special case — promo/info card, not a real product
        if (product.isInfoCard) {
          card.classList.add("product-card", "info-card");
          card.innerHTML = `
            <div class="info-card-content">
              <div class="info-card-icon">🔧</div>
              <h3>${product.title}</h3>
              <p>${product.description}</p>
              <a href="https://wa.me/254735244889?text=${encodeURIComponent(product.whatsappMessage)}" class="btn-whatsapp info-card-cta" target="_blank">
                ${product.cta}
              </a>
            </div>
          `;
          productsGrid.appendChild(card);
          return;
        }

        card.classList.add("product-card");

        let sizeHTML = "";
        if (product.sizes && product.sizes.length > 1) {
          const options = product.sizes
            .map((size) => `<option value="${size}">${size}</option>`)
            .join("");
          sizeHTML = `
            <div class="size-group">
              <label>Size:</label>
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

  // ===== BRANDS BANNER =====
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
    brandsTrack.innerHTML = items + items;
    brandsBanner.classList.add("visible");
  }

  // ===== GENERIC SUB-FILTER BAR =====
  const subfilterBar = document.querySelector("#subfilter-bar");

  function renderSubfilter(category) {
    if (!subfilterBar) return;

    const subtypes = categorySubtypes[category];

    if (!subtypes) {
      subfilterBar.classList.remove("visible");
      subfilterBar.innerHTML = "";
      return;
    }

    subfilterBar.innerHTML = subtypes
      .map(
        (sub, index) =>
          `<button data-type="${sub.value}" class="${index === 0 ? "active" : ""}">${sub.label}</button>`,
      )
      .join("");

    subfilterBar.classList.add("visible");

    const subButtons = subfilterBar.querySelectorAll("button");
    subButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        subButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderProducts(category, btn.dataset.type);
      });
    });
  }

  // ===== MAIN FILTER BUTTONS =====
  const filterButtons = document.querySelectorAll(".filter-bar button");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const category = button.dataset.category;
      updateBrandsBanner(category);
      renderSubfilter(category);
      renderProducts(category, "all");
    });
  });

  // ===== CHECK URL FOR CATEGORY PARAMETER =====
  const params = new URLSearchParams(window.location.search);
  const urlCategory = params.get("category");

  if (urlCategory) {
    updateBrandsBanner(urlCategory);
    renderSubfilter(urlCategory);
    renderProducts(urlCategory, "all");
    filterButtons.forEach((btn) => {
      if (btn.dataset.category === urlCategory) {
        btn.classList.add("active");
      }
    });
  } else {
    renderProducts();
  }
});

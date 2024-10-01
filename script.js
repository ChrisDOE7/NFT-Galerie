// Warten, bis das DOM geladen ist
document.addEventListener("DOMContentLoaded", function () {
  // Galerie laden
  loadGallery();

  // Elemente für das Modal auswählen
  const modal = document.getElementById("modal");
  const closeButton = document.querySelector(".close-button");
  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalArtist = document.getElementById("modal-artist");
  const modalNftInfo = document.getElementById("modal-nft-info");
  const modalTwitter = document.getElementById("modal-twitter");
  const modalWebsite = document.getElementById("modal-website");
  const modalMarketplaces = document.getElementById("modal-marketplaces"); // Hinzugefügt

  // Funktion zum Laden der Galerie
  function loadGallery() {
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => {
        const gallery = document.getElementById("gallery");
        data.forEach((item) => {
          const galleryItem = document.createElement("div");
          galleryItem.classList.add("gallery-item");
          galleryItem.dataset.artist = item.artist;
          galleryItem.dataset.nftinfo = item.nftInfo;
          galleryItem.dataset.twitter = item.twitter;
          galleryItem.dataset.instagram = item.instagram;
          galleryItem.dataset.website = item.website;
          galleryItem.dataset.marketplace = item.marketplace;
          galleryItem.dataset.exchange = item.exchange;
          galleryItem.dataset.mallow = item.mallow;
          galleryItem.dataset.foster = item.foster;
          galleryItem.dataset.foundation = item.foundation;
          galleryItem.dataset.objkt = item.objkt;
          galleryItem.dataset.zora = item.zora;

          galleryItem.innerHTML = `
                          <img src="${item.image}" alt="${item.title}">
                          <h2>${item.title}</h2>
                      `;

          galleryItem.addEventListener("click", openModal);

          gallery.appendChild(galleryItem);
        });
      })
      .catch((error) => console.error("Error loading gallery:", error));
  }

  function openModal(event) {
    const item = event.currentTarget;
    const imgSrc = item.querySelector("img").src;
    const title = item.querySelector("h2").innerText;
    const artist = item.dataset.artist;
    const nftInfo = item.dataset.nftinfo;
    const twitter = item.dataset.twitter;
    const instagram = item.dataset.instagram;
    const website = item.dataset.website;
    const marketplace = item.dataset.marketplace;
    const exchange = item.dataset.exchange;
    const mallow = item.dataset.mallow;
    const foster = item.dataset.foster;
    const foundation = item.dataset.foundation;
    const objkt = item.dataset.objkt;
    const zora = item.dataset.zora;

    modalImage.src = imgSrc;
    modalTitle.innerText = title;
    modalArtist.innerText = "by " + artist;
    modalNftInfo.innerText = nftInfo;

    // Social Media Links
    updateSocialLink("modal-twitter", twitter);
    updateSocialLink("modal-instagram", instagram);
    updateSocialLink("modal-website", website);

    // 'MARKET'-Button aktualisieren
    const marketButton = document.getElementById("market-button");
    marketButton.href = marketplace;

    // Marktplatz-Links aktualisieren
    updateMarketplaces({
      exchange,
      mallow,
      foster,
      foundation,
      objkt,
      zora,
    });

    modal.classList.add("show");
  }

  // Funktion zum Aktualisieren der Social Media Links
  function updateSocialLink(elementId, url) {
    const linkElement = document.getElementById(elementId);
    if (url) {
      linkElement.style.display = "inline-block";
      linkElement.href = url;
    } else {
      linkElement.style.display = "none";
    }
  }

  // Funktion zum Aktualisieren der Marktplatz-Links
  function updateMarketplaces(marketplaces) {
    modalMarketplaces.innerHTML = ""; // Vorherige Inhalte entfernen

    for (const [marketplaceKey, url] of Object.entries(marketplaces)) {
      if (url) {
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        // Marktplatzname formatieren
        const marketplaceName = formatMarketplaceName(marketplaceKey);
        link.textContent = marketplaceName;
        modalMarketplaces.appendChild(link);
      }
    }
  }

  function formatMarketplaceName(key) {
    const marketplaceNames = {
      exchange: "Exchange",
      mallow: "Mallow",
      foster: "Foster",
      foundation: "Foundation",
      objkt: "Objkt",
      zora: "Zora",
    };
    return marketplaceNames[key] || key.charAt(0).toUpperCase() + key.slice(1);
  }

  // Funktion zum Schließen des Modals
  function closeModal() {
    modal.classList.remove("show");
  }

  // Event Listener für die Schließen-Schaltfläche
  closeButton.addEventListener("click", closeModal);

  // Schließen des Modals bei Klick außerhalb des Inhalts
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      closeModal();
    }
  });
});

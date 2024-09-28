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
  const modalTwitter = document.getElementById("modal-twitter");
  const modalWebsite = document.getElementById("modal-website");
  const modalMarketplace = document.getElementById("modal-marketplace");

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
          galleryItem.dataset.twitter = item.twitter;
          galleryItem.dataset.website = item.website;
          galleryItem.dataset.marketplace = item.marketplace;

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

  // Funktion zum Öffnen des Modals
  function openModal(event) {
    const item = event.currentTarget;
    const imgSrc = item.querySelector("img").src;
    const title = item.querySelector("h2").innerText;
    const artist = item.dataset.artist;
    const twitter = item.dataset.twitter;
    const website = item.dataset.website;
    const marketplace = item.dataset.marketplace;

    modalImage.src = imgSrc;
    modalTitle.innerText = title;
    modalArtist.innerText = "Artist: " + artist;
    modalTwitter.href = twitter;
    modalWebsite.href = website;
    modalMarketplace.href = marketplace;

    modal.style.display = "block";
  }

  // Funktion zum Schließen des Modals
  function closeModal() {
    modal.style.display = "none";
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

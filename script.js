// script.js

document.addEventListener("DOMContentLoaded", function () {
  // Elemente für den Filter
  const filterButtons = document.querySelectorAll('.filter-button');

  // Galerie laden
  loadGallery();

  // Künstlerliste im Footer laden
  loadFooterArtists();

  // Event Listener für Filter-Buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Entferne aktive Klasse von allen Buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Füge aktive Klasse zum geklickten Button hinzu
      this.classList.add('active');
      // Filter anwenden
      const filter = this.getAttribute('data-filter');
      filterGallery(filter);
    });
  });

  // Funktion zum Laden der Galerie
  function loadGallery() {
    fetch("data.json")
      .then(response => response.json())
      .then(data => {
        // Gruppieren nach Künstler
        const artists = groupByArtist(data);
        // Zufällige Reihenfolge der Künstler
        const shuffledArtists = shuffleArray(Object.keys(artists));
        // Rendern der Galerie
        const gallery = document.getElementById("gallery");
        gallery.innerHTML = ''; // Leeren der Galerie

        shuffledArtists.forEach(artist => {
          const artistGroup = artists[artist];
          const artistContainer = document.createElement("div");
          artistContainer.classList.add("artist-group");
          artistContainer.dataset.artist = artist;
          artistContainer.id = `artist-${artist}`; // ID für Scroll-Ziel

          artistGroup.forEach(item => {
            const galleryItem = document.createElement("div");
            galleryItem.classList.add("gallery-item");
            galleryItem.dataset.artist = item.artist;
            galleryItem.dataset.rarity = item.rarity;
            galleryItem.dataset.twitter = item.twitter;
            galleryItem.dataset.instagram = item.instagram;
            galleryItem.dataset.website = item.website;
            galleryItem.dataset.marketplace = item.marketplace;
            galleryItem.dataset.image = item.image; // Setzt das 'image' Attribut für Vollbild

            // Inklusive Künstlername im Titel
            galleryItem.innerHTML = `
              <img src="${item.imageSmall}" alt="${item.title}">
              <div class="image-overlay"></div> <!-- Transparenter Overlay -->
              <h2>${item.title}</h2>
            `;

            // Click event to open modal
            galleryItem.addEventListener("click", openModal);

            artistContainer.appendChild(galleryItem);
          });

          gallery.appendChild(artistContainer);
        });
      })
      .catch(error => console.error("Error loading gallery:", error));
  }

  // Funktion zum Gruppieren nach Künstler
  function groupByArtist(data) {
    return data.reduce((groups, item) => {
      const artist = item.artist;
      if (!groups[artist]) {
        groups[artist] = [];
      }
      groups[artist].push(item);
      return groups;
    }, {});
  }

  // Funktion zum Zufällig mischen eines Arrays
  function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  // Funktion zum Filtern der Galerie
  function filterGallery(filter) {
    const artistGroups = document.querySelectorAll('.artist-group');

    artistGroups.forEach(group => {
      const items = group.querySelectorAll('.gallery-item');
      let showGroup = false;

      items.forEach(item => {
        if (filter === 'all') {
          item.style.display = 'flex';
          showGroup = true;
        } else {
          if (item.dataset.rarity === filter) {
            item.style.display = 'flex';
            showGroup = true;
          } else {
            item.style.display = 'none';
          }
        }
      });

      if (showGroup) {
        group.style.display = 'flex';
      } else {
        group.style.display = 'none';
      }
    });
  }

  // Modal-Funktionalität
  const modal = document.getElementById("modal");
  const closeButton = document.querySelector(".close-button");
  const modalImage = document.getElementById("modal-image");
  const fullscreenButton = document.getElementById("fullscreen-button");
  const fullscreenModal = document.getElementById("fullscreen-modal");
  const fullscreenImage = document.getElementById("fullscreen-image");
  const closeFullscreenButton = document.getElementById("close-fullscreen-button");
  const modalTitle = document.getElementById("modal-title");
  const modalArtist = document.getElementById("modal-artist");
  const modalTwitter = document.getElementById("modal-twitter");
  const modalInstagram = document.getElementById("modal-instagram");
  const modalWebsite = document.getElementById("modal-website");
  const marketplaceButton = document.getElementById("marketplace-button");

  // Event listener für close button
  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  } else {
    console.error("Close button not found.");
  }

  // Event listener für Vollbild-Button
  if (fullscreenButton) {
    fullscreenButton.addEventListener("click", openFullscreen);
  } else {
    console.error("Fullscreen button not found.");
  }

  // Event listener für close Vollbild-Button
  if (closeFullscreenButton) {
    closeFullscreenButton.addEventListener("click", closeFullscreen);
  } else {
    console.error("Close fullscreen button not found.");
  }

  // Funktion zum Öffnen des Modals
  function openModal(event) {
    const item = event.currentTarget;
    const imgSrcSmall = item.querySelector("img").src;
    const imageFull = item.dataset.image; // Pfad für Vollbild
    const title = item.querySelector("h2").innerText;
    const artist = item.dataset.artist;
    const twitter = item.dataset.twitter;
    const instagram = item.dataset.instagram;
    const website = item.dataset.website;
    const marketplace = item.dataset.marketplace;

    modalImage.src = imgSrcSmall; // Setzen auf imageSmall
    modalImage.dataset.fullImage = imageFull; // Speichern des Pfads für Vollbild
    modalTitle.innerText = title;
    modalArtist.innerText = "by " + artist;

    // Social Media Links
    updateSocialLink("modal-twitter", twitter);
    updateSocialLink("modal-instagram", instagram);
    updateSocialLink("modal-website", website);

    // Update marketplace button
    if (marketplace) {
      marketplaceButton.style.display = "inline-block";
      marketplaceButton.href = marketplace;
    } else {
      marketplaceButton.style.display = "none";
    }

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

  // Funktion zum Schließen des Modals
  function closeModal() {
    modal.classList.remove("show");
  }

  // Funktion zum Öffnen der Vollbild-Ansicht
  function openFullscreen() {
    const fullImageSrc = modalImage.dataset.fullImage || modalImage.src.replace("_small", "");
    fullscreenImage.src = fullImageSrc;
    fullscreenModal.classList.add("show");
  }

  // Funktion zum Schließen der Vollbild-Ansicht
  function closeFullscreen() {
    fullscreenModal.classList.remove("show");
  }

  // Schließen des Modals beim Klicken außerhalb des Inhalts
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      closeModal();
    }
    if (event.target == fullscreenModal) {
      closeFullscreen();
    }
  });

  // Verhindert das Rechtsklicken auf Bilder und Long-Press auf mobilen Geräten
  const images = document.querySelectorAll('.gallery-item img, .image-container, #modal-image, #fullscreen-image');
  images.forEach(img => {
    img.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });

    // Verhindert Long-Press auf mobilen Geräten
    img.addEventListener('touchstart', function (e) {
      e.preventDefault();
    });
  });

  // Funktion zum Laden der Künstlerliste im Footer
  function loadFooterArtists() {
    fetch("data.json")
      .then(response => response.json())
      .then(data => {
        const artistSet = new Set();
        data.forEach(item => {
          artistSet.add(item.artist);
        });

        const artistList = document.getElementById("artist-list");
        artistList.innerHTML = ''; // Leeren der Liste

        artistSet.forEach(artist => {
          const listItem = document.createElement("li");
          const link = document.createElement("a");
          link.href = `#artist-${artist}`;
          link.textContent = artist;
          link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.getElementById(`artist-${artist}`);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          });
          listItem.appendChild(link);
          artistList.appendChild(listItem);
        });
      })
      .catch(error => console.error("Error loading footer artists:", error));
  }
});
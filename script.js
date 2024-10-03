// Wait for the DOM to load
// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Load gallery
  loadGallery();

  // Select elements for the modal
  const modal = document.getElementById("modal");
  const closeButton = document.querySelector(".close-button");
  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalArtist = document.getElementById("modal-artist");
  const modalTwitter = document.getElementById("modal-twitter");
  const modalInstagram = document.getElementById("modal-instagram");
  const modalWebsite = document.getElementById("modal-website");
  const marketplaceButton = document.getElementById("marketplace-button");

  // Check if closeButton is correctly selected
  if (closeButton) {
    // Event listener for close button
    closeButton.addEventListener("click", closeModal);
  } else {
    console.error("Close button not found.");
  }

  // Emoji animation elements (if used)
  const mainHeading = document.getElementById("main-heading");
  const emojis = ["🍭", "🍬"];
  let emojiInterval;

  // Event listener for emoji animation
  if (mainHeading) {
    mainHeading.addEventListener("mouseenter", startEmojiRain);
    mainHeading.addEventListener("mouseleave", stopEmojiRain);
  }

  // Function to start emoji rain
  function startEmojiRain() {
    let count = 0;
    emojiInterval = setInterval(() => {
      if (count < 10) {
        createEmoji();
        count++;
      } else {
        clearInterval(emojiInterval);
      }
    }, 200);
  }

  // Function to create an emoji element
  function createEmoji() {
    const emoji = document.createElement("div");
    emoji.classList.add("emoji");
    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    // Random start position
    const headingRect = mainHeading.getBoundingClientRect();
    emoji.style.left =
      headingRect.left + Math.random() * headingRect.width + "px";
    emoji.style.top = "-50px";

    // Add emoji to body
    document.body.appendChild(emoji);

    // Let emoji fall
    animateEmoji(emoji);
  }

  // Function to animate emoji falling
  function animateEmoji(emoji) {
    let pos = -50;
    const endPos = window.innerHeight + 50;
    const duration = Math.random() * 2000 + 2000;
    let start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / duration, 1);
      pos = percent * (endPos + 50) - 50;
      emoji.style.top = pos + "px";
      if (percent < 1) {
        window.requestAnimationFrame(step);
      } else {
        // Remove emoji after animation ends
        emoji.remove();
      }
    }

    window.requestAnimationFrame(step);
  }

  // Function to stop emoji rain
  function stopEmojiRain() {
    clearInterval(emojiInterval);
  }

  // Function to load gallery
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
          galleryItem.dataset.instagram = item.instagram;
          galleryItem.dataset.website = item.website;
          galleryItem.dataset.marketplace = item.marketplace;

          galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <h2>${item.title}</h2>
          `;

          // Click event to open modal
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
    const twitter = item.dataset.twitter;
    const instagram = item.dataset.instagram;
    const website = item.dataset.website;
    const marketplace = item.dataset.marketplace;

    modalImage.src = imgSrc;
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

  // Function to update social media links
  function updateSocialLink(elementId, url) {
    const linkElement = document.getElementById(elementId);
    if (url) {
      linkElement.style.display = "inline-block";
      linkElement.href = url;
    } else {
      linkElement.style.display = "none";
    }
  }

  // Function to close modal
  function closeModal() {
    modal.classList.remove("show");
  }

  // Close modal when clicking outside the content
  function handleOutsideClick(event) {
    if (event.target === modal) {
      closeModal();
    }
  }

  // Event listener for clicks outside the modal content
  modal.addEventListener("click", handleOutsideClick);

  // Event listener for touch events outside the modal content
  modal.addEventListener("touchstart", handleOutsideClick);
});
// Add sticky header when scrolling down

document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    const placeholder = document.createElement("div");
    placeholder.style.height = `${header.offsetHeight}px`;
    placeholder.style.display = "none";
    header.parentNode.insertBefore(placeholder, header); // Place it before header

    const stickyThreshold = 40;

    window.addEventListener("scroll", () => {
        if (window.scrollY > stickyThreshold) {
            header.classList.add("sticky");
            placeholder.style.display = "block";
        } else {
            header.classList.remove("sticky");
            placeholder.style.display = "none";
        }
    });
});

// Project page link highlight

document.addEventListener("DOMContentLoaded", function () {
    // Get the current page URL path
    const currentPage = window.location.pathname;

    // Reference the navigation links by ID
    const workLink = document.getElementById("work-link");
    const aboutLink = document.getElementById("about-link");
    const contactLink = document.getElementById("contact-link");

    // Check if current page is under 'Work' section
    if (currentPage.includes("/work/")) {
        workLink.classList.add("active");
    } else if (currentPage.includes("/about.html")) {
        aboutLink.classList.add("active");
    } else if (currentPage.includes("/contact.html")) {
        contactLink.classList.add("active");
    }
});

// Carousel

document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    let scrollSpeed = 0.5; // Adjust speed as needed (higher = faster)

    function startInfiniteScroll() {
        // Clone the track contents to create seamless looping
        const trackContent = track.innerHTML;
        track.innerHTML += trackContent;

        let scrollAmount = 0;

        function scrollLoop() {
            scrollAmount += scrollSpeed;
            if (scrollAmount >= track.scrollWidth / 2) {
                scrollAmount = 0; // Reset without snapping
            }
            track.style.transform = `translateX(-${scrollAmount}px)`;
            requestAnimationFrame(scrollLoop);
        }

        scrollLoop();
    }

    startInfiniteScroll();
});

// Video playback

document.addEventListener("DOMContentLoaded", () => {
    const thumbnails = document.querySelectorAll(".thumbnail");

    thumbnails.forEach(thumbnail => {
        const videos = thumbnail.querySelectorAll(".mockup-video");

        thumbnail.addEventListener("mouseenter", () => {
            videos.forEach(video => {
                video.currentTime = 0;  // Start from the beginning
                video.play();           // Play the video
                video.onended = () => {
                    video.currentTime = video.duration;  // Stop on the last frame
                };
            });
        });

        thumbnail.addEventListener("mouseleave", () => {
            videos.forEach(video => {
                video.pause();           // Pause the video
                video.currentTime = 0;    // Reset to start
            });
        });
    });
});

// Masonry layout

function masonryLayout(container, items, columns, gap) {
    container.style.position = 'relative';
    let columnHeights = Array(columns).fill(0); // Track column heights
    let columnWidth = (container.offsetWidth - (columns - 1) * gap) / columns; // Account for gaps

    items.forEach((item, index) => {
        let minColumn = columnHeights.indexOf(Math.min(...columnHeights)); // Find shortest column
        let xPos = minColumn * (columnWidth + gap);
        let yPos = columnHeights[minColumn];

        item.style.position = 'absolute';
        item.style.left = `${xPos}px`;
        item.style.top = `${yPos}px`;
        item.style.width = `${columnWidth}px`;

        columnHeights[minColumn] += item.offsetHeight + gap; // Add vertical gap
    });

    // Set container height to the tallest column to prevent overflow
    container.style.height = `${Math.max(...columnHeights)}px`;
}

// Initialize masonry layout
function initMasonry() {
    const galleryContainer = document.getElementById('my-gallery');
    const items = Array.from(galleryContainer.getElementsByTagName('a'));

    let columns = window.innerWidth < 768 ? 1 : 2;  // Adjust number of columns
    let gap = 20;  // Gap between images

    masonryLayout(galleryContainer, items, columns, gap);

    // Re-run on window resize
    window.addEventListener('resize', () => {
        columns = window.innerWidth < 768 ? 1 : 3;
        masonryLayout(galleryContainer, items, columns, gap);
    });
}

// Run masonry after images load
window.addEventListener('load', initMasonry);

// Slider

document.addEventListener("DOMContentLoaded", function () {
    const columns = document.querySelectorAll(".vertical-carousel-track");

    columns.forEach(column => {
        duplicateContent(column); // Duplicate the content to enable seamless scrolling
        startInfiniteScroll(column, getScrollSpeed(column)); // Start scrolling
    });

    // Function to duplicate content for seamless looping
    function duplicateContent(column) {
        const content = column.innerHTML;
        column.innerHTML += content; // Duplicate the column's content
    }

    // Function to determine the scroll speed based on column class
    function getScrollSpeed(column) {
        if (column.classList.contains("column-1")) return 0.7; // Slow scroll
        if (column.classList.contains("column-2")) return 1;   // Medium scroll
        if (column.classList.contains("column-3")) return 0.5; // Fast scroll
        return 1; // Default speed
    }

    // Function to create infinite vertical scroll
    function startInfiniteScroll(column, speed) {
        let scrollPosition = 0; // Track the scroll position
        const totalHeight = column.scrollHeight / 2; // Original content height

        function scroll() {
            scrollPosition += speed; // Increment scroll position

            // Seamlessly reset the scroll position without snapping
            if (scrollPosition >= totalHeight) {
                scrollPosition = 0; // Reset to the start
                column.style.transform = `translateY(0)`; // Instantly reset
            } else {
                column.style.transform = `translateY(-${scrollPosition}px)`; // Scroll up
            }

            requestAnimationFrame(scroll); // Continue scrolling
        }

        scroll(); // Start the scroll loop
    }
});




document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0; // Index of the current slide
    const slideDuration = 3000; // 3 seconds per slide
    const fadeDuration = 500; // 0.5 seconds fade duration

    // Initialize the slides with proper styles
    function initializeSlides() {
        slides.forEach((slide, index) => {
            slide.style.position = "absolute";
            slide.style.top = 0;
            slide.style.left = 0;
            slide.style.width = "100%";
            slide.style.height = "100%";
            slide.style.opacity = index === 0 ? 1 : 0; // Show the first slide
            slide.style.zIndex = index === 0 ? 1 : 0; // Keep the first slide on top
            slide.style.transition = `opacity ${fadeDuration}ms ease-in-out`;
        });
    }

    // Function to fade to the next slide
    function fadeToNextSlide() {
        const previousSlide = currentSlide;
        currentSlide = (currentSlide + 1) % slides.length; // Move to the next slide

        slides[previousSlide].style.opacity = 0; // Fade out the previous slide
        slides[previousSlide].style.zIndex = 0; // Move it to the back

        slides[currentSlide].style.opacity = 1; // Fade in the current slide
        slides[currentSlide].style.zIndex = 1; // Bring it to the front
    }

    // Start the slider
    function startSlider() {
        initializeSlides(); // Set up initial styles
        setInterval(fadeToNextSlide, slideDuration); // Cycle through slides
    }

    startSlider(); // Initialize and start the slider
});



// Shorter text

function updateDescriptions() {
    const descriptions = document.querySelectorAll('.description');
    descriptions.forEach(desc => {
        if (desc.hasAttribute('data-full') && desc.hasAttribute('data-short')) {
            if (window.innerWidth < 1024) {
                desc.textContent = desc.getAttribute('data-short');
            } else {
                desc.textContent = desc.getAttribute('data-full');
            }
        }
    });
}




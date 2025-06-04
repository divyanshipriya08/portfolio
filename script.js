// Carousel Buttons Logic
const carousel = document.getElementById('carousel');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

const scrollAmount = 320; // width + gap approx

prevBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});

nextBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});

// Contact Form Submission with Animated Dialog Box and Close Functionality

const form = document.getElementById('contact-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      headers: { 'Accept': 'application/json' },
      body: formData
    });

    if (response.ok) {
      showConfirmationDialog();
      form.reset();
    } else {
      alert('Oops! There was a problem sending your message.');
    }
  } catch (error) {
    alert('Oops! There was a problem sending your message.');
  }
});

function showConfirmationDialog() {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '2000';
  overlay.style.animation = 'fadeInOverlay 0.4s ease forwards';

  // Create dialog box
  const dialog = document.createElement('div');
  dialog.style.backgroundColor = '#fff';
  dialog.style.padding = '30px 40px';
  dialog.style.borderRadius = '12px';
  dialog.style.textAlign = 'center';
  dialog.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
  dialog.style.fontFamily = "'Roboto', sans-serif";
  dialog.style.color = '#2e7d32';
  dialog.style.position = 'relative';
  dialog.style.minWidth = '280px';
  dialog.style.maxWidth = '90%';
  dialog.style.animation = 'fadeInDialog 0.5s ease forwards';

  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '×';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '10px';
  closeBtn.style.right = '15px';
  closeBtn.style.background = 'transparent';
  closeBtn.style.border = 'none';
  closeBtn.style.fontSize = '28px';
  closeBtn.style.color = '#555';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.fontWeight = '700';
  closeBtn.setAttribute('aria-label', 'Close dialog');

  closeBtn.addEventListener('click', () => {
    fadeOutAndRemove(overlay);
  });

  // Tick icon (FontAwesome check-circle)
  const tickIcon = document.createElement('i');
  tickIcon.className = 'fas fa-check-circle';
  tickIcon.style.fontSize = '48px';
  tickIcon.style.marginBottom = '15px';

  // Message text
  const message = document.createElement('p');
  message.textContent = 'Message sent successfully!';
  message.style.fontSize = '20px';
  message.style.fontWeight = '600';

  // Append elements
  dialog.appendChild(closeBtn);
  dialog.appendChild(tickIcon);
  dialog.appendChild(message);
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  // Click outside dialog closes it
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      fadeOutAndRemove(overlay);
    }
  });

  // Auto close after 4 seconds
  setTimeout(() => {
    fadeOutAndRemove(overlay);
  }, 4000);
}

// Helper to fade out then remove overlay
function fadeOutAndRemove(element) {
  element.style.animation = 'fadeOutOverlay 0.4s ease forwards';
  const dialog = element.querySelector('div');
  if (dialog) {
    dialog.style.animation = 'fadeOutDialog 0.4s ease forwards';
  }
  element.addEventListener('animationend', () => {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  });
}

// Add keyframes dynamically since this is pure JS:
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
@keyframes fadeInOverlay {
  from {opacity: 0;}
  to {opacity: 1;}
}
@keyframes fadeOutOverlay {
  from {opacity: 1;}
  to {opacity: 0;}
}
@keyframes fadeInDialog {
  from {opacity: 0; transform: translateY(20px);}
  to {opacity: 1; transform: translateY(0);}
}
@keyframes fadeOutDialog {
  from {opacity: 1; transform: translateY(0);}
  to {opacity: 0; transform: translateY(20px);}
}
`;
document.head.appendChild(styleSheet);

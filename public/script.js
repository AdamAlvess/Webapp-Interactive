// Toggle Chatbot
const chatToggle = document.getElementById('chat-toggle');
const chatBox = document.querySelector('.chat-box');

chatToggle.addEventListener('click', () => {
    const isHidden = chatBox.style.display === 'none' || chatBox.style.display === '';
    chatBox.style.display = isHidden ? 'block' : 'none';
});

// Animation simple au scroll pour les cartes
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(30px)';
    card.style.transition = '0.6s ease-out';
    observer.observe(card);
});
// --- GESTION DU CHATBOT (Présent sur toutes les pages) ---
const chatToggle = document.getElementById('chat-toggle');
const chatBox = document.querySelector('.chat-box');
const chatContent = document.getElementById('chat-content');
const chatInput = document.querySelector('.chat-input input');

if (chatToggle && chatBox) {
    chatToggle.addEventListener('click', () => {
        const isHidden = chatBox.style.display === 'none' || chatBox.style.display === '';
        chatBox.style.display = isHidden ? 'block' : 'none';
    });

    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.style.margin = '8px 0';
        msgDiv.style.padding = '10px 14px';
        msgDiv.style.borderRadius = '12px';
        msgDiv.style.maxWidth = '85%';
        msgDiv.style.fontSize = '0.9rem';
        msgDiv.style.lineHeight = '1.4';
        
        if (sender === 'user') {
            msgDiv.style.backgroundColor = 'rgba(34, 211, 238, 0.2)';
            msgDiv.style.color = '#22d3ee';
            msgDiv.style.alignSelf = 'flex-end';
            msgDiv.style.borderBottomRightRadius = '2px';
        } else {
            msgDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            msgDiv.style.color = '#fff';
            msgDiv.style.alignSelf = 'flex-start';
            msgDiv.style.borderBottomLeftRadius = '2px';
        }
        
        msgDiv.textContent = text;
        chatContent.appendChild(msgDiv);
        chatContent.scrollTop = chatContent.scrollHeight;
    }

    chatInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter' && chatInput.value.trim() !== '') {
            const userText = chatInput.value.trim();
            chatInput.value = ''; 
            
            appendMessage('user', userText);

            const loadingId = 'loading-' + Date.now();
            const loadingMsg = document.createElement('div');
            loadingMsg.id = loadingId;
            loadingMsg.style.alignSelf = 'flex-start';
            loadingMsg.style.color = '#94a3b8';
            loadingMsg.style.fontSize = '0.8rem';
            loadingMsg.textContent = 'Chronos réfléchit...';
            chatContent.appendChild(loadingMsg);
            chatContent.scrollTop = chatContent.scrollHeight;

            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: userText })
                });

                const data = await response.json();
                document.getElementById(loadingId).remove();
                
                if (data.reply) {
                    appendMessage('bot', data.reply);
                } else {
                    appendMessage('bot', '⚠️ Interférence temporelle détectée.');
                }
            } catch (error) {
                document.getElementById(loadingId).remove();
                appendMessage('bot', '⚠️ Connexion au vortex interrompue.');
            }
        }
    });
}

// --- GESTION DE LA MODALE VIDEO TRAILER ---
function openTrailer() {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('trailer-video');
    if (modal && video) {
        modal.classList.add('show');
        video.play();
    }
}

function closeTrailer() {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('trailer-video');
    if (modal && video) {
        modal.classList.remove('show');
        video.pause();
        video.currentTime = 0; // Remet la vidéo à zéro
    }
}

// --- ANIMATION DES CARTES AU SCROLL ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .detail-card').forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(30px)';
    card.style.transition = '0.6s ease-out';
    observer.observe(card);
});

// --- GESTION DU QUIZ D'ANALYSE TEMPORELLE (Seulement sur l'accueil) ---
const quizContentDiv = document.getElementById('quiz-content');
if (quizContentDiv) {
    const quizData = [
        { question: "Quel type d'expérience recherchez-vous ?", options: ["Culturelle et artistique", "Aventure et nature", "Élégance et raffinement"] },
        { question: "Votre période préférée ?", options: ["Histoire moderne (XIXe-XXe siècle)", "Temps anciens et origines", "Renaissance et classicisme"] },
        { question: "Vous préférez :", options: ["L'effervescence urbaine", "La nature sauvage", "L'art et l'architecture"] },
        { question: "Votre activité idéale :", options: ["Visiter des monuments", "Observer la faune", "Explorer des musées"] }
    ];

    let currentQuestion = 0;
    let userAnswers = [];

    // On attache les fonctions à window pour qu'elles soient accessibles depuis l'HTML
    window.startQuiz = function() {
        currentQuestion = 0;
        userAnswers = [];
        renderQuestion();
    };

    window.selectOption = function(option) {
        userAnswers.push(option);
        currentQuestion++;
        renderQuestion();
    };

    function renderQuestion() {
        const container = document.getElementById('quiz-content');
        if (currentQuestion >= quizData.length) {
            finishQuiz(container);
            return;
        }

        const q = quizData[currentQuestion];
        let html = `
            <span class="era">Question ${currentQuestion + 1} / ${quizData.length}</span>
            <h3 style="margin: 15px 0 25px 0; font-size: 1.4rem;">${q.question}</h3>
        `;
        
        q.options.forEach(opt => {
            const safeOpt = opt.replace(/'/g, "\\'"); 
            html += `<button class="quiz-option" onclick="selectOption('${safeOpt}')">${opt}</button>`;
        });
        
        container.innerHTML = html;
    }

    async function finishQuiz(container) {
        container.innerHTML = `
            <i data-lucide="loader" class="icon-cyan" style="width: 48px; height: 48px; animation: pulse 2s infinite;"></i>
            <h3 style="margin-top: 20px;">Analyse de votre signature temporelle...</h3>
            <p style="color: var(--gray);">Notre IA croise vos réponses avec nos algorithmes quantiques.</p>
        `;
        lucide.createIcons();

        try {
            const response = await fetch('/api/quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers: userAnswers })
            });
            const data = await response.json();
            
            container.innerHTML = `
                <i data-lucide="check-circle" style="color: #22c55e; width: 48px; height: 48px; margin-bottom: 15px;"></i>
                <h3 style="color: var(--cyan); margin-bottom: 20px; font-size: 1.6rem;">Destination Trouvée !</h3>
                <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 30px; text-align: left; padding: 15px; background: rgba(0,0,0,0.3); border-radius: 10px;">${data.reply}</p>
                
                <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                    <button class="btn-primary" onclick="window.location.href='/destinations'">Voir la destination</button>
                    <button class="btn-ghost" onclick="startQuiz()">Refaire le test</button>
                </div>
            `;
            lucide.createIcons();
        } catch (error) {
            container.innerHTML = `
                <p style="color: #ef4444;">Erreur de connexion au vortex temporel.</p>
                <button class="btn-primary" onclick="startQuiz()">Réessayer</button>
            `;
        }
    }
}
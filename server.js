const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const MISTRAL_API_KEY = "tfGgAbSm4ZFMUBzFqPp6ZWhmah3WTCGL";

const SYSTEM_PROMPT = `Tu es Chronos, l'IA d'assistance de la "TimeTravel Agency".
Ton rôle est d'accueillir les voyageurs temporels et de les conseiller parmi nos 3 destinations uniques :
1. Paris 1889 (La Belle Époque, Exposition Universelle, Tour Eiffel)
2. Le Crétacé (Il y a 66 millions d'années, nature sauvage, dinosaures)
3. Florence 1504 (Renaissance italienne, art, rencontre avec Léonard de Vinci)

Ton ton doit être élégant, futuriste et mystérieux. Tu parles avec vouvoiement. 
Fais des réponses concises et immersives (2 ou 3 phrases maximum).`;

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    try {
        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MISTRAL_API_KEY}`
            },
            body: JSON.stringify({
                model: "mistral-small-latest",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: userMessage }
                ]
            })
        });
        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
            res.json({ reply: data.choices[0].message.content });
        } else {
            res.status(500).json({ error: "L'IA n'a pas répondu." });
        }
    } catch (error) {
        console.error("Erreur avec Mistral:", error);
        res.status(500).json({ error: "Erreur de connexion temporelle." });
    }
});

app.post('/api/quiz', async (req, res) => {
    const { answers } = req.body;
    const QUIZ_PROMPT = `Tu es l'IA experte de la TimeTravel Agency. Un voyageur vient de terminer son test de personnalité.
    Voici ses choix :
    1. Expérience : ${answers[0]}
    2. Période : ${answers[1]}
    3. Préférence : ${answers[2]}
    4. Activité : ${answers[3]}

    Analyse ces réponses et choisis LA destination la plus adaptée parmi UNIQUEMENT ces trois choix :
    - Paris 1889
    - Le Crétacé
    - Florence 1504

    Rédige un message enthousiaste et immersif (3 phrases maximum). Annonce la destination recommandée en justifiant pourquoi elle correspond parfaitement à son profil selon ses choix. Formate la destination en gras.`;

    try {
        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MISTRAL_API_KEY}`
            },
            body: JSON.stringify({
                model: "mistral-small-latest",
                messages: [{ role: "user", content: QUIZ_PROMPT }]
            })
        });
        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
            res.json({ reply: data.choices[0].message.content });
        } else {
            res.status(500).json({ error: "L'oracle temporel n'a pas pu déterminer votre destination." });
        }
    } catch (error) {
        res.status(500).json({ error: "Interférence réseau temporelle." });
    }
});

// Route par défaut (Accueil)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Nouvelle route pour la page des destinations
app.get('/destinations', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'destinations.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé ! Navigue sur http://localhost:${PORT}`);
});
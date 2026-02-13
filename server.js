const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// On indique à Express de servir les fichiers statiques (html, css, js, images)
// qui se trouvent dans le dossier "public"
app.use(express.static(path.join(__dirname, 'public')));

// Route principale : envoie l'index.html quand on arrive sur la racine
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`
    🚀 Serveur de la TimeTravel Agency lancé !
    🌍 Disponible à l'adresse : http://localhost:${PORT}
    ⏳ En attente de voyageurs temporels...
    `);
});
🌀 TimeTravel Agency — WebApp Interactive
Bienvenue sur le dépôt de la TimeTravel Agency, une application web immersive qui permet aux utilisateurs d'explorer des époques passées et de découvrir leur destination temporelle idéale grâce à l'intelligence artificielle.

🚀 Aperçu du Projet
Ce projet combine une interface moderne (Glassmorphism, animations au scroll) avec la puissance de l'IA Mistral AI pour offrir une expérience utilisateur unique.

Front-end : HTML5, CSS3 (Variables, Flexbox, Grid), JavaScript (Lucide Icons, Intersection Observer).

Back-end : Node.js, Express.

IA : API Mistral (Modèle mistral-small-latest).

Déploiement : Prêt pour Render (gestion des variables d'environnement).

🤖 L'Intelligence Artificielle (Chronos)
L'âme de ce site repose sur Chronos, une IA intégrée via deux fonctionnalités majeures : le Chatbot et le Quiz de compatibilité.

1. Le Système de Chat (Prompt Engineering)
Pour donner une personnalité cohérente à l'IA, nous avons utilisé un System Prompt rigoureux qui définit son ton et ses limites :

Prompt utilisé :
"Tu es Chronos, l'IA d'assistance de la 'TimeTravel Agency'. Ton rôle est d'accueillir les voyageurs temporels et de les conseiller parmi nos 3 destinations uniques (Paris 1889, Le Crétacé, Florence 1504). Ton ton doit être élégant, futuriste et mystérieux. Tu parles avec vouvoiement. Fais des réponses concises et immersives (2 ou 3 phrases maximum)."

2. L'Analyseur de Signature Temporelle (Quiz)
Le quiz ne se contente pas de compter des points ; il envoie les choix de l'utilisateur à l'IA pour une recommandation personnalisée.

Prompt de traitement :
"Tu es l'IA experte de la TimeTravel Agency. Un voyageur vient de terminer son test de personnalité. [...] Analyse ces réponses et choisis LA destination la plus adaptée. Rédige un message enthousiaste et immersif (3 phrases maximum). Annonce la destination recommandée en gras."

🛠️ Installation et Configuration
Prérequis
Node.js installé.

Une clé API Mistral.

Installation Locale
Clonez le dépôt :

Bash

git clone https://github.com/votre-username/webapp-interactive.git
cd webapp-interactive
Installez les dépendances :

Bash

npm install
Configurez votre clé API (en local, créez un fichier .env ou remplacez temporairement la variable dans server.js) :

JavaScript

const MISTRAL_API_KEY = "VOTRE_CLE_ICI";
Lancez le serveur :

Bash

node server.js
Ouvrez http://localhost:3000.

🎨 Design & Fonctionnalités
Design Futuriste : Utilisation d'un thème sombre avec des accents "Cyan" et des effets de flou (backdrop-filter).

Expérience Fluide : Les cartes de destinations apparaissent progressivement grâce à l'API IntersectionObserver de JavaScript.

Responsive : Le site est adapté aux mobiles grâce aux Media Queries.

Vidéo Immersive : Un trailer vidéo est disponible via une modale interactive.

📦 Déploiement sur Render
Pour déployer ce projet :

Liez votre repo GitHub à Render.com.

Choisissez l'environnement Node.

Dans l'onglet Environment, ajoutez la variable :

MISTRAL_API_KEY : votre_clé_mistral

Render lancera automatiquement npm install et node server.js.

Voici l'URL de notre Web App : "https://webapp-interactive.onrender.com"


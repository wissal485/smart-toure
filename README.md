# Smart Toure

Smart Toure est une plateforme web visant à promouvoir le tourisme intérieur en Tunisie à travers une solution numérique permettant aux utilisateurs de :

- Découvrir des circuits touristiques locaux
- Réserver directement avec un guide
- Communiquer en temps réel avec le prestataire
- Effectuer des paiements en ligne

## 🛠️ Technologies utilisées

### Frontend :
- [Next.js](https://nextjs.org/)
- React
- Tailwind CSS (ou Bootstrap selon l’usage)

### Backend :
- [Symfony](https://symfony.com/)
- API Platform
- Doctrine ORM
- MySQL

## 📁 Structure du projet

### Backend (Symfony)
- `src/Entity/` : Entités du projet (Guide, Tour, Touriste, Reservation, Paiement, Message, Utilisateur)
- `src/Controller/` : Contrôleurs pour l’API
- `config/routes.yaml` : Définition des routes
- `migrations/` : Scripts de migration de la base de données

### Frontend (Next.js)
- `pages/index.tsx` : Page d’accueil affichant toutes les villes disponibles
- `pages/[ville].tsx` : Page dynamique pour chaque ville
- `components/` : Composants de l’interface utilisateur (Card, Header, ChatBox, etc.)
- `services/` : Gestion des appels API (GET/POST...)

## ⚙️ Lancer le projet

### Backend
```bash
cd backend/
composer install
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
symfony server:start

### Frontend :

cd frontend/
npm install
npm run dev

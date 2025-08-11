# Instructions pour héberger sur NameCheap

## Étapes simples :

### 1. Connecter à GitHub (OBLIGATOIRE)
- Cliquez sur le bouton "GitHub" en haut à droite de Lovable
- Cliquez "Connect to GitHub" 
- Autorisez l'application
- Cliquez "Create Repository"

### 2. Télécharger les fichiers du site
Une fois connecté à GitHub :
- Allez sur votre repository GitHub
- Cliquez sur "Code" puis "Download ZIP"
- Extrayez le fichier ZIP sur votre ordinateur

### 3. Construire le site
Dans le dossier extrait :
- Ouvrez un terminal/invite de commande
- Tapez : `npm install`
- Puis : `npm run build`
- Un dossier `dist` sera créé avec votre site web

### 4. Uploader sur NameCheap
- Connectez-vous à votre cPanel NameCheap
- Allez dans "File Manager"
- Supprimez tout dans le dossier `public_html`
- Uploadez TOUT le contenu du dossier `dist` dans `public_html`

Votre site sera en ligne à votre domaine NameCheap !

## Alternative plus simple (recommandée)
Utilisez Netlify ou Vercel à la place - ils se connectent directement à GitHub et font tout automatiquement.
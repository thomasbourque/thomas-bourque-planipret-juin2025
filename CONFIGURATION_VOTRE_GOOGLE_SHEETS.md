# Configuration de votre Google Sheets
## ID de votre feuille: 1WbjvDjAngmG1AivGphr9OHr7EN12ustW9gVBnyKrVAc

## Instructions étape par étape

### Étape 1: Préparer votre Google Sheets
1. Ouvrez votre Google Sheets: https://docs.google.com/spreadsheets/d/1WbjvDjAngmG1AivGphr9OHr7EN12ustW9gVBnyKrVAc/edit
2. Créez les en-têtes suivantes dans la **première ligne** (A1 à S1):

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 | I1 | J1 | K1 | L1 | M1 | N1 | O1 | P1 | Q1 | R1 | S1 |
|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----| 
| Timestamp | Nom | Email | Telephone | Meilleur_Moment | Solde_Actuel | Valeur_Maison | Date_Echeance | Amortissement_Annees | Amortissement_Mois | Taux_Actuel | Nouveau_Taux | Montant_Refinancement | Economies_Terme | Paiement_Actuel | Nouveau_Paiement | Benefice_Net | Annees_Economisees | Source_URL |

### Étape 2: Créer le Google Apps Script
1. Dans votre Google Sheets, cliquez sur **Extensions** → **Apps Script**
2. Supprimez tout le code par défaut
3. Copiez-collez exactement ce code:

```javascript
function doPost(e) {
  try {
    // Parse les données JSON
    const data = JSON.parse(e.postData.contents);
    
    // Obtenir la feuille active (utilisez le nom de votre onglet)
    const sheet = SpreadsheetApp.openById('1WbjvDjAngmG1AivGphr9OHr7EN12ustW9gVBnyKrVAc').getActiveSheet();
    
    // Préparer les données à insérer
    const row = [
      data.timestamp,
      data.contact.nom,
      data.contact.email,
      data.contact.telephone,
      data.contact.meilleurMoment,
      data.calculateur.soldeActuel,
      data.calculateur.valeurMaison,
      data.calculateur.dateEcheance,
      data.calculateur.amortissementAnnees,
      data.calculateur.amortissementMois,
      data.calculateur.tauxActuel,
      data.calculateur.nouveauTaux,
      data.calculateur.montantRefinancement,
      data.calculateur.economiesTerme,
      data.calculateur.paiementActuel,
      data.calculateur.nouveauPaiement,
      data.calculateur.beneficeNet,
      data.calculateur.anneesEconomisees,
      data.sourceUrl
    ];
    
    // Ajouter la ligne à la feuille
    sheet.appendRow(row);
    
    // Retourner une réponse de succès
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Données ajoutées avec succès'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log l'erreur
    console.error('Erreur:', error);
    
    // Retourner une réponse d'erreur
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({message: 'API Google Apps Script active'}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Sauvegardez le script (Ctrl+S)
5. Nommez votre projet: "Formulaire Refinancement API"

### Étape 3: Déployer le script
1. Cliquez sur **Déployer** → **Nouveau déploiement**
2. Cliquez sur l'icône d'engrenage à côté de "Type"
3. Sélectionnez **Application Web**
4. Configurez:
   - **Description**: "API Formulaire Refinancement"
   - **Exécuter en tant que**: **Moi**
   - **Qui a accès**: **Tout le monde**
5. Cliquez sur **Déployer**
6. **Autorisez les permissions** (cliquez "Autoriser" si demandé)
7. **COPIEZ l'URL du déploiement** qui ressemble à:
   `https://script.google.com/macros/s/AKfyc[...]/exec`

### Étape 4: Me donner l'URL
**IMPORTANT**: Une fois que vous avez l'URL de déploiement, donnez-la moi et je configurerai automatiquement votre formulaire pour envoyer les données vers votre Google Sheets.

L'URL ressemble à ceci:
`https://script.google.com/macros/s/AKfyc[LONGUE_CHAINE_DE_CARACTERES]/exec`

## Après configuration
✅ Chaque soumission du formulaire apparaîtra automatiquement dans votre Google Sheets
✅ Les données seront organisées dans les colonnes que vous avez créées
✅ Vous recevrez une notification de succès quand le formulaire est envoyé

## Besoin d'aide?
Si vous avez des problèmes, envoyez-moi:
1. L'URL de déploiement de votre Google Apps Script
2. Une capture d'écran de votre Google Sheets avec les en-têtes
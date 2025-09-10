# Configuration Google Sheets - Solution 100% Gratuite

## Étape 1: Créer une Google Sheet

1. Allez sur [Google Sheets](https://sheets.google.com)
2. Créez une nouvelle feuille de calcul
3. Nommez la première feuille "Formulaires Refinancement"
4. Créez les en-têtes suivantes dans la première ligne :
   - A1: `Timestamp`
   - B1: `Nom`
   - C1: `Email`
   - D1: `Telephone`
   - E1: `Meilleur Moment`
   - F1: `Solde Actuel`
   - G1: `Valeur Maison`
   - H1: `Date Echeance`
   - I1: `Amortissement Annees`
   - J1: `Amortissement Mois`
   - K1: `Taux Actuel`
   - L1: `Nouveau Taux`
   - M1: `Montant Refinancement`
   - N1: `Economies Terme`
   - O1: `Paiement Actuel`
   - P1: `Nouveau Paiement`
   - Q1: `Benefice Net`
   - R1: `Annees Economisees`
   - S1: `Source URL`

## Étape 2: Créer le Google Apps Script

1. Dans votre Google Sheet, cliquez sur `Extensions` > `Apps Script`
2. Supprimez le code par défaut et copiez-collez ce code :

```javascript
function doPost(e) {
  try {
    // Parse les données JSON
    const data = JSON.parse(e.postData.contents);
    
    // Obtenir la feuille active
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Formulaires Refinancement');
    
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
      .createTextOutput(JSON.stringify({success: true}))
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
```

3. Sauvegardez le script (Ctrl+S ou Cmd+S)
4. Nommez votre projet (ex: "Formulaire Refinancement")

## Étape 3: Déployer le script

1. Cliquez sur `Déployer` > `Nouveau déploiement`
2. Cliquez sur l'icône d'engrenage à côté de "Type" et sélectionnez `Application Web`
3. Configurez :
   - **Description**: "API Formulaire Refinancement"
   - **Exécuter en tant que**: Moi
   - **Qui a accès**: Tout le monde
4. Cliquez sur `Déployer`
5. Autorisez les permissions si demandé
6. **COPIEZ L'URL du déploiement** - elle ressemble à : `https://script.google.com/macros/s/VOTRE_SCRIPT_ID/exec`

## Étape 4: Configurer dans votre application

1. Dans le fichier `src/components/RefinancingCalculatorSteps.tsx`
2. Remplacez la ligne 34 :
   ```javascript
   const webhookUrl = 'https://script.google.com/macros/s/VOTRE_SCRIPT_ID/exec';
   ```
3. Remplacez `VOTRE_SCRIPT_ID` par l'ID de votre script

## Test

1. Remplissez le formulaire sur votre site
2. Vérifiez que les données apparaissent dans votre Google Sheet
3. Si ça ne fonctionne pas, vérifiez les logs dans Google Apps Script

## Avantages de cette solution

✅ **100% Gratuite** - Pas de limite de quota pour un usage normal
✅ **Directement dans Google Sheets** - Pas d'intermédiaire 
✅ **Sécurisé** - Contrôlé par votre compte Google
✅ **Fiable** - Infrastructure Google
✅ **Personnalisable** - Vous pouvez modifier le script selon vos besoins

## Notes importantes

- Les données sont stockées dans votre Google Drive
- Vous pouvez partager la feuille avec d'autres personnes si nécessaire
- Le script peut être modifié pour envoyer des emails automatiques, etc.
- Aucune limite de stockage pour un usage personnel/professionnel normal
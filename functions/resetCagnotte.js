const fs = require('fs');
const path = require('path');

const resetCodeValid = "1234"; // Code de réinitialisation valide

exports.handler = async (event, context) => {
  try {
    const { code } = JSON.parse(event.body);

    if (code === resetCodeValid) {
      // Lire le fichier JSON pour obtenir le montant actuel de la cagnotte
      const filePath = path.resolve(__dirname, 'cagnotte.json');
      const cagnotteData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      // Réinitialiser la cagnotte
      cagnotteData.amount = 0;

      // Écrire le nouveau montant dans le fichier JSON
      fs.writeFileSync(filePath, JSON.stringify(cagnotteData, null, 2));

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, amount: cagnotteData.amount }),
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ success: false }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erreur lors de la réinitialisation de la cagnotte' }),
    };
  }
};

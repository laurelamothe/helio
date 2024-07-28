const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    // Lire le fichier JSON pour obtenir le montant actuel de la cagnotte
    const filePath = path.resolve(__dirname, 'cagnotte.json');
    const cagnotteData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    return {
      statusCode: 200,
      body: JSON.stringify({ amount: cagnotteData.amount }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erreur lors de la récupération de la cagnotte' }),
    };
  }
};

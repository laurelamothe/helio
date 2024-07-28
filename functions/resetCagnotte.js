// functions/resetCagnotte.js

const resetCodeValid = "1234"; // Code de réinitialisation valide
let cagnotte = 0; // Cagnotte stockée en mémoire

exports.handler = async (event, context) => {
  try {
    const { code } = JSON.parse(event.body);
    if (code === resetCodeValid) {
      cagnotte = 0; // Réinitialiser la cagnotte
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, amount: cagnotte }),
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

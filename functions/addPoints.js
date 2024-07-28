// functions/addPoints.js

let cagnotte = 0; // Cagnotte stockée en mémoire

exports.handler = async (event, context) => {
  try {
    const { points } = JSON.parse(event.body);
    cagnotte += points; // Ajouter les points à la cagnotte
    return {
      statusCode: 200,
      body: JSON.stringify({ amount: cagnotte }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erreur lors de l’ajout des points' }),
    };
  }
};

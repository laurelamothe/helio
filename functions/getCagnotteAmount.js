// functions/getCagnotteAmount.js

let cagnotte = 0; // Cagnotte stockée en mémoire

exports.handler = async (event, context) => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({ amount: cagnotte }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erreur lors de la récupération de la cagnotte' }),
    };
  }
};

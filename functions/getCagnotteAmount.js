const db = require('./firebase');

exports.handler = async (event, context) => {
  try {
    const cagnotteRef = db.collection('cagnotte').doc('amount');
    const doc = await cagnotteRef.get();

    if (!doc.exists) {
      // Initialiser le montant si le document n'existe pas
      await cagnotteRef.set({ amount: 0 });
      return {
        statusCode: 200,
        body: JSON.stringify({ amount: 0 }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ amount: doc.data().amount }),
    };
  } catch (error) {
    console.error('Erreur lors de la récupération de la cagnotte:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erreur lors de la récupération de la cagnotte' }),
    };
  }
};

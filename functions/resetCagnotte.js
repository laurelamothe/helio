const db = require('./firebase');

const resetCodeValid = "1234"; // Code de réinitialisation valide

exports.handler = async (event, context) => {
  try {
    const { code } = JSON.parse(event.body);

    if (code === resetCodeValid) {
      const cagnotteRef = db.collection('cagnotte').doc('amount');
      const doc = await cagnotteRef.get();

      if (!doc.exists) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'Cagnotte non trouvée' }),
        };
      }

      // Réinitialiser la cagnotte
      await cagnotteRef.set({ amount: 0 });

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, amount: 0 }),
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ success: false }),
      };
    }
  } catch (error) {
    console.error("Erreur lors de la réinitialisation:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur lors de la réinitialisation de la cagnotte" }),
    };
  }
};

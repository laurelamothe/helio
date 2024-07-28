const admin = require("firebase-admin");
const db = require("./firebase");

exports.handler = async (event, context) => {
  try {
    // Assurez-vous que la requête est une requête POST
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method Not Allowed" }),
      };
    }

    const cagnotteRef = db.collection("cagnotte").doc("amount");
    const doc = await cagnotteRef.get();

    if (!doc.exists) {
      // Initialiser le montant si le document n'existe pas
      await cagnotteRef.set({ amount: 0 });
    }

    // Ajouter des points (par exemple, 10)
    const points = 10;
    await cagnotteRef.update({
      amount: admin.firestore.FieldValue.increment(points),
    });

    const updatedDoc = await cagnotteRef.get();
    return {
      statusCode: 200,
      body: JSON.stringify({ amount: updatedDoc.data().amount }),
    };
  } catch (error) {
    console.error("Erreur lors de l'ajout de points:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Erreur lors de l'ajout de points à la cagnotte",
      }),
    };
  }
};

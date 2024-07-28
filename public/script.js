document.addEventListener("DOMContentLoaded", () => {
    const countdownElement = document.getElementById("countdown");
    const cagnotteAmountElement = document.getElementById("cagnotteAmount");
    const addPointsButton = document.getElementById("addPointsButton");
    const resetButton = document.getElementById("resetButton");
    const resetCodeInput = document.getElementById("resetCode");

    // Date de fin du compte à rebours
    const countdownDate = new Date("July 29, 2024 00:00:00").getTime();

    // Mettre à jour le compte à rebours chaque seconde
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}j ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = "Le compte à rebours est terminé!";
        }
    }, 1000);

    // Récupérer le montant initial de la cagnotte
    const getCagnotteAmount = async () => {
        try {
            const response = await fetch("/.netlify/functions/getCagnotteAmount");
            if (!response.ok) throw new Error('Erreur de récupération');
            const data = await response.json();
            cagnotteAmountElement.textContent = data.amount;
        } catch (error) {
            console.error("Erreur lors de la récupération du montant de la cagnotte:", error);
        }
    };

    // Ajouter des points à la cagnotte
    addPointsButton.addEventListener("click", async () => {
        try {
            const response = await fetch("/.netlify/functions/addPoints", {
                method: "POST",
            });
            if (!response.ok) throw new Error("Erreur d'ajout de points");
            const data = await response.json();
            cagnotteAmountElement.textContent = data.amount;
        } catch (error) {
            console.error("Erreur lors de l'ajout de points:", error);
        }
    });

    // Réinitialiser la cagnotte
    resetButton.addEventListener("click", async () => {
        const resetCode = resetCodeInput.value;
        try {
            const response = await fetch("/.netlify/functions/resetCagnotte", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: resetCode }),
            });
            if (!response.ok) throw new Error("Erreur de réinitialisation");
            const data = await response.json();
            if (data.success) {
                cagnotteAmountElement.textContent = data.amount;
                alert("Cagnotte réinitialisée avec succès!");
            } else {
                alert("Code de réinitialisation incorrect!");
            }
        } catch (error) {
            console.error("Erreur lors de la réinitialisation:", error);
        }
    });

    // Charger le montant initial lors du chargement de la page
    getCagnotteAmount();
});

document.addEventListener("DOMContentLoaded", function () {
    const cagnotteAmountElement = document.getElementById("cagnotte-amount");
    const addPointsButton = document.getElementById("add-points-button");
    const resetButton = document.getElementById("reset-button");
    const resetCodeInput = document.getElementById("reset-code");
    const countdownElement = document.getElementById("countdown");
  
    // Fonction pour mettre à jour le compte à rebours
    function updateCountdown() {
      const targetDate = new Date("July 29, 2024 00:00:00").getTime();
      const now = new Date().getTime();
      const distance = targetDate - now;
  
      if (distance < 0) {
        countdownElement.textContent = "Le compte à rebours est terminé!";
        return;
      }
  
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      countdownElement.textContent = `${days}j ${hours}h ${minutes}m ${seconds}s`;
    }
  
    // Mettre à jour le compte à rebours chaque seconde
    setInterval(updateCountdown, 1000);
  
    // Fonction pour obtenir le montant actuel de la cagnotte
    async function getCagnotteAmount() {
      try {
        const response = await fetch("/.netlify/functions/getCagnotteAmount");
        if (!response.ok) throw new Error("Erreur lors de la récupération du montant de la cagnotte");
        const data = await response.json();
        cagnotteAmountElement.textContent = data.amount;
      } catch (error) {
        console.error("Erreur lors de la récupération du montant de la cagnotte:", error);
      }
    }
  
    // Fonction pour ajouter des points à la cagnotte
    addPointsButton.addEventListener("click", async function () {
      try {
        const response = await fetch("/.netlify/functions/addPoints", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Erreur lors de l'ajout des points");
        const data = await response.json();
        cagnotteAmountElement.textContent = data.amount;
      } catch (error) {
        console.error("Erreur lors de l'ajout des points:", error);
      }
    });
  
    // Fonction pour réinitialiser la cagnotte
    resetButton.addEventListener("click", async function () {
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
    updateCountdown(); // Initialiser le compte à rebours immédiatement
  });
  
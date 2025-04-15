/* 
    Auteur: Léonard Wicki
    Date: 29.3.2025
    Description: Service pour la gestion des livres.
*/

// Importation de la classe pour la contrôleur IndexCtrl.

// Attendre le chargement du DOM. Ce code est exécuté après le chargement de la page.
document.addEventListener("DOMContentLoaded", () => {
  // Création d'une instance de la classe IndexCtrl.

  const toggleBtn = document.getElementById("toggle-btn");
  const sidebar = document.getElementById("sidebar");

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
      toggleBtn.classList.toggle("collapsed");
    });
  }
});

/* 
    Auteur: Philppe Galley
    Date: 10.03.2025
    Description: script principal de l'application.
*/

// Importation de la classe pour la contrôleur IndexCtrl.
import { IndexCtrl } from "./ctrl/indexCtrl.js";

// Attendre le chargement du DOM. Ce code est exécuté après le chargement de la page.
document.addEventListener("DOMContentLoaded", () => {
	// Création d'une instance de la classe IndexCtrl.
	let indexCtrl = new IndexCtrl();
});

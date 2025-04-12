/* 
    Auteur: Léonard Wicki
    Date: 29.3.2025
    Description: Service pour la gestion des livres.
*/

// Importation des services.
import { IndexService } from "../wrk/indexService.js";

/**
 * Contrôleur de la page index.html
 *
 * Permets de gérer les actions de la page index.html et
 * de communiquer avec le service IndexService.
 */
export class IndexCtrl {
  // Attributs.
  #service;

  /**
   * Constructeur du contrôleur.
   */
  constructor() {
    // Initialisation du service.
    this.#service = new IndexService();
    this.initializeData();
    document
      .querySelector("#submit-btn")
      .addEventListener("click", () => this.ajouterLivre());
  }

  /**
   * Méthode pour initialiser les données.
   */
  initializeData() {
    // Récupération des données depuis le service.
    this.#service
      .fetchAllData()
      .then((data) => {
        this.afficherResultat(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  showAlert(message, error) {
    const alertModal = document.getElementById("alert-modal");
    const errorMessage = document.getElementById("alert-error-message");
    const alertMessage = document.getElementById("alert-message");
    alertMessage.textContent = message;
    errorMessage.textContent = error ? error.message : "";
    alertModal.classList.add("active");

    // Fermeture de la popup lors du clic sur "Ok"
    document.getElementById("alert-ok-btn").onclick = () => {
      alertModal.classList.remove("active");
    };
  }
  /**
   * Méthode privée pour ajouter un livre à partir du formulaire
   */
  async ajouterLivre() {
    // Récupération des valeurs du formulaire
    const titre = document.querySelector("#titre").value;
    const auteur = document.querySelector("#auteur").value;
    const date = document.querySelector("#date").value;
    const genre = document.querySelector("#genre").value;

    // Validation des données
    if (!titre || !auteur || !date || !genre) {
      const error = "Tous les champs sont obligatoires !";
      this.showAlert("Tous les champs sont obligatoires !", error);
      return;
    }

    // Conversion de la date en timestamp (secondes)
    const dateObj = new Date(date);
    const timestamp = Math.floor(dateObj.getTime() / 1000);

    try {
      // Appel au service asynchrone pour ajouter le livre
      await this.#service.ajouterLivre(titre, auteur, timestamp, genre);

      // Réinitialisation du formulaire et rafraîchissement des données
      document.querySelector("#titre").value = "";
      document.querySelector("#auteur").value = "";
      document.querySelector("#date").value = "";
      document.querySelector("#genre").value = "";

      this.initializeData();
    } catch (error) {
      console.error("Erreur lors de l'ajout du livre :", error);
      this.showAlert(
        "Une erreur est survenue lors de l'ajout du livre.",
        error
      );
    }
  }

  /**
   * Méthode pour afficher les résultats dans le tableau
   */
  afficherResultat(data) {
    const tbody = document.querySelector("#books tbody");
    tbody.innerHTML = "";

    data.forEach((livre) => {
      // Convertir le timestamp en date lisible
      const date = new Date(livre.date * 1000);
      const dateFormatted = date.toLocaleDateString();

      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td>${livre.titre}</td>
      <td>${livre.auteur}</td>
      <td>${dateFormatted}</td>
      <td>${livre.genre}</td>
	  <td class="edit-cell">
		<button class="edit-btn" data-id="${livre.id}"><i class="fi fi-br-pencil edit-icon"></i></button>
	  </td>
      <td class="delete-cell">
        <button class="delete-btn" data-id="${livre.id}"><i class="fi fi-br-trash delete-icon"></i></button>
      </td>
    `;

      tbody.appendChild(tr);

      // Ajouter les écouteurs d'événements pour les boutons de modification
      document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = e.currentTarget.getAttribute("data-id");
          this.handleEditClick(id);
        });
      });

      // Ajouter les écouteurs d'événements pour les boutons de suppression
      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = e.currentTarget.getAttribute("data-id");
          this.handleDeleteClick(id);
        });
      });
    });
  }
  /**
   * Méthode pour modifier un livre
   */
  async modifierLivre(id) {
    // Récupération des valeurs du formulaire
    const titre = document.querySelector("#edit-titre").value;
    const auteur = document.querySelector("#edit-auteur").value;
    const date = document.querySelector("#edit-date").value;
    const genre = document.querySelector("#edit-genre").value;
    // Validation des données
    if (!titre || !auteur || !date || !genre) {
      this.showAlert("Tous les champs sont obligatoires !", null);
      return;
    }
    // Conversion de la date en timestamp (secondes)
    const dateObj = new Date(date);
    const timestamp = Math.floor(dateObj.getTime() / 1000);
    // Appel au service asynchrone pour modifier le livre
    try {
      await this.#service.modifierLivre(id, titre, auteur, timestamp, genre);
      // Réinitialisation du formulaire et rafraîchissement des données
      document.querySelector("#titre").value = "";
      document.querySelector("#auteur").value = "";
      document.querySelector("#date").value = "";
      document.querySelector("#genre").value = "";

      this.initializeData();
    } catch (error) {
      console.error("Erreur lors de la modification du livre :", error);
      this.showAlert(
        "Une erreur est survenue lors de la modification du livre.",
        error
      );
    }
  }

  /**
   * Méthode pour supprimer un livre
   */
  async supprimerLivre(id) {
    try {
      await this.#service.supprimerLivre(id);
      // Rafraîchir la liste des livres après suppression
      this.initializeData();
    } catch (error) {
      console.error("Erreur lors de la suppression du livre:", error);
    }
  }

  /**
   * Méthode pour gérer la suppression d'un livre
   * @param {string} id - L'identifiant du livre à supprimer
   */
  handleDeleteClick(id) {
    // Stocker l'ID du livre à supprimer
    this.livreASupprimer = id;

    // Afficher la popup de confirmation
    const modal = document.getElementById("delete-modal");
    modal.classList.add("active");

    // Gérer les événements des boutons
    document.getElementById("cancel-delete").onclick = () => {
      modal.classList.remove("active");
    };

    document.getElementById("confirm-delete").onclick = () => {
      this.supprimerLivre(this.livreASupprimer);
      modal.classList.remove("active");
    };
  }
  /**
   * Méthode pour gérer la modification d'un livre
   * @param {string} id - L'identifiant du livre à modifier
   */
  async handleEditClick(id) {
    // Récupération des valeurs actuelles du livre
    const livre = await this.#service.getLivreById(id);
    document.querySelector("#edit-titre").value = livre.titre;
    document.querySelector("#edit-auteur").value = livre.auteur;
    document.querySelector("#edit-date").value = new Date(livre.date * 1000)
      .toISOString()
      .split("T")[0];
    document.querySelector("#edit-genre").value = livre.genre;

    // Stocker l'ID du livre à modifier
    this.livreAModifier = id;
    // Afficher la popup de modification
    const modal = document.getElementById("edit-modal");
    modal.classList.add("active");
    // Gérer les événements des boutons
    document.getElementById("cancel-edit").onclick = () => {
      modal.classList.remove("active");
    };
    document.getElementById("confirm-edit").onclick = () => {
      this.modifierLivre(this.livreAModifier);
      modal.classList.remove("active");
    };
  }
}

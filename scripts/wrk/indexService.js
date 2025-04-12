/* 
    Auteur: Léonard Wicki
    Date: 29.3.2025
    Description: Service pour la gestion des livres.
*/

// Importation des variables de configuration de l'API.
// C'est dans ce fichier que se trouve l'URL de base de l'API.
import { API_ENDPOINT } from "../config/config.js";

/**
 * Service pour la gestion des livres.
 */
export class IndexService {
  /**
   * Méthode pour récupérer les livres via Fetch avec les méthodes then/catch.
   * @returns {Promise} Une promesse avec les données des livres.
   */

  async fetchAllData() {
    try {
      const response = await fetch(API_ENDPOINT + "livres");

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      throw error;
    }
  }

  async ajouterLivre(titre, auteur, date, genre) {
    const livre = { titre, auteur, date, genre };

    try {
      const response = await fetch(API_ENDPOINT + "livres", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(livre),
      });

      // Vérification du succès de la réponse
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Corps de la réponse:", errorText);
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de l'ajout du livre:", error);
      throw error;
    }
  }

  /**
   * Méthode pour supprimer un livre
   * @param {string} id - L'identifiant du livre à supprimer
   * @returns {Promise} - Une promesse qui résout si la suppression est réussie
   */
  async supprimerLivre(id) {
    try {
      const response = await fetch(`${API_ENDPOINT}livres/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la suppression du livre:", error);
      throw error;
    }
  }

  async getLivreById(id) {
    try {
      const response = await fetch(`${API_ENDPOINT}livres/${id}`);

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération du livre:", error);
      throw error;
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
   * Méthode pour modifier un livre
   * @param {string} id - L'identifiant du livre à modifier
   * @param {Object} livre - Les nouvelles données du livre
   * @returns {Promise} - Une promesse qui résout si la modification est réussie
   */
  async modifierLivre(id, titre, auteur, timestamp, genre) {
    const livre = { titre, auteur, timestamp, genre };
    try {
      const response = await fetch(`${API_ENDPOINT}livres/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(livre),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la modification du livre:", error);
      throw error;
    }
  }
}

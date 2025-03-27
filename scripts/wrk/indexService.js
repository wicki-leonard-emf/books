/* 
    Auteur: Philppe Galley
    Date: 10.03.2025
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
    getbooks() {
        return fetch(API_ENDPOINT + "livres")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                return data;
            })
            .catch((error) => {
                console.error(error);
                throw error;
            });
    }

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
        console.log("Livre à ajouter:", JSON.stringify(livre));
        
        try {
            const response = await fetch(API_ENDPOINT + "livres", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(livre)
            });
            
            // Vérification du succès de la réponse
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Corps de la réponse:", errorText);
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const data = await response.json();
            console.log("Livre ajouté:", data);
            return data;
        } catch (error) {
            console.error("Erreur lors de l'ajout du livre:", error);
            throw error;
        }
    }
    
}    

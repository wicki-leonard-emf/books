/* 
    Auteur: Philppe Galley
    Date: 10.03.2025
    Description: Contrôleur de la page index.html
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
		document.querySelector("#submit-btn").addEventListener("click", () => this.ajouterLivre());
		
	}

	/**
	 * Méthode pour initialiser les données.
	 */
	initializeData() {
		// Récupération des données depuis le service.
		this.#service.fetchAllData()
			.then((data) => {
				this.afficherResultat(data);
			})
			.catch((error) => {
				console.error(error);
			});
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
			alert("Tous les champs sont obligatoires !");
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
			
			// Message de confirmation
			alert("Le livre a été ajouté avec succès !");
		} catch (error) {
			console.error("Erreur lors de l'ajout du livre :", error);
			alert("Une erreur est survenue lors de l'ajout du livre.");
		}
	}
	async supprimerLivre(id) {
		try {
			await this.#service.supprimerLivre(id);  // Méthode à implémenter dans IndexService
			this.initializeData();
			alert("Livre supprimé avec succès.");
		} catch (error) {
			console.error("Erreur lors de la suppression du livre :", error);
			alert("Une erreur est survenue lors de la suppression du livre.");
		}
	}	
	
	
	
	afficherResultat(data) {
		const tbody = document.querySelector("#books tbody");
		tbody.innerHTML = "";
	
		data.forEach((book) => {
			const tr = document.createElement("tr");
	
			const titre = document.createElement("td");
			titre.innerText = book.titre;
	
			const auteur = document.createElement("td");
			auteur.innerText = book.auteur;
	
			const date = document.createElement("td");
			const dateObj = new Date(book.date * 1000);
			date.textContent = dateObj.toLocaleDateString('fr-FR');
	
			const genre = document.createElement("td");
			genre.innerText = book.genre;
	
			// Création correcte du bouton suppression
			const deleteBtnTd = document.createElement("td");
			const deleteBtn = document.createElement("button");
			deleteBtn.classList.add("delete-btn");
			deleteBtn.innerHTML = `
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
					<path d="M3 6h18v2H3z"/>
					<path d="M8 9h2v9H8zM14 9h2v9h-2z"/>
					<path d="M5 6l1 14h12l1-14"/>
					<path d="M9 4h6v2H9z"/>
				</svg>`;
			
			deleteBtn.addEventListener("click", () => {
				this.supprimerLivre(book.id);
			});
			
			deleteBtnTd.appendChild(deleteBtn);
	
			tr.appendChild(titre);
			tr.appendChild(auteur);
			tr.appendChild(date);
			tr.appendChild(genre);
			tr.appendChild(deleteBtnTd);
	
			tbody.appendChild(tr);
		});
	}
	

}

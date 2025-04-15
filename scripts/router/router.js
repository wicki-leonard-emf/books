import { BibliothequeCtrl } from "../ctrl/bibliothequeCtrl.js";

const routes = {
  '/accueil': 'pages/accueil.html',
  '/bibliotheque': 'pages/bibliotheque.html',
  '/details': 'pages/details.html',
  '/statistiques': 'pages/statistiques.html',
  '/contact': 'pages/contact.html'
};

function loadPage(path) {
  const pageUrl = routes[path] || routes['/accueil'];
  fetch(pageUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors du chargement de la page : ' + pageUrl);
      }
      return response.text();
    })
    .then(html => {
      document.getElementById('content').innerHTML = html;
      // Initialiser les contrôleurs spécifiques à la page
      if (pageUrl.includes('bibliotheque.html')) {
        new BibliothequeCtrl();
      }
      // Pour la page détails, appeler l'initialisation du markdown
      if (pageUrl.includes('details.html')) {
        import("../ctrl/detailsCtrl.js").then(module => {
          module.initMarkdownPreview();
        });
      }
    })
    .catch(error => {
      console.error(error);
      document.getElementById('content').innerHTML = "<h2>Page non trouvée</h2>";
    });
}

function router() {
  const path = window.location.pathname;
  loadPage(path);
}

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  router();
  document.body.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-link]');
    if (link) {
      e.preventDefault();
      const url = new URL(link.href);
      history.pushState(null, null, url.pathname);
      router();
    }
  });
});

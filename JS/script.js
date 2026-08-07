document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================================
     1. NAVIGATION RESPONSIVE (MENU HAMBURGER)
     ========================================================================== */
  const boutonMenu = document.querySelector(".bouton-menu");
  const menuNavigation = document.querySelector(".menu-navigation");

  if (boutonMenu && menuNavigation) {
    boutonMenu.addEventListener("click", () => {
      const estOuvert = boutonMenu.getAttribute("aria-expanded") === "true";
      boutonMenu.setAttribute("aria-expanded", !estOuvert);
      menuNavigation.classList.toggle("ouvert");
    });
  }

  /* ==========================================================================
     2. BASCULE MODE SOMBRE / MODE CLAIR
     ========================================================================== */
  const boutonTheme = document.getElementById("bouton-theme");
  const themeActuel = localStorage.getItem("theme") || "clair";

  if (themeActuel === "sombre") {
    document.documentElement.setAttribute("data-theme", "sombre");
    if (boutonTheme) boutonTheme.textContent = "☀️";
  }

  if (boutonTheme) {
    boutonTheme.addEventListener("click", () => {
      let theme = document.documentElement.getAttribute("data-theme");
      if (theme === "sombre") {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "clair");
        boutonTheme.textContent = "🌙";
      } else {
        document.documentElement.setAttribute("data-theme", "sombre");
        localStorage.setItem("theme", "sombre");
        boutonTheme.textContent = "☀️";
      }
    });
  }

  /* ==========================================================================
     3. CARROUSEL D'IMAGES (PAGE PRODUITS)
     ========================================================================== */
  const diapositiveCarrousel = document.querySelector(".diapositive-carrousel");
  const elementsCarrousel = document.querySelectorAll(".element-carrousel");
  const boutonPrecedente = document.querySelector(
    ".bouton-carrousel-precedente",
  );
  const boutonSuivante = document.querySelector(".bouton-carrousel-suivante");

  if (diapositiveCarrousel && elementsCarrousel.length > 0) {
    let compteur = 0;
    const taille = elementsCarrousel[0].clientWidth;

    const mettreAJourCarrousel = () => {
      diapositiveCarrousel.style.transform = `translateX(${-taille * compteur}px)`;
    };

    if (boutonSuivante) {
      boutonSuivante.addEventListener("click", () => {
        compteur = compteur >= elementsCarrousel.length - 1 ? 0 : compteur + 1;
        mettreAJourCarrousel();
      });
    }

    if (boutonPrecedente) {
      boutonPrecedente.addEventListener("click", () => {
        compteur = compteur <= 0 ? elementsCarrousel.length - 1 : compteur - 1;
        mettreAJourCarrousel();
      });
    }

    // Défilement automatique
    setInterval(() => {
      compteur = compteur >= elementsCarrousel.length - 1 ? 0 : compteur + 1;
      mettreAJourCarrousel();
    }, 5000);
  }

  /* ==========================================================================
     4. FILTRAGE DYNAMIQUE DES PRODUITS (PAGE PRODUITS)
     ========================================================================== */
  const boutonsFiltre = document.querySelectorAll(".bouton-filtre");
  const cartesProduit = document.querySelectorAll(".carte-produit");

  if (boutonsFiltre.length > 0) {
    boutonsFiltre.forEach((bouton) => {
      bouton.addEventListener("click", () => {
        boutonsFiltre.forEach((btn) => btn.classList.remove("actif"));
        bouton.classList.add("actif");

        const valeurFiltre = bouton.getAttribute("data-filtre");

        cartesProduit.forEach((carte) => {
          if (
            valeurFiltre === "tous" ||
            carte.getAttribute("data-categorie") === valeurFiltre
          ) {
            carte.style.display = "block";
          } else {
            carte.style.display = "none";
          }
        });
      });
    });
  }

  /* ==========================================================================
     5. VALIDATION DU FORMULAIRE DE CONTACT
     ========================================================================== */
  const formulaireContact = document.getElementById("formulaire-contact");

  if (formulaireContact) {
    formulaireContact.addEventListener("submit", (e) => {
      e.preventDefault();
      let estValide = true;

      // Champ Nom
      const champNom = document.getElementById("nom");
      const erreurNom = document.getElementById("erreur-nom");
      if (!champNom.value.trim()) {
        afficherErreur(champNom, erreurNom, "Le nom est obligatoire.");
        estValide = false;
      } else {
        effacerErreur(champNom, erreurNom);
      }

      // Champ Email
      const champEmail = document.getElementById("email");
      const erreurEmail = document.getElementById("erreur-email");
      const expressionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!champEmail.value.trim()) {
        afficherErreur(
          champEmail,
          erreurEmail,
          "L'adresse email est obligatoire.",
        );
        estValide = false;
      } else if (!expressionEmail.test(champEmail.value.trim())) {
        afficherErreur(champEmail, erreurEmail, "Format d'email invalide.");
        estValide = false;
      } else {
        effacerErreur(champEmail, erreurEmail);
      }

      // Champ Sujet
      const champSujet = document.getElementById("sujet");
      const erreurSujet = document.getElementById("erreur-sujet");
      if (!champSujet.value) {
        afficherErreur(
          champSujet,
          erreurSujet,
          "Veuillez sélectionner un sujet.",
        );
        estValide = false;
      } else {
        effacerErreur(champSujet, erreurSujet);
      }

      // Champ Message
      const champMessage = document.getElementById("message");
      const erreurMessage = document.getElementById("erreur-message");
      if (!champMessage.value.trim()) {
        afficherErreur(
          champMessage,
          erreurMessage,
          "Le message ne peut pas être vide.",
        );
        estValide = false;
      } else {
        effacerErreur(champMessage, erreurMessage);
      }

      // Validation finale
      if (estValide) {
        const zoneStatut = document.getElementById("statut-formulaire");
        zoneStatut.className = "statut-formulaire succes";
        zoneStatut.textContent =
          "Votre message a été envoyé avec succès ! Nous vous répondrons sous peu.";
        formulaireContact.reset();
      }
    });

    function afficherErreur(elementInput, elementErreur, message) {
      elementInput.parentElement.classList.add("erreur");
      elementErreur.textContent = message;
      elementErreur.style.display = "block";
    }

    function effacerErreur(elementInput, elementErreur) {
      elementInput.parentElement.classList.remove("erreur");
      elementErreur.style.display = "none";
    }
  }
});

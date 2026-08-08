document.addEventListener("DOMContentLoaded", () => {
  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => [...p.querySelectorAll(s)];

  //  NAVIGATION MOBILE //
  $(".bouton-menu")?.addEventListener("click", (e) => {
    const ouvert = e.currentTarget.getAttribute("aria-expanded") === "true";
    e.currentTarget.setAttribute("aria-expanded", !ouvert);
    $(".menu-navigation")?.classList.toggle("ouvert");
  });

  //  MODE SOMBRE-CLAIR //
  const btnTheme = $("#bouton-theme");

  const appliquerTheme = (estSombre) => {
    if (estSombre) {
      document.documentElement.setAttribute("data-theme", "sombre");
      localStorage.setItem("theme", "sombre");
      if (btnTheme) btnTheme.textContent = "☀️";
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "clair");
      if (btnTheme) btnTheme.textContent = "🌙";
    }
  };

  // Initialisation au chargement //
  const themeSauvegarde = localStorage.getItem("theme");
  if (themeSauvegarde === "sombre") {
    appliquerTheme(true);
  } else {
    appliquerTheme(false);
  }

  // Clic sur le bouton //
  btnTheme?.addEventListener("click", () => {
    const estActuellementSombre =
      document.documentElement.getAttribute("data-theme") === "sombre";
    appliquerTheme(!estActuellementSombre);
  });

  //  CARROUSEL //
  const diapo = $(".diapositive-carrousel"),
    el = $$(".element-carrousel");
  if (diapo && el.length) {
    let i = 0,
      maj = () =>
        (diapo.style.transform = `translateX(${-el[0].clientWidth * i}px)`);
    const suiv = () => {
      i = (i + 1) % el.length;
      maj();
    };
    $(".bouton-carrousel-suivante")?.addEventListener("click", suiv);
    $(".bouton-carrousel-precedente")?.addEventListener("click", () => {
      i = (i - 1 + el.length) % el.length;
      maj();
    });
    setInterval(suiv, 5000);
  }

  //  FILTRAGE PRODUITS //
  const btnsFiltre = $$(".bouton-filtre");
  btnsFiltre.forEach((b) =>
    b.addEventListener("click", () => {
      btnsFiltre.forEach((btn) => btn.classList.remove("actif"));
      b.classList.add("actif");
      const f = b.dataset.filtre;
      $$(".carte-produit").forEach(
        (c) =>
          (c.style.display =
            f === "tous" || c.dataset.categorie === f ? "block" : "none"),
      );
    }),
  );

  // VOIR PLUS / VOIR MOINS (À propos) //
  const btnPlus = $("#bouton-voir-plus");
  btnPlus?.addEventListener("click", () => {
    const o = btnPlus.dataset.ouvert === "true";
    $$(".membre-cache").forEach((m) => m.classList.toggle("membre-cache", o));
    btnPlus.dataset.ouvert = !o;
    btnPlus.textContent = o ? "Voir plus" : "Voir moins";
  });

  //FORMULAIRE DE CONTACT //
  $("#formulaire-contact")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const test = (id, cond, msg) => {
      const input = $(`#${id}`),
        err = $(`#erreur-${id}`),
        bad = cond(input.value.trim());
      input.parentElement?.classList.toggle("erreur", bad);
      if (err) {
        err.textContent = bad ? msg : "";
        err.style.display = bad ? "block" : "none";
      }
      return !bad;
    };
    const ok = [
      test("nom", (v) => !v, "Le nom est obligatoire."),
      test(
        "email",
        (v) => !v || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        "Email invalide.",
      ),
      test("sujet", (v) => !v, "Veuillez sélectionner un sujet."),
      test("message", (v) => !v, "Le message ne peut pas être vide."),
    ].every(Boolean);

    if (ok) {
      const st = $("#statut-formulaire");
      if (st) {
        st.className = "statut-formulaire succes";
        st.textContent =
          "Votre message a été envoyé avec succès ! Nous vous répondrons sous peu.";
      }
      e.target.reset();
    }
  });
});

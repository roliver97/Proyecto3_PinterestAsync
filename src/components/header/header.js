import './header.css'
import { printImages } from "../gallery/gallery.js";
import { defaultSearch } from "../gallery/gallery.js";
import { cardListeners } from "../gallery/gallery.js";
import { searchPhotos } from '../unsplash.js';

export const printHeader = () => {
  templateHeader();
  headerListeners();
}

const templateHeader = () => {
  const header = document.querySelector("header");
  header.classList.add("flex-container")
  
  /*CONTENEDORES DE HEADER*/
  const logoContainer = document.createElement("div");
  const menuContainer = document.createElement("div");
  const searchContainer = document.createElement("div");
  const activityContainer = document.createElement("div");
  const userContainer = document.createElement("div");

  logoContainer.className = "headerLogoContainer";
  menuContainer.className = "headerMenuContainer";
  searchContainer.className = "headerSearchContainer";
  activityContainer.className = "headerActivityContainer";
  userContainer.className = "headerUserContainer";

  header.appendChild(logoContainer);
  header.appendChild(menuContainer);
  header.appendChild(searchContainer);
  header.appendChild(activityContainer);
  header.appendChild(userContainer);

  /*CONTENIDO DE HEADER*/
  /* Nav Menu */
  const pageLogo = document.createElement("button");
  const pageLogoIcon = document.createElement("img");
  pageLogoIcon.src = "icons/pinterest.png";
  pageLogo.className = "logoButton"

  const homeLink = document.createElement("a");
  homeLink.className = "homeLink";
  homeLink.textContent = "Inicio";
  
  const exploreLink = document.createElement("a");
  exploreLink.href = "#main";
  exploreLink.textContent = "Explorar";

  const createLink = document.createElement("a");
  createLink.href = "#";
  createLink.textContent = "Crear";

  logoContainer.appendChild(pageLogo);
  pageLogo.appendChild(pageLogoIcon);
  menuContainer.appendChild(homeLink);
  menuContainer.appendChild(exploreLink);
  menuContainer.appendChild(createLink);

  /* Search Bar */
  const searchBarButton = document.createElement("button");
  const searchBarIcon = document.createElement("img");
  const searchBarInput = document.createElement("input");

  searchBarIcon.src = "icons//search.png";
  searchBarInput.placeholder = "Buscar";
  searchBarButton.id = "searchBarButton";
  searchBarInput.id = "searchBarInput";

  searchBarButton.appendChild(searchBarIcon);
  searchContainer.appendChild(searchBarButton);
  searchContainer.appendChild(searchBarInput);

  /* Activity Options */
  const notificationsLink = document.createElement("a");
  const notificationsIcon = document.createElement("img");

  const conversationsLink = document.createElement("a");
  const conversationsIcon = document.createElement("img");

  notificationsLink.href = "#";
  notificationsIcon.src = "icons/notifications.png";

  conversationsLink.href = "#";
  conversationsIcon.src = "icons/conversations.png";

  activityContainer.appendChild(notificationsLink);
  notificationsLink.appendChild(notificationsIcon);

  activityContainer.appendChild(conversationsLink);
  conversationsLink.appendChild(conversationsIcon);

  /* User Profile */
  const userButton = document.createElement("button");
  const userIcon = document.createElement("img");

  userButton.className = "userButton"
  userIcon.src = "icons/user.png";

  userContainer.appendChild(userButton);
  userButton.appendChild(userIcon);
}

const showMobileMenu = () => {
  document.querySelector(".headerMenuContainer").classList.toggle("hamburgerMenu")
  document.querySelector(".headerMenuContainer").classList.toggle("hidden")
}

const showMobileActivityMenu = () => {
  document.querySelector(".headerActivityContainer").classList.toggle("hamburgerUser")
  document.querySelector(".headerActivityContainer").classList.toggle("hidden")
}

const headerListeners = () => {
  const logoNavBtn = document.querySelector(".logoButton");
  const menu = document.querySelector(".headerMenuContainer");
  const userNavBtn = document.querySelector(".userButton");
  const activityMenu = document.querySelector(".headerActivityContainer")

  const input = document.querySelector("#searchBarInput");
  const searchButton = document.querySelector("#searchBarButton");
  const logo = document.querySelector(".logoButton");
  const homeLink = document.querySelector(".homeLink")

  const doSearch = async () => {
    const images = await searchPhotos(input.value)
    printImages(images.response.results)
    cardListeners();

    input.value = "";
  }

  searchButton.addEventListener("click", async () => {
    await doSearch();
  })

  input.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    await doSearch();
  }
  });

  homeLink.addEventListener("click", async () => {
    await defaultSearch();
  })

  logo.addEventListener("click", async () => {
    await defaultSearch();
  });


  /* Comprobación inicial medidas ventana (al recargar) */
  if (window.matchMedia("(max-width: 1000px)").matches){
    menu.classList.add("hidden");
    menu.classList.remove("hamburgerMenu");
    activityMenu.classList.add("hidden");
    activityMenu.classList.remove("hamburgerUser");
  }

  /* Escuchador del botón/logo */
  logoNavBtn.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 1000px)").matches) {
    showMobileMenu();
    }
    })

  /* Escuchador del botón/user */
  userNavBtn.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 1000px)").matches) {
    showMobileActivityMenu();
    }
    })

  /* Escuchador constante de la medida de la ventana (por si hay resize) */
  // Si la ventana es pequeña se oculta el menú. Aún así es posible mostrarlo en modo "hamburger" si pulsamos el botón
  // Si la ventana es grande se muestra el menú en su versión desktop.
  window.addEventListener("resize", () => {
    if (window.matchMedia("(max-width: 1000px)").matches){
      menu.classList.add("hidden");
      menu.classList.remove("hamburgerMenu");
      activityMenu.classList.add("hidden");
      activityMenu.classList.remove("hamburgerUser");
    } else {
      menu.classList.remove("hidden", "hamburgerMenu");
      activityMenu.classList.remove("hidden", "hamburgerUser");
    }
    })
  }
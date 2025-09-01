import { templateCard } from "./cards";
import { searchPhotos } from './unsplash.js';

const templateGallery = () => {
  const main = document.querySelector("main");
  const gallery = document.createElement("ul");

  gallery.className = "gallery";

  main.appendChild(gallery);

  return gallery;
}

const printImages = (images) => {
  const gallery = document.querySelector(".gallery")
  gallery.innerHTML= "";
  for (const image of images) {
    const card = templateCard(image);
    gallery.appendChild(card);
  }
}



let firstSearchTerm = null; // Para guardar el primer input que escriba el usuario. Lo usamos en headerListeners() y mostrará ese primer input si el usuario pulsa el Logo o "Inicio"

const headerListeners = () => {
  const input = document.querySelector("#searchBarInput");
  const searchButton = document.querySelector("#searchBarButton");
  const logo = document.querySelector(".logoButton");
  const homeLink = document.querySelector(".homeLink")

  const doSearch = async () => {
    if (!firstSearchTerm) firstSearchTerm = input.value;
    const images = await searchPhotos(input.value)
    printImages(images.response.results)
    cardListeners();

    input.value = "";
  }

  const defaultSearch = async () => {
    if (firstSearchTerm) {
    const images = await searchPhotos(firstSearchTerm);
    printImages(images.response.results);
    cardListeners();
}
    
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

}

const cardListeners = () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
  const likesButton = card.querySelector(".likesCounterButton")
  const visitLink = card.querySelector(".visitLink");
  const photosButton = card.querySelector(".photosCounterButton")

  // HOVER CARD EFFECT 
  card.addEventListener("mouseenter", () => {
    likesButton.classList.remove("hidden");
    likesButton.classList.add("circleButton");
    visitLink.classList.remove("hidden");
    photosButton.classList.remove("hidden");
    photosButton.classList.add("circleButton");

  })

  card.addEventListener("mouseleave", () => {
    likesButton.classList.add("hidden");
    likesButton.classList.remove("circleButton");
    visitLink.classList.add("hidden");
    photosButton.classList.add("hidden");
    photosButton.classList.remove("circleButton");
  })

  //LIKE COUNTER FUNCTION dentro del FOR EACH
    const likeCounter = () => {
    const likesIcon = card.querySelector(".likesCounterIcon");
    const likesSpan = card.querySelector(".likesCounterSpan");
    
    let liked = false;
    let likes = parseInt(likesSpan.textContent);

    likesButton.addEventListener("click", () => {
    if(!liked) {  
      likes++;
      liked = true;
      likesIcon.src = "/icons/like.png"
    } else {
      likes--;
      liked=false;
      likesIcon.src = "/icons/no_like.png"
    }
      likesSpan.textContent = likes;

    });
    }

    likeCounter();

  })
}



export const printGallery = async () => {
  templateGallery()
  headerListeners()

  const images = await searchPhotos("cats")
  printImages(images.response.results)
  
  cardListeners()  
}

import './gallery.css'
import { templateCard } from "../cards/cards.js";
import { searchPhotos } from '../unsplash.js';

const templateGallery = () => {
  const main = document.querySelector("main");
  const gallery = document.createElement("ul");

  gallery.className = "gallery";

  main.appendChild(gallery);

  return gallery;
}

export const printImages = (images) => {
  const gallery = document.querySelector(".gallery")
  gallery.innerHTML= "";
  for (const image of images) {
    const card = templateCard(image);
    gallery.appendChild(card);
  }
}

export const defaultSearch = async () => {
  try {
    const images = await searchPhotos("cats");
    printImages(images.response.results);
    cardListeners();
  } catch (error) {
    console.error("Error loading images:", error);
  }
}

export const cardListeners = () => {
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
  defaultSearch();
}

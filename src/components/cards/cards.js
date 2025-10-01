import './cards.css'

export const templateCard = (image) => {
  /* CARD */
  const card = document.createElement("li");
  
  card.className = "card";
  
  /* IMAGE DIV */  
  const imgDiv = document.createElement("div");
  const imgLink = document.createElement("a")
  const img = document.createElement("img");
  const photosCounterLink = document.createElement("a");
  const photosCounterButton = document.createElement("button");
  const photosCounterIcon = document.createElement("img");
  const photosCounterSpan = document.createElement("span");
  const likesCounterButton = document.createElement("button");
  const likesCounterIcon = document.createElement("img");
  const likesCounterSpan = document.createElement("span");
  const visitLink = document.createElement("a");

  imgDiv.className = "imageDiv";
  imgLink.className = "imgLink";
  img.className = "img";
  imgLink.href = image.urls.full;
  img.src = image.urls.regular;
  img.alt = image.alt_description;
  

  photosCounterLink.className = "photosCounterLink"
  photosCounterButton.className = "photosCounterButton";
  likesCounterButton.className = "likesCounterButton";
  visitLink.className = "visitLink";
  photosCounterButton.classList.add("hidden");
  likesCounterButton.classList.add("hidden");
  visitLink.classList.add("hidden")
  
  likesCounterIcon.className = "likesCounterIcon";
  photosCounterIcon.className = "photosCounterIcon";
  likesCounterSpan.className = "likesCounterSpan"
  photosCounterSpan.className = "photosCounterSpan"
  photosCounterIcon.src = "icons/photos.png";
  photosCounterLink.href = image.user.links.html;
  photosCounterSpan.textContent = image.user.total_photos;
  likesCounterIcon.src = "icons/no_like.png";
  likesCounterSpan.textContent = image.user.total_likes;
  visitLink.textContent = "Visitar";
  visitLink.href = image.user.portfolio_url;


  card.appendChild(imgDiv);
  imgDiv.appendChild(imgLink);
  imgLink.appendChild(img);
  imgDiv.appendChild(photosCounterButton);
  imgDiv.appendChild(likesCounterButton);
  imgDiv.appendChild(visitLink);
  imgDiv.appendChild(photosCounterLink);
  photosCounterLink.appendChild(photosCounterButton);
  photosCounterButton.appendChild(photosCounterIcon);
  photosCounterButton.appendChild(photosCounterSpan);
  likesCounterButton.appendChild(likesCounterIcon);
  likesCounterButton.appendChild(likesCounterSpan);

  /* INFO DIV */
  const infoDiv = document.createElement("div");
  const userAvatarLink = document.createElement("a");
  const userAvatar = document.createElement("img");
  const userName = document.createElement("a");
  const downloadDiv = document.createElement("div");
  const photoDate = document.createElement("p");
  const downloadLink = document.createElement("a");
  const downloadIcon = document.createElement("img");

  infoDiv.className = "infoDiv";
  userAvatarLink.id = "userAvatarLink";
  userAvatar.id = "userAvatar";
  downloadLink.id = "downloadLink";
  downloadDiv.id = "downloadDiv";

  userAvatar.src = image.user.profile_image.large;
  userName.textContent = image.user.name;
  userName.href = image.user.links.html;
  userAvatarLink.href = image.user.portfolio_url;

  photoDate.textContent = image.user.updated_at.slice(0, 10);
  downloadLink.href = image.links.download;
  downloadIcon.src = "icons/download.png";


  card.appendChild(infoDiv);
  infoDiv.appendChild(userAvatarLink);
  userAvatarLink.appendChild(userAvatar)
  infoDiv.appendChild(userName);
  infoDiv.appendChild(downloadDiv);
  downloadDiv.appendChild(downloadLink);
  downloadLink.appendChild(downloadIcon);
  downloadDiv.appendChild(photoDate);
  

  return card;
}
let addToy = false;

// When the page loads, make a 'GET' request to fetch all the toy objects. 
// With the response data, make a <div class="card"> for each toy 
// and add it to the toy-collection div.


function renderToys(toys) {
  let toyCard = document.createElement("div");
  toyCard.className = "card";
  toyCard.innerHTML = `
  <h2>${toys.name}</h2>
  <img src="${toys.image}" class="toy-avatar"/>
  <p id = "like-p">${toys.likes} Likes</p>
  <button class="like-btn" id=${toys.id}> Like 💕 </button>
 `
 const likeBtn = document.getElementsByClassName("like-btn")
 const arrLikeButtons = Array.from(likeBtn)
 arrLikeButtons.forEach((singleLike) => {
   singleLike
   .addEventListener("click", () => {
  const p = document.querySelector("p")
  p.textContent = `${toys.likes += 1} Likes`;
  updateLikes(toys.id, toys.likes)
 })
 })
document.getElementById("toy-collection").appendChild(toyCard)
}

function sendItOut(newToy) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
     ...newToy,
     "likes": 0
    })
  })
  .then(res => res.json())
  .then(responseToy => renderToys(responseToy))
}


document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toysData => toysData.forEach(toy => renderToys(toy)))

  const form = document.querySelector("form.add-toy-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target));
    sendItOut(formData)
  })


  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

  function updateLikes(id, newNumberOfLikes) {
    fetch(`http://localhost:3000/toys/:id`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": newNumberOfLikes
    })
  })
  

  }

  
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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

//Fetch request to obtain toy info and pass it to the createCard function,
//and call function to trigger event listener on like button
document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toyList => toyList.map(toy => createCard(toy)))
})

//function to create card and add to DOM
function createCard(toy) {
  //creating elements and saving them to variables
  const card = document.createElement('div')
  const h2 = document.createElement('h2')
  const img = document.createElement('img')
  const p = document.createElement('p')
  const button = document.createElement('button')
  //setting content of new elements
  card.className = 'card'
  
  h2.textContent = toy.name
  
  img.src = toy.image
  img.className = 'toy-avatar'

  p.textContent = `${toy.likes} likes`

  button.className = "like-btn"
  button.id = `t${toy.id}`
  button.textContent = 'Like ❤️'
  //adding the new elements to the DOM
  document.getElementById('toy-collection').appendChild(card)
  card.appendChild(h2)
  card.appendChild(img)
  card.appendChild(p)
  card.appendChild(button)
}

//event listener for the form to submit new toys
const form = document.querySelector('form')
form.addEventListener('submit', e => {
  e.preventDefault()
  const firstInput = e.target.querySelectorAll('input')[0]
  const secondInput = e.target.querySelectorAll('input')[1]
  const newToy = {
    image: secondInput.value,
    likes: 0,
    name: firstInput.value
  }
  postNewToy(newToy)
  document.querySelector(".container").style.display = 'none'
  firstInput.value = ''
  secondInput.value = ''
  addToy = !addToy
})

//function to post the information from the form to the server and then pass
//it to createCards tp add it to the DOM
function postNewToy(newToy) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newToy)
  })
  .then(response => response.json())
  .then(toy => createCard(toy))
}

//function containing event listener for like button
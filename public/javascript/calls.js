let container=document.getElementById("petsContainer");

let xhr = new XMLHttpRequest();

xhr.open("GET", "/pets/");

xhr.addEventListener("load", e => {
  let myPets = JSON.parse(xhr.response);

  for (let i = 0; i < myPets.length; i++) {
    let myPet=createPetCard(myPets[i]);
    
    container.appendChild(myPet);

  }
});

xhr.addEventListener("error", e => {});
xhr.send();


/* POST */

let createForm=document.getElementById("addForm");

createForm.addEventListener("submit" ,function(e) {
    e.preventDefault();
    let xhrPost = new XMLHttpRequest();
    let myNewPet = {};
    myNewPet.name = document.getElementById("petName").value;
    myNewPet.type = document.getElementById("catVsDog").value;

    xhrPost.open('POST', '/pets/');

    xhrPost.setRequestHeader('content-type', 'application/json');
    
    xhrPost.addEventListener('load', function onLoad() {
        let xhrPostResponse = JSON.parse(xhrPost.response);//Aici iau raspunsul de la POST si imi creez animalutul

        let createdPet=createPetCard(xhrPostResponse);
        container.appendChild(createdPet);

    });
    
    xhrPost.addEventListener('error', function onError() {});
    
    xhrPost.send(JSON.stringify(myNewPet));    
})


/* DELETE */

// container.addEventListener("click" ,function(e) {
//     let myDeleteButton = e.target;
//     let id = e.target.dataset.id;  });
function deleteFunction(id){
    let xhrDelete = new XMLHttpRequest();
   
    xhrDelete.open('DELETE', `/pets/${id}`);

    xhrDelete.setRequestHeader('content-type', 'application/json');
    
    xhrDelete.addEventListener('load', function onLoad() {
        switch(xhrDelete){
            case 200:
                break;
            case 401:
                alert('Not authenticated - only if you"re running the server in the "auth" mode');
            case 404:
                alert("No pet exist with that id");
                break;
        }        
    });  
  
    
    xhrDelete.addEventListener('error', function onError() {});
    
    xhrDelete.send(); 
}


//SEARCH
let searchBut = document.getElementById("searchButton");

searchBut.addEventListener("click" ,function(e) {
    e.preventDefault();
    let nameToFind = document.getElementById("inputSearch").value;

    let xhrSearch = new XMLHttpRequest();

    xhrSearch.open("GET", "/pets/?name=" + nameToFind );
    console.log(nameToFind);

    xhrSearch.setRequestHeader('content-type', 'application/json');

    xhrSearch.addEventListener("load", e => {
        let myPets = JSON.parse(xhrSearch.response);
        container.innerHTML = '';

        for (let i = 0; i < myPets.length; i++) {
            let myPet=createPetCard(myPets[i]);
    
            container.appendChild(myPet);
      
        }
    });

    xhrSearch.addEventListener("error", e => {});
    xhrSearch.send();
});

//UPDATE

// let submitUpdate=document.getElementById("addForm");

submitUpdate.addEventListener("submit" ,function(e) {
    let xhrUpdate = new XMLHttpRequest();

    xhrUpdate.open("PUT", `/pets/${id}`);
    
    xhrUpdate.addEventListener("load", e => {
        let myPets = JSON.parse(xhrSearch.response);    
        let nameToUpdate = document.getElementsByTagName("h1");        
        let myPet=createPetCard(myPets[i]);
        myPet.name=nameToUpdate;

        container.appendChild(myPet);
    });
    
    xhrUpdate.addEventListener("error", e => {});
    xhrUpdate.send();
});


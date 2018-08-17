(function initIIFE() {
    let petsContainer = document.getElementById('petsContainer');

    petsContainer.addEventListener('click', function onClick(e) {
        if (e.target.tagName === 'BUTTON') {
            switch (e.target.dataset.type) {
                case 'edit':
                    PetsService.getPetById(
                        e.target.dataset.id,
                        function(selectedPet) {
                            swal({
                                title: 'Edit pet',
                                html: createPetCard(
                                    {
                                        name: selectedPet.name,
                                        type: selectedPet.type,
                                        created: selectedPet.created
                                    },
                                    true
                                ),
                                confirmButtonText: 'Save',
                                showCancelButton: true,
                                cancelButtonText: 'Cancel',
                                width: '50%'
                            }).then(function(e) {
                                console.log(e);
                                if(e.value === true){
                                    let updatedPet = {};
                                    updatedPet.name = document.querySelector(".swal2-modal *[data-type = 'name']").innerText;
                                    let age = document.querySelector(".swal2-modal *[data-age = 'age']").innerText;
                                    updatedPet.type = selectedPet.type;
                                    updatedPet.id = selectedPet.id;
                                    updatedPet.created = Date.now() - age * 8.64e7;

                                    console.log(Date.now() - age * 8.64e7 , "Aici");

                                    PetsService.updatePet(selectedPet.id , updatedPet, function() {
                                        let myUpdatedPet = document.getElementById(selectedPet.id);

                                        petsContainer.insertBefore(createPetCard(updatedPet), myUpdatedPet);
                                        
                                        myUpdatedPet.remove();
                                    });
                                }
                                
                            });
                        },
                        function(err) {
                            alert('Unauthorized');
                        }
                    );
                    
                    break;
                case 'delete':
                    PetsService.deletePet(
                        e.target.dataset.id,
                        function() {
                            e.target.parentElement.remove();
                        },
                        function(err) {
                            alert('Unauthorized');
                        }
                    );
                    break;
                default:
                    break;
            }
        }
    });

    PetsService.getPets(
        function(resp) {
            //append to DOM
            let myPets = resp;

            for (let i = 0; i < myPets.length; i++) {
                let myPet = createPetCard(myPets[i]);

                petsContainer.appendChild(myPet);
            }
        },
        function(err) {
            alert('Unauthorized');
        }
    );

    // PetsService.getPets(name,
    //     function(resp) {
    //         //append to DOM
    //         let myPets = resp;

    //         for (let i = 0; i < myPets.length; i++) {
    //             let myPet = createPetCard(myPets[i]);

    //             petsContainer.appendChild(myPet);
    //         }
    //     },
    //     function(err) {
    //         alert('Unauthorized');
    //     }
    // );

    // let searchForm = document.getElementById('searchForm');

    // searchForm.addEventListener('submit', function(e) {
    //     e.preventDefault();
    //     let nameToFind = document.getElementById('inputSearch').value;
    //     PetsService.getPets(nameToFind,
    //         function(resp) {
    //             let myPets=resp;

    //             petsContainer.innerHTML = '';

    //             for (let i = 0; i < myPets.length; i++) {
    //                 let myPet=createPetCard(myPets[i]);

    //                 petsContainer.appendChild(myPet);
    //             }
    //         },
    //         function(err) {
    //             alert('Unauthorized');
    //         }
    //     );
    // })

    let createForm = document.getElementById('addForm');

    createForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let myNewPet = {};
        myNewPet.name = document.getElementById('petName').value;
        myNewPet.type = document.getElementById('catVsDog').value;

        PetsService.addPet(
            myNewPet,
            function(resp) {
                let createdPet = createPetCard(resp);
                petsContainer.appendChild(createdPet);
            },
            function(err) {
                alert('Unauthorized');
            }
        );
    });

    // let searchForm = document.getElementById('searchForm');

    // searchForm.addEventListener('submit', function(e) {
    //     e.preventDefault();
    //     let nameToFind = document.getElementById('inputSearch').value;

    //     PetsService.searchPet(nameToFind, function(resp) {
    //         let myPets = resp;

    //         petsContainer.innerHTML = '';

    //         for (let i = 0; i < myPets.length; i++) {
    //             let myPet = createPetCard(myPets[i]);

    //             petsContainer.appendChild(myPet);
    //         }
    //     });
    // });


    
    //LAZY DEBOUNCER (SEARCH)

    let timeoutID;
    document.getElementById("searchForm").addEventListener("input",function(e){
        let searchParam =document.getElementById('inputSearch').value;

        clearTimeout(timeoutID);

        timeoutID = setTimeout(function(){
            PetsService.searchPet(searchParam , function(resp){
                petsContainer.innerHTML = '';
    
                resp.forEach(pet => {
                    let petEl = createPetCard(pet);
                    petEl.setAttribute("data-id",pet.id);
                    petsContainer.appendChild(petEl);
                });
            },
            function(err){
                alert("Unauthorized");
            })
        },500)      
    })
    

    // petsContainer.appendChild(createPetCard({
    //     name: "Dummy 1",
    //     type: "cat",
    //     created: Date.now()
    // }));
    // petsContainer.appendChild(createPetCard({
    //     name: "Dummy 2",
    //     type: "dog",
    //     created: Date.now()
    // }));
})();

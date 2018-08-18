(function initIIFE() {
    let petsContainer = document.getElementById('petsContainer');

    function resetButton() {
        let id = e.target.dataset.id;
        e.target.disabled = true;
        let deleteBtn = petsContainer.querySelector(
            `button[data-type ="delete"][data-id ="${id}"]`
        );
        deleteBtn.disabled = true;
    }

    petsContainer.addEventListener('click', function onClick(e) {
        if (e.target.tagName === 'BUTTON') {
            switch (e.target.dataset.type) {
                case 'edit':
                    let id = e.target.dataset.id;
                    e.target.disabled = true;
                    let deleteBtn = petsContainer.querySelector(
                        `button[data-type ="delete"][data-id ="${id}"]`
                    );
                    deleteBtn.disabled = true;

                    PetsService.getPetById(
                        e.target.dataset.id,
                        function(selectedPet) {
                            e.target.removeAttribute('disabled');
                            deleteBtn.removeAttribute('disabled');

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
                                if (e.value === true) {
                                    let updatedPet = {};
                                    updatedPet.name = document.querySelector(
                                        ".swal2-modal *[data-type = 'name']"
                                    ).innerText;
                                    let age = document.querySelector(
                                        ".swal2-modal *[data-age = 'age']"
                                    ).innerText;
                                    updatedPet.type = selectedPet.type;
                                    updatedPet.id = selectedPet.id;
                                    updatedPet.created =
                                        Date.now() - age * 8.64e7;

                                    console.log(
                                        Date.now() - age * 8.64e7,
                                        'Aici'
                                    );

                                    PetsService.updatePet(
                                        selectedPet.id,
                                        updatedPet,
                                        function() {
                                            let myUpdatedPet = document.getElementById(
                                                selectedPet.id
                                            );

                                            petsContainer.insertBefore(
                                                createPetCard(updatedPet),
                                                myUpdatedPet
                                            );

                                            myUpdatedPet.remove();
                                        }
                                    );
                                }
                            });
                        },
                        function(err) {
                            e.target.removeAttribute('disabled');
                            deleteBtn.removeAttribute('disabled');
                            alert('Unauthorized');
                        }
                    );

                    break;
                case 'delete':
                    let id = e.target.dataset.id;
                    e.target.disabled = true;
                    let editBtn = petsContainer.querySelector(
                        `button[data-type ="edit"][data-id ="${id}"]`
                    );
                    editBtn.disabled = true;
                    PetsService.deletePet(
                        e.target.dataset.id,
                        function() {
                            e.target.removeAttribute('disabled');
                            deleteBtn.removeAttribute('disabled');
                            e.target.parentElement.remove();
                        },
                        function(err) {
                            e.target.removeAttribute('disabled');
                            deleteBtn.removeAttribute('disabled');
                            alert('Unauthorized');
                        }
                    );
                    break;
                default:
                    break;
            }
        }
    });
    petsContainer.classList.add('isLoading');
    PetsService.getPets(
        function(resp) {
            petsContainer.classList.remove('isLoading');
            let myPets = resp;

            for (let i = 0; i < myPets.length; i++) {
                let myPet = createPetCard(myPets[i]);

                petsContainer.appendChild(myPet);
            }
        },
        function(err) {
            petsContainer.classList.remove('isLoading');
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

        createtButton.disabled = true;
        searchButton.disabled = true;

        PetsService.addPet(
            myNewPet,
            function(resp) {
                createtButton.removeAttribute('disabled');
                searchButton.removeAttribute('disabled');
                let createdPet = createPetCard(resp);
                petsContainer.appendChild(createdPet);
            },
            function(err) {
                createtButton.removeAttribute('disabled');
                searchButton.removeAttribute('disabled');
                alert('Unauthorized');
            }
        );
    });

    let loginButton = document.getElementById('loginBtn');
    let logoutButton = document.getElementById('logoutBtn');

    loginButton.addEventListener('click', function(e) {
        logoutButton.disabled = true;

        AuthService.login(
            function() {
                alert('Login succesfull!');
                logoutButton.removeAttribute('disabled');
            },
            function(err) {
                alert('Nu poti adauga un animalut daca nu esti autentificat!');
            }
        );
    });

    logoutButton.addEventListener('click', function(e) {
        loginButton.disabled = true;

        AuthService.logout(
            function() {
                alert('Logout succesfull!');
                loginButton.removeAttribute('disabled');
            },
            function(err) {
                alert('Eroare!');
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
    let searchButton = document.getElementById('searchButton');
    let createtButton = document.getElementById('createPet');

    let timeoutID;
    document
        .getElementById('searchForm')
        .addEventListener('input', function(e) {
            let searchParam = document.getElementById('inputSearch').value;

            clearTimeout(timeoutID);

            timeoutID = setTimeout(function() {
                createtButton.disabled = true;
                searchButton.disabled = true;
                petsContainer.classList.add('isLoading');
                petsContainer.innerHTML = '';

                PetsService.searchPet(
                    searchParam,
                    function(resp) {
                        createtButton.removeAttribute('disabled');
                        searchButton.removeAttribute('disabled');
                        petsContainer.innerHTML = '';
                        petsContainer.classList.remove('isLoading');

                        resp.forEach(pet => {
                            let petEl = createPetCard(pet);
                            petEl.setAttribute('data-id', pet.id);
                            petsContainer.appendChild(petEl);
                        });
                    },
                    function(err) {
                        createtButton.removeAttribute('disabled');
                        searchButton.removeAttribute('disabled');
                        petsContainer.classList.remove('isLoading');
                        alert('Unauthorized');
                    }
                );
            }, 500);
        });

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

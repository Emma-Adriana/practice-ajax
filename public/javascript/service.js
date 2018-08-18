class PetsService {
    static getPets( successCb, errorCb) {

        let xhr = new XMLHttpRequest();

        xhr.open('GET', '/pets/');

        xhr.setRequestHeader('content-type', 'application/json');        

        xhr.addEventListener('load', e => {
            switch(xhr.status){
                case 200:
                    successCb(JSON.parse(xhr.response));
                    break;
                case 401:
                    errorCb(401);
                    break;
                default:
                    break;
            }
        });

        xhr.addEventListener('error', e => {});
        xhr.send();
    }

    // static getPets(name,successCb, errorCb) {
    //     let xhr = new XMLHttpRequest();

    //     if(name!=''){
    //         xhr.open("GET", "/pets?name=" + name);
    //     }
    //     else{
    //         xhr.open('GET', '/pets/');
    //     }

    //     xhr.setRequestHeader('content-type', 'application/json');
        

    //     xhr.addEventListener('load', e => {
    //         switch(xhr.status){
    //             case 200:
    //                 successCb(JSON.parse(xhr.response));
    //                 break;
    //             case 401:
    //                 errorCb(401);
    //                 break;
    //             default:
    //                 break;
    //         }
    //     });

    //     xhr.addEventListener('error', e => {});
    //     xhr.send();
    // }


    static addPet(myNewPet, successCb, errorCb) {
        let xhrPost = new XMLHttpRequest();

        xhrPost.open('POST', '/pets/');        

        xhrPost.setRequestHeader('content-type', 'application/json');

        xhrPost.setRequestHeader('token', localStorage.getItem("token"));

        xhrPost.addEventListener('load', e => {
            switch(xhrPost.status){
                case 200:
                    successCb(JSON.parse(xhrPost.response));
                    break;
                case 401:
                    errorCb(401);
                    break;
                default:
                    break;
            }
        });

        xhrPost.addEventListener('error', e => {});
        xhrPost.send(JSON.stringify(myNewPet));
    }

    static deletePet(id, successCb, errorCb) {
        let xhrDelete = new XMLHttpRequest();

        xhrDelete.open('DELETE', `/pets/${id}`);

        xhrDelete.setRequestHeader('content-type', 'application/json');

        xhrDelete.setRequestHeader('token', localStorage.getItem("token"));

        xhrDelete.addEventListener('load', e => {
            switch(xhrDelete.status){
                case 200:
                    successCb();
                    break;
                case 401:
                    errorCb(401);
                    break;
                default:
                    break;
            }
        });

        xhrDelete.addEventListener('error', e => {});
        xhrDelete.send();
    }

    static searchPet(nameToFind, successCb, errorCb) {
        let xhrSearch = new XMLHttpRequest();

        xhrSearch.open("GET", "/pets/?name=" + nameToFind );

        xhrSearch.setRequestHeader('content-type', 'application/json');

        xhrSearch.addEventListener('load', e => {
            switch(xhrSearch.status){
                case 200:
                    successCb(JSON.parse(xhrSearch.response));
                    break;
                case 401:
                    errorCb(401);
                    break;
                default:
                    break;
            }
        });

        xhrSearch.addEventListener('error', e => {});
        xhrSearch.send();
    }

    static updatePet(id, bodyPet, successCb, errorCb) {
        let xhrUpdate = new XMLHttpRequest();

        xhrUpdate.open("PUT", `/pets/${id}`);

        xhrUpdate.setRequestHeader('content-type', 'application/json');

        xhrUpdate.setRequestHeader('token', localStorage.getItem("token"));        

        xhrUpdate.addEventListener('load', e => {
            switch(xhrUpdate.status){
                case 200:
                    successCb(JSON.parse(xhrUpdate.response));
                    break;
                case 401:
                    errorCb(401);
                    break;
                default:
                    break;
            }
        });

        xhrUpdate.addEventListener('error', e => {});
        xhrUpdate.send(JSON.stringify(bodyPet));
    }

    static getPetById(id, successCb, errorCb){
        let xhrGetOne = new XMLHttpRequest();

        xhrGetOne.open("GET", `/pets/${id}`);

        xhrGetOne.setRequestHeader('content-type', 'application/json');

        xhrGetOne.addEventListener('load', e => {
            switch(xhrGetOne.status){
                case 200:

                successCb(JSON.parse(xhrGetOne.response));
                    break;
                case 401:
                    errorCb(401);
                    break;
                default:
                    break;
            }
        });

        xhrGetOne.addEventListener('error', e => {});
        xhrGetOne.send();
    }

}


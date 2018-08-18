class PetsService {
    static getPets( successCb, errorCb) {

        HTTP.request('GET' , '/pets/' , {} ,  successCb, errorCb);
    }

    static addPet(myNewPet, successCb, errorCb) {

        HTTP.request('POST' , '/pets' , {'content-type':'application/json' , 'token' : localStorage.getItem("token")} ,  successCb, errorCb ,myNewPet);
    }

    static deletePet(id, successCb, errorCb) {

        HTTP.request('DELETE' , `/pets/${id}` ,  {'content-type':'application/json' , 'token' : localStorage.getItem("token")} ,  successCb, errorCb);
    
    }

    static searchPet(nameToFind, successCb, errorCb) {

        HTTP.request('GET' , "/pets/?name=" + nameToFind , {'content-type':'application/json', 'token' : localStorage.getItem("token")} ,  successCb, errorCb);

    
    }

    static updatePet(id, bodyPet, successCb, errorCb) {

        HTTP.request('PUT' , `/pets/${id}` ,  {'content-type':'application/json' , 'token' : localStorage.getItem("token")}  ,  successCb, errorCb, bodyPet);
        
    }

    static getPetById(id, successCb, errorCb){

        HTTP.request('GET' , `/pets/${id}` ,  {'content-type':'application/json'} ,  successCb, errorCb);
        
    }

}


class AuthService{
    static login(successCb, errorCb){
        let xhrLogin = new XMLHttpRequest();

    
        xhrLogin.open("POST", "/login");
    
        xhrLogin.addEventListener('load', e => {
            switch(xhrLogin.status){
                case 200:
                    successCb();                    
                    let token = xhrLogin.getResponseHeader("token");
                    localStorage.setItem('token', token);                          
                    break;
                case 401:
                    errorCb(401);
                    break;
                default:
                    break;
            }
        });
    
        xhrLogin.addEventListener('error', e => {});
        xhrLogin.send();
    }
    static logout(successCb, errorCb){
        let xhrLogout = new XMLHttpRequest();
    
        xhrLogout.open("POST", "/logout");
        
        xhrLogout.setRequestHeader('token', localStorage.getItem("token"));
    
        xhrLogout.addEventListener('load', e => {
            switch(xhrLogout.status){
                case 200:
                    successCb();                
                    localStorage.removeItem('token');                     
                    break;
                case 401:
                    errorCb(401);
                    break;
                default:
                    break;
            }
        });
    
        xhrLogout.addEventListener('error', e => {});
        xhrLogout.send();
    }
}

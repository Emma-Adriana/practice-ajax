class AuthService {
    static login(successCb, errorCb) {
        HTTP.request(
            'POST',
            '/login',
            {},
            function(response, responseHeaders) {
                localStorage.setItem('token', responseHeaders.token);
                successCb();
            },
            errorCb
        );
    }
    static logout(successCb, errorCb) {
        HTTP.request(
            'POST',
            '/logout',
            { token: localStorage.getItem('token') },
            function(){
                localStorage.removeItem('token');
                successCb();                                
            },
            errorCb
        );

        localStorage.removeItem('token');
    }
}

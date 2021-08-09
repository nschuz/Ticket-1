class Login {
    constructor(email, password, method) {
        this.email = email;
        this.password = password;
        this.method = method;
    }
    async iniciar() {
        let formData = new FormData();
        formData.append('email', this.email);
        formData.append('password', this.password);

        await fetch("http://localhost:8080/it/login", {
            body: formData,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: this.method,
        });

    }
}


window.onload = function() {
    const btnLogin = document.querySelector('#login');
    btnLogin.addEventListener('click', iniciarSesion);
}

async function iniciarSesion() {
    const password = document.querySelector('#password').value;
    const email = document.querySelector('#email').value;
    const login = new Login(email, password, 'POST');
    await login.iniciar();

}
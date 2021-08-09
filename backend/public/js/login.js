class Login {
    constructor(email, password, method) {
        this.email = email;
        this.password = password;
        this.method = method;
    }
    async iniciar() {
        let formData = new FormData();
        console.log(this.email)
        formData.append('email', this.email);
        formData.append('password', this.password);

        // fetch("http://localhost:8080/it/login", {
        //     body: formData,
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded",
        //     },
        //     method: 'POST',
        // }).then((response) => {
        //     console.log(response)
        // });


        const form = document.querySelector('#formlogin');
        form.submit();

    }
}


window.onload = function() {
    const btnLogin = document.querySelector('#login');
    btnLogin.addEventListener('click', iniciarSesion);
}

async function iniciarSesion() {
    console.log("hola")
    const password = document.querySelector('#password').value;
    const email = document.querySelector('#email').value;
    const login = new Login(email, password, 'POST');
    await login.iniciar();

}
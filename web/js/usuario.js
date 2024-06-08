$(document).ready(function () {
    $("form").submit(function (event) {

        // Impede o envio normal do formulário
        event.preventDefault();

        const nome = $("#nome").val();
        const email = $("#email").val();
        const senha = $("#senha").val();

        fetch("http://localhost:3000/usuarios", {
            method: "POST",
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha
            })
        }).then(function (res) { return res.json() })
            .then(function (data) { console.log(data) })
            .catch(function (error) { console.log(error) })
    });
});



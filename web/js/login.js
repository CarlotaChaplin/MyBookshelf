function login(event){
    event.preventDefault();

    const email = $("#email").val();
    const senha = $("#senha").val();

    fetch(`http://localhost:3000/usuarios?email=${email}&senha=${senha}`)
    .then(function (res) { return res.json() })
    .then(function (data) { 
        console.log(data);
        window.location.href = "index.html"
    })
    .catch(function (error) { 
        console.log(error)
        alert("Login inválido") 
    })
}
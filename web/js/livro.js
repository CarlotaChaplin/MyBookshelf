function cadastrar(event) {
    event.preventDefault();

    const titulo = $("#titulo").val();
    const nome = $("#nome").val();
    const genero = $("#genero").val();

    console.log(titulo);

    fetch("http://localhost:3000/cadastros", {
        method: "POST",
        body: JSON.stringify({
            titulo: titulo,
            nome: nome,
            genero: genero
        })
    }).then(function (res) { return res.json() })
        .then(function (data) { 
            console.log(data);
            voltarHome(); 
        })
        .catch(function (error) { console.log(error) })
}

function voltarHome(){
    window.location.href = "index.html"
}
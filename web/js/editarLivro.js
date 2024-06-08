function voltarHome() {
    window.location.href = "index.html"
}

$(document).ready(function () {
    async function carregarLivro() {
        // Cria um objeto URLSearchParams a partir da parte de pesquisa da URL
        let params = new URLSearchParams(window.location.search);

        // Obtém o valor do parâmetro 'id'
        let id = params.get('id');
        console.log(id);  // Output: valor do parâmetro 'id'

        if (id == "" || id == null) {
            voltarHome();
        }

        const res = await fetch(`http://localhost:3000/cadastros/${id}`)
        const data = await res.json();
        console.log(data);

        $("#titulo").val(data.titulo);
        $("#nome").val(data.nome);
        $("#genero").val(data.genero);

    }

    carregarLivro();


});


function atualizar(event) {
    event.preventDefault();

    const titulo = $("#titulo").val();
    const nome = $("#nome").val();
    const genero = $("#genero").val();

    console.log(titulo);

    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');

    fetch(`http://localhost:3000/cadastros/${id}`, {
        method: "PUT",
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
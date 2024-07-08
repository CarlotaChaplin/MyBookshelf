function voltarHome() {
  window.location.href = "/book"
}

$(document).ready(function () {
  async function carregarLivro() {
    // Obtém o valor do parâmetro 'id'
    const id = $("#id").val();

    if (id == "" || id == null) {
      voltarHome();
    }

    const res = await fetch(`http://localhost:8080/api/book/${id}`)
    const data = await res.json();

    $("#titulo").val(data.title);
    $("#nome").val(data.name);
    $("#genero").val(data.gender);
  }

  carregarLivro();
});


function atualizar(event) {
  event.preventDefault();

  const titulo = $("#titulo").val();
  const nome = $("#nome").val();
  const genero = $("#genero").val();

  const id = $("#id").val();

  fetch(`http://localhost:8080/api/book/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title: titulo,
      name: nome,
      gender: genero
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (res) { return res.json() })
    .then(function (data) {
      console.log(data);
      voltarHome();
    })
    .catch(function (error) { console.log(error) })
}
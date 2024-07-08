function cadastrar(event) {
  event.preventDefault();

  const titulo = $("#titulo").val();
  const nome = $("#nome").val();
  const genero = $("#genero").val();

  fetch("http://localhost:8080/api/book", {
    method: "POST",
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
      voltarHome();
    })
    .catch(function (error) { console.log(error) })
}

function voltarHome() {
  window.location.href = "/book"
}
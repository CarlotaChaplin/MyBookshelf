$(document).ready(function () {
  $("form").submit(function (event) {
    // Impede o envio normal do formulário
    event.preventDefault();

    const nome = $("#nome").val();
    const email = $("#email").val();
    const senha = $("#senha").val();

    fetch("http://localhost:8080/api/user", {
      method: "POST",
      body: JSON.stringify({
        name: nome,
        email: email,
        password: senha
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(function (res) { return res.json() })
    .then(function (data) { 
      console.log(data);
      window.location.href = "/book"; 
    })
    .catch(function (error) { console.log(error) })
  });
});



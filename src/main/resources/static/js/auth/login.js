function login(event) {
  event.preventDefault();

  const email = $("#email").val();
  const senha = $("#senha").val();

  fetch(`http://localhost:8080/api/user/login`,{
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: senha
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(function (res) { 
      if (res.status == 200) {
        return res.json()
      }
      throw new Exception("Erro")
    })
    .then(function (data) {
      console.log(data);
      window.location.href = "/book"
    })
    .catch(function (error) {
      console.log(error)
      alert("Login inválido")
    })
}

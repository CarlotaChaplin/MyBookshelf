const list = async () => {
  const res = await fetch('http://localhost:8080/api/book');
  const data = await res.json();
  mountTable(data);
}

const search = async (title) => {
  const res = await fetch(`http://localhost:8080/api/book/search?title=${title}`);
  const data = await res.json();
  mountTable(data);
};

const mountTable = (data) => {
  $('#tabela').empty();
  data.forEach(element => {
    $('#tabela').append(`
      <tr>
        <th scope="row">${element.id}</th>
        <td>${element.title}</td>
        <td>${element.name}</td>
        <td>${element.gender}</td>
        <td>
          <div class="d-flex">
            <button id="#editar-${element.id}" type="button" class="me-1 btn btn-primary" onclick="editar('${element.id}')">
              <i class="bi bi-pencil"></i>
            </button>
            <button id="#excluir-${element.id}" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" data-item-id="${element.id}" data-item-name="${element.title}">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `);
  });
};

$(document).ready(function () {
  list();
})

document.addEventListener('DOMContentLoaded', function () {
  var deleteModal = document.getElementById('exampleModal');
  deleteModal.addEventListener('show.bs.modal', function (event) {
    // Botão que acionou o modal
    var button = event.relatedTarget;

    // Extrair informações dos data-* attributes
    var itemId = button.getAttribute('data-item-id');
    var itemName = button.getAttribute('data-item-name');

    // Atualizar o conteúdo do modal
    var modalTitle = deleteModal.querySelector('.modal-title');
    var modalBodySpan = deleteModal.querySelector('#itemName');

    modalTitle.textContent = 'Excluir ' + itemName;
    modalBodySpan.textContent = itemName;

    // Adicionar ação ao botão de confirmação
    var confirmButton = deleteModal.querySelector('#confirmDelete');
    confirmButton.onclick = function () {
      // Aqui você pode adicionar a lógica para excluir o item
      console.log('Excluir item com ID: ' + itemId);
      excluir(itemId);

      // Fechar o modal (opcional)
      var modalInstance = bootstrap.Modal.getInstance(deleteModal);
      modalInstance.hide();
    };
  });
})

function editar(id) {
  window.location.href = `/book/${id}/update`;
}

function excluir(id) {
  fetch(`http://localhost:8080/api/book/${id}`, {
    method: "DELETE"
  }).then((data) => {
    if (data.status == 204) {
      list();
    }
  })
  .catch(function (error) { console.log(error) })
}

function searchTitle(event) {
  event.preventDefault();

  const title = $("#searchtitle").val();
  search(title);
}
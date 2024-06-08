$(document).ready(function () {
    $.get("http://localhost:3000/cadastros", function (data, status) {
        for (i = 0; i < data.length; i++) {
            $('#tabela').append(`
            <tr>
                <th scope="row">${data[i].id}</th>
                <td>${data[i].titulo}</td>
                <td>${data[i].nome}</td>
                <td>${data[i].genero}</td>
                <td>
                    <div class="d-flex">
                        <button id="#editar-${data[i].id}" type="button" class="me-1 btn btn-primary" onclick="editar('${data[i].id}')" >
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button 
                            id="#excluir-${data[i].id}" 
                            type="button" 
                            class="btn btn-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            data-item-id="${data[i].id}"
                            data-item-name="${data[i].titulo}"
                        >
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `);
        }
    });
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
    window.location.href = `editarLivro.html?id=${id}`
}

function excluir(id) {
    fetch(`http://localhost:3000/cadastros/${id}`, {
        method: "DELETE"
    }).then(function (res) { return res.json() })
        .then(function (data) { console.log(data) })
        .catch(function (error) { console.log(error) })
}

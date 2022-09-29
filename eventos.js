async function excluir (id) {
    let resposta = confirm('Deseja excluir este item?');
    if(resposta != true)
    {
        return;
    }
    await fetch('http://localhost:8000/compras/'+id, {
        method: 'DELETE'
    });
    atualizarLista();
}

function atualizarLista() {
    tabela_compras.innerHTML ='';
    fetch('http://localhost:8000/compras')
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (lista) {
        lista.forEach(function (cadaItem) {
            tabela_compras.innerHTML += `
                <tr>
                    <td>${cadaItem.id}</td>
                    <td>${cadaItem.item}</td>
                    <td>${cadaItem.quantidade}</td>
                    <td>
                        <button onclick="excluir(${cadaItem.id})" class="btn btn-danger">
                            Excluir
                        </button>
                        <button onclick="editarItem(${cadaItem.id})" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editarModal">
                            Editar
                        </button>
                    </td>
                </tr>
            `;
        });
    })
}

atualizarLista();
function inserirNovoItem(){
    event.preventDefault();
    let dados ={
        item: input_item.value,
        quantidade: parseInt(input_quantidade.value),    
    };
    
    if(dados.item != '' || dados.quantidade){
        fetch('http://localhost:8000/compras',{
            method: 'POST',
            body: JSON.stringify(dados),// convertendo dados que é um objeto em um novo array de string
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(resposta => resposta.json())
        .then(item => atualizarLista());

        form_add.reset();
    }else{
        alert('Não há items para serem adicionados!');
    }

}
function editarItem()
{
    //fazer um fetch get com o id
    event.preventDefault();
    let dados ={
        item: nome_item.value,
        quantidade: parseInt(numero_quantidade.value),
    };
    fetch('http://localhost:8000/compras',{
        method: 'PATCH',
        body: JSON.parse(dados),// convertendo dados que é um objeto em um novo array de string
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then(resposta => resposta.json())
    .then(item => atualizarLista());
}
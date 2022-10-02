const url ='https://633349f2573c03ab0b5b9af4.mockapi.io/ListaDeCompras/'


async function excluir(id) {
    let resposta = confirm('Deseja excluir este item?');
    if(resposta != true)
    {
        return;
    }else{
        await fetch(url + id, {
            method: 'DELETE'
        });
        atualizarLista();
    }
}

function atualizarLista() {
    tabela_compras.innerHTML ='';
    fetch(url)
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
                        <button onclick="editarItem(${cadaItem.id})" class="btn btn-warning" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEditar">
                            Editar
                        </button>
                    </td>
                </tr>
            `;
        });
    })
}
async function inserirNovoItem(){
    event.preventDefault();
    let dados ={
        item: input_item.value,
        quantidade: parseInt(input_quantidade.value),    
    };
    if(dados.item !== '' && dados.quantidade >= 1){
        await fetch(url,{
            method: 'POST',
            body: JSON.stringify(dados),// convertendo dados que é um objeto em um novo array de string
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(resposta => resposta.json())
        .then(item => atualizarLista());

        form_add.reset();
        let x = document.querySelector('[data-bs-dismiss="modal"]');
        x.dispatchEvent(new Event('click'));
        
    }else{
        alert('Não há items para serem adicionados!');
    }
}
async function editarItem(id)
{
    await fetch(url + id)//url + o id do item que foi selecionado
    .then(res=> res.json())
    .then(dados =>{
        input_editar_id.value = dados.id;
        input_editar_item.value = dados.item;
        input_editar_quantidade.value = dados.quantidade;
    });
}
async function atualizarItemEditado()
{
    event.preventDefault();//impede a pagina de recarregar
    console.log(2);
    let dados = {
        id: input_editar_id.value,
        item: input_editar_item.value,
        quantidade: input_editar_quantidade.value,
    };
    await fetch(url + dados.id,{
        method: 'PUT',
        body: JSON.stringify(dados),// convertendo dados que é um objeto em um novo array de string
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then(res => res.json())
    .then(() => atualizarLista());
    let x = document.querySelector('[data-bs-dismiss="offcanvas"]');
    x.dispatchEvent(new Event('click'));
}

atualizarLista();
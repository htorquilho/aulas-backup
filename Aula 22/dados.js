function editarBebida() {
    form_titulo.innerHTML = 'Editar Bebida';

    fetch(`http://localhost:8000/bebidas/${id}`)
    .then(res => res.json())
    .then(dados => {
        //preenchimento do formulário
        input_nome.value = dados.nome;
        input_quantidade.value = dados.quantidade;
        input_foto.value = dados.foto;
        input_descricao.value = dados.descricao;
    })

    form_cadastro.setAttribute('onsubmit', `salvarBebida(${id})`);
}

//confirmar o editar
async function salvarBebida(id) {

}

async function addBebida() {
    event.preventDefault();

    if (input_nome.value === '') {
        addNotificacao('Nome inválido', 'danger');
        return;
    }

    await fetch('http://localhost:8000/bebidas', {
        method: 'POST',
        headers: {
            "Content-Type": "aplication/json"
        },
        body: JSON.stringify({
            nome: input_nome.value,
            descricao: input_descricao.value,
            quantidade: input_quantidade.value,
            foto: input_foto.value
        })
    });

    addNotificacao('Bebida cadastrada com sucesso!');
    
    //limpar os campos do form
    form_cadastro.reset();

    //simula um click fora para fechar o formulário
    fechar_cadastro.dispatchEvent(new Event('click'));

    //atualizar a tabela do html
    buscarBebida();
}


function abrirModal(foto, nome) {
    modalFotoConteudo.innerHTML = `<img width="100%" src="${foto}">`;
    modalTitulo.innerHTML = nome;
}

function atualizarTabela(lista) {
    document.getElementById('tabela-dados').innerHTML = '';

    lista.map((cada) => {
        document.getElementById('tabela-dados').innerHTML += `
            <tr>
                <td>${cada.id}</td>
                <td>${cada.nome}</td>
                <td>${cada.descricao}</td>
                <td>${cada.quantidade}</td>
                <td>
                    <a onclick="abrirModal('${cada.foto}', '${cada.nome}')" href="#" data-bs-toggle="modal" data-bs-target="#modalFoto">
                        <img src="${cada.foto}" width="50px">
                    </a>
                </td>
                <td>
                    <a href="#cadastro" data-bs-toggle="offcanvas" class="btn btn-outline-warning btn-sm">Editar</a>
                    <button onclick="confirmarExcluir(${cada.id})" class="btn btn-outline-danger btn-sm">Excluir</button>
                </td>
            </tr>
        `;
    });
}

function buscarBebida() {
    //buscar na API os dados das bebidas
    fetch('http://localhost:8000/bebidas')
        .then(res => res.json())
        .then(dados => atualizarTabela(dados));
}

function confirmarExcluir(id) {
    addConfirmacao('Deseja excluir a bebida ' + id + '?');

    confirmacao_sim.setAttribute('onclick', `excluirBebida(${id})`);
}

async function excluirBebida(id) {
    let resposta = addConfirmacao('Deseja excluir essa bebida?');

    if (resposta !== true) {
        return;
    }

    addNotificacao('Bebida excluída com sucesso!')
    
    
    //faz a requisição e espera que ela termine
    await fetch('http://localhost:8000/bebidas/'+id, {
        method: 'DELETE'
    });

    alert('Bebida deletada com sucesso!');

    buscarBebida();
}

//assim que atualizar a pagina essa funcao vai ser executada
buscarBebida();
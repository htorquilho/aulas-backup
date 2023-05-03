async function addBebida() {
    event.preventDefault();

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
                    <button class="btn btn-ou ztline-warning btn-sm">Editar</button>
                    <button onclick="excluirBebida(${cada.id})" class="btn btn-outline-danger btn-sm">Excluir</button>
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


async function excluirBebida(id) {
    //faz a requisição e espera que ela termine
    await fetch('http://localhost:8000/bebidas/'+id, {
        method: 'DELETE'
    });

    alert('bebida deletada com sucesso!');

    buscarBebida();
}

//assim que atualizar a pagina essa funcao vai ser executada
buscarBebida();
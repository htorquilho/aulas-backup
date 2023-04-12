fetch('https://servicodados.ibge.gov.br/api/v1/localidades/regioes/1|2|3|4|5') //promise
    .then(resposta => resposta.json()) //então extrai o conteúdo
    .then(conteudo => {
        conteudo.map((valor) => {
            regiao.innerHTML += `<option value="${valor.id}">${valor.nome}</option>`
        });
    }); //então usa o conteúdo

function buscarEstados() {
    //resetando o select
    estado.innerHTML = '<option selected>-- Selecione --</option>';

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/regioes/${regiao.value}/estados?orderBy=nome`)
    .then(resposta => resposta.json())
    .then(conteudo => {
        conteudo.map((valor) => {
            estado.innerHTML += `<option value="${valor.id}">${valor.nome}</option>`
        });
    });
}

function buscarCidades() {
    //resetando o select
    cidade.innerHTML = '<option selected> Aguarde, carregando...</option>';
    carregando.style.visibility = 'visible';

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado.value}/distritos?orderBy=nome`)
    .then(resposta => resposta.json())
    .then(conteudo => {
       
        carregando.style.visibility = 'hidden';
        cidade.innerHTML = '<option selected>-- Pronto, selecione --</option>';

        conteudo.map((valor) => {
            cidade.innerHTML += `<option value="${valor.id}">${valor.nome}</option>`
        });
    });
}

/* Forma 1 - Arrow Function

regioes.map((valor) => {
    regiao.innerHTML += `<option>${valor.nome}</option>`
});
*/

/* Forma 2 - Função Anônima

regioes.map(function(valor) {
    regiao.innerHTML += `<option>${valor}</option>`
});
*/

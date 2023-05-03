function addNotificacao(mensagem, color = 'success') {
    notificacao.classList = 'toast'; //reset nas classes do toast
    notificacao.classList.add('text-bg'+color);

    //criando um elemento "toast" do Bootstrap
    let toast = bootstrap.Toast.getOrCreateInstance(notificacao);

    //mensagem a ser mostrada
    notificacao_texto.innerHTML = mensagem;

    //mandando mostrar o toast
    toast.show();
}

function addConfirmacao(mensagem) {
    let toast = bootstrap.Toast.getOrCreateInstance(confirmacao);

    confirmacao_texto.innerHTML = mensagem;

    toast.show();
}

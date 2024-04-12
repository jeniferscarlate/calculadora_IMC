//IMC

//1. capturar valores - ok
//2. calcular IMC - ok
//3. gerar classificação do IMC - ok
//4. organizar as informações - ok
//5. salvar os dados na lista 
//6. ler a lista com os dados
//7. renderizar o conteúdo no HTML (tabela)
//8. botão de limpar os registros (clear (LocalStorage))

function CapturarValores() {
    const nome = document.getElementById('name').value;
    const altura = document.getElementById('height').value;
    const peso = document.getElementById('weight').value;

    const dadosUsuario = {
        nome: nome,
        height: altura,
        peso: peso
    }
    return dadosUsuario;
}

function CalcularImc(peso, altura) {
    const imc = peso / (altura * altura);
    return imc;
}

function ClassificarImc(imc) {
    if(imc < 18.5) {
        return 'Abaixo do peso!';
    }
    else if(imc < 25) {
        return 'Peso normal';
    }
    else if(imc < 30) {
        return 'Sobrepeso';
    }
    else{
        return 'Obesidade';
    }
}

function OrganizarDados(dadosUsuario, valorImc, classificacaoImc) {
    const dataHoraAtual = Intl.DateTimeFormat('pt-BR', {timeStyle: 'long', dateStyle: "short"}).format(Date.now());
    const dadosUsuarioCompleto = {
        ...dadosUsuario,
        // (... operador rest)
        imc: valorImc.toFixed(2),
        classificacaoImc: classificacaoImc,
        dataCadastro: dataHoraAtual
    }
    return dadosUsuarioCompleto;
}


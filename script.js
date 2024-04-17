//IMC

//1. capturar valores - ok
//2. calcular IMC - ok
//3. gerar classificação do IMC - ok
//4. organizar as informações - ok
//5. salvar os dados na lista - ok
//6. ler a lista com os dados -
//7. renderizar o conteúdo no HTML (tabela)
//8. botão de limpar os registros (clear (LocalStorage))


 //responsavel por chamar todas as outras funções
function CalcularValores(event) {
    event.preventDefault();

    let dadosUsuario = CapturarValores();

    let imc = CalcularImc(dadosUsuario.altura, dadosUsuario.peso);

    let classificacao = ClassificarImc(imc);

    let dadosUsuarioCompleto = OrganizarDados(dadosUsuario, imc, classificacao);

    CadastrarUsuario(dadosUsuarioCompleto);

    window.location.reload();

}


function CapturarValores() {
    const nome = document.getElementById('name').value;
    const altura = document.getElementById('height').value;
    const peso = document.getElementById('weight').value;

    const dadosUsuario = {
        nome: nome,
        altura: altura,
        peso: peso
    }
    return dadosUsuario;
}

function CalcularImc(altura, peso) {
    const imc = peso / (altura * altura);
    return imc;
}

function ClassificarImc(imc) {
    if(imc < 18.5) {
        return 'Abaixo do peso!';
    }
    else if (imc >= 18.5 && imc < 24.9) {
        return 'Peso normal';
    }
    else if (imc >= 25.0 && imc < 29.9) {
        return 'Sobrepeso';
    }
    else if (imc >= 30.0 && imc < 34.9) {
        return 'Obesidade grau I';
    }
    else if (imc >= 35.0 && imc < 39.9) {
        return 'Obesidade grau II';
    }
    else{
        return 'Obesidade Grau III (Morbida)';
    }
}

function OrganizarDados(dadosUsuario, valorImc, classificacaoImc) {

    const dataHoraAtual = Intl.DateTimeFormat('pt-BR',{timeStyle: 'long', dateStyle: 'short'}).format(Date.now());

    const dadosUsuarioCompleto = {
        ...dadosUsuario,
        // (... operador rest)
        imc: valorImc.toFixed(2),
        classificacaoImc: classificacaoImc,
        dataCadastro: dataHoraAtual
    }
    return dadosUsuarioCompleto;
}

function CadastrarUsuario(usuario) {

    //cria um array vazio para armazenar os valores do usuário;
    let listaUsuario = [];

    //verifica se dentro do localStorege eu tenho as informações do usuário;
    if(localStorage.getItem('usuariosCadastrados')) {
        //se sim, eu guardo as informações dentro do array;
        //parse => de JSON para object;
        listaUsuario = JSON.parse(localStorage.getItem('usuariosCadastrados'));
    }

    //cadastrar usuário dentro do array;
    listaUsuario.push(usuario);

    //caso contrário, eu crio um novo item no localStorege;
    //stringify => object para JSON;
    localStorage.setItem('usuariosCadastrados', JSON.stringify(listaUsuario));
}

function CarregarUsuarios() {
    
    let listaUsuario = [];

    if(localStorage.getItem('usuariosCadastrados')) {
        listaUsuario = JSON.parse(localStorage.getItem('usuariosCadastrados'));
    }

    if(listaUsuario.length == 0) {
        let tabela = document.getElementById('corpo-tabela');

        tabela.innerHTML = `
            <tr class='linha-mensagem'>
                <td colspan='6'> Nenhum usuário cadastrado. </td>
            </tr>
        `
    }
    else {
        MontarTabela(listaUsuario);
    }
}

window.addEventListener('DOMContentLoaded', () => CarregarUsuarios());

function MontarTabela(listaDeCadastrados) {
    let tabela = document.getElementById('corpo-tabela');

    let template = '';

    listaDeCadastrados.forEach(pessoa => {
        template += `
            <tr>
                <td data-cell='nome'> ${pessoa.nome} </td>            
                <td data-cell='altura'> ${pessoa.altura} </td>            
                <td data-cell='peso'> ${pessoa.peso} </td>            
                <td data-cell='imc'> ${pessoa.imc} </td>            
                <td data-cell='classificacao'> ${pessoa.classificacaoImc} </td>            
                <td data-cell='dataCadastro'> ${pessoa.dataCadastro} </td>            
            </tr>
        `
    });

    tabela.innerHTML = template;
}

function DeletarRegistros() {
    
    localStorage.clear();

    window.location.reload();
} 


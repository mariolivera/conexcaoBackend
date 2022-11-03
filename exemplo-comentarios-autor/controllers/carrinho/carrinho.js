const {pegarUsuarioLogado} = require('../usuario/usuario');
const fs = require('fs');

let carrinho = JSON.parse(fs.readFileSync(__dirname + "/carrinho.json"));

function buscarCarrinhoDoUsuario(token) {
    if (!token) {
        return false;
    }

    let usuario = pegarUsuarioLogado(token);

    let resultado = carrinho.filter(cadaItem => cadaItem.usuario === usuario.id);

    return JSON.stringify(resultado);
}

function addAoCarrinho(token, dados) {
    if (!token) {
        return false;
    }

    let usuario = pegarUsuarioLogado(token);

    let identificadores = carrinho.map(item => item.id);

    let novoId = Math.max(...identificadores) + 1;
    
    let novoItem = {
        id: novoId,
        produto: dados.produto,
        quantidade: dados.quantidade,
        usuario: usuario.id
    }

    //adicionando o novoItem ao carrinho
    carrinho.push(novoItem);

    //reescrevendo o arquivo
    fs.writeFileSync(__dirname+'/carrinho.json', JSON.stringify(carrinho));

    return novoItem;
}

function excluirItemDoCarrinho (token, id) {
    if (!token) {
        return 401;
    }

    let usuario = pegarUsuarioLogado(token);

    //filtrando apenas os items desse usuario logado
    let produtos = carrinho.filter(cadaItem => {
        return cadaItem.id !== parseInt(id);
    });

    fs.writeFileSync(__dirname + '/carrinho.json', JSON.stringify(produtos));

    return 204;
}

module.exports = {
    buscarCarrinhoDoUsuario,
    addAoCarrinho,
    excluirItemDoCarrinho,
}
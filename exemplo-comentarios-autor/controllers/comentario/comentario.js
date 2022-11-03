const fs = require('fs');
const { executarNoBanco } = require('../../connection');

// function listar(produtoIdParam) {
//     return JSON.parse(fs.readFileSync(__dirname + '/comentario.json').toString())
//         .filter(({ produtoId }) => produtoId === produtoIdParam);
// }

async function listar(produtoIdParam) {
    return await executarNoBanco(`SELECT * FROM dc.comentarios WHERE id_produto = ${produtoIdParam};`)
}

// function listarAutor(produtoIdParam, autorParam = '') {
//     return listar(produtoIdParam)
//         .filter(({ nomeDoAutor }) => nomeDoAutor.toLowerCase().indexOf(autorParam.toLowerCase()) >= 0)
// }

async function listarAutor(produtoIdParam, autorParam = '') {
    return await executarNoBanco(`SELECT * FROM dc.comentarios WHERE autor LIKE '%${autorParam}%' AND id_produto = ${produtoIdParam};`)
}


async function listarAutorProduto(autorParam = '') {
    return await executarNoBanco(`
    SELECT 
        com.comentario, com.autor, com.data, pro.categoria, pro.nome 
    FROM 
        dc.comentarios com, dc.produtos pro 
    WHERE 
        com.autor LIKE '%${autorParam}%' AND
        com.id_produto = pro.id;
    `)
}

module.exports = {
    listar,
    listarAutor,
    listarAutorProduto
}
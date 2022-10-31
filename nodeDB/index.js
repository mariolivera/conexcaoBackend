const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 8000;


app.use(express.json());


async function executarNoBanco(query){
    const conexao = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'dc'
        }); // aqui faz a conexçao com o banco de dados

    const[results, ] = await conexao.execute(query);
    return results;
}



app.get('/produtos', async (req, res) => {
    let produtos = await executarNoBanco('SELECT * FROM produtos');
    
    res.send(produtos);
}) // aqui fazemos um get dos produtos que estão no banco de dados.



app.get('/produtos/:id', async (req, res) => {
    let produto = await executarNoBanco('SELECT * FROM produtos WHERE id=' +req.params.id);
    res.send(produto[0]);
}) // aqui estamos buscando os itens filtrados por id. o [0] ele sempre irá pegar o primeiro item fora do array.



app.delete('/produtos/:id', async (req, res) => {
    let query = 'DELETE FROM produtos WHERE id='+req.params.id;

    await executarNoBanco(query);

    res.send(204); // aqui é onde vamos excluir os itens pelo id.
})

app.post('/produtos', async (req, res) => {
    const body = req.body;
    let query = `
    INSERT INTO produtos 
        (nome, categoria, valor, tamanho, idprodutos)
    VALUE ('${body.nome}', '${body.categoria}', '${body.valor}', '${body.tamanho}', '${body.idprodutos}')
    `;

    const resultado = await executarNoBanco(query);
    body.id = resultado.insertId;
    res.send(body)

}); // aqui estamos postando os itens na lista, ela vai para API e depois irá alimentar o Banco de dados.

app.patch('/produtos/:id', async(req, res) =>{
    const body = req.body;
    let query = `
    UPDATE produtos SET 
        categoria = '${body.categoria}',
        tamanho = '${body.tamanho}'
    WHERE id = '${req.params.id}'
    `;

    await executarNoBanco(query);

    res.send(body)
}); // aqui vamos atualizar os itens, nesse caso por categoria.


app.listen(port, () =>{
    console.log("servidor rodando em http://localhost:8000");
}); // aqui é para execultar e ficar escultando todo que estar acontecendo.

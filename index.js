const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1', keyspace: 'aula' });

// conectar();

async function conectar(){
    await client.connect();
    console.log('ok');
    await client.shutdown();
}

// salvar({
//     email:'maria@gmail.com',
//     nome: 'Maria'
// });

async function salvar(usuario){
    await client.connect();

    await client.execute('INSERT INTO usuario (email,nome) VALUES (?,?) IF NOT EXISTS',
        [usuario.email, usuario.nome],{prepare:true}).then(result => console.log(result));

    await client.shutdown();
}

listar();

async function listar(){
    await client.connect();

    await client.execute('SELECT JSON * FROM usuario').then(result =>{
        result.rows.forEach(r => console.log(r['[json]']));
    });

    await client.shutdown();
}
const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1', keyspace: 'aula' });

conectar();

async function conectar(){
    await client.connect();
    console.log('ok');
    await client.shutdown();
}
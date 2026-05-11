import { fastify } from 'fastify'
import 'dotenv/config';
import { DatabaseMYSQL } from './database-mysql';
const { PORT } = process.env;


const server = fastify();

server.get('/', async (requestAnimationFrame, reply) =>{
    return { message: 'API server - Gestor de Videos'};
})

const database = new DatabaseMYSQL();

server.post('/videos', async (request, reply) =>{
    const { title, description, duration } = request.body;
    await database.create({
        title,
        description,
        duration
    });
    console.log(await database.list());
    return reply.status(201).send();
})
server.get('/videos', async (request) =>{
    const search = request.query.search
    console.log(search)
    const videos = await database.list(search);
})
server.put('/videos/:id', async (request, reply) =>{
    const videoId = request.params.id;
    const { title, description, duration } = request.body;

    const video = await database.update(videoId, {
        title,
        description,
        duration
    });

    return reply.status(204).send();
})
server.delete('/videos/:id', async (request, reply) =>{
    const videoId = request.params.id;
    await database.delete(videoId);
    return reply.status(204).send();
})

server.listen({ port:PORT}, (err, address) => {
    if(err){
        console.error(err);
        process.exit(1);
    }
    console.log(`Servidor rodando em ${address}`);
})
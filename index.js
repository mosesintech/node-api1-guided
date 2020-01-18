const express = require('express');

const Hubs = require('./data/hubs-model');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send({ hello: 'Web25' });
})

server.get('/api/hubs', (req, res) => {
    Hubs.find()
        .then(hubs => {
            res.status(200).json(hubs);
        })
        .catch(error => {
            res.status(500).json({ message: 'got a big ol\' prollem'});
        }) 
})

server.post('/api/hubs', (req, res) => {
    const hubData = req.body;
    Hubs.add(hubData)
        .then(hub => {
            res.status(201).json(hub);
        })
        .catch(error => {
            res.status(500).json({ error: "It all broke, man." });
        })
})

server.delete('/api/hubs/:id', (req, res) => {
    const id = req.params.id;
    Hubs.remove(id)
        .then((deleted) => {
            res.status(200 ).json(deleted);
        })
        .catch(error => {
            res.status(500).json({ error: 'dang, something broke' })
        })
})

const port = 8000;

server.listen(port, () => console.log("API is working my man"));
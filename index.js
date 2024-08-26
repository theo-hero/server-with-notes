const express = require('express');
const cors = require('cors');
const app = express()

let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

app.use(express.json());
app.use(cors());

app.get('/', (_, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (_, response) => {
    let phrase = `<p>There are ${notes.length} notes</p><p>${new Date(Date.now())}</p>`;
    response.send(phrase)
})

app.get('/api/notes', (_, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)
    note ? response.json(contact) : response.status(404).json({ error: "there is no such note" })
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    notes = notes.filter(contact => contact.id !== id);
    response.status(204).end();
})

app.post('/api/notes', (request, response) => {
    request.body.entries && response.status(406).send('<p>Gimme at least some info!!!</p>');

    const note = request.body.text || "a new note";
    const id = Math.floor(Math.random() * 1000);
    notes.push({ id, note });

    response.status(200).end();
})

const unknownAddress = (_, response) => {
    response.status(404).send({ error: "no such address" })
}

app.use(unknownAddress);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
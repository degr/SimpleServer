const UserController = require("./controllers/UserController.js");
const express = require('express');
const app = express();
const port = 80;

app.use('/assets', express.static(__dirname + '/assets'));
app.use(express.json());

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

const userController = new UserController(__dirname);

app.post('/users/list', (req, res) => {
    userController.getList(req.body.pagination, req.body.filter, res);
});

app.get('/users/:id', (req, res) => {
    userController.getOne(parseInt(req.params.id), res);
});


app.post('/users/save', (req, res) => {
    userController.save(req.body, res);
});


app.listen(port, (err) => {
    if (err) {
        return console.log("Can't start server", err);
    }
    console.log(`Server started ${port}`);
});
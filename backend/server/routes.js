const express = require('express');
const toDo = require('./connection');

const routes = express.Router();

routes.get('/', async function(req,res){
    const listToDo = await toDo.find();
    res.json(listToDo);
});

//lista To Do

routes.get('/todo', async function(req,res){
    const listToDo = await toDo.find({isActive: true});
    res.json(listToDo);
});

//Cria To Do

routes.post('/todo', async function(req,res){
    const newToDo = req.body.name;
    console.log(newToDo);
    try{
        const addDb =  new toDo({name: newToDo, isActive: true, isCompleted: false});
        addDb.save();
        return res.json(await toDo.findOne({name: newToDo}));
    } catch(e){
        return res.sendStatus(404);
    }
});

//Edita ToDo

routes.put('/todo/editar/:id', async function(req, res){
    const todoId = req.params.id;
    try{
        const newName = req.body.newName;
        const isCompleted = req.body.isCompleted;
        const actualToDo = await toDo.findOne({_id: todoId});
        actualToDo.name = newName;
        actualToDo.isCompleted = isCompleted;
        actualToDo.save();
        return res.json(actualToDo);
    } catch(e){
        return res.sendStatus(404);
    }
});

//Deleta ToDo

routes.delete('/todo/delete/:id', async function(req, res){
    const todoId = req.params.id;
    try{
        const actualToDo = await toDo.findOne({_id: todoId});
        actualToDo.isActive = false;
        actualToDo.save();
        console.log(actualToDo.isActive);
        return res.json('deleted');
    }catch(e){
        return res.sendStatus(404);
    }
})

module.exports = routes;
const express = require('express');
const router = express.Router();
const Todo = require('../models/todoModel')

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        console.log(error);
    }
});

router.post('/new', (req, res) => {
   try {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save();

    res.json(todo);
   } catch (error) {
    console.log(error);
   }
});

router.put('/update/:id', async (req, res) => {
    try {
        const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json("Todo Updated")
       
    } catch (error) {
        res.json(err)
    }
}) 

router.delete('/delete/:id', async (req, res) => {
    try {
        const deleteItem = await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json('Item Deleted')
   
    } catch (error) {
        console.log(error);
    }
});

router.get('/complete/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete

    todo.save();

    res.json(todo);
    } catch (error) {
        console.log(error);
    }
})




module.exports = router;
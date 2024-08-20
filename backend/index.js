const express = require("express");
const {createTodo, updateTodo} = require("./types");
const {todo} = require("./db");

const app = express();

app.use(express.json());

app.post("/todo", async function(req, res){
     const createPayload = req.body;
     const parsedPayload = createTodo.safeParse(createPayload);
     if(!parsedPayload.success){
        res.status(411).json({
            msg : "you sent the wrong inputs"
        })
        return;
     }

     //put it in mongodb
     // why await - await for todo to happen and then only msg to user that a todo created
     //if you not await 90% it'll work bcuz databases not goes down generally 
     // but if any error occurred the msg "to do created " still goes to user

     await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false

     })

     res.json({
        msg: "Todo created"
    })

})

app.get("/todos", async function(req, res){
    const todos = await todo.find({});
    // console.log(todos) //it is a promise so you have to await it

    res.json({
        todos
    })  //then make it 
})

app.put("/completed", async function(req, res){
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg : "you sent a wrong input"
        });
        return;
    }

    //mark it as completed with _id todo
    await todo.findOneAndUpdate({
        _id: req.body.id  //here it is underscore id if yoou can see in mongodb
    },{
        completed: true
    })

    res.json({
        msg: "Todo marked as completed"
    })

})

app.listen(3000);
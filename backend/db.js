const mongoose = require("mongoose");

// mongoose.connect("mongodb+srv://NandiniYadav2:Nandini@cluster0.vlifmjb.mongodb.net/todos")

mongoose.connect("mongodb+srv://NandiniYadav2:Nandini@cluster0.gs67at3.mongodb.net/")


// mongodb+srv://NandiniYadav2:Nandini@cluster0.dhgcsmy.mongodb.net/

const  todoSchema =  mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo =  mongoose.model('todos',todoSchema);

module.exports = {
    todo : todo
}
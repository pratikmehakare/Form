const express =  require("express");
const { getAllForm, createForm, editForm, deleteForm, getFormById } = require("../controllers/formController");
const Route = express.Router();

Route.get('/',getAllForm)
Route.get('/:id',getFormById)
Route.post('/',createForm)
Route.put('/:id',editForm)
Route.delete('/:id',deleteForm)

module.exports = Route
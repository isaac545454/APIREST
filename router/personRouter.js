const router = require('express').Router()
const Person = require('../models/Person')
const mongoose = require('mongoose')

router.post('/', async (req, res)=>{
    const {name, salary, approved} = req.body
    if(!name){
        res.status(422).json({error: "o nome e obrigatorio"})
        return
    }
    const person = {
        name, 
        salary,
        approved
    }

    try {
        let p = await Person.create(person)
        res.status(201).json({message: p})
    } catch (error) {
         res.status(500).json({error: error})
    }
})   


router.get('/:id', async (req, res)=>{
    const id =  mongoose.Types.ObjectId(req.params.id)
    console.log(typeof(id))
    try {
        const person = await Person.findById(mongoose.Types.ObjectId(req.params.id))
        console.log(typeof(person))

        if(!person){
                res.status(422).json({message: "o usuario não foi encontrado"})
                return
        }
        res.status(200).json(person)
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get("/", async (req, res)=>{
    try {
        const people = await Person.find()
        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

//atualizar 

router.patch('/:id', async(req, res)=>{
    const id = req.params.id
    const {name, salary, approved} = req.body
    const person={
        name,
        salary, 
        approved
    }

    try {
      const updatePerson = await Person.updateOne({_id: id}, person)

    
      if(updatePerson.matchedCount === 0){
            res.status(422).json({message: "o usuario não foi encontrado"})
            console.log(updatePerson)
            return
      }
        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.delete('/:id', async (req, res)=>{
    const id = req.params.id
    const person = await Person.findById(mongoose.Types.ObjectId(req.params.id))
    if(!person){
                res.status(422).json({message: "o usuario não foi encontrado"})
                return
    }
    try {
         await Person.deleteOne({_id: id})
         res.status(200).json({id: "usuario removido com sucesso"})
    } catch (error) {
        res.status(500).json({error: error})

    }
})




module.exports = router

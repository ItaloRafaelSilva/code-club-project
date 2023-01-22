const express = require('express')
const uuid = require('uuid')

const stage = ('Em preparação')
const port = 3010
const app= express()
app.use(express.json())


const users = []

app.get('/users',(request, response) =>{
    return response.json(users)
})


app.post('/users',(request, response) =>{
    const {order, clienteName, price, status} = request.body

     const user = { id:uuid.v4(), order, clienteName, price, status }

    users.push(user)
    return response.status(201).json(user)
})

app.put('/users/:id',(request, response) =>{
    const {id} = request.params
    const {order, clienteName, price, status} = request.body

    const updateUser = {id, order, clienteName, price, status }

    const index = users.findIndex (user => user.id === id)

    if(index < 0){
        return response.status(404).json({messagem:'User not founder'})
    }

    users [index] = updateUser

    return response.json(updateUser)
})

app.delete('/users/:id',(request, response) =>{
    const {id} = request.params

    const index = users.findIndex (user => user.id === id)

    if(index < 0){
        return response.status(404).json({messagem:'User not founder'})
    }

    users.splice(index,1)

    return response.status(204).json()
})

app.listen(port, () =>{ 
console.log(`server iniciado ${port}`)})
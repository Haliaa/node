// методи response: res.end, res.write, res.json, res.status(404).json('NOT FOUND')
// http методи: get(read), post(create), put(update/replace), delete(delete), patch(update/modify)
// req- то шо нам послали(наприклад з постмена)
//res.end() -можна пустим залишити(щоб закінчити response), віддає переважно лише стрічку з повідомленням, json віддавати не вміє
//(req.params) зберігаються всі параметри з урли

// app.get('/', (req, res) => {
  //res.write('hello') -можна пустим залишити(щоб закінчити response), віддає переважно лише стрічку з повідомленням, json віддавати не вміє
  //res.write('hello') -можна пустим залишити(щоб закінчити response), віддає переважно лише стрічку з повідомленням, json віддавати не вміє
  //res.write('hello') -можна пустим залишити(щоб закінчити response), віддає переважно лише стрічку з повідомленням, json віддавати не вміє
  //res.end() -всеодно треба, щоб перестало прогружатись(чекати завершення відповіді)
// })\

// endpoint це app.get('/users/:userId/delete' (кін. урла)

//функція обробник(controller): (req, res) => {
//   users.push({
//     name: 'Test',
//     age: Math.floor(Math.random()*100)
//   })
//
//   res.status(201).json('User was created')
// }

const express = require('express')
const users = require('./dataBase/users');
const app = express()

// app.get('/', (req, res) => {
//   res.json('HELLO EXPRESS!')
// })

app.get('/users', (req, res) => {
  res.json(users)
})


app.get('/users/create', (req, res) => {

  users.push({
    name: 'Test',
    age: Math.floor(Math.random()*100)
  })

  res.status(201).json('User was created')
})
// app.post('/user', (req, res) => {
//
// })

app.get('/users/:userId/update', (req, res) => {

  users.push({
    name: 'Test',
    age: Math.floor(Math.random()*100)
  })

  res.status(201).json('User was created')
})
// app.put('/users/:userId', (req, res) => {
//
// })

app.get('/users/:userId/delete', (req, res) => {

  users.push({
    name: 'Test',
    age: Math.floor(Math.random()*100)
  })

  res.status(201).json('User was created')
})
// app.delete('/users/:userId', (req, res) => {
//
// })

app.get('/users/:userId', (req, res) => {
  console.log('Customer want to get user with ID 1')

  const userIndex= +req.params.userId;

  if(isNaN(userIndex) || userIndex<0){
    //400- bad request
    res.status(400).json('Please enter valid Id')
    //завершуємо виконання нашої ф-ї (тільки return)
    return;
  }

  const user = users[userIndex]

  if(!user){
    res.status(404).json(`User with Id ${userIndex} is not found`)
    return;
  }

  res.json(users[userIndex])
})

// дз:
// Create ствоити
// Read зчитати :getAll(/users), getOne(/users/:userId)
// Update
// Delete
const fs = require("fs/promises");
app.get('/users',async (req,res)=>{
  let buffer = await fs.readFile('./ba');
  res.json(buffer.toString())
})

const axios = require("axios");
app.get('/', async (req,res)=>{
 const resp = await axios.get('https://jsonplaceholder.typicode.com/users');
 res.status(resp.status).json(resp.data)

})






app.listen(5000, ()=>{
  console.log(  `Server listen port 5000`)
})

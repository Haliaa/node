//mkdir services - (в консолі) - створить папку services
//.. - (в консолі) - папку назад
//dir - (в консолі) - виводить всі файли папки
//rmdir services - (в консолі) - видаляє папку services
// cd- change directory

const fs = require("fs");

// //create directories
// //mkdir girls //In console
// fs.mkdir('boys',(err)=>{err && console.log(err)})

// //create and fill files
// fs.appendFile('./boys/Igor.json',`{"sex": "male", "name": "Igor", "age":33}`,(err)=>{
//     err && console.log(err)
// })
// fs.appendFile('./boys/Kira.json',`{"sex": "female", "name": "Kira", "age":13}`,(err)=>{
//     err && console.log(err)
// })
// fs.appendFile('./boys/Emily.json',`{"sex": "female", "name": "Emily", "age":23}`,(err)=>{
//     err && console.log(err)
// })
// fs.appendFile('./girls/Oleg.json',`{"sex": "male", "name": "Oleg", "age":42}`,(err)=>{
//     err && console.log(err)
// })
// fs.appendFile('./girls/Petro.json',`{"sex": "male", "name": "Petro", "age":50}`,(err)=>{
//     err && console.log(err)
// })
// fs.appendFile('./girls/Lilya.json',`{"sex": "female", "name": "Lilya", "age":40}`,(err)=>{
//     err && console.log(err)
// })

// //read/sort/transfer files from boys
// fs.readdir('./boys',(err,files)=>{
//     err && console.log(err)
//     for (const file of files) {
//         fs.readFile(`./boys/${file}`,(err1, data) => {
//             err1 && console.log(err1)
//             const person = data.toString();
//             const normUser = JSON.parse(person)
//             const {sex} = normUser
//             if(sex === "female"){
//                 fs.rename(`./boys/${file}`,`./girls/${file}`,(err2)=>{
//                     err2 && console.log(err2)
//                 })
//             }
//         })
//     }
// })

// //read/sort/transfer files from girls
fs.readdir('./girls',(err,files)=>{
    err && console.log(err)
    for (const file of files) {
        fs.readFile(`./girls/${file}`,(err1, data) => {
            err1 && console.log(err1)
            const person = data.toString();
            const normUser = JSON.parse(person)
            const {sex} = normUser
            if(sex === "male"){
                fs.rename(`./girls/${file}`,`./boys/${file}`,(err2)=>{
                    err2 && console.log(err2)
                })
            }
        })
    }
})


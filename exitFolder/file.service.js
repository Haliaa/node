// const fs = require('fs')

// //розширює існуючий/створює вказаний(якшо не було), записує
//'./data.txt'-створює тік файли, './papka/data.txt',-не створить
// fs.appendFile('./data.txt', 'HELLO NODE', (err)=>{
//     if(err){console.log(err);}
// })

//перезаписує
// fs.writeFile('./data.txt', 'HELLO NODE', (err)=>{
//     if(err){console.log(err);}
// })

// fs.readFile('./data.txt', (err, data) => {
//     // if(err){
//     //     console.log(err);
//     //     return;
//     // }else {
//     // console.log(data)}
//     if (err) {
//         console.log(err);
//         return;//зупиняє виконання ф-ї
//     }
//     // console.log(data)
//     console.log(data.toString())
//
// })//перезаписує

// fs.readdir('./services', (err, files) => {
//     if (err) {
//         console.log(err)
//         return;
//     }
//     for (const file of files) {
//         // fs.readFile(`./services/${file}`,(err1, data) => {
//         //     if(err1){
//         //         console.log(err1)
//         //         return;
//         //     }
//         //     console.log(`------------------`)
//         //     console.log(`./services/${file}`);
//         //     console.log(`------------------`)
//         //     console.log(`****************`)
//         //     console.log(data.toString())
//         //     console.log(`****************`)
//         // })
//
//         fs.stat(`./services/${file}`,(err1, stats) => {
//             console.log('stats.isFile()',stats.isFile())
//             console.log('stats.isDirectory()',stats.isDirectory())
//         })
//     }
// })

// fs.mkdir('./utils',(err)=>{
//     err && console.log(err)
// })

// fs.rename('./services/toMove.js','./utils/helloWorld.txt',err =>{
//     err && console.log(err)
// })


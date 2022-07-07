// //Cинхронним кодом("fs")
//
// const fs = require("fs");
//
// // //require("path")
// // const path = require("path"); //це щоб замість 1 можна було писати 2 (+само вибирає напрям слеша)
// // 1. console.log(__dirname+'/boys/'+ file)
// // 2. console.log(path.join(__dirname,'boys',file))
//
// // //path.normalize
// //path.normalize('C:////temp\\\\/\\/\\/foo/bar')
// //Returns: 'C:\\temp\\foo\\bar'  (видаляє непотрібні слеші/крапки/двокрапки,
// //повертає слеші в правильну сторону(для windows \, для POSIX /)
//
// // //path.extname- повертає розширення
//
// // path.extname('index.html');
// // Returns: '.html'
//
// // //create directories
// // //mkdir girls //In console
// // fs.mkdir('boys',(err)=>{err && console.log(err)})
//
// // //create and fill files
// // fs.appendFile('./boys/Igor.json',`{"sex": "male", "name": "Igor", "age":33}`,(err)=>{
// //     err && console.log(err)
// // })
// // fs.appendFile('./boys/Kira.json',`{"sex": "female", "name": "Kira", "age":13}`,(err)=>{
// //     err && console.log(err)
// // })
// // fs.appendFile('./boys/Emily.json',`{"sex": "female", "name": "Emily", "age":23}`,(err)=>{
// //     err && console.log(err)
// // })
// // fs.appendFile('./girls/Oleg.json',`{"sex": "male", "name": "Oleg", "age":42}`,(err)=>{
// //     err && console.log(err)
// // })
// // fs.appendFile('./girls/Petro.json',`{"sex": "male", "name": "Petro", "age":50}`,(err)=>{
// //     err && console.log(err)
// // })
// // fs.appendFile('./girls/Lilya.json',`{"sex": "female", "name": "Lilya", "age":40}`,(err)=>{
// //     err && console.log(err)
// // })
//
// // //read/sort/transfer files from boys
// // fs.readdir('./boys',(err,files)=>{
// //     err && console.log(err)
// //     for (const file of files) {
// //         fs.readFile(`./boys/${file}`,(err1, data) => {
// //             err1 && console.log(err1)
// //             const person = data.toString();
// //             const normUser = JSON.parse(person)
// //             const {sex} = normUser
// //             if(sex === "female"){
// //                 fs.rename(`./boys/${file}`,`./girls/${file}`,(err2)=>{
// //                     err2 && console.log(err2)
// //                 })
// //             }
// //         })
// //     }
// // })
//
// // //read/sort/transfer files from girls
// fs.readdir('./girls',(err,files)=>{
//     err && console.log(err)
//     // files.forEach() - замість for можна АЛЕ не для async коду(promises)
//     for (const file of files) {
//         fs.readFile(`./girls/${file}`,(err1, data) => {
//             err1 && console.log(err1)
//             const person = data.toString();
//             const normUser = JSON.parse(person)
//             const {sex} = normUser
//             if(sex === "male"){
//                 fs.rename(`./girls/${file}`,`./boys/${file}`,(err2)=>{
//                     err2 && console.log(err2)
//                 })
//             }
//         })
//     }
// })

// //АСинхронним кодом("fs")
//
// const fs = require("fs/promises");
// const path = require("path");
//
// const sortFolder = async (read, gender, write) => {
//     const files = await fs.readdir(path.join(__dirname, read))
//
//     for (const file of files) {
//         const redFolderPath = path.join(__dirname, read, file);
//         const data = await fs.readFile(redFolderPath)
//         const user = JSON.parse(data.toString())
//         if (user.sex === gender) {
//             await fs.rename(redFolderPath, path.join(__dirname, write, file))
//         }
//     }
// }
// sortFolder('girls','male','boys')
// sortFolder('boys','female','girls')

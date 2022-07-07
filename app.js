//mkdir services - (в консолі) - створить папку services
//.. - (в консолі) - папку назад
//dir - (в консолі) - виводить всі файли папки
//rmdir services - (в консолі) - видаляє папку services
// cd- change directory
//KISS- keep it simple(пекти  хліб)
//YAGNI- You aren`t gonna need it (то шо не треба стираємо)
//SOLID- розділяти на модулі, сервіси, підфайли
//"fs-extra" - improved library of fs (можна цілу папку з файлами видаляти)
// "fs/promise" - library of fs but promised (.catch, .then, .finally)

const {createUser} = require('./services/user.service')
require('./services/file.service')

const user1 = createUser('Emily', 23);
console.log(user1);

const fs = require("fs")

//Stream for BIG files
const readStream = fs.createReadStream('./utils/helloWorld.txt');
const writeStream = fs.createWriteStream('./utils/helloWorld3.txt');
// //read диктує, write не встигає записувати (possible problem)
// readStream.on('data',chunk => { //зчитуємо по кусочках(чанках=64
//     console.log(chunk)
//     console.log('------------------')
//     writeStream.write(chunk)
// })
//
// readStream.on('end',()=>{
//     console.log('FILE DONE')
// })

//синхронізує, якщо треба то read чекає поки write допише кусочок,лише тоді продовжать
readStream.pipe(writeStream)

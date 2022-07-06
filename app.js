//mkdir services - (в консолі) - створить папку services
//.. - (в консолі) - папку назад
//dir - (в консолі) - виводить всі файли папки
//rmdir services - (в консолі) - видаляє папку services
// cd- change directory
//KISS- keep it simple(пекти  хліб)
//YAGNI- You aren`t gonna need it (то шо не треба стираємо)
//SOLID- розділяти на модулі, сервіси, підфайли

const {createUser} = require('./services/user.service')
require('./services/file.service')

const fs = require('fs')

const user1 = createUser('Emily', 23);
console.log(user1);

// fs.mkdir('./allFlattenFiles',(err)=>{
//     err && console.log(err)
// })

fs.readdir('./', (err, files) => {
    err && console.log(err)

    for (const file of files) {
        fs.stat(`././${file}`,(err1, stats) => {
            if(stats.isDirectory() && file != '.idea' && file != '.git'){
                fs.readdir(`././${file}`, (err, files) => {
                    if (err) {
                        console.log(err)
                        return;
                    }
                    for (const filyk of files) {
                        fs.rename(`./${file}/${filyk}`, `./allFlattenFiles/${filyk}`, err => {
                            err && console.log(err)
                        })
                        console.log(filyk)
                    }
                })
            }
        })
    }
})

// // Sync code
//
// const {createUser} = require('./services/user.service')
// require('./services/file.service')
//
// const fs = require('fs')
//
// const user1 = createUser('Emily', 23);
// console.log(user1);
//
// // fs.mkdir('./allFlattenFiles',(err)=>{
// //     err && console.log(err)
// // })
//
// fs.readdir('./', (err, files) => {
//     err && console.log(err)
//
//     for (const file of files) {
//         fs.stat(`././${file}`,(err1, stats) => {
//             if(stats.isDirectory() && file != '.idea' && file != '.git'){
//                 fs.readdir(`././${file}`, (err, files) => {
//                     if (err) {
//                         console.log(err)
//                         return;
//                     }
//                     for (const filyk of files) {
//                         fs.rename(`./${file}/${filyk}`, `./allFlattenFiles/${filyk}`, err => {
//                             err && console.log(err)
//                         })
//                         console.log(filyk)
//                     }
//                 })
//             }
//         })
//     }
// })

// ASync code
//всі файли попереміщало до exitFolder з folderForRead
//залишило пусті папки в folderForRead

const fs = require("fs/promises")
const path = require("path")

const reader = async (read)=>{
    try {
        const files = await fs.readdir(read)
        for (const file of files) {
            const stat = await fs.stat(path.join(read,file))

            if(stat.isFile()){
                await fs.rename(path.join(read,file), path.join(__dirname,'exitFolder',file))
            }
            if(stat.isDirectory()){
                await reader(path.join(read,file))
            }
        }
    }catch (e){
        console.error(e)
    }
}

reader(path.join(__dirname,'folderForRead'))

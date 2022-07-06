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

const user1 = createUser('Emily', 23);
console.log(user1);

const dayjs = require('dayjs')

const OAuth = require('../dataBase/OAuth')


module.exports = async ()=>{
    console.log('START delete old oauth tokens ', new Date().toISOString())

    // const oneMonthBeforeNow = dayjs().subtract(1, 'months')
    // const oneMonthBeforeNow = dayjs().subtract(7, 'days')
    const oneMonthBeforeNow = dayjs().subtract(2, 'hour')

    console.log(oneMonthBeforeNow)

    const query = await OAuth.deleteMany({createdAt: {$lte:oneMonthBeforeNow}});
    // console.log(query, 'remove token data')

    // OAuth.deleteMany({createdAt: {$lte:oneMonthBeforeNow}});
    console.log('FIH delete old oauth tokens ', new Date().toISOString())
}

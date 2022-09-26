const mongoose = require('mongoose')

module.exports = mongoose.connect('mongodb://localhost:27017/voicetodolist',{
    useUnifiedTopology : true,
    useNewUrlParser : true,
    
}, err => {
    if(err) console.log(`Error in DB Connection ${err}`)
    console.log("MongoDB Connection Succeeded...")
})



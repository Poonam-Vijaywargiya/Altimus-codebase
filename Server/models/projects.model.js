const mongoose =  require('mongoose');

const Projects = new mongoose.Schema({
    email: {type: String}
}, 
{ strict: false },
{collection : 'projects'}
)

const model = mongoose.model('Projects', Projects)


module.exports= model
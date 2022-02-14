const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

mongoose.set('useFindAndModify', false);

const user = new Schema({
    id: {type: String, required: true},
    pseudo: {type: String, required: true},
    avatar: {type: String, required: true}
});

module.exports.users = mongoose.model('user', user);
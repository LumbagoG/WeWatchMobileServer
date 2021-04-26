const {Schema, model} = require('mongoose')

const schema = new Schema({
    login:               {type: String, required: true, unique: true},
    email:               {type: String, required: true, unique: true},
    password:            {type: String, required: true},
    friends:             [{type: String}],
    friendRequestList:   [{type: String}],
    myFriendRequestList: [{type: String}],
    recoveryCode:        {type: String},
    inputDevices:        [{type: Object}],
    tokenApi:            {type: String}
})

module.exports = model('User', schema)
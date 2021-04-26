const {Schema, model, Types} = require('mongoose')
const config = require('config')

const schema = new Schema({
    owner:          {type: Types.ObjectId, ref: 'User'},
    title:          {type: String, required:true},
    logo:           {type: String, default: config.get('hostServer') + '/upload/image/USER.jpeg'},
    party:          [{type: String}],
    securityKey:    {type: String},
    linkVideo:      {type: String},
    listLinkVideos: [{type: String}],
    сhatId:         {type: Types.ObjectId},
    currentVideo:   {type: String},
    options:        {type: String},
})

module.exports = model('Room', schema)
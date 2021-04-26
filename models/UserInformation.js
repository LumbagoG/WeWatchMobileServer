const {Schema, model, Types} = require('mongoose')
const config                 = require('config')

const schema = new Schema({
    user:      {type: Types.ObjectId, ref:'User'},
    name:      {type: String, default:'Новый'},
    lastname:  {type: String, default:'пользователь'},
    status:    {type: String, default: 'Пустой статус'},
    created:   {type: String},
    languages: [{type: String}],
    country:   {type: String, default: 'Не указано'},
    city:      {type: String, default: 'Не указано'},
    avatar:    {type: String, default: config.get('hostServer') + '/upload/image/USER.jpeg'},
    header:    {type: String, default: config.get('hostServer') + '/upload/image/HEADER.png'},
    statusOnline: {type: String, required: true, default: 'offline'},
    settings:  {type: String, default: ''}
})

module.exports = model('UserInformation', schema)
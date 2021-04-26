const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    author: {type: Types.ObjectId, ref: 'User', default: null},
    partner: {type: Types.ObjectId, ref: 'User', default: null},
    isRoom: {type: Boolean, default: false},
    messages:[{
        messageId: {type: String},
        author: {type: String},
        create_at: {type: String},
        attachments: [{type: String}],
        // attachments: {
        //     videos: [{type: String}],
        //     images: [{type: String}],
        //     audios: [{type: String}],
        //     documents: [{type: String}]
        // },
        text: {type:String},
        isReaded: {type: Boolean, default: false}
    }],
})

module.exports = model('Dialog', schema)
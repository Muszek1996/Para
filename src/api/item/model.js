const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Item = mongoose.Schema({
        name : {
            type : String,
            required : true,
            index: {unique: true}
        },
        gameid : {
            type : mongoose.Schema.ObjectId,
            ref : 'Game',
            required : true
        },
        price : {
            type: Number,
            min: [0,'Item cant be cheaper than free :)'],
            default : 0
        },
        description : String,
        tradeable : {
            type: Boolean,
            default : false
        }
    },{
        timestamps : true
    }
);




Item.methods = {
    view (full) {
        let view = {};
        let fields = ['_id','name'];

        if (full) {
            fields = [...fields,'gameid', 'price', 'description', 'tradeable', 'createdAt', 'updatedAt']
        }

        fields.forEach((field) => { view[field] = this[field] })

        return view
    }
};

Item.plugin(uniqueValidator, { message: 'Item with this name already exists!' });

module.exports = mongoose.model('Item', Item);
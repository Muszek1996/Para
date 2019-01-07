const mongoose = require('mongoose')

const ItemStack = new mongoose.Schema({
    itemid : {
        type : mongoose.Schema.ObjectId,
        ref : 'Item',
    },
    quantity : {
        type : Number,
        default : 1,
        min : [1,'Quantity cannot be 0 or less']
    }
},
    {_id : false}
);

const model = mongoose.model('ItemsStack', ItemStack)

module.exports = ItemStack;

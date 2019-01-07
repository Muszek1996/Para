const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Game = mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    description : String,
    version : {
        type: Number,
        min : [0, "Version cant be minus value"],
        default : 0
    },
    price : {
        type: Number,
        min: [0,'Game cant be cheaper than free :)'],
        default : 0
    },
    dubbing : {
        type : Boolean,
        default : 0
    }
},{
    timestamps : true
    }
);

Game.methods = {
    view (full) {
        let view = {};
        let fields = ['_id','title'];

        if (full) {
            fields = [...fields,'price','dubbing','version', 'description', 'createdAt', 'updatedAt']
        }

        fields.forEach((field) => { view[field] = this[field] })

        return view
    }
}

Game.plugin(uniqueValidator, { message: 'Game already exists!' });

module.exports = mongoose.model('Game', Game);
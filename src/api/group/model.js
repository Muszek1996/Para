const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Group = mongoose.Schema({
        name : {
            type : String,
            required : true,
            index: {unique: true}
        },
        members : {
            type : [mongoose.Schema.ObjectId],
            ref : 'user',
        },
        owner : {
            type : mongoose.Schema.ObjectId,
            ref : 'user',
            required : true
        }
    },{
        timestamps : true
    }
);



Group.methods = {
    view (full) {
        let view = {};
        let fields = ['_id','name'];

        if (full) {
            fields = [...fields,'members', 'owner', 'createdAt', 'updatedAt']
        }

        fields.forEach((field) => { view[field] = this[field] })

        return view
    }
};

Group.plugin(uniqueValidator, { message: 'Group with this name already exists!' });

module.exports = mongoose.model('Group', Group);
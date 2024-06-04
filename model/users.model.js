const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const usersSchema = mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    phoneNumber: { type: String },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'events' }],
    token: { type: String },
}, { timestamps: true, versionKey: false })

usersSchema.pre('save', async function (next) {
    if (this.password) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    return next();
});

const User = mongoose.model('users', usersSchema);

module.exports = User;
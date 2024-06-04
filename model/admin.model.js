const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }
}, { timestamps: true, versionKey: false })

adminSchema.pre('save', async function (next) {
    if (this.password) {
        this.password = await createBcryptPassword(this.password);
    }
    return next();
});

const Admins = mongoose.model('admins', adminSchema);

module.exports = Admins;
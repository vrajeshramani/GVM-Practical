const mongoose = require('mongoose')

const ticketsSchema = new mongoose.Schema({
    uers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    event: [{ type: mongoose.Schema.Types.ObjectId, ref: 'events' }],
}, { timestamps: true, versionKey: false })

const Tickets = mongoose.model('tickets', ticketsSchema);

module.exports = Tickets;
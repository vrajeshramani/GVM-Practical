const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    eventName: { type: String, require: true },
    eventDate: { type: Date, require: true },
    eventVenue: { type: String, require: true },
    eventTotalTicket: { type: Number, require: true },
    eventRemainingTicket: { type: Number, require: true, min: 0 },
    eventParticipents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'admins' }
}, { timestamps: true, versionKey: false })

const Events = mongoose.model('events', eventSchema);

module.exports = Events;
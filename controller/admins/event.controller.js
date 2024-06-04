const { StatusCodes } = require('http-status-codes');

const { QUERY, commonMessages, commonQuery } = require('../../helper/helper');

const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST, CREATED } = StatusCodes;
const { find, create, findOneAndUpdate, findOneAndDelete } = QUERY;

// MODELS
const eventModel = require('../../model/event.model');

module.exports = {
    // Events Section
    createEvent: async (req, res) => {
        try {
            const user = req.user
            const input = {
                eventName: req.body.eventName,
                eventDate: req.body.eventDate,
                eventVenue: req.body.eventVenue,
                eventTotalTicket: req.body.eventTotalTicket,
                eventRemainingTicket: req.body.eventTotalTicket,
                isActive: req.body.isActive,
                createdBy: user
            }
            const createEvent = await commonQuery(eventModel, create, input)
            if (createEvent.status === 1) {
                res.status(CREATED).json({ status: 1, message: commonMessages.CREATED_SUCCESS(`Event`) });

            } else {
                res.status(BAD_REQUEST).json({ status: 0, message: commonMessages.NOT_CREATED(`Event`) });
            }
        } catch (error) {
            console.log("/users/sign-up ====>>>> ", error);
            res.status(INTERNAL_SERVER_ERROR).json({ status: 0, message: commonMessages.INTERNAL_SERVER_ERROR });
        }
    },
    getEvent: async (req, res) => {
        try {
            const getEvent = await commonQuery(eventModel, find, {})
            if (getEvent.status === 1) {
                res.status(CREATED).json({ status: 1, message: commonMessages.GET_DATA_SUCCESS(`Event`), data: getEvent.data });

            } else {
                res.status(BAD_REQUEST).json({ status: 0, message: commonMessages.NOT_FOUND(`Event`) });
            }
        } catch (error) {
            console.log("/users/sign-in ====>>>> ", error);
            res.status(INTERNAL_SERVER_ERROR).json({ status: 0, message: commonMessages.INTERNAL_SERVER_ERROR });
        }
    },
    updateEvent: async (req, res) => {
        try {
            const user = req.user
            const id = req.query.id
            const input = {
                eventName: req.body.eventName,
                eventDate: req.body.eventDate,
                eventVenue: req.body.eventVenue,
                eventTotalTicket: req.body.eventTotalTicket,
                eventRemainingTicket: req.body.eventTotalTicket,
                isActive: req.body.isActive,
                createdBy: user
            }
            const updateEvent = await commonQuery(eventModel, findOneAndUpdate, { _id: id }, input)
            if (updateEvent.status === 1) {
                res.status(CREATED).json({ status: 1, message: commonMessages.UPDATED_SUCCESS(`Event`) });

            } else {
                res.status(BAD_REQUEST).json({ status: 0, message: commonMessages.NOT_UPDATED(`Event`) });
            }
        } catch (error) {
            console.log("/users/sign-up ====>>>> ", error);
            res.status(INTERNAL_SERVER_ERROR).json({ status: 0, message: commonMessages.INTERNAL_SERVER_ERROR });
        }
    },
    deleteEvent: async (req, res) => {
        try {
            const user = req.user
            const id = req.query.id
            const updateEvent = await commonQuery(eventModel, findOneAndDelete, { _id: id })
            if (updateEvent.status === 1) {
                res.status(CREATED).json({ status: 1, message: commonMessages.DELETED_SUCCESS(`Event`) });

            } else {
                res.status(BAD_REQUEST).json({ status: 0, message: commonMessages.NOT_DELETED(`Event`) });
            }
        } catch (error) {
            console.log("/users/sign-up ====>>>> ", error);
            res.status(INTERNAL_SERVER_ERROR).json({ status: 0, message: commonMessages.INTERNAL_SERVER_ERROR });
        }
    },
};
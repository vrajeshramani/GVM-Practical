const { StatusCodes } = require('http-status-codes');

const { QUERY, commonMessages, commonQuery } = require('../helper/helper');

const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST, CREATED } = StatusCodes;
const { find, findOne, findOneAndUpdate, findOneAndDelete } = QUERY;

// MODELS
const eventModel = require('../model/event.model');
const userModel = require('../model/users.model');
const ticketModel = require('../model/ticket.model');

module.exports = {
    // Events Section
    getEvent: async (req, res) => {
        try {
            const getEvent = await commonQuery(eventModel, find, { isActive: true }, {}, "-createdBy -createdAt -updatedAt")
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
    getEventById: async (req, res) => {
        try {
            const id = req.query.id
            const getEvent = await commonQuery(eventModel, find, { _id: id }, {}, "-createdBy -createdAt -updatedAt")
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
    purchaseEventTicket: async (req, res) => {
        try {
            const user = req.user
            const id = req.query.id
            if (!id) {
                return res.status(BAD_REQUEST).json({ status: 0, message: commonMessages.NOT_EXISTS(`Event id`) });
            }
            const getEvent = await commonQuery(eventModel, findOne, { _id: id }, {}, "-createdBy -createdAt -updatedAt")
            if (getEvent.status === 1) {
                if (getEvent?.data?.eventRemainingTicket > 0) {
                    const alreadyPurchaseEventUsers = await commonQuery(eventModel, findOne, { _id: id, eventParticipents: { $in: [user] } }, "-createdBy -createdAt -updatedAt")
                    if (alreadyPurchaseEventUsers.status === 1) {
                        res.status(BAD_REQUEST).json({ status: 0, message: commonMessages.ALREADY_PURCHASE });
                    } else {
                        await commonQuery(userModel, findOneAndUpdate, { _id: user }, { $push: { events: getEvent?.data?._id } }, "-createdBy -createdAt -updatedAt")
                        await commonQuery(eventModel, findOneAndUpdate, { _id: id }, { $push: { eventParticipents: user }, $inc: { eventRemainingTicket: -1 } }, "-createdBy -createdAt -updatedAt")
                        res.status(CREATED).json({ status: 1, message: commonMessages.UPDATED_SUCCESS(`Event`) });
                    }
                } else {
                    res.status(BAD_REQUEST).json({ status: 0, message: commonMessages.NOT_FOUND(`Ticket`) });
                }
            } else {
                res.status(BAD_REQUEST).json({ status: 0, message: commonMessages.NOT_FOUND(`Event`) });
            }
        } catch (error) {
            console.log("/users/sign-in ====>>>> ", error);
            res.status(INTERNAL_SERVER_ERROR).json({ status: 0, message: commonMessages.INTERNAL_SERVER_ERROR });
        }
    }
};
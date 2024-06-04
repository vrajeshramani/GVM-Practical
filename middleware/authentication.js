const { commonMessages, verifyToken, commonQuery, QUERY } = require("../helper/helper");
const { findOne } = QUERY
const { StatusCodes } = require("http-status-codes");
const { BAD_REQUEST } = StatusCodes;

// Models
const userModel = require('../model/users.model')
const adminModel = require('../model/admin.model')

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (token) {
            const { data } = await verifyToken(token);
            if (data) {
                if (data.type.toLowerCase() === 'user') {
                    const findUsers = await commonQuery(userModel, findOne, { _id: data.userId })
                    if (findUsers.status === 1) {
                        req.user = data.userId;
                        next();
                    } else {
                        res.status(BAD_REQUEST).json({ status: 0, message: commonMessages.NOT_AUTHORIZED });
                    }
                } else if (data.type.toLowerCase() === 'admin') {
                    const findAdmin = await commonQuery(adminModel, findOne, { _id: data.userId })
                    if (findAdmin.status === 1) {
                        req.user = data.userId;
                        next();
                    } else {
                        res.status(BAD_REQUEST).json({ status: 0, message: commonMessages.NOT_AUTHORIZED });
                    }
                } else {
                    res.status(BAD_REQUEST).json({ status: 0, message: commonMessages.NOT_AUTHORIZED });

                }
            } else {
                res.status(BAD_REQUEST).json({ status: 0, message: commonMessages.NOT_AUTHORIZED });
            }
        } else {
        }
    } catch (error) {
        console.log(error, '====>>>> auth-error');
        res.status(BAD_REQUEST).json({ status: 0, message: commonMessages.NOT_AUTHORIZED });
    }
}

module.exports = auth;
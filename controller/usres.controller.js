const { StatusCodes } = require('http-status-codes');

const { QUERY, commonMessages, commonQuery, generateToken, checkBcryptPassword, createBcryptPassword } = require('../helper/helper');

const { OK, CREATED, INTERNAL_SERVER_ERROR, BAD_REQUEST } = StatusCodes;
const { findOne, create, findOneAndUpdate } = QUERY;

// MODELS
const userModel = require('../model/users.model');

module.exports = {
    // AUTHENTICATION SECTION
    signUp: async (req, res) => {
        try {
            let { name, email, phoneNumber, gender, password } = req.body;
            const existUser = await commonQuery(userModel, findOne, { email });
            if (existUser.status == 1) {
                res.status(BAD_REQUEST).json({ status: 0, message: commonMessages.ALREADY_EXISTS('Email') });
            } else {
                const userData = { name, email, phoneNumber, gender };
                const newUser = await commonQuery(userModel, create, userData);
                if (newUser.status == 1) {
                    const bcryptPassword = await createBcryptPassword(password)
                    const userData = await commonQuery(userModel, findOneAndUpdate, { email }, { password: bcryptPassword }, '-password -createdAt -updatedAt');
                    const { token } = await generateToken({ userId: newUser.data._id, type: "user" });
                    res.status(OK).json({ status: 1, message: commonMessages.SIGNUP_SUCCESS(`User`), token, data: userData.data });
                } else {
                    res.status(BAD_REQUEST).json({ status: 0, message: newUser.message });
                }
            }
        } catch (error) {
            console.log("/users/sign-up ====>>>> ", error);
            res.status(INTERNAL_SERVER_ERROR).json({ status: 0, message: commonMessages.INTERNAL_SERVER_ERROR });
        }
    },
    signIn: async (req, res) => {
        try {
            const { email, password } = req.body;
            const existUser = await commonQuery(userModel, findOne, { email }, {}, ' -createdAt -updatedAt');
            if (existUser.status == 1) {
                const comparePasswords = await checkBcryptPassword(password, existUser.data.password)
                if (comparePasswords.status == 1) {
                    const { token } = await generateToken({ userId: existUser.data._id, type: "user" });
                    const updateUser = await commonQuery(userModel, findOneAndUpdate, { email }, { token }, '-password -createdAt -updatedAt -__v', { path: "categories", select: "name" });
                    res.status(OK).json({ status: 1, message: commonMessages.SIGNIN_SUCCESS(`User`), token, data: updateUser.data });
                } else {
                    res.status(BAD_REQUEST).json({ status: 0, message: comparePasswords.message });
                }
            } else {
                res.status(BAD_REQUEST).json({ status: 0, message: commonMessages.NOT_EXISTS("Phone Number") });
            }
        } catch (error) {
            console.log("/users/sign-in ====>>>> ", error);
            res.status(INTERNAL_SERVER_ERROR).json({ status: 0, message: commonMessages.INTERNAL_SERVER_ERROR });
        }
    },
};
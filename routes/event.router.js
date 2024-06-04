const express = require('express');
const router = express.Router();

const auth = require('../middleware/authentication');

const { getEvent, getEventById, purchaseEventTicket } = require('../controller/event.controller');

// USERS ROUTES
router.get('/getEvent', auth, getEvent);
router.get('/getEventById', auth, getEventById);
router.post('/purchaseEventTicket', auth, purchaseEventTicket);

module.exports = router;

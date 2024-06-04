const express = require('express');
const router = express.Router();

const auth = require('../../middleware/authentication');

const { createEvent, getEvent, updateEvent, deleteEvent } = require('../../controller/admins/event.controller');

// USERS ROUTES
router.post('/createEvent', auth, createEvent);
router.get('/getEvent', auth, getEvent);
router.patch('/updateEvent', auth, updateEvent);
router.delete('/deleteEvent', auth, deleteEvent);

module.exports = router;

const router = require('express').Router();

router.get('/api/livecam/:classId', roomsController.show);

module.exports = router;
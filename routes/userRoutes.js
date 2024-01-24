const express = require("express");
const router = express.Router();
const verifyUserToken = require('../middlewares/verifyUserToken');
const { registerUser, loginUser, detailUser } = require('../controllers/userController')

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/detail', verifyUserToken, detailUser);

module.exports = router;
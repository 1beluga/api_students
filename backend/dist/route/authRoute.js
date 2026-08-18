"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controller/authController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/login', authController_1.login);
router.get('/profile', auth_1.authenticateToken, (req, res) => {
    res.status(200).json({ message: "Access granted, token is valid", studentData: req.user });
});
exports.default = router;

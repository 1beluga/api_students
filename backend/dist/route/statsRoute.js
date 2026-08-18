"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const statsController_1 = require("../controller/statsController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/students', auth_1.authenticateToken, statsController_1.getStudentStats);
exports.default = router;

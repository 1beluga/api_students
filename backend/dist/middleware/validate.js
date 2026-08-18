"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({
                message: "Validation failed",
                errors: error.issues.map((issue) => ({
                    field: issue.path.join('.').replace('body.', ''),
                    message: issue.message,
                })),
            });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.validate = validate;

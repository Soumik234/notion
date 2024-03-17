"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInputDef = exports.createBlogInputDef = exports.signinSchemaDef = exports.signupSchemaDef = void 0;
const zod_1 = require("zod");
exports.signupSchemaDef = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().optional(),
});
// Zod validation schema for signin
exports.signinSchemaDef = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.createBlogInputDef = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
});
exports.updateBlogInputDef = zod_1.z.object({
    title: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
    id: zod_1.z.number(),
});

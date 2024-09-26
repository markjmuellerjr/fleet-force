"use strict";
// models/User.ts
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Required for Credentials Provider
    image: { type: String },
    role: {
        type: String,
        enum: ['Client', 'ServiceManager', 'Technician', 'Admin'],
        default: 'Client',
    },
    company: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Company', required: true },
}, { timestamps: true });
// Prevent password from being returned in queries by default
UserSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.password;
        return ret;
    },
});
exports.default = mongoose_1.default.models.User || mongoose_1.default.model('User', UserSchema);

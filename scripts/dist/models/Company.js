"use strict";
// models/Company.ts
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var CompanySchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    contactEmail: { type: String, required: true, unique: true },
    contactPhone: { type: String, required: true },
}, { timestamps: true });
// Prevent password from being returned in queries by default (if applicable)
CompanySchema.set('toJSON', {
    transform: function (doc, ret, options) {
        return ret;
    },
});
exports.default = mongoose_1.default.models.Company || mongoose_1.default.model('Company', CompanySchema);

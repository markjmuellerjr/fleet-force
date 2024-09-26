"use strict";
// scripts/seed.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var dotenv_1 = require("dotenv");
var faker_1 = require("@faker-js/faker"); // Updated import for Faker.js v7+
var Company_1 = require("../models/Company");
var User_1 = require("../models/User");
var bcryptjs_1 = require("bcryptjs");
// Load environment variables from .env file
dotenv_1.default.config();
// MongoDB connection string from environment variables
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fleetforce';
// Define roles
var roles = ['Client', 'ServiceManager', 'Technician', 'Admin'];
// Number of companies and users per company
var NUM_COMPANIES = 3;
var USERS_PER_COMPANY = 10;
// Async function to connect to MongoDB
var connectDB = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, mongoose_1.default.connect(MONGODB_URI)];
            case 1:
                _a.sent();
                console.log('MongoDB connected successfully.');
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('MongoDB connection failed:', error_1);
                process.exit(1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Function to create fake companies
var createCompanies = function () { return __awaiter(void 0, void 0, void 0, function () {
    var companies, i, companyData, company;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companies = [];
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < NUM_COMPANIES)) return [3 /*break*/, 4];
                companyData = {
                    name: faker_1.faker.company.name(),
                    address: faker_1.faker.address.streetAddress(),
                    contactEmail: faker_1.faker.internet.email(),
                    contactPhone: faker_1.faker.phone.number(),
                };
                company = new Company_1.default(companyData);
                return [4 /*yield*/, company.save()];
            case 2:
                _a.sent();
                companies.push(company);
                console.log("Created Company: ".concat(company.name));
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, companies];
        }
    });
}); };
// Function to create fake users for a given company
var createUsers = function (company, numUsers) { return __awaiter(void 0, void 0, void 0, function () {
    var i, role, userData, plainPassword, saltRounds, hashedPassword, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < numUsers)) return [3 /*break*/, 6];
                role = void 0;
                if (i === 0) {
                    role = 'Admin';
                }
                else if (i === 1) {
                    role = 'ServiceManager';
                }
                else if (i === 2) {
                    role = 'Technician';
                }
                else {
                    role = 'Client';
                }
                userData = {
                    name: faker_1.faker.person.fullName(),
                    email: faker_1.faker.internet.email(),
                    role: role,
                    company: company._id, // Use ObjectId directly
                };
                if (!['Client', 'ServiceManager', 'Technician', 'Admin'].includes(role)) return [3 /*break*/, 3];
                plainPassword = faker_1.faker.internet.password({ length: 8 });
                saltRounds = 10;
                return [4 /*yield*/, bcryptjs_1.default.hash(plainPassword, saltRounds)];
            case 2:
                hashedPassword = _a.sent();
                userData.password = hashedPassword;
                console.log("User Password for ".concat(userData.email, ": ").concat(plainPassword, " (Store securely)"));
                _a.label = 3;
            case 3:
                user = new User_1.default(userData);
                return [4 /*yield*/, user.save()];
            case 4:
                _a.sent();
                console.log("Created User: ".concat(user.name, " | Role: ").concat(user.role, " | Company: ").concat(company.name));
                _a.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/];
        }
    });
}); };
// Main seed function
var seedDatabase = function () { return __awaiter(void 0, void 0, void 0, function () {
    var companies, _i, companies_1, company;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, connectDB()];
            case 1:
                _a.sent();
                // Clear existing data
                return [4 /*yield*/, Company_1.default.deleteMany({})];
            case 2:
                // Clear existing data
                _a.sent();
                return [4 /*yield*/, User_1.default.deleteMany({})];
            case 3:
                _a.sent();
                console.log('Cleared existing data.');
                return [4 /*yield*/, createCompanies()];
            case 4:
                companies = _a.sent();
                _i = 0, companies_1 = companies;
                _a.label = 5;
            case 5:
                if (!(_i < companies_1.length)) return [3 /*break*/, 8];
                company = companies_1[_i];
                return [4 /*yield*/, createUsers(company, USERS_PER_COMPANY)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                _i++;
                return [3 /*break*/, 5];
            case 8: 
            // Disconnect from MongoDB
            return [4 /*yield*/, mongoose_1.default.disconnect()];
            case 9:
                // Disconnect from MongoDB
                _a.sent();
                console.log('MongoDB connection closed.');
                return [2 /*return*/];
        }
    });
}); };
// Execute the seed script
seedDatabase()
    .then(function () {
    console.log('Database seeding completed successfully.');
    process.exit(0);
})
    .catch(function (error) {
    console.error('Database seeding failed:', error);
    process.exit(1);
});

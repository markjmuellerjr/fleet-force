// scripts/seed.ts

import dotenv from 'dotenv';
dotenv.config(); // Load environment variables as early as possible

import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import Company, { ICompany } from '../models/Company.js'; // Include .js extension
import User, { IUser, UserRole } from '../models/User.js';     // Include .js extension
import bcrypt from 'bcryptjs';

// Prevent seeding in production
if (process.env.NODE_ENV === 'production') {
  console.error('Seed script should not be run in production.');
  process.exit(1);
}

// MongoDB connection string from environment variables
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fleetforce';

// Define roles
// const roles: UserRole[] = ['Client', 'ServiceManager', 'Technician', 'Admin'];

// Number of companies and users per company
const NUM_COMPANIES = parseInt(process.env.NUM_COMPANIES || '3', 10);
const USERS_PER_COMPANY = parseInt(process.env.USERS_PER_COMPANY || '10', 10);

// Async function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

// Function to create fake companies
const createCompanies = async (): Promise<ICompany[]> => {
  const companies: ICompany[] = [];

  for (let i = 0; i < NUM_COMPANIES; i++) {
    const companyData = {
      name: faker.company.name(),
      address: faker.address.streetAddress(),
      contactEmail: faker.internet.email(),
      contactPhone: faker.phone.number(),
    };

    const company = new Company(companyData);
    await company.save();
    companies.push(company);
    console.log(`Created Company: ${company.name}`);
  }

  return companies;
};

// Function to create fake users for a given company
const createUsers = async (company: ICompany, numUsers: number) => {
  for (let i = 0; i < numUsers; i++) {
    // Assign roles ensuring at least one Admin, ServiceManager, Technician per company
    let role: UserRole;

    if (i === 0) {
      role = 'Admin';
    } else if (i === 1) {
      role = 'ServiceManager';
    } else if (i === 2) {
      role = 'Technician';
    } else {
      role = 'Client';
    }

    const userData: Partial<IUser> = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role,
      company: company._id, // Assign ObjectId directly
    };

    // Assign a password for roles that require authentication
    if (['Client', 'ServiceManager', 'Technician', 'Admin'].includes(role)) {
      const plainPassword = faker.internet.password({ length: 8 });
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
      userData.password = hashedPassword;

      // Log password only in non-production environments
      console.log(`User Password for ${userData.email}: ${plainPassword} (Store securely)`);
    }

    const user = new User(userData);
    await user.save();
    console.log(`Created User: ${user.name} | Role: ${user.role} | Company: ${company.name}`);
  }
};

// Main seed function
const seedDatabase = async () => {
  await connectDB();

  // Clear existing data
  await Company.deleteMany({});
  await User.deleteMany({});
  console.log('Cleared existing data.');

  // Create companies
  const companies = await createCompanies();

  // Create users for each company
  for (const company of companies) {
    await createUsers(company, USERS_PER_COMPANY);
  }

  // Disconnect from MongoDB
  await mongoose.disconnect();
  console.log('MongoDB connection closed.');
};

// Execute the seed script
seedDatabase()
  .then(() => {
    console.log('Database seeding completed successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Database seeding failed:', error);
    process.exit(1);
  });
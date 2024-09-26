// app/api/auth/signup/route.ts

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json();

    // Basic validation
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check for existing user
    await connectToDatabase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 }
      );
    }

    // Validate role
    const validRoles = ['Client', 'ServiceManager', 'Technician', 'Admin'];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { message: 'Invalid role specified' },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Signup Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
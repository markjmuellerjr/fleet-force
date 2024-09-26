// app/api/admin/users/route.ts

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';
import { getUserRole } from '../../../lib/getUserRole';

export async function GET(req: NextRequest) {
  try {
    const role = await getUserRole(req);
    if (role !== 'Admin') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 403 }
      );
    }

    await connectToDatabase();
    const users = await User.find().select('-password').lean();

    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    console.error('Get Users Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const role = await getUserRole(req);
    if (role !== 'Admin') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 403 }
      );
    }

    const { name, email, role: newRole } = await req.json();

    // Validate input
    if (!name || !email || !newRole) {
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

    // Validate newRole
    const validRoles = ['Client', 'ServiceManager', 'Technician', 'Admin'];
    if (!validRoles.includes(newRole)) {
      return NextResponse.json(
        { message: 'Invalid role specified' },
        { status: 400 }
      );
    }

    // Create new user (Admin can set roles as needed)
    const newUser = new User({
      name,
      email,
      role: newRole,
    });

    await newUser.save();

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create User Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
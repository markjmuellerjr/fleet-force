// types/user.ts

export type UserRole = 'Client' | 'ServiceManager' | 'Technician' | 'Admin';

export interface IUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
  dealerId?: string; // For roles associated with a dealer
}
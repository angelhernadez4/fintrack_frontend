import { Timestamps } from "./backend.interface";

export interface Register {
    email: string;
    name: string;
    lastName: string;
    password: string;
}

export interface Login {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string
    user: User
}

export interface ResendNewToken {
    email: string;
    type: string
}

export interface PasswordCore {
    password: string;
    password_confirmation: string;
}

export interface User extends Timestamps{
    _id: string;
    name: string;
    lastName: string;
    email: string;
    isActive: boolean;
    photo: string;
}
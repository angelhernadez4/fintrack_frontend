import { Timestamps } from "@core/interfaces";

export interface Profile extends Timestamps {
    _id: string;
    name: string;
    lastName: string;
    isActive: boolean;
    email: string;
}

export interface ProfileCore {
    name: string;
    lastName: string;
    email: string;
}

export interface ProfilePasswordCore {
    current_password: string;
    password: string;
}
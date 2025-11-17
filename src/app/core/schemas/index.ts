import { z } from 'zod'

export const RegisterSchema = z.object({
    email: z.string().min(1, { message: 'El correo electrónico es obligatorio' }).email({ message: 'El correo electrónico no es válido' }),
    name: z.string().min(2, { message: 'El nombre es obligatorio' }),
    lastName: z.string().min(2, { message: 'El apellido es obligatorio' }),
    username: z.string({ message: 'El nombre de usuario es obligatorio' }),
    password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    password_confirmation: z.string()
}).refine(data => data.password === data.password_confirmation, {
    message: 'Las contraseñas no coinciden',
    path: ['password_confirmation']
})

export const ForgotPasswordSchema = z.object({
    email: z.string().min(1, {message: 'El correo electrónico es obligatorio'}).email( {message: 'El Correo electrónico no es válido'}),
})

export const ResetPasswordSchema = z.object({
    password: z.string()
            .min(8, {message: 'La contraseña debe ser de al menos 8 caracteres'}),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no son iguales",
    path: ["password_confirmation"]
});

export const UpdateCurrentPasswordSchema = z.object({
    current_password: z.string(),
    password: z.string()
            .min(8, {message: 'La contraseña debe ser de al menos 8 caracteres'}),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no son iguales",
    path: ["password_confirmation"]
});
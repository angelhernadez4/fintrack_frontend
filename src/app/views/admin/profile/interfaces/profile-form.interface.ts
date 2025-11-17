export enum ProfileForm {
    NAME = 'name',
    LAST_NAME = 'lastName',
    EMAIL = 'email'
}

export enum ProfileUpdatePasswordForm {
    PASSWORD_CURRENT = 'current_password',
    PASSWORD = 'password',
    PASSWORD_CONFIRMATION = 'password_confirmation',
}

export const PROFILE_FORM_CONTROLS_NAMES: Record<keyof typeof ProfileForm, ProfileForm> = {
    NAME: ProfileForm.NAME,
    LAST_NAME: ProfileForm.LAST_NAME,
    EMAIL: ProfileForm.EMAIL
}

export const PROFILE_UPDATE_PASSWORD_FORM_CONTROLS_NAMES: Record<keyof typeof ProfileUpdatePasswordForm, ProfileUpdatePasswordForm> = {
    PASSWORD_CURRENT: ProfileUpdatePasswordForm.PASSWORD_CURRENT,
    PASSWORD: ProfileUpdatePasswordForm.PASSWORD,
    PASSWORD_CONFIRMATION: ProfileUpdatePasswordForm.PASSWORD_CONFIRMATION,
}
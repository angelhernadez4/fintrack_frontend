import { CaseState, LoadingStates } from "@core/interfaces";

export interface ProfilePageState extends LoadingStates, CaseState {
    profileId?: string;
}

export interface ProfileUpdatePasswordPageState extends LoadingStates, CaseState {}

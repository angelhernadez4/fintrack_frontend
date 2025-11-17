import { Gender } from "@core/i18n";
import { OperationCases } from "@core/interfaces/core-states.interface";

export const pastOperation: Record<OperationCases, Record<Gender, string>> = {
    [OperationCases.CREATE]: {
        [Gender.MALE]: 'creado',
        [Gender.FEMALE]: 'creada'
    },
    [OperationCases.UPDATE]: {
        [Gender.MALE]: 'actualizado',
        [Gender.FEMALE]: 'actualizada'
    }
}

export const operationInfinitive: Record<OperationCases, string> = {
    [OperationCases.CREATE]: 'crear',
    [OperationCases.UPDATE]: 'actualizar',
}

export const operationLabel: Record<OperationCases, Record<Gender, string>> ={
    [OperationCases.CREATE]: {
        [Gender.MALE]: 'nuevo',
        [Gender.FEMALE]: 'nueva'
    },
    [OperationCases.UPDATE]: {
       [Gender.MALE]: 'actualizar',
       [Gender.FEMALE]: 'actualizar' 
    }
}
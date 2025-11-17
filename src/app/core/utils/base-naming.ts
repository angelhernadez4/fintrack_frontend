import { Gender, getGender, pluralize } from "@core/i18n";

export interface CrudNaming {
    singularName: string;
    pluralName: string;
    gender: Gender
}

export class CrudNames implements CrudNaming {
    singularName: string;
    pluralName: string;
    gender: Gender;

    constructor(singularName: string) {
        this.singularName = singularName;
        this.pluralName = pluralize(singularName);
        this.gender = getGender(singularName)!;
    }
}
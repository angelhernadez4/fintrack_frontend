import { SuccessObs } from "@core/interfaces";
import { BaseCrudComponent } from "./base-crud.component"
import { Gender } from "@core/i18n";

export abstract class ListComponent<T> extends BaseCrudComponent<T> {
    public hasGetAllError(elements: any) {
        if (elements === null) {
            this.notificationService.error(`obtener listado de ${this.names.pluralName}`);
            this.redirectToIndex();
            return true;
        }
        return false;
    }

    public showConfirmDelete(name: string, id: string, deleteService: SuccessObs) {
        const article = this.names.gender === Gender.MALE ? 'el' : 'la';
        const message: string = `¿Desea eliminar ${article} ${this.names.singularName} ${name}?`;
        this.notificationService.showConfirm({message}, () => this.deleteElement(deleteService))
    }

    protected abstract getAll(): void;

    private deleteElement(deleteService: SuccessObs) {
        deleteService.subscribe((success) => this.handleDeleteRes(success))
    }

    public handleDeleteRes(success: boolean) {
        if (!success) {
            this.notificationService.error(`eliminar ${this.names.singularName}`)
            return
        }

        const deleted = this.names.gender === Gender.MALE ? 'eliminado' : 'eliminada';
        this.notificationService.success(`${this.names.singularName} ${deleted}`);
        this.getAll();
    }
}
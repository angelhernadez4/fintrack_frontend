import { computed, Signal } from "@angular/core";
import { BaseCrudComponent } from "./base-crud.component";
import { map, Subscription } from "rxjs";
import { ErrorsMap } from "@core/interfaces";

/**
 * ReadComponent functions as a base for components that need to perform read operations on a specific entity
 * @typeparam T - the type representing the operationes status of the component.
 */
export abstract class ReadComponent<T> extends BaseCrudComponent<T> {
    public detailLabel: Signal<string> = computed(() => `Detalle de ${this.names.singularName}`);

    protected subs: Subscription[] = [];

    protected readId(getElementById: (_id: string) => void) {
        return this.route.params.pipe(
            map((params) => {
                const id = params['_id'] as string;

                if (!id || id.trim() === '') {
                    this.handleInvalidIdError()
                    return
                }

                getElementById(id);
            })
        )
    }

    protected handleNecessaryInfoError() {
        this.notificationService.error(`cargar información necesaria`);
        this.redirectToIndex()
    }

    protected hasGetError(element: any) {
        if (element === null) {
            this.handleGetError()
            return true;
        }

        if (element === ErrorsMap.ELEMENT_NOT_EXIST) {
            this.handleNonExistError()
            return true
        }
        return false
    }

    protected handleInvalidIdError() {
        this.notificationService.error('El ID proporcionado es inválido', false);
        this.redirectToIndex();
    }

    private handleNonExistError() {
        this.notificationService.error(`No existe ${this.names.singularName} con el ID proporcionado`, false);
        this.redirectToIndex();
    }

    private handleGetError() {
        this.notificationService.error(`obtener información de ${this.names.singularName}`);
        this.redirectToIndex();
    }
}
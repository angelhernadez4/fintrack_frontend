import { FormBuilder, FormControl } from "@angular/forms";
import { BaseCrudComponent } from "./base-crud.component";
import { inject, WritableSignal } from "@angular/core";
import { GetAllObs } from "@core/interfaces";
import { tap } from "rxjs";

export abstract class ReportComponent<T> extends BaseCrudComponent<T> {
    protected readonly fb: FormBuilder = inject(FormBuilder);

    protected setFieldInfo<P>(fieldControl: FormControl, getObs: GetAllObs<P>, elementSignal: WritableSignal<P[]>, listName: string): GetAllObs<P> {
        fieldControl.disable();

        return getObs.pipe(
            tap((elements) => {
                if (elements === null) {
                    this.handleNecessaryInfoError(listName);
                    return;
                }

                elementSignal.set(elements);
                fieldControl.enable();
            })
        )
    }

    protected setShowInfo<P>(getObs: GetAllObs<P>, elementSignal: WritableSignal<P[]>, listName: string) : GetAllObs<P> {
        return getObs.pipe(
            tap((elements) => {
                if (elements === null) {
                    this.handleNecessaryInfoError(listName);
                    return;
                }
                elementSignal.set(elements)
            })
        )
    }

    protected handleNecessaryInfoError(listName: string) {
        this.notificationService.error(`cargar información de ${listName}`)
        this.router.navigateByUrl('/')
    }
}
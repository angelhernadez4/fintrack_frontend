import { OperationalState, OperationCases } from "@core/interfaces/core-states.interface";
import { ReadComponent } from "./base-read.component";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { computed, inject, Signal, WritableSignal } from "@angular/core";
import { operationInfinitive, operationLabel, pastOperation } from "@core/utils";
import { formErrorMap, FormErrors, GetAllObs } from "@core/interfaces";
import { map, of, switchMap, tap } from "rxjs";

export abstract class OperationalComponent<T extends OperationalState> extends ReadComponent<T> {
    protected readonly fb: FormBuilder = inject(FormBuilder);

    public abstract form: FormGroup;

    public readonly headerLabel: Signal<string> = computed(() => {
        const label: string = `${operationLabel[this.state().case][this.names.gender]} ${this.names.singularName}`;
        return label.charAt(0).toUpperCase() + label.slice(1);
    })


    public readonly submitLabel: Signal<string> = computed(() => `${operationInfinitive[this.state().case].charAt(0).toUpperCase()}${operationInfinitive[ this.state().case].slice(1).toLowerCase()}`);

    public getControlErrors(controlName: string, form?: FormGroup) {
        const currentForm = form ? form : this.form

        const touched = currentForm.controls[controlName].touched;
        const pristine = currentForm.controls[controlName].pristine;
        const errorsRaw = currentForm.controls[controlName].errors as {};
        
        if( errorsRaw === null || pristine || !touched) return undefined

        const errors = Object.keys(errorsRaw) as FormErrors[];
        return formErrorMap[errors[0]];
    }

    protected isInvalidForm() {
        if (this.form.invalid) this.notificationService.warn('Faltan campos por llenar');
        return this.form.invalid;
    }

    protected setCase(getElementById: (_id: string) => void) {
        const caseSub = this.route.url.pipe(
            tap(() => this.updateState({ loadingData: true } as Partial<T>)),
            map((url) : OperationCases => {
                const caseState: OperationCases = url[0].path === 'new' ? OperationCases.CREATE : OperationCases.UPDATE;
                this.updateState({ case: caseState } as Partial<T>)

                if (caseState === OperationCases.CREATE) {
                    this.updateState({ loadingData: false } as Partial<T>)
                }

                return caseState;
            }),
            switchMap((caseState) => caseState === OperationCases.UPDATE ? this.readId((_id) => getElementById(_id)): of(null))
        ).subscribe()

        this.subs.push(caseSub)
    }

    protected handleOperationRes(success: boolean) {
        this.updateState({ loadingSubmit: false } as Partial<T>)
        const operation: string = success ? pastOperation[this.state().case][this.names.gender] : operationInfinitive[this.state().case]
        if (!success) {
            this.notificationService.error(`${operation} ${this.names.singularName}`);
            return
        }
        this.notificationService.success(`${this.names.singularName} ${operation}`)
        const idBudget = this.state().budgetId        
        const firstSegment = this.route.snapshot.url[0].path

        if (firstSegment === 'edit' && idBudget) {
            this.redirectToIndex()
            return
        }

        if (firstSegment === 'detail' && idBudget) {
            this.router.navigateByUrl(`/admin/budgets/detail/${idBudget}`); // 🔥 cuando viene de detail/idBudget
            return;
        }
        this.redirectToIndex()
    }

    protected setFieldInfo<T>(fieldControl: FormControl, getObs: GetAllObs<T>, elementSignal: WritableSignal<T[]>): GetAllObs<T> {
        fieldControl.disable();

        return getObs.pipe(
            tap((elements) => {
                if (elements === null) {
                    this.handleNecessaryInfoError()
                    return;
                }
                elementSignal.set(elements)
                fieldControl.enable();
            })
        )
    }
}
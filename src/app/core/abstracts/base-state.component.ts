import { WritableSignal } from "@angular/core";

/**
 * StateComponent: is an abstract class that provides a base for managing component state using Angular's WritableSignal.
 * It includes a method to update the state by merging partial state updates with the existing state.
 *
 * @template T - The type of the component state.
 */
export abstract class StateComponent<T> {
    /**
     * The writable signal representing the component state.
     */
    protected abstract state: WritableSignal<T>

    /**
     * Updates the component state with the provided partial state.
     * @param partialState - The partial state to merge into the current state.
     */
    protected updateState(partialState: Partial<T>) {
        this.state.update((currentState) => ({ ...currentState, ...partialState }));
    }
}
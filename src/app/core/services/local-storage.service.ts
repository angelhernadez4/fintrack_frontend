import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    public saveItem(key: string, item: any): void {
        localStorage.setItem(key, JSON.stringify(item));
    }

    public getItemByKey<T>(key: string): T | null {
        const item = localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : null;
    }

    public clear(): void {
        localStorage.clear();
    }

    public clearItem(key: string): void {
        localStorage.removeItem(key);
    }
}

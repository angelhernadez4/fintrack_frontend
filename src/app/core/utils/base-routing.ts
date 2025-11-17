export enum FragmentsRoutes {
    CREATE = "new",
    UPDATE = "edit",
    DETAIL = "detail"
}

export interface CrudRouting {
    indexRoute: string;
    createRoute: string;
    updateRoute: string;
    detailRoute: string;
    fatherRoute: string;
}

export class CrudRoutes implements CrudRouting {
    public indexRoute = '';
    public createRoute = '';
    public updateRoute = '';
    public detailRoute = '';
    public fatherRoute = '';

    constructor(indexRoute: string, father: string | undefined = undefined) {
        this.indexRoute = father ? `${father}/${indexRoute}` : indexRoute;
        this.createRoute = `${this.indexRoute}/${FragmentsRoutes.CREATE}`;
        this.updateRoute = `${this.indexRoute}/${FragmentsRoutes.UPDATE}`;
        this.detailRoute = `${this.indexRoute}/${FragmentsRoutes.DETAIL}`;
        this.fatherRoute = father ? father : '';
    }
}
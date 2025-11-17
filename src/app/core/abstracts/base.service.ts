import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { BaseServiceConfig } from '@core/interfaces';
import { AuthService } from '@core/services/auth.service';
import { CrudNames, CrudNaming } from '@core/utils/base-naming';
import { CrudRoutes, CrudRouting } from '@core/utils/base-routing';
import { environment as ENV } from '@environments/environments';

export class BaseService {
    protected readonly authService: AuthService = inject(AuthService)
    protected http: HttpClient = inject(HttpClient);

    public base_url: string;
    public routes: CrudRouting;
    public names: CrudNaming;
    
    constructor(config: BaseServiceConfig) {
        const { baseEndpoint, baseRoute, singularName, fatherRoute } = config
        this.base_url = `${ENV.api.url}/${baseEndpoint}`;
        this.routes = new CrudRoutes(baseRoute, fatherRoute);
        this.names = new CrudNames(singularName)
    }
}

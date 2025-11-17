import { NotificationService } from "@core/services/notification.service"
import { StateComponent } from "./base-state.component"
import { inject } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router";
import { CrudRouting } from "@core/utils/base-routing";
import { CrudNaming } from "@core/utils/base-naming";
import { BaseService } from "./base.service";

export abstract class BaseCrudComponent<T> extends StateComponent<T> {
    protected readonly notificationService: NotificationService = inject(NotificationService);
    protected readonly route: ActivatedRoute = inject(ActivatedRoute);
    protected readonly router: Router = inject(Router);

    public routes!: CrudRouting;
    public names!: CrudNaming;

    public initialize(service: BaseService) {
        this.routes = service.routes;
        this.names = service.names;
    }

    protected redirectToIndex() {        
        this.router.navigateByUrl(this.routes.indexRoute)
    }
}
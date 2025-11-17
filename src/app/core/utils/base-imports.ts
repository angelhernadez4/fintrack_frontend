import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { PrimeNgModule } from '@prime-ng-module';

import { SharedModule } from '@shared/shared.module';

export const LIST_IMPORTS = [PrimeNgModule, RouterLink, SharedModule];
export const DETAIL_IMPORTS = [...LIST_IMPORTS]

export const OPERATIONAL_IMPORTS = [...LIST_IMPORTS, ReactiveFormsModule]
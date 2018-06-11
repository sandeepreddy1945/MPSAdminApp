import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsRoutingModule, routedComponents } from './forms-routing.module';
import { MemberDetailFormService } from '../../@core/data/member-detail-form.service';

@NgModule( {
    imports: [
        ThemeModule,
        FormsRoutingModule,
    ],
    declarations: [
        ...routedComponents,
    ],
    providers: [MemberDetailFormService],
} )
export class FormsModule { }

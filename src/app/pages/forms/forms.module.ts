import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsRoutingModule, routedComponents } from './forms-routing.module';
import { MemberDetailFormService } from '../../@core/data/member-detail-form.service';
import { ToasterModule } from 'angular2-toaster';

@NgModule( {
    imports: [
        ThemeModule,
        FormsRoutingModule,
        ToasterModule.forRoot(),
    ],
    declarations: [
        ...routedComponents,
    ],
    providers: [MemberDetailFormService],
} )
export class FormsModule { }

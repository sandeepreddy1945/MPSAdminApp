import { NgModule } from '@angular/core';
import { CKEditorModule } from 'ng2-ckeditor';

import { ThemeModule } from '../../@theme/theme.module';

import { EditorsRoutingModule, routedComponents } from './editors-routing.module';
import { LoginProfileComponent } from './login-profile/login-profile.component';
import { LoginServiceService } from '../../@core/data/login-service.service';
import { ToasterModule } from 'angular2-toaster';

@NgModule( {
    imports: [
        ThemeModule,
        EditorsRoutingModule,
        CKEditorModule,
        ToasterModule.forRoot(),
    ],
    declarations: [
        ...routedComponents,
        LoginProfileComponent,
    ],
    providers: [LoginServiceService],
} )
export class EditorsModule { }

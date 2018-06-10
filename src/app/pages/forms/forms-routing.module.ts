import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsComponent } from './forms.component';
import { FormInputsComponent } from './form-inputs/form-inputs.component';
import { FormLayoutsComponent } from './form-layouts/form-layouts.component';
import { MemberDetailFormComponent } from './member-detail-form/member-detail-form.component';

const routes: Routes = [{
    path: '',
    component: FormsComponent,
    children: [{
        path: 'inputs',
        component: FormInputsComponent,
    }, {
        path: 'layouts',
        component: FormLayoutsComponent,
    }, {
        path: 'memberDetailForm',
        component: MemberDetailFormComponent,
    }],
}];

@NgModule( {
    imports: [
        RouterModule.forChild( routes ),
    ],
    exports: [
        RouterModule,
    ],
} )
export class FormsRoutingModule {

}

export const routedComponents = [
    FormsComponent,
    FormInputsComponent,
    FormLayoutsComponent,
    MemberDetailFormComponent,
];

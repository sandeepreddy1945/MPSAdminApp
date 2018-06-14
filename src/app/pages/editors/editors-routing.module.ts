import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorsComponent } from './editors.component';
import { TinyMCEComponent } from './tiny-mce/tiny-mce.component';
import { CKEditorComponent } from './ckeditor/ckeditor.component';
import { LoginProfileComponent } from './login-profile/login-profile.component';

const routes: Routes = [{
    path: '',
    component: EditorsComponent,
    children: [{
        path: 'tinymce',
        component: TinyMCEComponent,
    }, {
        path: 'ckeditor',
        component: CKEditorComponent,
    }, {
        path: 'profile',
        component: LoginProfileComponent,
    }],
}];

@NgModule( {
    imports: [RouterModule.forChild( routes )],
    exports: [RouterModule],
} )
export class EditorsRoutingModule { }

export const routedComponents = [
    EditorsComponent,
    TinyMCEComponent,
    CKEditorComponent,
];

import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
    NbAuthComponent,
    NbLoginComponent,
    NbLogoutComponent,
    NbRegisterComponent,
    NbRequestPasswordComponent,
    NbResetPasswordComponent,
} from '@nebular/auth';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
    { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
    {
        path: 'auth',
        // canActivate: [AuthGuardService], component placement not correct here.
        component: NbAuthComponent,
        children: [
            {
                path: '',
                component: NbLoginComponent,
            },
            {
                path: 'login',
                component: NbLoginComponent,
            },
            {
                path: 'register',
                component: NbRegisterComponent,
            },
            {
                path: 'logout',
                component: NbLogoutComponent,
            },
            {
                path: 'request-password',
                component: NbRequestPasswordComponent,
            },
            {
                path: 'reset-password',
                component: NbResetPasswordComponent,
            },
        ],
    },
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth/login' },
];

const config: ExtraOptions = {
    useHash: true,
};

@NgModule( {
    imports: [RouterModule.forRoot( routes, config )],
    exports: [RouterModule],
} )
export class AppRoutingModule {
}

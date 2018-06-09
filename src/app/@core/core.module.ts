import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbEmailPassAuthProvider } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import { environment } from '../../environments/environment';

const socialLinks = [
  {
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'socicon-github',
  },
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'socicon-facebook',
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'socicon-twitter',
  },
];

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({
    providers: {
        email: {
            service: NbEmailPassAuthProvider,
            config: {
                baseEndpoint: environment.devServerURL, // replace it with prod when used in production
                login: {
                    alwaysFail: false,
                    rememberMe: true,
                    endpoint: '/auth/sign-in',
                    method: 'post',
                    redirect: {
                        success: '/pages', // redirect to dashboard once successfully authenticated.
                        failure: null,
                    },
                    defaultMessages: ['You have been successfully logged in.'],
                },
                register: {
                    endpoint: '/auth/sign-up',
                    method: 'post',
                    redirect: {
                        success: '/pages', // redirect to dashboard once successfully authenticated.
                        failure: null,
                    },
                    rememberMe: true,
                },
                logout: {
                    endpoint: '/auth/sign-out',
                    method: 'post',
                },
                requestPass: {
                    endpoint: '/auth/request-pass',
                    method: 'post',
                },
                resetPass: {
                    endpoint: '/auth/reset-pass',
                    method: 'post',
                },
                token: {
                    key: 'token', // this parameter tells Nebular where to look for the token
                },
            },
        },
    },
    forms: {
      login: {
        socialLinks: socialLinks,
      },
      register: {
        socialLinks: socialLinks,
      },
    },
  }).providers,
  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,
  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}

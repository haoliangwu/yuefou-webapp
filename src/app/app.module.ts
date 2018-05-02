import * as R from 'ramda';

import { NgModule, Inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpHeaders, HttpClientModule, HttpClient } from '@angular/common/http';

import { ApolloModule, Apollo } from 'apollo-angular';
import { ApolloLink, from, split } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import { createPersistedQueryLink } from 'apollo-angular-link-persisted';
import { HttpLinkModule, HttpLink } from 'apollo-upload-angular-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';

import { Ng2Webstorage, LocalStorage, LocalStorageService } from 'ngx-webstorage';
import { LoadingMaskModule, LOADING_MASK_HEADER, DEFAULT_MASK_GROUP } from 'ngx-loading-mask';
import { ToastrModule, ToastContainerModule, ToastrService, DefaultGlobalConfig } from 'ngx-toastr';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { PageNotFoundComponent } from './shared/comps/page-not-found/page-not-found.component';
import { LOCALSTORAGE, TOAST, APP_HOST } from './constants';
import { ProfileModule } from './profile/profile.module';
import { SharedModule } from './shared/shared.module';

import { AppConfigProvider, DataIdFromObjectProvider, DataIdFromObjectToken } from './app.config';
import { OperationDefinitionNode } from 'graphql';
import { DataIdFromObjectResolver } from './model';
import { PublicModule } from './public/public.module';
import { RouterUtilService, LocationUtilService } from './shared/services';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  // Using relative path to the translation files to ensure cross platform compatibility (majorly because of the electron apps)
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // ng
    BrowserModule,
    BrowserAnimationsModule,
    // 3rd lib
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    LoadingMaskModule.forRoot({}),
    Ng2Webstorage.forRoot({
      prefix: 'yuefou',
      separator: '-'
    }),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    ToastContainerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    // shared module
    // need to invoke the forRoot method
    // in case sharing same service instances with lazy-load feature modules
    SharedModule.forRoot(),
    // feature modules
    AuthModule,
    ProfileModule,
    PublicModule,
    // app root route
    // should be last one
    RouterModule.forRoot(
      appRoutes
    ),
  ],
  providers: [
    AppConfigProvider,
    DataIdFromObjectProvider
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLinkService: HttpLink,
    private toastrService: ToastrService,
    private translate: TranslateService,
    @Inject(DataIdFromObjectToken) private dataIdFromObject: DataIdFromObjectResolver,
    private router: Router,
    private routerUtil: RouterUtilService,
    private storage: LocalStorageService,
    private location: LocationUtilService
  ) {
    const authLink = new ApolloLink((operation, forward) => {
      if (operation.operationName === 'IntrospectionQuery') {
        return forward(operation);
      }

      const group = operation.variables[LOADING_MASK_HEADER];

      let headers = new HttpHeaders({
        [LOADING_MASK_HEADER]: R.defaultTo(DEFAULT_MASK_GROUP, group)
      });

      const token = this.storage.retrieve(LOCALSTORAGE.API_TOKEN);

      if (!!token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }

      operation.setContext({ headers });

      return forward(operation);
    });

    const errorLink = onError(({ graphQLErrors, networkError, response }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, source, path }) => {
          console.error(
            `[GraphQL error]: Message: ${message}, Path: ${path}`,
          );

          // TODO server 端需要返回按错误代码标识的错误信息
          this.toastrService.error(this.translate.instant(`SERVER.ERROR.${message}`));

          if (message === 'invalid token') {
            this.routerUtil.clearToken();

            this.router.navigate(['/login']);
          }
        });
      }

      if (networkError) {
        console.error(`[Network error]: ${networkError}`);

        this.toastrService.error(this.translate.instant('TOAST.ERROR.BASE'));
      }
    });

    const http = createPersistedQueryLink().concat(httpLinkService.create({ uri: '/graphql' }));

    const appHost = this.location.isInternalHost() ? APP_HOST.dev : APP_HOST.prod;

    const ws = new WebSocketLink({
      uri: `ws://${appHost}/graphql`,
      options: {
        reconnect: true,
        // connectionParams: {
        //   authToken: user.authToken,
        // }
      }
    });

    const link = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode;
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      ws,
      http,
    );

    // default apollo-client
    apollo.create({
      link: from([authLink, errorLink, link]),
      cache: new InMemoryCache({
        dataIdFromObject: this.dataIdFromObject
      }),
      defaultOptions: {
        watchQuery: {
          errorPolicy: 'ignore',
        },
        query: {
          fetchPolicy: 'network-only',
          errorPolicy: 'all',
        },
        mutate: {
          errorPolicy: 'all'
        }
      }
    });

    const uploadLink = httpLinkService.create({
      uri: '/graphql'
    });

    // upload apollo-client
    apollo.create({
      link: authLink.concat(uploadLink),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          errorPolicy: 'ignore',
        },
        query: {
          fetchPolicy: 'network-only',
          errorPolicy: 'all',
        },
        mutate: {
          errorPolicy: 'all'
        }
      }
    }, 'upload');
  }
}

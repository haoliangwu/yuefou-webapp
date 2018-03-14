import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpHeaders, HttpClientModule } from '@angular/common/http';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { ApolloLink, from } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

import { Ng2Webstorage, LocalStorage } from 'ngx-webstorage';
import { LoadingMaskModule, LOADING_MASK_HEADER, DEFAULT_MASK_GROUP } from 'ngx-loading-mask';
import { ToastrModule, ToastContainerModule, ToastrService } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { LOCALSTORAGE, TOAST } from './constants';
import { ProfileModule } from './profile/profile.module';
import { SharedModule } from './shared/shared.module';

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
      positionClass: 'toast-top-full-width',
      preventDuplicates: true,
    }),
    ToastContainerModule,
    // shared module
    // need to invoke the forRoot method
    // in case sharing same service instances with lazy-load feature modules
    SharedModule.forRoot(),
    // feature modules
    ProfileModule,
    AuthModule,
    // app root route
    // should be last one
    RouterModule.forRoot(
      appRoutes,
    ),
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  @LocalStorage(LOCALSTORAGE.API_TOKEN)
  private token;

  constructor(
    apollo: Apollo,
    httpLinkService: HttpLink,
    private toastrService: ToastrService,
  ) {
    const authLink = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: new HttpHeaders({
          [LOADING_MASK_HEADER]: operation.variables[LOADING_MASK_HEADER] || DEFAULT_MASK_GROUP,
          'Authorization': `Bearer ${this.token}`
        })
      });

      return forward(operation);
    });

    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, code, path }) => {
          console.error(
            `[GraphQL error]: Message: ${message}, Code: ${code}, Path: ${path}`,
          );

          // TODO server 端需要返回按错误代码标识的错误信息
          this.toastrService.error(message);
        },
        );
      }

      if (networkError) {
        console.error(`[Network error]: ${networkError}`);

        this.toastrService.error(TOAST.ERROR.BASE);
      }
    });

    const httpLink = httpLinkService.create({ uri: 'http://prisma.littlelyon.com:4000' });

    apollo.create({
      link: from([authLink, errorLink, httpLink]),
      cache: new InMemoryCache(),
      defaultOptions: {
        query: {
          errorPolicy: 'all'
        }
      }
    });
  }
}

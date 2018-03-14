// ng
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// 3rd lib
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { concat, ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Ng2Webstorage, LocalStorage } from 'ngx-webstorage';
import { HttpHeaders } from '@angular/common/http';
import { LoadingMaskModule } from 'ngx-loading-mask';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';

// app
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { LOCALSTORAGE } from './constants';
import { ProfileModule } from './profile/profile.module';
import { SharedModule } from './shared/shared.module';
import { LOADING_MASK_HEADER, DEFAULT_MASK_GROUP } from 'ngx-loading-mask';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    SharedModule,
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
    // feature modules
    ProfileModule,
    AuthModule,
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
    httpLink: HttpLink
  ) {
    const http = httpLink.create({ uri: 'http://prisma.littlelyon.com:4000' });

    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: new HttpHeaders({
          [LOADING_MASK_HEADER]: operation.variables[LOADING_MASK_HEADER] || DEFAULT_MASK_GROUP,
          'Authorization': `Bearer ${this.token}`
        })
      });

      return forward(operation);
    });

    apollo.create({
      link: concat(authMiddleware, http),
      cache: new InMemoryCache()
    });
  }
}

import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { LoadingMaskService, LOADING_MASK_HEADER, DEFAULT_MASK_GROUP } from 'ngx-loading-mask';
import { Apollo } from 'apollo-angular';
import { tap, map } from 'rxjs/operators';
import { AppConfigQuery } from '../graphql/config.graphql';
import { appConfigQueryQuery, AppConfig } from '../../model';
import { of } from 'rxjs/observable/of';
import { CosConfig, AppEnvConfig } from '../../model/inject';

@Injectable()
export class CosSdkService {
  private _bucket: string;
  private _region: string;
  cos: any;

  get bucket() {
    return this._bucket;
  }

  get region() {
    return this._region;
  }

  constructor(
    private httpClient: HttpClient,
    private loadingMask: LoadingMaskService,
    private apollo: Apollo
  ) {
    this.cos = new COS({
      getSTS: this.getSTS.bind(this)
    });
  }

  private getSTS(options, callback) {
    this.httpClient.get('/sts-auth', {
      headers: new HttpHeaders().set(LOADING_MASK_HEADER, DEFAULT_MASK_GROUP),
    }).subscribe(data => {
      callback(data);
    });
  }

  initCosConfig(): Promise<AppEnvConfig> {
    return this.apollo.query<appConfigQueryQuery>({
      query: AppConfigQuery,
      variables: { [LOADING_MASK_HEADER]: false },
      fetchPolicy: 'network-only'
    }).pipe(
      map(result => result.data.config),
      tap(({ cos }) => {
        this._bucket = cos.bucket;
        this._region = cos.region;
      })
    ).toPromise();
  }

  sliceUploadFile(key: string, file: File | Blob): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.cos.sliceUploadFile({
        Bucket: this._bucket,
        Region: this._region,
        Key: key,
        Body: file,
        TaskReady: (taskId) => {
          this.loadingMask.showGroup();
        },
        // onHashProgress: function (progressData) {
        //   console.log(JSON.stringify(progressData));
        // },
        // onProgress: function ({ percent }) {
        // }
      }, (err, data) => {
        this.loadingMask.hideGroup();

        if (err) {
          observer.error(err);
        } else {
          observer.next(data);
        }

        observer.complete();
      });
    });
  }
}

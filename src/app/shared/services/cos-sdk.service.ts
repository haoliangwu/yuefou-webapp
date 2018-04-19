import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { LoadingMaskService } from 'ngx-loading-mask';

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
    private loadingMask: LoadingMaskService
  ) {
    this.cos = new COS({
      getSTS: this.getSTS.bind(this)
    });
  }

  private getSTS(options, callback) {
    this.httpClient.get('/sts-auth').subscribe(data => {
      callback(data);
    });
  }

  initCosConfig() {
    this._bucket = 'test-1256165069';
    this._region = 'ap-beijing';
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

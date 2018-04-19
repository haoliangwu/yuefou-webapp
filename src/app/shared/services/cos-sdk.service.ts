import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { CosConfig, CosConfigToken } from '../../model/inject';
import { LoadingMaskService } from 'ngx-loading-mask';

@Injectable()
export class CosSdkService {
  private bucket: string;
  private region: string;
  cos: any;

  constructor(
    private httpClient: HttpClient,
    @Inject(CosConfigToken) private cosConfig: CosConfig,
    private loadingMask: LoadingMaskService
  ) {
    this.bucket = cosConfig.bucket;
    this.region = cosConfig.region;

    this.cos = new COS({
      getSTS: this.getSTS.bind(this)
    });
  }

  private getSTS(options, callback) {
    this.httpClient.get('/sts-auth').subscribe(data => {
      callback(data);
    });
  }

  sliceUploadFile(key: string, file: File | Blob): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.cos.sliceUploadFile({
        Bucket: this.bucket,
        Region: this.region,
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

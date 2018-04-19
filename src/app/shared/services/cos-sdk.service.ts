import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class CosSdkService {
  private bucket = 'test-1256165069';
  private region = 'ap-beijing';
  cos: any;

  constructor(
    private httpClient: HttpClient
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

  sliceUploadFile(key: string, file: File | Blob): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.cos.sliceUploadFile({
        Bucket: this.bucket,
        Region: this.region,
        Key: key,
        Body: file,
        // TaskReady: function (taskId) {
        //   console.log(taskId);
        // },
        // onHashProgress: function (progressData) {
        //   console.log(JSON.stringify(progressData));
        // },
        // onProgress: function ({ percent }) {
        // }
      }, function (err, data) {
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

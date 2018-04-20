import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User, UpdateOperationPayload, UpdateOperation } from '../../model';
import { map, tap, mapTo, debounceTime, publishBehavior, refCount, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { BaseUpdatedComponent } from '../../utils/base-updated-component';
import { FormUtilService, FileReaderService, CosSdkService, UserService } from '../../shared/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { merge } from 'rxjs/observable/merge';
import { Subject } from 'rxjs/Subject';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends BaseUpdatedComponent<User> implements OnInit {
  data$: Observable<User>;
  avatar$: Observable<string>;
  avatarChange$ = new Subject<void>();

  titleText = 'SETTINGS.PAGE_TITLE';
  form: FormGroup;

  private avatarFile: File;

  constructor(
    private fb: FormBuilder,
    private formUtil: FormUtilService,
    private router: Router,
    private route: ActivatedRoute,
    private fileReader: FileReaderService,
    private userService: UserService,
    private toastService: ToastrService,
    private translate: TranslateService
  ) {
    super(formUtil);
  }

  get avatar() {
    return this.form.get('avatar').value;
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      avatar: ['']
    });

    this.data$ = this.route.data.pipe(
      map(resolve => resolve.me),
      tap(me => {
        this.data = me;
        this.form.patchValue(me);
      })
    );

    const updateOn$ = merge(this.form.valueChanges, this.avatarChange$).pipe(
      mapTo(true)
    );
    const updateOff$ = this.reset$.pipe(
      mapTo(false)
    );

    this.updated$ = merge(updateOn$, updateOff$, this.updated$)
      .pipe(
        debounceTime(100),
        publishBehavior(false),
        refCount()
      );
  }

  protected cancel(): void {
    this.form.reset(this.data);
    this.avatarFile = null;

    this.reset$.next();
  }

  protected delete(data: User): void { }

  protected create(): void { }

  protected update(data: User): void {
    const updatedUser = this.form.value;
    let observable: Observable<User>;

    if (this.avatarFile) {
      // 如果更新了 avatar 则需要先上传 avatar 再更新 user
      observable = this.userService.uploadAvatar(data.id, this.avatarFile).pipe(
        tap(res => updatedUser.avatar = res.fileName),
        switchMap(() => this.userService.update(updatedUser))
      );
    } else {
      observable = this.userService.update(updatedUser);
    }

    observable
      .subscribe(user => {
        this.finished$.next(true);

        this.toastService.success(this.translate.instant('TOAST.SUCCESS.UPDATE_SUCCESS'));

        this.data = user;

        this.cancel();
      });
  }

  protected redirect(): void {
  }

  actionReqset(action: UpdateOperationPayload) {
    switch (action.operation) {
      case UpdateOperation.SAVE:
        this.save();
        return;
      case UpdateOperation.CANCEL:
        this.cancel();
        return;
    }
  }

  selectFile(file: File) {
    this.avatarFile = file;
    this.form.patchValue({
      avatar: this.fileReader.createObjectURL(file)
    });
  }
}

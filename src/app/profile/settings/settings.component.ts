import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User, UpdateOperationPayload, UpdateOperation } from '../../model';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { BaseUpdatedComponent } from '../../utils/base-updated-component';
import { FormUtilService } from '../../shared/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends BaseUpdatedComponent<User> implements OnInit {
  data$: Observable<User>;

  titleText = 'SETTINGS.PAGE_TITLE';
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formUtil: FormUtilService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(formUtil);
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
        this.form.patchValue(me);
      })
    );
  }

  protected cancel(): void {
    throw new Error('Method not implemented.');
  }

  protected delete(data: User): void {}

  protected create(): void {
    throw new Error('Method not implemented.');
  }

  protected update(data: User): void {
    throw new Error('Method not implemented.');
  }

  protected redirect(): void {
    throw new Error('Method not implemented.');
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

}

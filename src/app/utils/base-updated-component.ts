import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { FormGroup } from '@angular/forms';
import { FormUtilService } from '../shared/services';

export abstract class BaseUpdatedComponent<Data = any> {
  // event
  updated$: Observable<boolean> = new BehaviorSubject<boolean>(false);
  finished$ = new BehaviorSubject<boolean>(false);
  reset$ = new Subject<void>();
  formUpdated$ = new Subject<void>();

  // vm
  data: Data;
  data$: Observable<Data>;

  // form
  form: FormGroup;

  constructor(
    private _formUtil: FormUtilService
  ) { }

  // 校验表单
  protected validateForm() {
    this._formUtil.validateAllFormFields(this.form);

    if (this.form.invalid) {
      return true;
    }

    return false;
  }

  // 保存
  protected save(): void {
    if (this.validateForm()) {
      return;
    }

    if (this.data) {
      this.update(this.data);
    } else {
      this.create();
    }
  }

  // 取消
  protected abstract cancel(): void;

  // 删除
  protected abstract delete(data: Data): void;

  // 创建
  protected abstract create(): void;

  // 编辑
  protected abstract update(data: Data): void;

  // 跳转
  protected abstract redirect(): void;
}

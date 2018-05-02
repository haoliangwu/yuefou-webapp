export const LOCALSTORAGE = {
  API_TOKEN: 'api-token',
  REMEMBER_ME: 'remember-me',
  USER: 'user'
};

export const TOAST = {
  SUCCESS: {
    SIGN_UP: 'success-signup',
    LOGIN: 'success-login',
    LOGOUT: 'success-logout',
    CREATE_USER: 'success-create-user',
    UPDATE_USER: 'success-update-user',
    CREATE_ACTIVITY: 'success-create-activity',
    UPDATE_ACTIVITY: 'success-update-activity',
    CREATE_TASK: 'success-create-task',
    UPDATE_TASK: 'success-update-task',
    BASE: 'successful-operation'
  },
  WARN: {
    INVALID_FORM: 'invalid-form'
  },
  FAIL: {
    LOGIN: 'failure-login',
    BASE: 'failure-operation'
  },
  ERROR: {
    BASE: 'unknown-error-occurred'
  }
};

export const APP_HOST = {
  prod: 'yuefou.littlelyon.com',
  dev: 'yuefou_dev.littlelyon.com'
};

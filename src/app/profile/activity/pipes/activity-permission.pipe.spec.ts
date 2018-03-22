import { ActivityPermissionPipe } from './activity-permission.pipe';

describe('ActivityPermissionPipe', () => {
  it('create an instance', () => {
    const pipe = new ActivityPermissionPipe();
    expect(pipe).toBeTruthy();
  });
});

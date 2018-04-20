import { UserResourcePrefixPipe } from './user-resource-prefix.pipe';

describe('UserResourcePrefixPipe', () => {
  it('create an instance', () => {
    const pipe = new UserResourcePrefixPipe();
    expect(pipe).toBeTruthy();
  });
});

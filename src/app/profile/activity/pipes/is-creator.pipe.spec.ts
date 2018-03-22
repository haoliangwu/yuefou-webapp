import { IsCreatorPipe } from './is-creator.pipe';

describe('IsCreatorPipe', () => {
  it('create an instance', () => {
    const pipe = new IsCreatorPipe();
    expect(pipe).toBeTruthy();
  });
});

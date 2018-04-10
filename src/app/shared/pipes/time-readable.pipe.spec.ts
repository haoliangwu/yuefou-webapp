import { TimeReadablePipe } from './time-readable.pipe';

describe('TimeReadablePipe', () => {
  it('create an instance', () => {
    const pipe = new TimeReadablePipe();
    expect(pipe).toBeTruthy();
  });
});

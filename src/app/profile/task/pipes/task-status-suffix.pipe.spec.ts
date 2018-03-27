import { TaskStatusSuffixPipe } from './task-status-suffix.pipe';

describe('TaskStatusSuffixPipe', () => {
  it('create an instance', () => {
    const pipe = new TaskStatusSuffixPipe();
    expect(pipe).toBeTruthy();
  });
});

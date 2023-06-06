import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {

  it('create an instance', () => {
    const pipe = new DurationPipe();
    expect(pipe).toBeTruthy();
  });

  it('should display duration 140 in correct format "2 h 20 min"', () => {
    const pipeDuration = new DurationPipe();
    const formatDuration = pipeDuration.transform(140);
    expect(formatDuration).toEqual('2 h 20 min');
  });

  it('should display string duration in correct format ', () => {
    const pipeDuration = new DurationPipe();
    const formatDuration = pipeDuration.transform('2 h 20 min');
    expect(formatDuration).toEqual('2 h 20 min');
  });

  it('should display only minutes if duration less than 1h', () => {
    const pipeDuration = new DurationPipe();
    const formatDuration = pipeDuration.transform(40);
    expect(formatDuration).toEqual('40 min');
  });
});

import { async, TestBed } from '@angular/core/testing';
import { DateTimeHelper } from '@askanative-angulartoolkit/shared/common';

describe('Helper: DateTimeHelper', () => {
  let helper: DateTimeHelper;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [DateTimeHelper],
    }).compileComponents();
  }));

  beforeEach(() => {
    helper = new DateTimeHelper();
  });

  it('should create', () => {
    expect(helper).toBeTruthy();
  });

  it('should return only Date', () => {
    const date = new Date('01.01.2018');
    expect(helper.getDate(date).toString()).toEqual('01.01.2018');
  });

  it('should return UTC Date', () => {
    const date = new Date('01.01.2018');
    expect(helper.getUtcDate(date).toString()).toEqual('31.12.2017');
  });

  it('should return UTC', () => {
    const date = new Date('01.01.2018');
    expect(helper.getUtc(date).toString()).toEqual('2017-12-31T23:00:00Z');
  });

  it('should return MM/DD/YY', () => {
    const date = new Date('2018-09-01T03:24:00');
    expect(helper.format(date, 'MM/DD/YY').toString()).toEqual('09/01/18');
  });
});

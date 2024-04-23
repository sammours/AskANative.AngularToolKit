import { async, TestBed } from '@angular/core/testing';
import { GuidHelper } from '@askanative-angulartoolkit/shared/common';

describe('Helper: GuidHelper', () => {
  let helper: GuidHelper;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [GuidHelper],
    }).compileComponents();
  }));

  beforeEach(() => {
    helper = new GuidHelper();
  });

  it('should create', () => {
    expect(helper).toBeTruthy();
  });

  it('should return Guid', () => {
    expect(helper.getGuid()).toBeTruthy('');
    expect(helper.getGuid().length).toEqual(36);
  });

  it('should validate guid', () => {
    const guid = '12345678-1234-1234-1234-123456789abc';
    expect(helper.isValidGuid(guid)).toEqual(true);
  });
});

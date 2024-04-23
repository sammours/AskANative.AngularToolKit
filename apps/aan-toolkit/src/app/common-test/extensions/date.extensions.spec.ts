describe('Date Extensions', () => {
  let date: Date;
  beforeEach(() => {
    date = new Date('2019-5-8');
  });

  it('Should be after or equal', () => {
    expect(date.after(new Date('2019-5-7'))).toBeTruthy();
    expect(date.after(new Date('2019-6-7'))).toBeFalsy();
    expect(date.afterOrEqual(new Date('2019-5-7'))).toBeTruthy();
    expect(date.afterOrEqual(new Date('2019-5-8'))).toBeTruthy();
    expect(date.afterOrEqual(new Date('2019-6-7'))).toBeFalsy();
  });

  it('Should be before or equal', () => {
    expect(date.before(new Date('2019-6-7'))).toBeTruthy();
    expect(date.before(new Date('2019-5-7'))).toBeFalsy();
    expect(date.beforeOrEqual(new Date('2019-6-7'))).toBeTruthy();
    expect(date.beforeOrEqual(new Date('2019-5-8'))).toBeTruthy();
    expect(date.beforeOrEqual(new Date('2019-5-7'))).toBeFalsy();
  });

  it('Should be equal', () => {
    expect(date.equal(new Date('2019-5-8'))).toBeTruthy();
    expect(date.equal(new Date('2019-6-7'))).toBeFalsy();
  });

  it('Should be between', () => {
    expect(
      date.between(new Date('2019-4-1'), new Date('2019-6-1'))
    ).toBeTruthy();
    expect(
      date.between(new Date('2019-4-1'), new Date('2019-5-1'))
    ).toBeFalsy();
    expect(
      date.between(new Date('2019-5-9'), new Date('2019-6-1'))
    ).toBeFalsy();
  });
});

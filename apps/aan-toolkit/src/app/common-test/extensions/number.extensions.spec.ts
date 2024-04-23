describe('number Extensions', () => {
  it('Should be positive', () => {
    expect((1 as number).isPositive()).toBeTruthy();
    expect((-1 as number).isPositive()).toBeFalsy();
  });

  it('Should be nigative', () => {
    expect((-1 as number).isNegative()).toBeTruthy();
    expect((1 as number).isNegative()).toBeFalsy();
  });

  it('Should be less or equal', () => {
    expect((1 as number).isLess(2)).toBeTruthy();
    expect((2 as number).isLess(2)).toBeFalsy();
    expect((1 as number).isLessOrEqual(2)).toBeTruthy();
    expect((2 as number).isLessOrEqual(2)).toBeTruthy();
    expect((5 as number).isLessOrEqual(3)).toBeFalsy();
  });

  it('Should be gearter or equal', () => {
    expect((3 as number).isGreater(2)).toBeTruthy();
    expect((2 as number).isGreater(2)).toBeFalsy();
    expect((3 as number).isGreaterOrEqual(2)).toBeTruthy();
    expect((2 as number).isGreaterOrEqual(2)).toBeTruthy();
    expect((1 as number).isGreaterOrEqual(3)).toBeFalsy();
  });
});

describe('String Extensions', () => {
  it('Should be empty', () => {
    expect(''.isEmpty()).toBeTruthy();
    expect('value'.isEmpty()).toBeFalsy();
  });

  it('Should be not empty', () => {
    expect('value'.isNotEmpty()).toBeTruthy();
    expect(''.isNotEmpty()).toBeFalsy();
  });

  it('Should be valid url', () => {
    expect('http://www.google.com'.isUrl()).toBeTruthy();
    expect('http://google.com'.isUrl()).toBeTruthy();
    expect('https://www.google.com'.isUrl()).toBeTruthy();
    expect('https://google.com'.isUrl()).toBeTruthy();
    expect('www.google.com'.isUrl()).toBeTruthy();
    expect('Not ... Url'.isUrl()).toBeFalsy();
  });

  it('Should be uppercase', () => {
    expect('HELLO'.isUpperCase()).toBeTruthy();
    expect('HElLO'.isUpperCase()).toBeFalsy();
  });

  it('Should be lowercase', () => {
    expect('hello'.isLowerCase()).toBeTruthy();
    expect('heLlo'.isLowerCase()).toBeFalsy();
  });

  it('Should be valid postal code', () => {
    expect('12345'.isPostalCode('DE')).toBeTruthy();
    expect('12345'.isPostalCode('GB')).toBeFalsy();
    expect('BIQQ 1ZZ'.isPostalCode('GB')).toBeTruthy();
    expect('BIQQ 1ZZ'.isPostalCode('DE')).toBeFalsy();
  });

  it('Should be numeric', () => {
    expect('1234'.isNumeric()).toBeTruthy();
    expect('heLlo123'.isNumeric()).toBeFalsy();
  });

  it('Should be json', () => {
    const json = { id: 1 };
    expect(JSON.stringify(json).isJSON()).toBeTruthy();
    expect('heLlo123'.isJSON()).toBeFalsy();
  });

  it('Should be email', () => {
    expect('jack@hotmail.com'.isEmail()).toBeTruthy();
    expect('jac'.isJSON()).toBeFalsy();
    expect('jack@hotmail'.isJSON()).toBeFalsy();
    expect('jack.com'.isJSON()).toBeFalsy();
    expect('jack@hotmail.c'.isJSON()).toBeFalsy();
  });

  it('Should be decimal', () => {
    expect('1.2345'.isDecimal()).toBeTruthy();
    expect('1'.isDecimal()).toBeTruthy();
    expect('sss'.isDecimal()).toBeFalsy();
  });

  it('Should be credit card', () => {
    expect('4111 1111 1111 1111'.isCreditCard()).toBeTruthy();
    expect('1'.isCreditCard()).toBeFalsy();
  });

  it('Should be base64', () => {
    // tslint:disable-next-line: max-line-length
    const base64 = `iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAG1BMVEXMzMyWlpacnJy+vr6jo6PFxcW3t7eqqqqxsbHbm8QuAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAiklEQVRYhe3QMQ6EIBAF0C+GSInF9mYTs+1ewRsQbmBlayysKefYO2asXbbYxvxHQj6ECQMAEREREf2NQ/fCtp5Zky6vtRMkSJEzhyISynWJnzH6Z8oQlzS7lEc/fLmmQUSvc16OrCPqRl1JePxQYo1ZSWVj9nxrrOb5esw+eXdvzTWfTERERHRXH4tWFZGswQ2yAAAAAElFTkSuQmCC`;
    expect(base64.isBase64()).toBeTruthy();
    expect('1'.isBase64()).toBeFalsy();
  });

  it('Should be alpha code', () => {
    expect('de'.isAlpha()).toBeTruthy();
    expect('de-de'.isAlpha()).toBeFalsy();
    expect('1'.isAlpha()).toBeFalsy();
  });

  it('Should be alphanumeric', () => {
    expect('sss123'.isAlphanumeric()).toBeTruthy();
    expect('sss'.isAlphanumeric()).toBeTruthy();
    expect('123'.isAlphanumeric()).toBeTruthy();
  });

  it('Should be mobile', () => {
    expect('+49 123 222 5667'.isMobile()).toBeTruthy();
    expect('+49 123 345 5667'.isMobile()).toBeTruthy();
    expect('+49 123 345-5667'.isMobile()).toBeTruthy();
    expect('+49 123-45-5667'.isMobile()).toBeTruthy();
    expect('123123-45-5667'.isMobile()).toBeTruthy();
  });

  it('Should convert json', () => {
    const json = JSON.stringify({ id: 1 });
    expect(json.toJSON()).not.toBeNull();
    expect(json.toJSON()).not.toBe({});
  });
});

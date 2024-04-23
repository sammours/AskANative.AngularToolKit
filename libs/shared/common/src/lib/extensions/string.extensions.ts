import * as validatorJS from 'validator';

declare global {
  interface String {
    isEmpty(): boolean;
    isNotEmpty(): boolean;
    isUrl(): boolean;
    isUpperCase(): boolean;
    isLowerCase(): boolean;
    isPostalCode(locale?: string): boolean;
    isNumeric(): boolean;
    isJSON(): boolean;
    isEmail(): boolean;
    isBoolean(): boolean;
    isDecimal(): boolean;
    isCreditCard(): boolean;
    isBase64(): boolean;
    isAlpha(): boolean;
    isAlphanumeric(): boolean;
    isMobile(): boolean;
    toJSON(): any;
  }
}


String.prototype.isEmpty = function (): boolean { return this === ''; };
String.prototype.isNotEmpty = function (): boolean { return this !== ''; };
String.prototype.isUrl = function (): boolean { return validatorJS.isURL(this); };
String.prototype.isUpperCase = function (): boolean { return validatorJS.isUppercase(this); };
String.prototype.isLowerCase = function (): boolean { return validatorJS.isLowercase(this); };

// TODO: improve postal code
String.prototype.isPostalCode = function (locale?: string): boolean {
  if (locale) {
    switch (locale.toLowerCase()) {
      case 'gb': return (/^[A-Za-z]{4}? [0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$/i).test(this);
      case 'am': return (/^(\d{5}([\-]\d{4})?)$/i).test(this);
      case 'br': return (/^[0-9]{5}[\-]?[0-9]{3}$/i).test(this);
      case 'ca': return (/^[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]$/i).test(this);
      case 'nl': return (/^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/i).test(this);
      case 'jp': return (/^\d{3}-\d{4}$/i).test(this);
      case 'lu': return (/^(L\s*(-|—|–))\s*?[\d]{4}$/i).test(this);
      case 'pl': return (/^[0-9]{2}\-[0-9]{3}$/i).test(this);
      case 'es': return (/^((0[1-9]|5[0-2])|[1-4][0-9])[0-9]{3}$/i).test(this);
      case 'se': return (/^\d{3}\s?\d{2}$/i).test(this);
      default: return validatorJS.isPostalCode(this, locale);
    }
  }
};
String.prototype.isNumeric = function (): boolean { return validatorJS.isNumeric(this); };
String.prototype.isJSON = function (): boolean { return validatorJS.isJSON(this); };
String.prototype.isEmail = function (): boolean { return validatorJS.isEmail(this); };
String.prototype.isDecimal = function (): boolean { return validatorJS.isDecimal(this); };
String.prototype.isCreditCard = function (): boolean { return validatorJS.isCreditCard(this); };
String.prototype.isBoolean = function (): boolean { return validatorJS.isBoolean(this); };
String.prototype.isBase64 = function (): boolean { return validatorJS.isBase64(this); };
String.prototype.isAlpha = function (): boolean { return validatorJS.isAlpha(this); };
String.prototype.isAlphanumeric = function (): boolean { return validatorJS.isAlphanumeric(this); };
// TODO: improve mobile expression
String.prototype.isMobile = function (): boolean { return (/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i).test(this); };
String.prototype.toJSON = function (): boolean { return JSON.parse(this); };

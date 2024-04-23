const timePattern = /^(([0-1]{0,1}[0-9]{1})|([2][0-4])):([0-5][0-9])$/;
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validationPatterns = { timePattern, emailPattern };

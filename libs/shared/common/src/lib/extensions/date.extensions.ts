interface Date {
  afterOrEqual(date: Date): boolean;
  after(date: Date): boolean;
  beforeOrEqual(date: Date): boolean;
  before(date: Date): boolean;
  equal(date: Date): boolean;
  between(startDate: Date, endDate: Date): boolean;
}

Date.prototype.afterOrEqual = function(date: Date): boolean { return date && this.getTime() >= date.getTime(); };
Date.prototype.after = function(date: Date): boolean { return date && this.getTime() > date.getTime(); };
Date.prototype.beforeOrEqual = function(date: Date): boolean { return date && this.getTime() <= date.getTime(); };
Date.prototype.before = function(date: Date): boolean { return date && this.getTime() < date.getTime(); };
Date.prototype.equal = function(date: Date): boolean { return date && this.getTime() === date.getTime(); };
Date.prototype.between = function(startDate: Date, endDate: Date): boolean {
  return startDate && endDate && startDate.getTime() <= this.getTime() && this.getTime() <= endDate.getTime(); };

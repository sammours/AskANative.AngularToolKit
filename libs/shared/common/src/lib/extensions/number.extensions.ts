interface Number {
  isPositive(): boolean;
  isNegative(): boolean;
  isLess(threshold: number): boolean;
  isLessOrEqual(threshold: number): boolean;
  isGreater(threshold: number): boolean;
  isGreaterOrEqual(threshold: number): boolean;
}

Number.prototype.isPositive = function(): boolean { return this > 0; };
Number.prototype.isNegative = function(): boolean { return this < 0; };
Number.prototype.isLess = function(threshold: number): boolean { return this < threshold; };
Number.prototype.isLessOrEqual = function(threshold: number): boolean { return this <= threshold; };
Number.prototype.isGreater = function(threshold: number): boolean { return this > threshold; };
Number.prototype.isGreaterOrEqual = function(threshold: number): boolean { return this >= threshold; };

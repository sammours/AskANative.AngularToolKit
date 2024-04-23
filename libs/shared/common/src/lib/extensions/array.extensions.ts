interface Array<T> {
  addOrUpdate(item: T): this;
  addOrUpdateRange(item: Array<T>): this;
  firstOrDefault(predicate: (item: T) => boolean): T;
  where(predicate: (item: T) => boolean): T[];
  remove(item: T): boolean;
  removeRange(items: T[]): void;
  add(item: T): void;
  addRange(items: T[]): void;
  orderBy(propertyExpression: (item: T) => any): T[];
  orderByDescending(propertyExpression: (item: T) => any): T[];
  orderByMany(propertyExpressions: ((item: T) => any)[]): T[];
  orderByManyDescending(propertyExpressions: ((item: T) => any)[]): T[];
  distinct(propertyExpression: (item: T) => any): T[];
  sum(propertyExpression: (item: T) => number): number;
  isEmpty(): boolean;
  isNotEmpty(): boolean;
  hasCount(count: number): boolean;
  hasMaxCount(count: number): boolean;
  hasMinCount(count: number): boolean;
  contain(value: T): boolean;
}

Array.prototype.addOrUpdate = function<T>(item: T): Array<T> {
  const index = this.findIndex((x: T) => x === item);
  if (index !== -1) {
    this[index] = item;
  } else {
    this.push(item);
  }

  return this;
};

Array.prototype.addOrUpdateRange = function<T>(array: Array<T>): Array<T> {
  if (!array || array.length === 0) {
    return this;
  }

  array.forEach(object => {
    this.addOrUpdate(object);
  });

  return this;
};

Array.prototype.firstOrDefault = function<T>(
  predicate: (item: T) => boolean
): T {
  return (this as Array<any>).find(x => predicate(x));
};

Array.prototype.where = function<T>(predicate: (item: T) => boolean): Array<T> {
  const result = (this as Array<any>).filter(x => predicate(x));
  return result ? result : new Array<T>();
};

Array.prototype.remove = function<T>(item: T): boolean {
  const index = (this as Array<any>).indexOf(item);
  if (index > -1) {
    (this as Array<any>).splice(index, 1);
    return true;
  }
  return false;
};

Array.prototype.removeRange = function<T>(items: T[]): void {
  for (const item of items) {
    (this as Array<any>).remove(item);
  }
};

Array.prototype.add = function<T>(item: T): void {
  if (item) {
    (this as Array<any>).push(item);
  }
};

Array.prototype.addRange = function<T>(items: T[]): void {
  if (items) {
    items.forEach(item => this.push(item));
  }
};

Array.prototype.orderBy = function<T>(
  propertyExpression: (item: T) => T
): Array<T> {
  const compareFunction = (item1: T, item2: T): number => {
    if (propertyExpression(item1) > propertyExpression(item2)) {
      return 1;
    }

    if (propertyExpression(item2) > propertyExpression(item1)) {
      return -1;
    }

    return 0;
  };

  return this.sort(compareFunction);
};

Array.prototype.orderByDescending = function<T>(
  propertyExpression: (item: T) => T
): Array<T> {
  const compareFunction = (item1: T, item2: T): number => {
    if (propertyExpression(item1) > propertyExpression(item2)) {
      return -1;
    }

    if (propertyExpression(item2) > propertyExpression(item1)) {
      return 1;
    }

    return 0;
  };

  return this.sort(compareFunction);
};

Array.prototype.orderByMany = function<T>(
  propertyExpressions: ((item: T) => any)[]
): Array<T> {
  const compareFunction = (item1: T, item2: T): number => {
    for (const propertyExpression of propertyExpressions) {
      if (propertyExpression(item1) > propertyExpression(item2)) {
        return 1;
      }

      if (propertyExpression(item2) > propertyExpression(item1)) {
        return -1;
      }
    }
    return 0;
  };

  return this.sort(compareFunction);
};

Array.prototype.orderByManyDescending = function<T>(
  propertyExpressions: ((item: T) => any)[]
) {
  const compareFunction = (item1: T, item2: T): number => {
    for (const propertyExpression of propertyExpressions) {
      if (propertyExpression(item1) > propertyExpression(item2)) {
        return -1;
      }

      if (propertyExpression(item2) > propertyExpression(item1)) {
        return 1;
      }
    }
    return 0;
  };

  return this.sort(compareFunction);
};

Array.prototype.distinct = function<T>(
  propertyExpression: (item: T) => any
): Array<T> {
  return Array.from(new Set(this.map(x => propertyExpression(x)))).map(x =>
    this.firstOrDefault(item => propertyExpression(item) === x)
  );
};

Array.prototype.sum = function sumBy<T>(
  propertyExpression: (x: T) => number
): number {
  return this.reduce((pre: number, cur: T) => pre + propertyExpression(cur), 0);
};

Array.prototype.isNotEmpty = function(): boolean {
  return this.length > 0;
};
Array.prototype.isEmpty = function(): boolean {
  return this.length === 0;
};
Array.prototype.hasCount = function(count: number): boolean {
  return this.length === count;
};
Array.prototype.hasMinCount = function(count: number): boolean {
  return this.length >= count;
};
Array.prototype.hasMaxCount = function(count: number): boolean {
  return this.length <= count;
};
Array.prototype.contain = function<T>(value: T): boolean {
  return this.find((x: T) => x === value) != null;
};

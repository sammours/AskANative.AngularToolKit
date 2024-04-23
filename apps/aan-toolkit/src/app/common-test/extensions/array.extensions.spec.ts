import { deepCopy } from '@askanative-angulartoolkit/shared/common';

describe('Array Extensions', () => {
  let items: Array<StubModel>;
  beforeEach(() => {
    items = Array<StubModel>();

    let stub = new StubModel();
    stub.id = '1';
    stub.title = 'first Title';
    stub.username = 'Thomas';
    stub.content = 'first Content';
    items.push(stub);

    stub = new StubModel();
    stub.id = '2';
    stub.title = 'second Title';
    stub.username = 'Jane';
    stub.content = 'second Content';
    items.push(stub);

    stub = new StubModel();
    stub.id = '3';
    stub.title = 'third Title';
    stub.username = 'Joe';
    stub.content = 'third Content';
    items.push(stub);
  });

  it('Should create array with no items', () => {
    expect(items).toBeDefined();
    expect(items.length).toBe(3);
  });

  it('Should find first item', () => {
    let first = items.firstOrDefault((x) => x.username === 'Thomas');
    expect(first.id).toBe('1');
    first = items.firstOrDefault((x) => x.title === 'second Title');
    expect(first.id).toBe('2');
  });

  it('Should not find invalid item', () => {
    const first = items.firstOrDefault((x) => x.username === 'z');
    expect(first).toBe(undefined);
  });

  it('Should filter items', () => {
    const result = items.where((item) => item.username.indexOf('J') > -1);
    expect(result.length).toBe(2);
  });

  it('Should remove an item', () => {
    const result = items.remove(items[0]);
    expect(result).toBe(true);
    expect(items.length).toBe(2);
  });

  it('Should not remove an item', () => {
    const result = items.remove(new StubModel());
    expect(result).toBe(false);
    expect(items.length).toBe(3);
  });

  it('Should add item', () => {
    items.add(deepCopy(items[0]));
    expect(items.length).toBe(4);
    expect(items[3].id).toBe('1');
  });

  it('Should add item range', () => {
    items.addRange([deepCopy(items[0]), deepCopy(items[1])]);
    expect(items.length).toBe(5);
    expect(items[3].id).toBe('1');
    expect(items[4].id).toBe('2');
  });

  it('Should remove item range', () => {
    items.removeRange([items[0], items[1]]);
    expect(items.length).toBe(1);
  });

  it('Should sort asc', () => {
    const testData = deepCopy(items);
    const sorted = testData.orderBy((item) => item.username);
    expect(sorted[0].username).toBe('Jane');
    expect(sorted[1].username).toBe('Joe');
    expect(sorted[2].username).toBe('Thomas');
  });

  it('Should sort descending', () => {
    const testData = deepCopy(items);
    const sorted = testData.orderByDescending((item) => item.username);
    expect(sorted[0].username).toBe('Thomas');
    expect(sorted[1].username).toBe('Joe');
    expect(sorted[2].username).toBe('Jane');
  });

  it('Should sort by many', () => {
    const testData = deepCopy(items);
    const sorted = testData.orderByMany([
      (x: { username: any }) => x.username,
      (x) => x.title,
    ]);
    expect(sorted[0].username).toBe('Jane');
    expect(sorted[1].username).toBe('Joe');
    expect(sorted[2].username).toBe('Thomas');
    expect(sorted[0].id).toBe('2');
    expect(sorted[1].id).toBe('3');
    expect(sorted[2].id).toBe('1');
  });

  it('Should sort by many descending', () => {
    const testData = deepCopy(items);
    const sorted = testData.orderByManyDescending([
      (x) => x.username,
      (x) => x.title,
    ]);
    expect(sorted[2].username).toBe('Jane');
    expect(sorted[1].username).toBe('Joe');
    expect(sorted[0].username).toBe('Thomas');
    expect(sorted[2].id).toBe('2');
    expect(sorted[1].id).toBe('3');
    expect(sorted[0].id).toBe('1');
  });

  it('Should distinct array', () => {
    let testData = ['Number1', 'Number1', 'Number2', 'Number2', 'Number3'];
    testData = testData.distinct((x) => x);
    expect(testData.length).toBe(3);
    expect(testData.indexOf('Number1')).toBe(0);
    expect(testData.indexOf('Number2')).toBe(1);
    expect(testData.indexOf('Number3')).toBe(2);

    const stub = new StubModel();
    stub.id = '2';
    stub.title = 'second Title';
    stub.username = 'Jane';
    stub.content = 'second Content';
    items.add(stub);
    items = items.distinct((x) => x.username);
    expect(items.length).toBe(3);
    expect(items[0].username).toBe('Thomas');
    expect(items[1].username).toBe('Jane');
    expect(items[2].username).toBe('Joe');
  });

  it('Should sum elements', () => {
    expect([1, 2, 3, 4].sum((x) => x)).toBe(10);
    expect(items.sum((x) => parseInt(x.id, 10))).toBe(6);
  });

  it('Should add or update element', () => {
    const item = deepCopy(items[0]);
    let newItems = deepCopy(items);
    newItems.addOrUpdate(item);
    expect(newItems.length).toBe(4);
    expect(newItems[3].id).toBe('1');

    newItems = deepCopy(items);
    const updatedItem = newItems[0];
    updatedItem.username = 'Jack';
    newItems.addOrUpdate(updatedItem);
    expect(newItems.length).toBe(3);
    expect(newItems[0].username).toBe('Jack');
  });

  it('Should add or update Range', () => {
    const item = deepCopy(items[0]);
    const item1 = deepCopy(items[1]);
    let newItems = deepCopy(items);
    newItems.addOrUpdateRange([item, item1]);
    expect(newItems.length).toBe(5);
    expect(newItems[3].id).toBe('1');
    expect(newItems[4].id).toBe('2');

    newItems = deepCopy(items);
    const updatedItem = newItems[0];
    const updatedItem1 = newItems[1];
    updatedItem.username = 'Jack';
    updatedItem1.username = 'Jack1';
    newItems.addOrUpdate(updatedItem);
    newItems.addOrUpdateRange([updatedItem, updatedItem1]);
    expect(newItems.length).toBe(3);
    expect(newItems[0].username).toBe('Jack');
    expect(newItems[1].username).toBe('Jack1');
  });

  it('Should be empty', () => {
    expect([].isEmpty()).toBeTruthy();
    expect(['', ''].isEmpty()).toBeFalsy();
  });

  it('Should not be empty', () => {
    expect(['', ''].isNotEmpty()).toBeTruthy();
    expect([].isNotEmpty()).toBeFalsy();
  });

  it('Should has count', () => {
    expect(['', '', ''].hasCount(3)).toBeTruthy();
    expect(['', '', ''].hasMaxCount(3)).toBeTruthy();
    expect(['', '', ''].hasMaxCount(2)).toBeFalsy();
    expect(['', '', ''].hasMinCount(1)).toBeTruthy();
    expect(['', '', ''].hasMinCount(5)).toBeFalsy();
  });

  it('Should contain', () => {
    expect(['1', '2', '3'].contain('1')).toBeTruthy();
    expect(['1', '2', '3'].contain('5')).toBeFalsy();
  });
});

class StubModel {
  public id: string;
  public title: string;
  public username: string;
  public content: string;
}

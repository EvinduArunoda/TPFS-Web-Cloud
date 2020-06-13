const utils = require('../util/util');

test('Check For a string', () => {
    expect(utils.checkEmailTest('String')).toBe(false);
});

test('Check For a null input', () => {
    expect(utils.checkEmailTest(null)).toBe(false);
});

test('Check For a empty input', () => {
    expect(utils.checkEmailTest('')).toBe(false);
});

test('Check For a number', () => {
    expect(utils.checkEmailTest(4)).toBe(false);
});

test('Check For correct email', () => {
    expect(utils.checkEmailTest('asd@qwe.com')).toBe('asd@qwe.com');
});

test('Check without `@`', () => {
    expect(utils.checkEmailTest('asdqwe.com')).toBe(false);
});

test('Check without `.`', () => {
    expect(utils.checkEmailTest('asd@qwe')).toBe(false);
});
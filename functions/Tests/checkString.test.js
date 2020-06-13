const utils = require('../util/util');

test('Check For a string', () => {
    expect(utils.checkStringTest('String')).toBe('String');
});

test('Check For a null input', () => {
    expect(utils.checkStringTest(null)).toBe(false);
});

test('Check For a empty input', () => {
    expect(utils.checkStringTest('')).toBe(false);
});

test('Check For a wrong input type', () => {
    expect(utils.checkStringTest(4)).toBe(false);
});
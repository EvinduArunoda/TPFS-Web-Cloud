const utils = require('../util/util');

test('Check For a string', () => {
    expect(utils.checkArrayTest('String')).toBe(false);
});

test('Check For a null input', () => {
    expect(utils.checkArrayTest(null)).toBe(false);
});

test('Check For a empty input', () => {
    expect(utils.checkArrayTest('')).toBe(false);
});

// test('Check For a array', () => {
//     expect(utils.checkArrayTest([1,2])).toBe([
//         1,
//         2
//     ]);
// });
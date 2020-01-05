import { leftOf, rightOf, aboveOf, belowOf } from "./gridCalc";

test("leftOf", () => {
  expect(leftOf(0, 10)).toBe(9);
  expect(leftOf(5, 10)).toBe(4);
  expect(leftOf(9, 10)).toBe(8);
});

test("rightOf", () => {
  expect(rightOf(9, 10)).toBe(0);
  expect(rightOf(0, 10)).toBe(1);
  expect(rightOf(5, 10)).toBe(6);
});

test("aboveOf", () => {
  expect(aboveOf(0, 10, 3)).toBe(20);
  expect(aboveOf(10, 10, 3)).toBe(0);
  expect(aboveOf(11, 10, 3)).toBe(1);
});

test("belowOf", () => {
  expect(belowOf(20, 10, 3)).toBe(0);
  expect(belowOf(10, 10, 3)).toBe(20);
  expect(belowOf(11, 10, 3)).toBe(21);
});

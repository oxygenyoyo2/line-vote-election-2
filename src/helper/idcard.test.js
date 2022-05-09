import { checkFormularIDCard } from "./idcard";

it("Should return false when idcard not correct", () => {
  const result = checkFormularIDCard('1234567890123')
  expect(result).toBeFalsy()
})

it("Should return true when idcard correct", () => {
  const result = checkFormularIDCard('1234567890121')
  expect(result).toBeTruthy()
})

it("Should return false when lenght not equal to 13", () => {
  const result = checkFormularIDCard('1234567890')
  expect(result).toBeFalsy()
})


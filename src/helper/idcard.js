
const checkFormularIDCard = (value) => {
  const multiple = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
  const stringNumbers = value.split('')
  const lastDigit = stringNumbers[stringNumbers.length - 1]
  stringNumbers.pop()
  const formulaIDCard = stringNumbers.map((stringDigit, index) => {
    const digit = parseInt(stringDigit)
    const mod = multiple[index]
    return mod ? digit * mod : digit
  }).reduce((prev, currentValue) => prev + currentValue, 0)
  const resultFormula = String(11 - (formulaIDCard % 11))
  const idCardChecker = resultFormula.slice(-1)
  if (idCardChecker === lastDigit) {
    // correct id card in to localStorage
    return true
  }
  return false
}
export {
  checkFormularIDCard
}
checkKeyInObject = (obj, arr) => {
  let valid = false
  for (elem of arr) {
    valid = obj[elem] ? true : false
    if (!valid) {
      break
    }
  }
  return valid
}
module.exports = checkKeyInObject

function removePropsFromJSON(obj, propsToRemove) {
  console.log(propsToRemove)
  // propsToRemove.forEach((propName) => delete jsonToProcess[propName])
  console.log(obj)
  // return jsonToProcess
}
// function trimJSON(json, propsToRemove) {
//   propsToRemove.forEach((propName) => {
//     delete json[propName]
//   })
// }
module.exports = { removePropsFromJSON }

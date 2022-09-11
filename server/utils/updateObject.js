function updateObject(target, source) {
  const updated = { ...target._doc }
  Object.keys(updated).forEach((key) => {
    updated[key] = source.hasOwnProperty(key) ? source[key] : target[key]
  })
  return updated
}
module.exports = updateObject

const isFileValid = (file) => {
  const type = file.mimetype.split('/').pop()
  const validTypes = ['jpg', 'jpeg', 'png', 'pdf']
  if (validTypes.indexOf(type) === -1) {
    return false
  }
  return true
}

module.exports = isFileValid

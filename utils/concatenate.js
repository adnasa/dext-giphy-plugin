module.exports = function concatenate (str) {
  return str.split(' ')
    .join('+')
}

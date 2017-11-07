function countChar (s, ch) {
  let count = 0
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ch) {
      count += 1
    }
  }
  return count
}

function countBs (s) {
  return countChar(s, 'B')
}

console.log(countBs('asdBSdBXCXBAsb'))

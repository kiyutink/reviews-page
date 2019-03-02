export const fuzzySearch = (string, base) => {
  let lastFoundIndex = -1;

  for (let i = 0; i <= string.length - 1; i++) {
    let found = false;
    for (let j = lastFoundIndex + 1; j <= base.length - 1; j++) {
      if (string[i] === base[j]) {
        found = true;
        lastFoundIndex = j;
        break;
      }
    }
    if (!found) {
      return false;
    }
  }
  return true;
};

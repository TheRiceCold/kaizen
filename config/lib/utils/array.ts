export const range = (length: number, start = 1) =>
  Array.from({ length }, (_, i) => i + start)

export function findCommonElement(
  array1: Array<string | number>,
  array2: Array<string | number>,
) {
  for (let i = 0; i < array1.length; i++)
    for (let j = 0; j < array2.length; j++)
      if (array1[i] === array2[j]) return true

  return false
}

export const uniqueArray = (arr: Array<string | number>) =>
  arr.filter((item, pos) => arr.indexOf(item) === pos)

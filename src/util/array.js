export function removeItemFormArray(arr, item) {
  let index = arr.indexOf(item)
  if (index === -1)
    return arr
  arr.splice(index, 1)
  return arr
}

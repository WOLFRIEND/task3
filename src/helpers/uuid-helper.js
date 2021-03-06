/**
 * Example:
 * https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
 * */
export function generateUuid() {
  let dt = new Date().getTime()
  // xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx - Original. Shortened for brevity.
  let uuid = 'xxxx'.replace(/[xy]/g, (c) => {
    let r = (dt + Math.random() * 16) % 16 | 0
    dt = Math.floor(dt / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}

let Position = 0
let observer = null

function emitChange() {
  observer(Position)
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.')
  }

  observer = o
  emitChange()
}

export function move(toX) {
  Position = toX
  emitChange()
}
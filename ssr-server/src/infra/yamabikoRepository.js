// DBの代わり
let instance
class Registry {
  #messages = []
  #count = 0
  get message() {
    return this.#messages
  }

  count() {
    return this.#count
  }
  saveMessage(message) {
    this.#messages.push(message)
    this.#count++
    return this.#count
  }

  constructor() {
    if (instance) {
      throw new Error('You can only create one instance!')
    }
    instance = this
  }
}

const yamabikoRegistry = new Registry()

export default yamabikoRegistry


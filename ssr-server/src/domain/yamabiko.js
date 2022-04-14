import yamabikoRegistry from "../infra/yamabikoRepository"

export default class Yamabiko {
  #_text
  #number

  get message() {
    return this.#_text
  }

  get number() {
    return this.#number
  }
  constructor(props) {
    if (typeof props !== 'string') throw new Error('文字列じゃない')
    if (!(props.length >= 1) || !(props.length <= 20)) throw new Error('1~20文字でない')
    this.#_text = props
    try {
      this.#number = yamabikoRegistry.saveMessage(this.#_text)
      console.log(this.#number)
    } catch (e) {
      console.error("error: ", e)
       throw new Error('予期せぬエラーが発生')
    }
  }
}
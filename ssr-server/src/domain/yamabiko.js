module.exports = class Yamabiko {
  #_text

  get message() {
    return this.#_text
  }

  constructor(props) {
    if (typeof props !== 'string') throw new Error('文字列じゃない')
    if (!(props.length >= 1) || !(props.length <= 20)) throw new Error('1~20文字でない')
    this.#_text = props
  }
}
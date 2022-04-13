exports.YamabikoProps

module.exports = class Yamabiko {
  _text
  get text() {
    return this._text
  }
  constructor(props) {
    this._text = props.value
  }
}
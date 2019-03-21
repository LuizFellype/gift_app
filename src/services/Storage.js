export class Storage {
  /**
   * @description set item value of key
   * @author Luiz Fellype
   * @date 2019-03-20
   * @static
   * @param {string} key
   * @param {*} value
   * @memberof Storage
   */
  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  /**
   * @description get value by key
   * @author Luiz Fellype
   * @date 2019-03-20
   * @static
   * @param {string} key
   * @returns {*}
   * @memberof Storage
   */
  static get(key) {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (e) {
      return null
    }
  }

  /**
   * @description multi set storage values into keys
   * @author Luiz Fellype
   * @date 2019-03-20
   * @static
   * @param {[string, any][]} keyValArr key value array
   * @memberof Storage
   */
  static multSet(keyValArr) {
    keyValArr.forEach((keyVal, i) => {
      try {
        const [key, value] = keyVal
        Storage.set(key, value)
      } catch (e) {
        throw new Error(
          `multi set fail in element:\n[${keyVal.join(',')}] at position ${i}.`
        )
      }
    })
  }

  /**
   * @description multi get values by keys
   * @author Luiz Fellype
   * @date 2019-03-20
   * @static
   * @param {string[]} keysArr
   * @returns {{key: string, value: any}[]}
   * @memberof Storage
   */
  static multiGet(keysArr) {
    return keysArr.map(key => ({ key, value: Storage.get(key) }))
  }

  /**
   * @description clear locaStorage
   * @author Luiz Fellype
   * @date 2019-03-20
   * @static
   * @memberof Storage
   */
  static clear() {
    localStorage.setItem()
  }
}

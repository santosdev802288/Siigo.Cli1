import { Injectable } from '@nestjs/common'
import * as Rijndael from 'rijndael-js'
import * as padder from 'pkcs7-padding'
import * as crypto from 'crypto'

// Author : David Penagos
@Injectable()
export class DecryptService {
  // tslint:disable-next-line:max-line-length
  private key = [
    157,
    34,
    214,
    111,
    249,
    194,
    174,
    242,
    18,
    245,
    30,
    255,
    88,
    162,
    67,
    126,
    36,
    130,
    123,
    232,
    252,
    120,
    194,
    251,
    244,
    53,
    200,
    242,
    73,
    164,
    73,
    22,
  ]

  encode(text) {
    const plainText = Buffer.from(text, 'utf8')
    // Pad plaintext before encryption
    const padded = padder.pad(plainText, 16) // Use 16 = 128 bits block sizes
    const iv = Array.prototype.slice.call(
      Buffer.from(crypto.randomBytes(16)),
      0,
    ) // 16 bytes IV
    const cipher = new Rijndael(this.key, 'cbc') // CBC mode
    const encrypted = cipher.encrypt(padded, 128, iv)
    const array = Array.prototype.slice.call(Buffer.from(encrypted), 0)
    const result = Buffer.from(iv.concat(array))
    return result
  }
  decode(array) {
    const decry = Array.prototype.slice.call(Buffer.from(array), 0)
    const decipher = new Rijndael(this.key, 'cbc')
    const iv = decry.slice(0, 16)
    const arrayCript = decry.slice(16, decry.length)
    let decryptedPadded = Buffer.alloc(16)
    decryptedPadded = decipher.decrypt(arrayCript, 128, iv)
    const decrypted = padder.unpad(decryptedPadded, 16)
    return decrypted
  }
  ToBase64(array) {
    return Buffer.from(array).toString('base64')
  }

  ToString(array) {
    return array.toString('utf8')
  }

  ToBuffer(array, type) {
    if (type === 'base64') {
      return Buffer.from(array, 'base64')
    }
  }
  Encrypt(text) {
    const unicode = Buffer.from(text, 'utf16le')
    const hash = crypto
      .createHash('md5')
      .update(unicode)
      .digest('hex')
    const hashArray = hash.match(/.{1,2}/g)
    const hashHex = hashArray
      .map(b => ('00' + b.toString()).slice(-2))
      .join('-')
      .toUpperCase()
    return hashHex
  }

  decodeBase64(strBs64): string {
    const buffer = this.ToBuffer(strBs64, 'base64')
    const decode = this.decode(buffer)
    return this.ToString(decode)
  }
}

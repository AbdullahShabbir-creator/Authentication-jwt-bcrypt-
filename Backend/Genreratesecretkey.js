const crypto=require('crypto')
const secertKey = crypto.randomBytes(32).toString('hex')
console.log(secertKey)
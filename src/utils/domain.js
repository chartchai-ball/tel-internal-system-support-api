import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs'

export const hashPassword = (password: string) =>
  new Promise(resolve => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err
        resolve(hash)
      })
    })
  })

export const generateJwtToken = user =>
  jwt.sign(user, process.env.SECRETKEY, {
    expiresIn: '1h',
  })

export const comparePassword = (password: string, hashPassword: string) =>
  new Promise(resolve => {
    bcrypt.compare(password, hashPassword).then(res => {
      resolve(res)
    })
  })

export const renameAssets = async ctxFile => {
  await ctxFile.forEach(file => {
    fs.rename(file.path, `${__dirname}/../../public/images/${file.name}`, err => {
      if (err) throw new Error('Error is upload')
    })
  })
}

// export const hashPassword = (password: string) =>
//   new Promise(resolve => {
//     bcrypt.genSalt(10, salt => {
//     bcrypt.hash(password, 10, res => {
//       resolve(res)
//     })
//     })
//   })

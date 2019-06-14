import fs from 'fs'
import csv from 'csvtojson'
import ioClient from 'socket.io-client'
import ticketRepository from '../../models/ticket/ticket.repository'

export default async ctx => {
  try {
    const arrayFile = Object.values(ctx.request.files).flatten()
    const MapImportFile = arrayFile.map(val => ({
      name: val.name,
      path: val.path,
    }))
    const pushFilename = []
    MapImportFile.forEach(file => {
      pushFilename.push(file.name)
      fs.rename(file.path, `${__dirname}/../../../public/images/${file.name}`, err => {
        if (err) throw new Error('Rename Fail')
      })
    })

    const csvFilePath = `${__dirname}/../../../public/images/${pushFilename}`
    csv()
      .fromFile(csvFilePath)
      .then(jsonObj => {
        // console.log(jsonObj)
      })
    const jsonArray = await csv().fromFile(csvFilePath)

    // console.log('jsonArray', jsonArray)
    // const mapCsvFile = jsonArray.map((val, index) => ({
    //   row: index + 2,
    //   ...val,
    // }))

    const csvDataComplate = []
    const filArray = jsonArray.filter(data => {
      if (data.priority !== 'low' && data.priority !== 'normal' && data.priority !== 'high') {
        return data.priority !== 'low' && data.priority !== 'normal' && data.priority !== 'high'
      }
      csvDataComplate.push(data)
    })
    if (filArray.length === 0) {
      await ticketRepository.bulkCreate(csvDataComplate, {
        individualHooks: true,
      })

      const socketClinet = ioClient('http://localhost:3333')
      socketClinet.emit('import', {
        msg: 'File upload Complate',
      })
    } else {
      const socketClinet = ioClient('http://localhost:3333')
      socketClinet.emit('import', {
        msg: 'File upload Failed',
      })
    }
  } catch (error) {
    return error.message
  }
}
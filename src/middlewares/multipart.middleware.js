import KoaConvert from 'koa-convert'
import KoaBody from 'koa-body'

const multipart = new KoaConvert(
  new KoaBody({
    multipart: true,
    formLimit: '20mb',
    formidable: {
      uploadDir: `${__dirname}/../../public/images`,
      maxFieldsSize: 20 * 1024 * 1024,
      maxFileSize: 20 * 1024 * 1024,
    },
  }),
)

export default multipart

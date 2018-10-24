const PDFParser = require('pdf2json')
const { assert } = require('chai')
const pdfFiller = require('pdffiller')

describe('PDFFiller', () => {
  const sourcePDF = './samplePDF/fillable_example.pdf'
  it('Should not throw any error', () => {
    // var FDF_data = pdfFiller.generateFDFTemplate(sourcePDF, null, (
    //   err,
    //   fdfData
    // ) => {
    //   if (err) throw err
    //   console.log(fdfData)
    // })
    // console.log('FDF_data', FDF_data)
  })

})

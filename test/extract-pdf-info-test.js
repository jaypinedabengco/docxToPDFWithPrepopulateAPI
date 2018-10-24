const PDFParser = require('pdf2json')
const { assert } = require('chai')
const hummus = require('hummus')

// describe('PDFParser', () => {
//   const fileLocation = './samplePDF/sample.pdf'
//   it('Should not throw any error', () => {
//     let pdfParser = new PDFParser()
//     pdfParser.on('pdfParser_dataError', errData =>
//       console.error(errData.parserError)
//     )
//     pdfParser.on('pdfParser_dataReady', pdfData => {
//       console.log(JSON.stringify(pdfData))
//     })
//     pdfParser.loadPDF(fileLocation)
//   })
// })

describe('PDFParser', () => {
  const fileLocation = './samplePDF/sample.pdf'
  it('Should not throw any error', () => {
    // const pdfReader = hummus.createReader(fileLocation)
    // const parserStream = pdfReader.getParserStream()
    // parserStream.pipe(process.stdout)
  })
})

var pdf = require('html-pdf')
const fs = require('fs')
const { assert } = require('chai')
const pdfFiller = require('pdffiller')
const htmlString = fs.readFileSync('./samplePDF/test.html', 'utf8')
const mustache = require('mustache')

describe('HTMLToPDFWithPrepopulateWithHeaderAndFooter', () => {
  let start = Date.now()
  it('Should not throw any error', () => {
    let data = {
      name: 'hello',
      lastname: 'world'
    }

    let rendered = mustache.render(htmlString, data)
    const options = {
      format: 'Letter',
      height: '1.0in',
      header: {
        height: '28mm',
        contents: {
          default:
            '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span> Blah HEAD!!!!!!'
        }
      },
      footer: {
        height: '28mm',
        contents: {
          default:
            '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span> Blah FOOT!!!!!!'
        }
      }
    }
    pdf
      .create(rendered, options)
      .toFile('./samplePDF/output/test.pdf', (err, result) => {
        if (err) return console.log(err)
        console.log(result)
        console.log('end', `${Date.now() - start} ms`)
      })
  })
})

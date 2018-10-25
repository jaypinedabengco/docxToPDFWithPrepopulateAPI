var pdf = require('html-pdf')
const fs = require('fs')
const { assert } = require('chai')
const pdfFiller = require('pdffiller')
const htmlString = fs.readFileSync(
  './samplePDF/dynamic-content-with-jsdom.html',
  'utf8'
)
const mustache = require('mustache')
const phantom = require('phantom')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

//

/**
 * 
 */
describe('FixedWidth', async () => {
  let start = Date.now()
  await it('Should not throw any error', async () => {
    let data = {
      text_content: `I'm intended to be inserted on a fixed container, but then again, it is based on my class, not sure yet what my class name is.`
    }

    const targetElements = '.strict-content'

    // before render, check strict-content's height
    let before_update_dimensions = await getElementsDimensions(targetElements, htmlString)
    console.log('before_update_dimensions', before_update_dimensions)

    // render via mustache
    let rendered = mustache.render(htmlString, data)
    
    // after render, check strict-content's height
    let after_update_dimensions = await getElementsDimensions(targetElements, rendered)
    console.log('after_update_dimensions', after_update_dimensions)


    // evaluate all fields that exceeds expected content
    const options = {
      format: 'Letter',
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
      .toFile('./samplePDF/output/html-to-pdf-with-fixed-width.pdf', (err, result) => {
        if (err) return console.log(err)
        console.log(result)
        console.log('end', `${Date.now() - start} ms`)
      })
  })
})

const jsdomTest = async () => {
  let dom = new JSDOM(`<div></div>`, { includeNodeLocations: true })
  let document = dom.window.document
  let elements = document.querySelectorAll('div')
  console.log(elements)
  elements.forEach(element => {
    console.log(dom.nodeLocation(element))
  })

  dom = new JSDOM(`<div>Content</div>`, { includeNodeLocations: true })
  document = dom.window.document
  elements = document.querySelectorAll('div')
  console.log(elements)
  elements.forEach(element => {
    console.log(dom.nodeLocation(element))
  })
}


/**
 * ex: 
 * 
 {
    id: 'string',
    classes: 'string',    
    querySelector: 'String',
    offsetHeight: double,
    offsetWidth: double 
    bound:
     { 
       bottom: double,
       height: double,
       left: double,
       right: double,
       top: double,
       width: double 
    }
  }
 * @param {*} querySelector 
 */
const getElementsDimensions = async(querySelector, html) => {

  const instance = await phantom.create()
  const page = await instance.createPage()

  await page.on('onResourceRequested', async requestData => {
    // console.info('Requesting', requestData.url)
  })

  // load empty local html (dummy url on local)
  await page.open('http://localhost:3000/empty')

  // change content
  await page.property('content', html)

  // callback should be es5 (for phantom)
  const dimensions = await page.evaluate(function(querySelector) {
    // query select target item's
    var elements = document.querySelectorAll(querySelector)
    var info = []
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i]

      // content structure to return
      info.push({
        id: element.id, 
        querySelector: querySelector,
        classes: element.className,
        bound: element.getBoundingClientRect(),
        offsetHeight: element.offsetHeight,
        offsetWidth: element.offsetWidth
      })
    }
    return info
  }, querySelector)

  await instance.exit()

  return dimensions
}
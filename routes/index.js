var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/empty', (req, res, next) => {
  res.json('blank')
})

router.post('/convert-docx-to-pdf', (req, res, next) => {
})

router.get('/test-extract-pdf-info', (req, res, next) => {
})

module.exports = router;

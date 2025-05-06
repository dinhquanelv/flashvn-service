const pdf = require('html-pdf-node');
const { generateHTML } = require('./bingo');
const { findAllBingo } = require('../services/bingo.service');

const generatePDFFile = async (moduleId) => {
  const bingos = await findAllBingo(moduleId);

  const html = generateHTML(bingos);

  const file = { content: html };
  const options = {
    format: 'A4',
    printBackground: false,
  };

  const pdfBuffer = await pdf.generatePdf(file, options);

  return pdfBuffer;
};

module.exports = { generatePDFFile };

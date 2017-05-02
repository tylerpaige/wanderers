const csv = require('csv');
const csvParse = require('csv-parse');
const fs = require('fs');
const util = require('util');

const inPath = './src/data/raw.csv';
const outPath = './src/data/raw.json';

const writeFileCb = (err, data) => {
  if (err) throw err;
  console.log(`File written to ${outPath}`);
}

const writeOut = (err, data) => {
  if (err) throw err;

  console.log(`CSV parsed. Writing output to ${outPath}...`);
  const filtered = data.filter((d) => {
    return d['year'] === '2016';
  });
  const content = JSON.stringify(filtered);
  fs.writeFile(outPath, content, writeFileCb);
};

const parse = (err, data) => {
  if (err) throw err;
  console.log('File Read. Parsing CSV...')

  /* Column headers (in order) */
  const allColumns = [
    'date',
    'yyyymm',
    'year',
    'region',
    'country',
    'city',
    'style',
    'guns',
    'complexity',
    'org',
    'numAttackers',
    'destination',
    'destinationType',
    'numFemales',
    'casualties',
    'wounded',
    'dateMeaning',
    'dateMeaningBoolean',
    'cause',
    'ethnicity'
  ];

  /* Columns we want to pull out (no specific order) */
  const select = [
    'date',
    'year',
    'org',
    'style'
  ];

  /* Representation of which columns we want to select */
  const columns = allColumns.map((c) => {
    return select.includes(c) ? c : false;
  });

  const parser = csvParse(data, {
    columns,
    from : 0,
    to : 500
  }, writeOut);
};

const init = () => {
  console.log(`Preparing to parse file ${inPath}`);
  fs.readFile(inPath, parse);
}

init();

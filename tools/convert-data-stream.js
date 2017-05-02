const csv = require('csv');
const csvParse = require('csv-parse');
const fs = require('fs');
const util = require('util');

const inPath = './src/data/raw.csv';
const outPath = './src/data/slice.js';

const writeFileCb = (err, data) => {
  if (err) throw err;
  console.log(`File written to ${outPath}`);
}

/* Write to a file */
const writeOut = (err, data) => {
  if (err) throw err;

  console.log(`CSV parsed. Writing output to ${outPath}...`);
  const filtered = data.filter((d) => {
    return d['year'] === '2016';
  });
  const content = `export default ${JSON.stringify(filtered)}`;
  fs.writeFile(outPath, content, writeFileCb);
};

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
  'org',
  'style'
];

/* Representation of which columns we want to select */
const columns = allColumns.map((c) => {
  return select.includes(c) ? c : false;
});

/* Initialize Parser stream with option to pick only selected columns */
var parser = csv.parse({
  columns : columns
});

/* Array to collect parsed records */
var output = [];

/* Collect records as they are read from stream and parsed */
parser.on('readable', function(){
  while(data = parser.read()){
    output.push(data);
  }
});

/* When stream is finished, call to write file */
parser.on('finish', function() {
  writeOut(null, output);
});

/* Log any errors encountered */
parser.on('error', function(err){
  console.log(err.message);
});

/* Read input file, write to parser stream, end stream */
fs.readFile(inPath, (err, data) => {
  parser.write(data);
  parser.end();
});

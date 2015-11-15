var glob = require('glob');
var marked = require('marked');
var fs = require('fs');


var renderer = new marked.Renderer();


marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

var params = process.argv;

console.log(params);


var dirs = {
    aa:'Apprendimento Automatico',
    ia:'Intelligenza Artificiale',
    lp:'Linguaggi di Programmazione',
    scv:'Sistemi con vincoli'
}

if (params.length < 2) return;




var tag = params[2]
var dirName = dirs[tag];

var options = {cssPath:'pdf.css'};


function parseFile(file){
  var parsedFile = '';
  file.toString().split('\n').forEach(function (line){
    var parsedLine = line;
    
    //Formatta correttamente il titolo
    if (parsedLine.indexOf('#') === 0){
      var i = 0;
      while(parsedLine[i] === '#') i++;

      parsedLine = parsedLine.substr(0,i) + ' '+ parsedLine.substr(i);
     
    }
    parsedLine = parsedLine.replace('./immagini/', dirName+'/immagini/');
    parsedFile += parsedLine+'\n';
  });

  return parsedFile;
}

function buildHtmlPage(body){
  return "<html><head>"+'<meta charset="utf-8"><link rel="stylesheet" href="_builder/pdf.css">'
    +'<link rel="stylesheet" href="_builder/highlight/styles/default.css">'
    +'<script src="_builder/highlight/highlight.pack.js"></script>'
    +'<script>hljs.initHighlightingOnLoad();</script></head><body>'
    + body +
    '</body></html>';
}

glob(''+dirName+'/'+tag.toUpperCase()+'*.md', options, function (er, files) {
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"]
  // er is an error object or null.
  console.log(files);
  
  var completeFile = '';

  files.forEach(function (item) {
    completeFile += parseFile(fs.readFileSync(item, 'utf8')) + '\n';
  });

  var htmlBody = marked(completeFile);

  htmlBody = htmlBody.replace(/&lt;sup&gt;/g,'<sup>');
  htmlBody = htmlBody.replace(/&lt;\/sup&gt;/g,'</sup>');
  htmlBody = htmlBody.replace(/&lt;sub&gt;/g,'<sub>');
  htmlBody = htmlBody.replace(/&lt;\/sub&gt;/g,'</sub>');

  fs.writeFileSync(dirName+'.html', buildHtmlPage(htmlBody), 'utf8');
});
 

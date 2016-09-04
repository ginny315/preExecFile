var fs = require('fs');
var packer = require('zip-stream');
var await = require('await');
var archive = new packer();
var out = fs.createWriteStream('out.zip');

var text = fs.readFileSync('version.json', "utf8");
var version = JSON.parse(text).version.split('.'),
    newVersion = '',temp = 0;
for(var i in version){
  if(i == version.length - 1)
    temp = (+version[i])+1;
  else
    temp = version[i];
  newVersion += (temp + '.');
}
newVersion = JSON.stringify({'version':newVersion.substring(0,newVersion.length-1)});
fs.writeFileSync('version.json', newVersion);

archive.on('error', function(err) {
  throw err;
});
archive.on('data', function(data) { out.write(data); });

// archive.entry(fs.createReadStream('version.json'), { name: 'version.json'}, function(err, entry) {
//   if (err) throw err;
//   archive.entry(null, { name: 'test/'}, function(err, entry) { 
//     if (err) throw err;
//     archive.finish();
//   });
// });

archiveFold('test')
function archiveFold(root){
  var files = fs.readdirSync(root);
  files.forEach(function(file){
    if(!file.match(/^.DS_Store/g)){
      var pathname = root+'/'+file,
      stat = fs.lstatSync(pathname);
      if (!stat.isDirectory()){//遍历得到的不是文件目录
        console.log('file='+file)
        archive.entry(fs.createReadStream(file), {name: file}, function(err, entry) {
          if (err) throw err;
        })
      } else {
        archiveFold(pathname);
      }
    }  
  });
}




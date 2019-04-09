var fs = require('fs');
var packer = require('zip-stream');
var await = require('await');
var archive = new packer();
var out = fs.createWriteStream('out.zip');
var spawn = require('child_process').spawn,  
    ls = spawn('ls', ['-lh', '/usr']); 
var exec = require('child_process').exec;

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

// var zip = exec("zip",["-r","out.zip","test/"]);
// zip.on('exit', function (code) {
//   console.log(code)  
//     console.log("完成");  
// });
 
exec( 'zip -r out.zip ./version.json' , function(err, stdout , stderr ) {
   console.log( stdout );
 });
// var unzip = spawn("/usr/bin/unzip", ["-o", "./out.zip", "-d", "./"]);  
  
// unzip.on('exit', function (code) {  
//     console.log("完成");  
// });


// archive.on('error', function(err) {
//   throw err;
// });
//archive.on('data', function(data) { out.write(data); });


// archive.entry(fs.createReadStream('version.json'), { name: 'version.json'}, function(err, entry) {
//   if (err) throw err;
//   archive.entry(null, { name: 'test/'}, function(err, entry) { 
//     if (err) throw err;
//     archive.finish();
//   });
// });

// var test = archiveFold('test')
// console.log(test)
// function archiveFold(root){
//   var files = fs.readdirSync(root);//读取文件所在目录的内容，返回目录文件数组
//   var res = [];
//   files.forEach(function(file){
//     if(!file.match(/^.DS_Store/g)){
//       var pathname = root+'/'+file,
//       stat = fs.lstatSync(pathname);
//       if (!stat.isDirectory()){//遍历得到的不是文件目录
//         res.push(pathname)
//       } else {
//         res = res.concat(archiveFold(pathname));
//       }
//     }  
//   });
//   return res;
// }




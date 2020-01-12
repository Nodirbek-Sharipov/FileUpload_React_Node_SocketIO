const express = require('express');
const app = express();
const socket = require('socket.io');
let { 
	readFile, 
	statSync, 
	stat,
	open, 
	write, 
	close,
	readdir
} = require('fs');
const { promisify } = require('util');

readdir = promisify(readdir);
stat = promisify(stat);

const port = process.env.PORT || 8080;

const sysFiles = [
	'$RECYCLE.BIN',
	'MSOCache',
	'Recovery',
	'Recycler',
	'System Volume Information',
	'Thumbs.db',
];


let File = {};

const cors = require('cors');

app.get((req, res)=>{
  readFile(__dirname + '/index.html',
  function (err, data) {
	if (err) {
	  res.writeHead(500);
	  return res.end('Error loading index.html');
	}
	res.writeHead(200);
	res.end(data);
  });
})

app.use(cors({
	// origin: 'http://127.0.0.1:3000',
	// optionsSuccessStatus: 200,
}));

const ReadDir = async (dir = 'D://')=>{
	try{
		let DirContents = {
			error: null,
			location: dir,
			folders: [],
			files: []
		};

		let dirList = await readdir(dir);
		
		dirList = dirList.filter(x=>!sysFiles.includes(x));

		dirList.forEach( (file)=>{
			const FileInfo =  statSync(dir + '/'+ file);
			if (FileInfo.isDirectory()) {
				DirContents.folders.push({name: file, stat: FileInfo, loc: dir });
			}else{
				DirContents.files.push({ name: file, stat: FileInfo, loc: dir });
			}
		});
		
		return DirContents;
	}catch(err){
		let DirContents = {
			error: err,
			location: dir,
			folders: [],
			files: []
		};
		return DirContents;
	}
}

ReadDir().then(x=>console.log(x));

const server = app.listen(port);

const io = socket.listen(server);

io.sockets.on('connection', function (socket) {
	
	socket.on('StartUpload', function ({ Name, Size, BufferSize }) { //data contains the variables that we passed through in the html file

			File = {  //Popuate file
				Name		: Name,
				FileSize 	: Size,
				Data	 	: "",
				Downloaded 	: 0
			}
			let Place = 0;
			try{
				// Check for existing file to resume
				let Stat = statSync(__dirname+'/'+Name);
				if (Stat.isFile()) {
					File.Downloaded = Stat.size;
					Place = Stat.size / BufferSize;
				}
			}catch(err){} 

			//It's a New File
			open(__dirname+"/"+Name, 'a', 0755, function(err, fd){
				if(err){
					console.log(err);
				} else {
					File['Handler'] = fd; //We store the file handler so we can write to it later
					socket.emit('MoreData', { 'Place' : Place, Percent : 0 });
				}
			});
	});
	
	socket.on('Upload', function ({ Name, Data, BufferSize }){

			File.Downloaded += Data.length;
			File.Data += Data;
			if (File.Downloaded == File.FileSize){ 

				//If File is Fully Uploaded
				write(File.Handler, File.Data, null, 'Binary', function(err, written){
					close(File.Handler, function(...args){
						socket.emit('DoneUpload', {'Name' : Name, 'Percent': 100});
					});
				});

			} else if (File.Data.length > 10485760){ 

				//If the Data Buffer reaches 10MB
				write(File.Handler, File.Data, null, 'Binary', function(err, written){
					File.Data = ""; //Reset The Buffer
					const Place = File.Downloaded / BufferSize;
					const Percent = Math.floor((File.Downloaded / File.FileSize) * 10000)/100;
					socket.emit('MoreData', { 'Place' : Place, 'Percent' :  Percent});
				});

			} else {

				const Place = File.Downloaded / BufferSize;
				const Percent = Math.floor((File.Downloaded / File.FileSize) * 10000)/100;
				socket.emit('MoreData', { 'Place' : Place, 'Percent' :  Percent});

			}
	});


});
var http 					= require('http'),
	fs 							= require('fs'),
	path 						= require('path'),
	dataDirectory		= './jsonFiles/regularAttendees/',
	outJSON					= './jsonFiles/regularAttendees/master.json',
	outCSV					= './csvFiles/regularAttendees.csv',
	json2csv 				= require('json2csv'),
	baseURL 				= 'http://bouncer.collisionconf.com/v1/info/attendees?page='
	;

var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);
    });
  });
};

var parseJSON = function(json) {
	// console.log(json);
	var jsonData = JSON.parse(json);
	// console.log(jsonData.attendees);
	json2csv({ data: jsonData.attendees, fields: ['name','company','career']}, function(err, csv) {
		fs.appendFile(outCSV, csv, function(err){
			console.log('file saved');
		})
	})
};

var recursivelyOpen = function(dataDirectory){
	var data = {};
	fs.readdir(dataDirectory, function(err, files) {
		if (err) throw err;
		var i = 0;
		files.forEach(function(file){ 
			i++;
			fs.readFile(dataDirectory + file, 'utf-8', function(err, json) {
				if (err) throw err;
				// data[file]=json;
				parseJSON(json);
			});
		});
	});
};

recursivelyOpen(dataDirectory);







var append = function(file, appendData) {
	fs.appendFile(file, appendData, function(err){
		if (err) throw err;
	});
};

var parse = function(inFile) {
	fs.readFile(inFile, 'utf-8', function(err, fileContents){
		var jsonData = JSON.parse(fileContents);

		json2csv({data: jsonData.attendees, fields: ['name','company','career']}, function(err, csv) {
			if (err) throw err;
			console.log(csv);
			fs.appendFile(outCSV, csv, function(err){
				if (err) throw err;
				console.log('file saved');
			});
		});
	});
};

// parse(outJSON);

var downloadLoop = function() {
	for (var i = 1; i <= 44; i++) {
		var num = i + '',
			dlPath = path.join(datadirectory, 'jsondata_' + num),
			file = path.join(dlPath + '.json');
			endpoint = baseURL + num;


		download(endpoint, file, function() {
			console.log('downloaded...');
		});
	}
};

// recursivelyOpen(datadirectory, function() {
// 	parse(outJSON);
// });

// parse(outJSON);

// downloadLoop(function() {
// 	recursivelyOpen(datadirectory, function() {
// 		parse(outJSON);
// 	});
// });





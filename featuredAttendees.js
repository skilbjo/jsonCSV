var http 			= require('http'),
	fs 					= require('fs'),
	outJSON 		= './jsonFiles/featuredAttendees/featuredAttendees.json',
	outCSV			= './csvFiles/featuredAttendees.csv',
	json2csv 		= require('json2csv'),
	url 				= 'http://eventdock.co/greg/collision_featured_march.json?limit=501'
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

var parse = function(inFile) {
	fs.readFile(inFile, 'utf-8', function(err, fileContents){
		var jsonData = JSON.parse(fileContents);

		json2csv({data: jsonData.people, fields: ['full_name','company_name','job_title']}, function(err, csv) {
			if (err) throw err;
			console.log(csv);
			fs.writeFile(outCSV, csv, function(err){
				if (err) throw err;
				console.log('file saved');
			});
		});
	});
};

download(url, outJSON, function() {
	parse(outJSON);
});


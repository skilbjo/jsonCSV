var fs 					= require('fs')
	, inFile 			= './people.json'
	, outFile			= './csvFiles/featuredAttendees.csv'
	, json2csv 		= require('json2csv')
	;

fs.readFile(inFile, 'utf-8', function(err, fileContents){
	var jsonData = JSON.parse(fileContents);

	json2csv({data: jsonData, fields: ['full_name','company_name','job_title']}, function(err, csv) {
		if (err) throw err;
		fs.writeFile(outFile, csv, function(err){
			if (err) throw err;
			console.log('file saved');
		});
	});
});



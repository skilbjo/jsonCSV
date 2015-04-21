var http 					= require('http'),
	fs 							= require('fs'),
	path 						= require('path'),
	datadirectory		= './jsonfiles/'
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
}

for (var i = 1; i <= 5; i++) {
	var num = i + '',
		dlPath = path.join(datadirectory, 'jsondata_' + num),
		file = path.join(dlPath + '.json')
		endpoint = baseURL + num;


	download(endpoint, file, function() {
		console.log('downloaded...');
	});
}

// for (var i = 1; i <= 5; i++) {
// 	var num = i + '',
// 		dlPath = path.join(datadirectory, 'jsondata_' + num),
// 		file = fs.createWriteStream(dlPath + '.json')
// 		endpoint = baseURL + num;

// 	console.log(endpoint);

// 	var request = http.get(endpoint, function(res) {
// 		res.pipe(file);

// 		res.setTimeout(12000, function() {
// 			res.abort();
// 		});
// 		// file.on('finish', function() {
// 		// 	file.close(cb);
// 		// });
// 	});

// };






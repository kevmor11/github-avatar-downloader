var request = require('request');
var fs = require('fs');
// Alert client that the request has initialized
console.log('Welcome to the GitHub Avatar Downloader!');

const GITHUB_USER = "kevmor";
const GITHUB_TOKEN = "31d5efea89ab5e45bbcdea9c2e877ba3be36c5d1";


function downloadImageByURL(url, filePath) {
  // Access image URL by given URL parameter
  request.get(url)
  .on('error', function (err) {
     throw err;
  })
  .on('response', function (response) {
    console.log('Downloading image...');
    console.log('Response Status Code: ', response.statusCode, 'Response Message: ', response.statusMessage, 'Content Type: ', response.headers['content-type']);
  })
  .on('end', function() {
    console.log('Download complete.');
  })
  // Output image file to given filePath parameter
  .pipe(fs.createWriteStream(filePath));
}


function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  // Append User-Agent key to project info object in order to bypass HTTP error 403
  var requestOptions = {
    uri: requestURL,
    headers: {
      'User-Agent': 'github-downloader/1.0'
    }
  };
  // Request the github project info object
  request.get(requestOptions, (error, response, body) => {
    // Create variable to represent the parsed requestURL
    var contributorObject = JSON.parse(body);
    if (contributorObject.message !== undefined) {
      console.log("Arguments not found. " + repoOwner + " and " + repoName + " are not valid arguments.");
      return;
    }

    // For each item within the github project info object, invoke the imageDownload function to download
    // each users avatar to a specific coresponding file name
    contributorObject.forEach((item) => {
      downloadImageByURL(item.avatar_url, './avatars/' + item.login + '.png');
    });
  })
};

// If the node command is not accompanied with 2 arguments, remind client that they must specify arguments
if (process.argv.length < 3) {
  console.log("Please specify two arguments");
// Else if the arguments are specified, call the function
} else {
  getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
})};
var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

const GITHUB_USER = "kevmor";
const GITHUB_TOKEN = "31d5efea89ab5e45bbcdea9c2e877ba3be36c5d1";

function downloadImageByURL(url, filePath) {
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
  .pipe(fs.createWriteStream(filePath));
}

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var requestOptions = {
    uri: requestURL,
    headers: {
      'User-Agent': 'github-downloader/1.0'
    }
  };

  request.get(requestOptions, (error, response, body) => {
    var contributorObject = JSON.parse(body);
    contributorObject.forEach((item) => {
      downloadImageByURL(item.avatar_url, './avatars/' + item.login + '.png');
    });
  })
};

if (process.argv.length < 3) {
  console.log("Please specify two arguments");
} else {
  getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
})};
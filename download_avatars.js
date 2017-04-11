var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

const GITHUB_USER = "kevmor";
const GITHUB_TOKEN = "31d5efea89ab5e45bbcdea9c2e877ba3be36c5d1";

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var requestOptions = {
    uri: requestURL,
    headers: {
      'User-Agent': 'github-downloader/1.0'
    }
  };

  request.get(requestOptions, (error, response, body) => {
    var contributorModule = JSON.parse(body);
    contributorModule.forEach((item) => request.get(item['avatar_url']).pipe(fs.createWriteStream(`./${item['login']}_avatar.jpg`)));
  })
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
        console.log('Downloading image...');
        console.log('Response Status Code: ', response.statusCode, 'Response Message: ', response.statusMessage, 'Content Type: ', response.headers['content-type']);
       })
       console.log('Download complete.');
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

const GITHUB_USER = "kevmor";
const GITHUB_TOKEN = "31d5efea89ab5e45bbcdea9c2e877ba3be36c5d1";

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);
  // request.get('')
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
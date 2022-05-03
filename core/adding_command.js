

var nodegit = require('nodegit'),
    path = require('path');

var url = "https://github.com/jkrathod2601/commands.git", //also tried https://github.com/atomicptr/dauntless-builder.git
    local = path.join(__dirname,"../bin/git_command"),
    cloneOpts = {};

nodegit.Clone(url, local, cloneOpts).then(function (repo) {
    console.log("cloning succesful!");
    console.log("Cloned " + path.basename(url) + " to " + repo.workdir());
}).catch(function (err) {
    console.log(err);
});
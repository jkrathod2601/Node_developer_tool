#!/usr/bin/env node

var nodegit = require("nodegit"),
  path = require("path");
const fs = require("fs");
const chalk=require("chalk");
var cmd=require('node-cmd');

try {
  if (!fs.readdirSync(path.join(__dirname, "./")).includes("git_command")) {
    var url = "https://github.com/jkrathod2601/commands.git", //also tried https://github.com/atomicptr/dauntless-builder.git
      local = path.join(__dirname, "../bin/git_command"),
      cloneOpts = {};

    nodegit
      .Clone(url, local, cloneOpts)
      .then(function (repo) {
        console.log("cloning succesful!");
        console.log("Cloned " + path.basename(url) + " to " + repo.workdir());
        const datais = fs.readFileSync(
          path.join(__dirname, "../package.json"),
          "utf-8"
        );
        let jsonfileobjectdata=JSON.parse(datais)
        let insertcommanddata=JSON.parse(fs.readFileSync(path.join(__dirname, "./git_command/clist.js.txt"),'utf-8'))
        console.log(insertcommanddata)
        jsonfileobjectdata["bin"]={...jsonfileobjectdata["bin"],...insertcommanddata}
        fs.writeFileSync(path.join(__dirname,"../package.json"),JSON.stringify(jsonfileobjectdata))
        cmd.runSync('npm link')
        console.log(chalk.green("comman's addedd sucessfully"))
        console.log(chalk.blue("command"),chalk.yellow(" write this commadn for show all command list"))
      })
      .catch(function (err) {
        throw err;
      });

  }else{
      console.log(chalk.red("command allready present in database"))
  }
} catch (error) {
  console.log(error.message);
}

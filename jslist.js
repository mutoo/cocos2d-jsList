#! /usr/bin/env node

var program = require("commander");
var path = require("path");
var glob = require("glob");
var fs = require('fs');

var DEFAULT_CONFIG = "./project.json";
var DEFAULT_INDENT = 4;

program
    .version('1.0.3')
    .option('-f, --file <path>', 'set config path. ' +
        'defaults to ' + DEFAULT_CONFIG)
    .option('-i, --indent <spaces>', 'set indent spaces for json file. ' +
        'defaults to ' + DEFAULT_INDENT)
    .parse(process.argv);

(function () {

    // retrieve the path to project.json
    var pathToProjectJson = program.file || DEFAULT_CONFIG;
    var absPathToProjectJson = path.resolve(pathToProjectJson);

    // read project.json
    var projectJson;
    try {
        projectJson = fs.readFileSync(absPathToProjectJson, 'utf8');

    } catch (e) {
        console.error("Can not read config from " + absPathToProjectJson);
        console.error(e.toString());
        return;
    }

    // parse project.json
    try {
        projectJson = JSON.parse(projectJson);

    } catch (e) {
        console.error("Can not parse config to JSON.");
        console.error(e.toString());
        return;
    }

    // get jsListOrder config
    var jsListOrder = projectJson.jsListOrder;
    if (!jsListOrder) {
        console.error("Can not found 'jsListOrder' in project.json");
        return;
    }

    if (!(jsListOrder instanceof Array)) {
        console.error("jsListOrder should be an array");
        return;
    }

    var jsListTmp = [];
    var jsListDict = {};

    jsListOrder.forEach(function (item) {

        // test if path contained wildcard
        if (/\*/.test(item)) {
            var files = glob.sync(item, {
                cwd: path.dirname(pathToProjectJson)
            });

            files.forEach(function (item) {

                // ignores file that already appended
                if (jsListDict[item] !== undefined) return;

                jsListDict[item] = jsListTmp.length;
                jsListTmp.push(item);
            });

        } else {

            // if a file already appended, moves to new position
            if (jsListDict[item] !== undefined) {
                jsListTmp[jsListDict[item]] = null;
            }

            jsListDict[item] = jsListTmp.length;
            jsListTmp.push(item);
        }
    });

    // squeeze out null item
    var jsListFinal = [];
    jsListTmp.forEach(function (item) {
        if (item !== null) jsListFinal.push(item);
    });

    // replace old jsList
    projectJson.jsList = jsListFinal;

    // save to project.json
    try {
        var indent = program.indent;
        if (indent === 0) {
            fs.writeFileSync(pathToProjectJson, JSON.stringify(projectJson));

        } else {
            indent = parseInt(indent) || DEFAULT_INDENT;
            fs.writeFileSync(pathToProjectJson, JSON.stringify(projectJson, null, indent));
        }

        console.log("saved to " + pathToProjectJson);

    } catch (e) {
        console.log("Can not save config to " + pathToProjectJson);
        console.error(e.toString());
    }

})();
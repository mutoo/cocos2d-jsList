var path = require("path");
var glob = require("glob");
var fs = require('fs');

(function () {

    // retrieve the path to project.json
    var pathToProjectJson = process.argv[2];
    if (!pathToProjectJson) {
        console.log("Usage: jsList /path/to/project.json");
        return;
    }

    // read project.json and get jsListOrder config
    var projectJson = require(pathToProjectJson);

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
    fs.writeFile(pathToProjectJson, JSON.stringify(projectJson, null, 2), function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log("saved to " + pathToProjectJson);
        }
    });

})();
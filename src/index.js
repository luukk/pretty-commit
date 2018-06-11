"use strict";

const { readdirSync, readFileSync, writeFileSync, lstatSync } = require("fs");
const { exec } = require("child_process");
const path = require("path");
const prettier = require("prettier");
const utils = require("./logger");
const config = require("../.prettierrc");
const sgf = require("staged-git-files");

utils.$log.warn("running precommit hook...");

sgf(function(err, results) {
    if (err) return err;

    const stagedFiles = results.filter(file => file.status !== "Deleted").map(file => file.filename);

    Object.keys(config).map(key => {
        return formatFiles(config[key], stagedFiles)
            .filter(Boolean)
            .map(stagedFiles => {
                utils.$log.info(stagedFiles);
                return stagedFiles;
            })
            .map(file => exec(`git add ${file}`));
    });
});

const formatFiles = ({ write, extensions, options }, stagedFiles) => {
    return stagedFiles.map(filePath => {
        if (!checkExtension(filePath, extensions)) return;

        const file = readFileSync(filePath, { encoding: "utf-8" });
        const formattedFile = prettier.format(file, options);

        writeFileSync(filePath, formattedFile, { encoding: "utf-8", flag: "w" });

        return filePath;
    });
};

const checkExtension = (filename, extensions) => {
    return extensions
        .map(extension => {
            const fileExtension = filename.substr(filename.lastIndexOf("."));

            return fileExtension == extension;
        })
        .includes(true);
};

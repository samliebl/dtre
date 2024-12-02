#!/usr/bin/env node

import { printDirectoryTree } from "../index.js";
import path from "path";

// Helper function to parse arguments
function parseArgs(args) {
    const options = {
        directoryPath: process.cwd(), // Default: current working directory
        style: "default",            // Default: 'default' style
        outputPath: null,            // Default: print to console
        excludes: "^\.",             // Default: exclude hidden files
    };

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        switch (arg) {
            case "--directoryPath":
            case "-d":
                options.directoryPath = path.resolve(args[++i]);
                break;
            case "--style":
            case "-s":
                options.style = args[++i];
                break;
            case "--outputPath":
            case "-o":
                options.outputPath = path.resolve(args[++i]);
                break;
            case "--excludes":
                options.excludes = args[++i];
                break;
            default:
                console.error(`Unknown argument: ${arg}`);
                process.exit(1);
        }
    }

    return options;
}

// Parse arguments
const options = parseArgs(process.argv.slice(2));

// Execute the function
try {
    printDirectoryTree(
        options.directoryPath,
        options.style,
        options.outputPath,
        options.excludes
    );
} catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
}

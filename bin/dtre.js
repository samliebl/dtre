#!/usr/bin/env node

import { printDirectoryTree } from "../index.js";
import path from "path";
import fs from "fs";

// Default global configuration path
const globalConfigPath = path.join(process.env.HOME || process.env.USERPROFILE, ".config", "dtre.json");

// Helper function to parse arguments
function parseArgs(args) {
    const options = {
        directoryPath: process.cwd(), // Default: current working directory
        style: "default",            // Default: 'default' style
        outputPath: null,            // Default: print to console
        excludes: null,              // Default: no exclusions
        useGlobalConfig: false       // Default: do not use global configuration
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
            case "-e":
                options.excludes = args[++i];
                break;
            case "--global":
            case "-g":
                options.useGlobalConfig = true;
                break;
            default:
                console.error(`Unknown argument: ${arg}`);
                process.exit(1);
        }
    }

    return options;
}

// Load configuration from a file
function loadConfig(useGlobalConfig) {
    const configPath = useGlobalConfig ? globalConfigPath : path.resolve(process.cwd(), "dtre.json");
    if (fs.existsSync(configPath)) {
        try {
            const configContent = fs.readFileSync(configPath, "utf-8");
            return JSON.parse(configContent);
        } catch (error) {
            console.error(`Error reading configuration file: ${error.message}`);
            process.exit(1);
        }
    }
    return null; // No configuration file found
}

// Parse arguments
const cliOptions = parseArgs(process.argv.slice(2));

// Load configuration (global or local)
const config = loadConfig(cliOptions.useGlobalConfig);

// Merge CLI options with configuration (CLI options take precedence)
const options = {
    directoryPath: cliOptions.directoryPath || config?.directoryPath || process.cwd(),
    style: cliOptions.style || config?.style || "default",
    outputPath: cliOptions.outputPath || config?.outputPath || null,
    excludes: cliOptions.excludes ?? config?.excludes ?? null // Default to null if not provided
};

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

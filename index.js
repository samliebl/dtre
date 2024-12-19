import fs from 'fs';
import path from 'path';

/**
 * Generates and prints a directory tree with optional file content and metadata.
 * @param {string} directoryPath - The root directory path.
 * @param {string} style - Formatting style for tree output.
 * @param {string|null} outputPath - Output file path for the tree.
 * @param {RegExp|null} excludes - Exclusion pattern for files and directories.
 * @param {boolean} jsonOutput - Whether to output JSON.
 * @param {boolean} overview - Whether to include file metadata in JSON output.
 */

export function printDirectoryTree(directoryPath, style, outputPath, excludes, jsonOutput = false, overview = false) {
    directoryPath = directoryPath || process.cwd(); 
    // Default to current working directory
    excludes = excludes ? new RegExp(excludes.replace(".", "\\.")) : null; 
    // Default to no exclusions

    // Function to recursively generate the directory tree object
    function buildTree(currentPath) {
        const stats = fs.statSync(currentPath);
        const name = path.basename(currentPath);

        // Apply the exclusion pattern, if provided
        if (excludes && excludes.test(name)) {
            return null;
        }

        if (stats.isDirectory()) {
            const children = fs
                .readdirSync(currentPath)
                .map((child) => buildTree(path.join(currentPath, child)))
                .filter(Boolean); 
                // Remove null entries (excluded files/folders)

            return { name, type: 'directory', children };
        } else {
            const file = { name, type: 'file' };
            if (overview) {
                file.extension = path.extname(name).slice(1); 
                // Get file extension without the dot
                try {
                    file.content = fs.readFileSync(currentPath, "utf-8"); 
                    // Read file content
                } catch (err) {
                    file.content = null; 
                    // Handle unreadable files gracefully
                }
            }
            return file;
        }
    }

    // Build the tree structure starting from the given directory
    const tree = buildTree(directoryPath);
    if (!tree) {
        throw new Error('The directory could not be read or is empty.');
    }

    if (jsonOutput) {
        const jsonString = JSON.stringify(tree, null, 2);
        if (outputPath) {
            const distDir = path.resolve(outputPath);
            const distDirPath = path.dirname(distDir);
            if (!fs.existsSync(distDirPath)) {
                fs.mkdirSync(distDirPath, { recursive: true });
            }
            fs.writeFileSync(outputPath, jsonString);
            console.log(`Directory tree (JSON) written to: ${outputPath}`);
        } else {
            console.log(jsonString);
        }
    } else {
        const treeString = `.\n${generateTreeString(tree)}`;
        if (outputPath) {
            const distDir = path.resolve(outputPath);
            const distDirPath = path.dirname(distDir);
            if (!fs.existsSync(distDirPath)) {
                fs.mkdirSync(distDirPath, { recursive: true });
            }
            fs.writeFileSync(outputPath, treeString);
            console.log(`Directory tree printed to: ${outputPath}`);
        } else {
            console.log(treeString);
        }
    }
}

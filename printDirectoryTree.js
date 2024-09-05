import dirTree from "directory-tree";
import fs from "fs";
import path from "path";

export function printDirectoryTree(directoryPath, outputPath) {
    // Function to generate the tree string with pipes, correct branches, and directory markers
    function generateTreeString(tree, depth = 0, isLast = true, prefix = "") {
        let treeString = "";

        // Check if the node is a directory using `tree.children`, since directories should have children
        const isDirectory = tree.children && tree.children.length > 0;
        const name = isDirectory ? `${tree.name}/` : tree.name;

        // Add appropriate branch symbol
        const branch = isLast ? "`-- " : "|-- ";
        treeString += `${prefix}${branch}${name}\n`;

        if (tree.children) {
            const newPrefix = prefix + (isLast ? "    " : "|   "); // Add pipes for non-last directories
            tree.children.forEach((child, index) => {
                const isLastChild = index === tree.children.length - 1;
                treeString += generateTreeString(
                    child,
                    depth + 1,
                    isLastChild,
                    newPrefix
                );
            });
        }

        return treeString;
    }

    // Create directory tree
    const tree = dirTree(directoryPath);

    // Generate tree string starting from the root
    const treeString = `.\n${generateTreeString(tree)}`;

    // Ensure the dist directory exists
    const distDir = path.resolve(outputPath);
    const distDirPath = path.dirname(distDir);
    if (!fs.existsSync(distDirPath)) {
        fs.mkdirSync(distDirPath, { recursive: true });
    }

    // Write the tree string to the specified output path
    fs.writeFileSync(outputPath, treeString);

    // Optionally print the tree to the console
    console.log(`
Directory tree printed to:
${outputPath}`);
}
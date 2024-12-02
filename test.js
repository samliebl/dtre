import { printDirectoryTree } from "./index.js";

// Excludes files and folders starting with `_`.
printDirectoryTree(null, 'default', null, '^[_\\.]');

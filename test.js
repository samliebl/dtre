import { printDirectoryTree } from "./index.js";

printDirectoryTree('test', 'default', null, '^[_\\.]');
// Excludes files and folders starting with `_`.

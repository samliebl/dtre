# dtre: Directory Tree

`/ˈditriː/`

Programmatically print a simple directory tree in plain text. It's just an easy way for me to get the format I like.

1. Usage
    1. Module
    1. Command-line Interface (CLI)

## Features

- **Recursive Tree Generation**: Prints directory structure recursively.
- **Exclusion Support**: Exclude files or folders using regex patterns.
- **Custom Styles**: Supports `default` and `backtick` formatting styles.
- **Output Options**:
    - Prints raw text output to `--stdout`
    - Writes to a file
    - JSON
- **Configuration Files**:
    - Supports local (`dtre.json`) and
    - global (`~/.config/dtre.json`) configuration.
- **CLI Options**: Override configuration with command-line arguments.

---

<h2>Usage</h2>

<h3>Import as a module</h3>

Module exports a function `printDirectoryTree(dir, style, outputPath, excludes)` where:
- `dir` is the directory for which you want the tree.
- `style` is the branch formatting style (e.g., `'default'` or `'backtick'`).
- `outputPath` is the file path for saving output, or `null` to print to the console.
- `excludes` is a regex pattern string for files/folders to exclude, or `null` for no exclusions.

Example:

```javascript
import { printDirectoryTree } from "./index.js";

printDirectoryTree('test', 'backtick', 'dist/directory_tree.txt', null);
```

This generates a file `./dist/directory_tree.txt` with content like:

```
.
`-- test/
    |-- file1.txt
    |-- folder/
        `-- file2.txt
```

<h3>Command-line Interface (CLI)</h3>

Import the global npm package:

```bash
$ npm install --global dtre
```

Command-line interface supports various options:

```bash
# Print the tree for a directory
$ dtre --directoryPath="assets"
$ dtre -d assets

# Specify the style of output
$ dtre --style="default"
$ dtre -s backtick

# Write the output to a file
$ dtre --outputPath="dir.txt"
$ dtre -o dir.txt

# Exclude files or folders matching a regex
$ dtre --excludes="^[_\\.]"
$ dtre -e "^[_\\.]"

# Use a global configuration file
$ dtre --global
$ dtre -g

# Output JSON with file content and metadata (overview mode)
$ dtre --overview
$ dtre -w
```

<h4>Configuration files</h4>

<h5>Local configuration (`pwd/dtre.json`)</h5>

#### Local Configuration (`dtre.json`)
Place a `dtre.json` file in the current working directory. Example:

```json
{
    "directoryPath": "./src",
    "style": "backtick",
    "outputPath": "./tree-output.txt",
    "excludes": "node_modules"
}
```

<h5>Global Configuration (`~/.config/dtre.json`)</h5>

Create a global configuration file in `~/.config/dtre.json`. Example:

```json
{
    "directoryPath": "./",
    "style": "default",
    "outputPath": null,
    "excludes": null
}
```

<mark>Important</mark>: To use the global configuration, run with the `--global` or `-g` flag.

## LICENSE

MIT &copy; Sam Liebl 2024.

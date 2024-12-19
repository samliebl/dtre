# dtre: Directory Tree

`/ˈditriː/`

Programmatically print a simple directory tree in plain text or JSON. It's just an easy way for me to get the format I like.

#### Contents

1. Features
1. [Module](#ImportAsAModule)
1. [Command-line Interface (CLI)](#CommandLineInterface)
    1. [Configuration files](#ConfigurationFiles)
        1. [Local configuration files](#LocalConfiguration)
        1. [Global configuration files](#GlobalConfiguration)

---

## Features

- **Recursive Tree Generation**: Prints directory structure recursively.
- **Exclusion Support**: Exclude files or folders using regex patterns.
- **Custom Styles**: Supports `default` and `backtick` formatting styles.
- **Output Options**:
    - Prints raw text output to `--stdout`
    - Writes to a file
    - JSON
    - **Overview JSON Output**: Includes file content and metadata.
- **Configuration Files**:
    - Supports local (`dtre.json`) and
    - global (`~/.config/dtre.json`) configuration.
- **CLI Options**: Override configuration with command-line arguments.

<h2 id="Usage">Usage</h2>

<h3 id="ImportAsAModule">Import as a module</h3>

Module exports a function `printDirectoryTree(dir, style, outputPath, excludes, jsonOutput = false, overview = false)` where:
- `dir` is the directory for which you want the tree.
- `style` is the branch formatting style (e.g., `'default'` or `'backtick'`).
- `outputPath` is the file path for saving output, or `null` to print to the console.
- `excludes` is a regex pattern string for files/folders to exclude, or `null` for no exclusions.
- `jsonOutput` (optional) outputs the directory tree in JSON format if `true`.
- `overview` (optional) includes file metadata and content in JSON output if `true`.

Example:

```javascript
import { printDirectoryTree } from "./index.js";

printDirectoryTree('test', 'backtick', 'dist/directory_tree.json', null, true, true);
```

This generates a JSON file `./dist/directory_tree.json` with content like:

```json
{
    "name": "test",
    "type": "directory",
    "children": [
        {
            "name": "a1.txt",
            "type": "file",
            "extension": "txt",
            "content": "Sample content of a1.txt"
        }
    ]
}
```

<h3 id="CommandLineInterface">Command-line Interface (CLI)</h3>

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
$ dtre --excludes="^[_\.]"
$ dtre -e "^[_\.]"

# Use a global configuration file
$ dtre --global
$ dtre -g

# Output JSON with file content and metadata (overview mode)
$ dtre --overview
$ dtre -w
```

<h4 id="ConfigurationFiles">Configuration files</h4>

<h5 id="LocalConfiguration">Local configuration (<code>pwd/dtre.json</code>)</h5>

Place a `dtre.json` file in the current working directory. Example:

```json
{
    "directoryPath": "./src",
    "style": "backtick",
    "outputPath": "./tree-output.txt",
    "excludes": "node_modules",
    "jsonOutput": false,
    "overview": false
}
```

<h5 id="GlobalConfiguration">Global configuration (<code>~/.config/dtre.json</code>)</h5>

Create a global configuration file in `~/.config/dtre.json`. Example:

```json
{
    "directoryPath": "./",
    "style": "default",
    "outputPath": null,
    "excludes": null,
    "jsonOutput": false,
    "overview": false
}
```

**Important**: To use the global configuration, run with the `--global` or `-g` flag.

## LICENSE

MIT &copy; Sam Liebl 2024.

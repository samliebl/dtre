# Directory Tree

Programmatically print a simple directory tree in plain text. It's just an easy way for me to get the format I like.

## Usage

Module exports a function `printDirectoryTree(dir, output)` where parameter `dir` is the directory for which you want the tree and `output` is the file output path.

For example&hellip;

```js
import { printDirectoryTree } from "./printDirectoryTree.js";

printDirectoryTree("test", "dist/directoryTree.txt");
```

&hellip;will give you a file `./dist/directoryTree.txt` with content that looks something like this:

```
.
`-- test/
    |-- a3.txt
    |-- alpha/
    |   |-- a1.txt
    |   `-- delta/
    |       |-- d1.txt
    |       `-- d2.txt
    `-- beta/
        |-- b1.txt
        `-- gamma/
            |-- a2.txt
            `-- a3.txt
```

## Acknoledgments

Definitely relying a lot on (node-) [**directory-tree**](https://github.com/mihneadb/node-directory-tree) here. Thanks [mihneadb](https://github.com/mihneadb).

## LICENSE

MIT &copy; Sam Liebl 2024.

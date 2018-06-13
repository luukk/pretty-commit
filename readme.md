# pretty-commit

Pretty-commit is a module which uses prettier to format staged files. It uses a config file to format different files based on extension and an filepath.

## Install:
With `yarn`:
```shellsession
yarn add pretty-commit --dev
```

With `npm`:
```shellsession
npm install pretty-commit
```

### How to use:

create `.prettierrc.js`. This file will be used as the configuration to format the staged files. For each format option, the object must contain an `extensions` and a `write` property. These properties are used to apply the configuration to the matching extensions in the given path.

```javascript
module.exports = {
    scripts: {
        extensions: ['.js'],
        write: './src/',
        options: {
            parser: "flow",
            printWidth: 100,
            tabWidth: 4
        }
    },
    styles: {
        extensions: ['.scss'],
        write: './src/assets/',
        options: {
            parser: 'scss',
            printWidth: 100,
            tabWidth: 1,
            trailingComma: "all",
            bracketSpacing: true
        }
    }
};
```

### Pre-commit hook

to use pretty-commit as a pre-commit hook add in your `package.json` add under the `script`'s section:
```
"precommit": "pretty-commit"
```

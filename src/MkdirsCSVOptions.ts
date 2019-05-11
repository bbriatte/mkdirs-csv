import {OptionDefinition} from 'command-line-args';

const options: OptionDefinition[] = [
    {
        name: 'filePath',
        alias: 'f',
        type: String,
        defaultOption: true
    },
    {
        name: 'outDir',
        alias: 'o',
        type: String,
        defaultValue: '.'
    },
    {
        name: 'columns',
        alias: 'c',
        type: String,
        multiple: true
    },
    {
        name: 'separator',
        alias: 's',
        type: String,
        defaultValue: ' '
    },
    {
        name: 'delimiter',
        alias: 'd',
        type: String,
        defaultValue: ';'
    }
];

export default options;
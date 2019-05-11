#!/usr/bin/env node

import * as commandLineArgs from 'command-line-args';
import {MkdirsCSVCommand} from './MkdirsCSVCommand';
import options from './MkdirsCSVOptions';

const cla = commandLineArgs(options);
const command = new MkdirsCSVCommand({
    filePath: cla.filePath,
    columns: cla.columns || [],
    outDir: cla.outDir,
    separator: cla.separator,
    delimiter: cla.delimiter
});
command.run().catch(console.error);
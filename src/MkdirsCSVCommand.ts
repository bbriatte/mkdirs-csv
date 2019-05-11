import {MkdirsCSVConfig} from './MkdirsCSVConfig';
import * as fs from 'fs';
import {sep} from 'path';
import * as parse from 'csv-parse';

export class MkdirsCSVCommand {

    readonly config: MkdirsCSVConfig;

    constructor(config: MkdirsCSVConfig) {
        this.config = config;
    }

    async run(): Promise<void> {
        if(this.config.filePath === undefined) {
            console.error('Missing CSV file path');
            return;
        }
        if(this.config.columns.length === 0) {
            console.error('You must provide at least one column');
            return;
        }
        const data = await this._readFileAtPath(this.config.filePath);
        const rows = await this._parseCSVWithInput(data);

        const files = rows.map((row) => {
            return this.config.columns.reduce((acc, column) => {
                if(row[column] !== undefined) {
                    if(acc.length > 0) {
                        acc += this.config.separator;
                    }
                    return acc + row[column];
                }
                return acc;
            }, "");
        });
        await Promise.all(files.map(this._mdkir.bind(this)));
    }

    private _readFileAtPath(path: string): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.readFile(path, "utf8", (err, data) => {
                if(err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    }

    private _parseCSVWithInput(data: string): Promise<object[]> {
        return new Promise((resolve, reject) => {
            parse(data, {
                delimiter: this.config.delimiter
            }, (err, res) => {
                if(err) {
                    reject(err);
                    return;
                }
                resolve(this._CSVToJS(res));
            });
        });
    }

    private _CSVToJS(csv: any[]): object[] {
        const res: object[] = [];
        if(csv.length > 0) {
            const headers: string[] = csv[0];
            for(let i = 1; i < csv.length; i++) {
                const obj = {};
                for(let j = 0; j < headers.length; j++) {
                    obj[headers[j]] = csv[i][j];
                }
                res.push(obj);
            }
        }
        return res;
    }

    private _mdkir(name: string): Promise<void> {
        return new Promise((resolve, reject) => {
            let directory = this.config.outDir;
            if(!directory.endsWith(sep)) {
                directory += sep;
            }
            directory += name;
            fs.mkdir(directory, { recursive: true }, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }
}
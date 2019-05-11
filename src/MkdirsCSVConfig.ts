export interface MkdirsCSVConfig {
    readonly filePath?: string;
    readonly outDir: string;
    readonly columns: string[];
    readonly separator: string;
    readonly delimiter: string;
}
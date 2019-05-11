# mkdirs-csv

[![npm version](https://badge.fury.io/js/mkdirs-csv.svg)](https://badge.fury.io/js/mkdirs-csv)

Create directories using a CSV file

## Installation

npm install -g mkdirs-csv

## Usage

a. Using the given file name's `users.csv`
```csv
Lastname;Firstname;age
Doe;John;25
Stewart;Jon;45
David;Larry;59
```

b. With the following command :

```sh
mkdirs-csv users.csv -c Firstname Lastname -o users -d "--"
```

c. Will generate directories :

```sh
users/John--Doe
users/Jon--Stewart
users/Larry--David
```

### Options

* `filePath`: **[-f]** The default option or passing after the -f option. Is the file path of your CSV file
* `outDir`: **[-o]** The output directory that will contains all your child directories from the CSV file
* `columns`: **[-c]** The list of column name
* `separator`: **[-s]** The separator between columns during the directory creation
* `delimiter`: **[-d]** The CSV delimiter
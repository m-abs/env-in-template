#!/usr/bin/env node

import * as fs from 'fs';
import t from 'lodash.template';
import minimist from 'minimist';
import * as path from 'path';
import { promisify } from 'util';

const fsExists = promisify(fs.exists);
const fsReadFile = promisify(fs.readFile);
const fsWriteFile = promisify(fs.writeFile);

const argv = minimist(process.argv.slice(2));
async function worker() {
  if (argv._.length !== 2) {
    // tslint:disable-next-line:no-console
    console.warn(`Usage: ${path.basename(process.argv[0])} input-file output-file`);
    process.exit(127);
    return;
  }

  const [inputFile, outputFile] = argv._;

  if (!(await fsExists(inputFile))) {
    console.error(`${inputFile} doesn't exist.`);
    process.exit(127);
    return;
  }

  const inputData = await fsReadFile(inputFile, 'UTF-8');
  const template = t(inputData);

  const outputData = template(process.env);
  fsWriteFile(outputFile, outputData, 'UTF-8');
}

worker();

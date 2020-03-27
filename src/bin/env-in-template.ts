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

if (argv._.length !== 2) {
  // tslint:disable-next-line:no-console
  console.warn(
    `Usage: ${path.basename(process.argv[0])} input-file output-file`,
  );
  process.exit(127);
}

async function worker() {
  const [inputFile, outputFile] = argv._;

  if (!(await fsExists(inputFile))) {
    console.error(`${inputFile} doesn't exist.`);
    process.exit(127);
  }

  try {
    const inputData = await fsReadFile(inputFile, 'UTF-8');
    const template = t(inputData);

    const outputData = template(process.env);
    await fsWriteFile(outputFile, outputData, 'UTF-8');
  } catch (err) {
    console.error(err);

    process.exit(1);
  }

  process.exit(0);
}

worker();

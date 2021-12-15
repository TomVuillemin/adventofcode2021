import * as fs from 'fs';

export const readFileAndPutLinesInArray = (fileName) => {
  const file = fs.readFileSync(fileName, 'utf8');
  return file.split('\n');
}
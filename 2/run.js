import { readFileAndPutLinesInArray } from '../utils/utils.js';

const pwd = process.cwd();
const input = readFileAndPutLinesInArray(`${process.cwd()}/input`)

let depth = 0;
let position = 0;

input.forEach(element => {
    const command = element.split(' ');
    const value = parseInt(command[1]);
    if (command[0] === 'forward') {
        position+=value;
    } else if (command[0] === 'down') {
        depth+=value;
    }else if (command[0] === 'up') {
        depth-=value;
    }
});
console.log('depth: ', depth);
console.log('position: ', position);
console.log('multiplied: ', depth*position);
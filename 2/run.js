import { readFileAndPutLinesInArray } from '../utils/utils.js';

const pwd = process.cwd();
const input = readFileAndPutLinesInArray(`${process.cwd()}/input`)

const part1 = () => {
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
    console.log('part1')
    console.log('depth: ', depth);
    console.log('position: ', position);
    console.log('multiplied: ', depth*position);
}

const part2 = () => {
    let depth = 0;
    let position = 0;
    let aim = 0;
    
    input.forEach(element => {
        const command = element.split(' ');
        const value = parseInt(command[1]);
        if (command[0] === 'forward') {
            position+=value;
            depth+=aim*value;
        } else if (command[0] === 'down') {
            aim+=value;
        }else if (command[0] === 'up') {
            aim-=value;
        }
    });
    console.log('part2')
    console.log('depth: ', depth);
    console.log('position: ', position);
    console.log('multiplied: ', depth*position);
}

part1();
part2();
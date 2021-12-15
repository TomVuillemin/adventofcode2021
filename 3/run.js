import { readFileAndPutLinesInArray } from "../utils/utils.js";

const testInput = ["00100", "11110", "10110", "10111", "10101", "01111", "00111", "11100", "10000", "11001", "00010", "01010" ]

const pwd = process.cwd();
const realIinput = readFileAndPutLinesInArray(`${process.cwd()}/input`)

const part1 = (input) => {
    const bitsSums = []
    input.forEach(element => {
        //split element by character
        const splitElement = element.split('')
        splitElement.forEach((bit,i) => {
            //add bit to bitsSums[i]
            if (bitsSums[i] === undefined) {
                bitsSums[i] = parseInt(bit)
            }else{
                bitsSums[i] += parseInt(bit)
            }
        })
    })
    let gammaRate=''
    let epsilonRate=''
    bitsSums.forEach(bitsSum => {
        if (bitsSum > input.length/2) {
            gammaRate += '1'
            epsilonRate += '0'
        }else{
            gammaRate += '0'
            epsilonRate += '1'
        }
    })
    const decimalGammaRate = parseInt(gammaRate, 2)
    const decimalEpsilonRate = parseInt(epsilonRate, 2)
    console.log('part1')
    console.log('decimalGammaRate: ', decimalGammaRate)
    console.log('decimalEpsilonRate: ', decimalEpsilonRate)
    console.log('result: ', decimalGammaRate*decimalEpsilonRate)
}

part1(realIinput)
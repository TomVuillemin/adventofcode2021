import { readFileAndPutLinesInArray } from "../utils/utils.js";

const testInput = [
"1163751742",
"1381373672",
"2136511328",
"3694931569",
"7463417111",
"1319128137",
"1359912421",
"3125421639",
"1293138521",
"2311944581"
]

const pwd = process.cwd();
const realIinput = readFileAndPutLinesInArray(`${process.cwd()}/input`)

const part1 = (input) => {
    console.log('part1')
    //split input by digit
    const map = input.map(element => {
        return element.split('').map(value => parseInt(value))
    })
    aStar(map)
}

const aStar = (map) => {
    const destination = {
        x:map.length-1,
        y:map[0].length-1
    }

    const heuristic = (position) => {
        return Math.abs(position.x-destination.x)+Math.abs(position.y-destination.y)
    }

    const getNeighbours = (position) => {
        const neighbours = []
        if (position.x > 0) {
            neighbours.push({x:position.x-1, y:position.y})
        }
        if (position.x <= destination.x-1) {
            neighbours.push({x:position.x+1, y:position.y})
        }
        if (position.y > 0) {
            neighbours.push({x:position.x, y:position.y-1})
        }
        if (position.y <= destination.y-1) {
            neighbours.push({x:position.x, y:position.y+1})
        }
        return neighbours
    }

    const getNeighboursWithValueAndHeuristic = (position, value) => {
        const neighbours = getNeighbours(position)
        const neighboursWithValueAndHeuristic = neighbours.map(neighbour => {
            return {
                x:neighbour.x,
                y:neighbour.y,
                value:map[neighbour.y][neighbour.x] + value,
                heuristic:map[neighbour.y][neighbour.x] + value+heuristic(neighbour)
            }
        })
        return neighboursWithValueAndHeuristic
    }

    const addToSortedArray = (array, element) => {
        let index = 0
        while (index < array.length && array[index].heuristic < element.heuristic) {
            index++
        }
        array.splice(index, 0, element)
    }
    
    const begin = {
        x:0,
        y:0,
        value:0,
        heuristic:0+heuristic({x:0, y:0})
    }

    const open = [begin];
    let current = begin;
    
    while (open.length > 0) {
        current = open.shift()
        //console.log('current: ', current)
        if (current.x === destination.x && current.y === destination.y) {
            console.log('result: ', current.value)
            return
        }
        closed.push(current)
        map[current.y][current.x] = {...map[current.y][current.x], isClosed:true};    
        const neighboursWithValueAndHeuristic = getNeighboursWithValueAndHeuristic(current, current.value)
        neighboursWithValueAndHeuristic.forEach(neighbour => {
            //if neighbour is not in closed 
            if (!map[neighbour.y][neighbour.x].isClosed) {
                //if neighbour is not in open
                if (!map[neighbour.y][neighbour.x].isOpen) {
                    addToSortedArray(open, neighbour)
                    map[neighbour.y][neighbour.x] = {...map[neighbour.y][neighbour.x], isOpen:true, value:neighbour.value, heuristic:neighbour.heuristic};   
                }else{
                    //if neighbour is in open
                    if (map[neighbour.y][neighbour.x].value > neighbour.value) {
                        map[neighbour.y][neighbour.x].value = neighbour.value
                        map[neighbour.y][neighbour.x].heuristic = neighbour.heuristic
                    }
                }
            }else{
                //if neighbour is in closed
                if (map[neighbour.y][neighbour.x].value > neighbour.value) {
                    map[neighbour.y][neighbour.x].value = neighbour.value
                    map[neighbour.y][neighbour.x].heuristic = neighbour.heuristic
                }
            }
        })
    }
}

const addAndWrapBackToOne = (a, b) => {
    const sum  = a + b
    if (sum > 9) {
        return sum - 9
    } else {
        return sum
    }
}
const part2 = (input) => {
    console.log('part2')
      //split input by digit
      const map=[];
      for (let repeatNumber = 0; repeatNumber < 5; repeatNumber++) {
        input.forEach((element,i) => {
            const line = [];
            for (let repeatNumberX = 0; repeatNumberX < 5; repeatNumberX++) {
                element.split('').forEach((value,j) => {
                    line.push(addAndWrapBackToOne(addAndWrapBackToOne(parseInt(value) , repeatNumberX), repeatNumber))
                })
            }
            map[i+repeatNumber*input.length]= line
        })          
      }
        aStar(map)
}

part1(realIinput)
part2(realIinput)
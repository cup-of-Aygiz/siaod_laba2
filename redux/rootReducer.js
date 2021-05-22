import {combineReducers} from 'redux'
import {
    BINARY_SEARCH, BINARY_TREE_SEARCH,
    FIBONACCI_SEARCH, INTERPOLATION_SEARCH
} from './types.js'
import {BinaryTree} from "../modules/binaryTree.js";
import {binarySearch} from "../modules/binarySearch.js";
import fibSearch from "../modules/fibonachiSearch.js";
import {interpolationSearch} from "../modules/interpolationSearch.js";
import {
    HashTable,
    HashTableNode,
    HashTableRandom
} from "../modules/hash/hashTables.js";
import {Queens} from "../modules/queens/queensQuantity.js";

let n = 10, //search
    minLimit = 0,
    maxLimit = 10,
    sought = 5

let array = [];
let array2= []
for (let j = 0; j < n; j++) {
    array[j] = {
        value: Math.floor(Math.random() * (maxLimit - minLimit) + minLimit),
        index: j,
    }
    array2[j]=array[j].value
}
//console.log(array)
console.log(array2)
let stringSought = 'apple2' //hash search
let stringArray = ["banana", "cat", "tac", "appel2", "dog", "potatoes", "cucumber", "apple2"];
let nodeStringArray = ["apple", "anny", "tac", "cat", "apple2", "banana", "cat", "dog", "potatoes", "cucumber",];
let deleteItem="apple"
let boardSize = 8,
    queensQuantity = 8
let initialStatePrime = {
    primeArray: array,
    primeSought: sought,

}
let primeHashTaBle = new HashTable
stringArray.map(item => {
    primeHashTaBle.add(item)
})
let nodeHashTaBle = new HashTableNode
nodeStringArray.map(item => {
    nodeHashTaBle.add(item)
})
let initialStateHash = {
    stringSought: stringSought,
    deleteItem: deleteItem,
    primeHashTaBle: primeHashTaBle,
    nodeHashTaBle: nodeHashTaBle,
}
let initialStateQueens = {
    boardSize: boardSize,
    queensQuantity: queensQuantity,
    answer: []
}

function primeArrayReducer(state = initialStatePrime, action) {
    switch (action.type) {
        case "BINARY_TREE_SEARCH": {
            const BST = new BinaryTree()
            state.primeArray.map((item) => {
                BST.insert(item)
            })
            console.log("BINARY_TREE_SEARCH:", (BST.search(BST.root, state.primeSought)))
            return state
        }
        case "BINARY_SEARCH": {
            console.log("BINARY_SEARCH:", binarySearch(state.primeArray.sort(function compareNumbers(a, b) {
                return a.value - b.value
            }), state.primeSought))
            return state
        }
        case "FIBONACCI_SEARCH": {
            console.log("FIBONACCI_SEARCH:", fibSearch(state.primeArray.sort(function compareNumbers(a, b) {
                return a.value - b.value
            }), state.primeSought))
            return state
        }
        case "INTERPOLATION_SEARCH": {
            console.log("INTERPOLATION_SEARCH:", interpolationSearch(state.primeArray.sort(function compareNumbers(a, b) {
                return a.value - b.value
            }), state.primeSought, 0, state.primeArray.length - 1))
            return state
        }
        case "GET_PRIME_ARRAY": {
            //console.log(state.primeArray)
            return state
        }
        case "GET_PRIME_SOUGHT": {
            console.log("GET_PRIME_SOUGHT:", state.primeSought)
            return state
        }
        default: {
            return state
        }
    }
}

function HashReducer(state = initialStateHash, action) {
    switch (action.type) {
        case "HASH_SEARCH": {
            console.log("HASH_SEARCH: ", primeHashTaBle.get(state.stringSought))
            return state
        }
        case "HASH_DELETE": {
            console.log("HASH_SEARCH_DELETE: ", primeHashTaBle.delete(state.deleteItem))
            return state
        }
        case "HASH_SEARCH_NODE": {
            console.log("HASH_SEARCH_NODE: ", nodeHashTaBle.get(state.stringSought))
            return state
        }case "HASH_DELETE_NODE": {
            console.log("HASH_DELETE_NODE: ", nodeHashTaBle.delete(state.deleteItem))
            return state
        }
        default: {
            return state
        }
    }
}

function queensOnTheBoard(state = initialStateQueens, action) {
    switch (action.type) {
        case "QUEEN/GET_ANSWER": {
            console.log("QUEEN/GET_ANSWER: ", state.answer)
            return state
        }
        case "QUEEN/SEARCH_ANSWER": {
            return {...state, answer: Queens(state.boardSize,state.queensQuantity)}
        }
        case "QUEEN/SET_BOARD_SIZE":{
            return {...state, boardSize: action.data.boardSize}
        }
        case "QUEEN/SET_QUEENS_QUANTITY":{
            return {...state, queensQuantity: action.data.queensQuantity}
        }
        default: {
            return state
        }
    }
}

export const rootReducer = combineReducers({
    primeArray: primeArrayReducer,
    hashArray: HashReducer,
    chess: queensOnTheBoard
})
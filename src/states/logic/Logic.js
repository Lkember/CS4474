//import Queue from './Queue.js'
var level = 1
//var questionQueue = new Queue()
var max = 0


// return the level that is within the logic
function getLevel(){
	return level
}

// check the level entered and set the logic to the level that is selected
function setLevel(lv){
	level = lv
}

// set the max value 
function createMax(){
	// set the difficulty of the factor range
	if(this.level == 1){
		this.max = 12
	}
	else if(this.level == 2){
		this.max = 64
	}
	else{
		this.max = 144
	}
	
	computeFactor(max)
}

// create the question queue
function createQueue(){
	// non prime numbers queue
 }

function isFactor(i){
	// compute the set of possibilities for factoring
	if(max % i === 0){
		return true
	}
	else{
		return false
	}
}

// Compute the list of factors for the number given
function computeFactor(number){
	// // compute a list of numbers that we can have + a few rando numbers thrown in
	// for(int i = 1; i <= max; i++){
	// 	if(max % i === 0){
	// 		//this.queue.enqueue(i)
	// 		// queue a random number that is not a factor
	// 		//this.queue.enqueue(nonPrime(max))
	// 	}
	// }
	// put all numbers into a queue and return it
}

function nonPrime(max){
	var a = 1
    while(a%i === 0){
          a = Math.ceil(Math.random() * max)
      }
    console.log(a)
    return a
}

function isDivision(i){

}
function isMultiplication(i){

}

module.exports = {
	level: level,
	max: max,
	getLevel: getLevel,
	};
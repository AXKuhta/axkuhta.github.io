"use strict"

let matrix1 = new Float32Array()
let matrix2 = new Float32Array()

async function load_array(url) {
	const response = await fetch(url)
	const buffer = await response.arrayBuffer()

	return new Float32Array(buffer)
}

async function init() {
	matrix1 = await load_array("matrix1.bin")
	matrix2 = await load_array("matrix2.bin")
}

init()

function matmul1(input) {
	let result = new Float32Array(784)

	for (let i = 0; i < 784; i++) {
		let acc = 0.0
		
		for (let j = 0; j < 784; j++) {
			acc += input[j] * matrix1[784*i + j]
		}

		result[i] = acc
	}

	return result
}

function relu(input) {
	let result = new Float32Array(784)

	for (let i = 0; i < 784; i++) {
		result[i] = input[i] > 0.0 ? input[i] : 0.0
	}

	return result
}

function matmul2(input) {
	let result = new Float32Array(10)

	for (let i = 0; i < 10; i++) {
		let acc = 0.0
		
		for (let j = 0; j < 784; j++) {
			acc += input[j] * matrix2[784*i + j]
		}

		result[i] = acc
	}

	return result
}

function argmax(input) {
	let max = input[0]
	let idx = 0

	for (let i in input) {
		if (input[i] > max) {
			max = input[i]
			idx = i
		}
	}

	return idx
}

function run(input) {
	const result = matmul2(relu(matmul1(bitmap)))
	const digit = argmax(result)
	const confidence = Math.floor(100 * result[digit])

	result_div.innerHTML = `<span style="font-size: 48px;">${digit} </span><span>${confidence}%</span>`

	console.log(argmax(result))
}

setInterval(run, 500)

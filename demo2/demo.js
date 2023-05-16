"use strict"

const bitmap = new Float32Array(28*28)
const pad = document.querySelector(".input_pad")
const result_div = document.querySelector(".result div")

let draw_enable = 0

pad.onmousedown = function() {
	draw_enable = 1
}

pad.onmouseup = function() {
	draw_enable = 0
}

for (let i = 0; i < 28*28; i++) {
	const pixel = document.createElement("div")

	pixel.id = i
	pixel.onmouseover = hittest
	pixel.onclick = toggle_pixel

	pad.append(pixel)
}

function toggle_pixel(event, force = false) {
	const id = event.target.id

	if (force) {
		bitmap[id] = 1
	} else {
		bitmap[id] ^= 1
	}

	if (bitmap[id] === 1) {
		event.target.classList.add("set")
	} else {
		event.target.classList.remove("set")
	}
}

function hittest(event) {
	if (draw_enable) {
		toggle_pixel(event, true)
	}
}
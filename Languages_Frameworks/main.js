"use strict";
let random = Math.floor(Math.random() * 7) + 1;
let randomImages = `pictures/${random}.png`;
let image = document.querySelector(".image");

image.setAttribute("src", randomImages);

'use strict'

var gCanvas;
var gCtx;

function onInit() {
    renderImgs()
    rendrCanvas()
}


function renderImgs() {
    let strHtml = '';
    let imgs = imgsForDisplay()
    imgs.forEach(function(img) {
        strHtml += `<img class="image" onclick="onImg('${img.id}')" src="img/${img.url}" />`;
    })
    const elImgContainer = document.querySelector('.img-container');
    elImgContainer.innerHTML = strHtml;
}

function rendrCanvas() {
    gCanvas = document.getElementById('meme-canvas')
    gCtx = gCanvas.getContext('2d')

    drawImg()
        // var currMeme = getMeme()
        // console.log('currMeme', currMeme);
        // drawText(currMeme.lines[currMeme.selectedLineIdx].txt, 100, 100)
}

function onImg(imgId) {
    setSelectedImgId(imgId)
    rendrCanvas()
}

function onTxt(text) {
    setLineTxt(text)
    rendrCanvas()
}

// DRAW FUNCTIONS
function drawImg() {
    var img = new Image();
    img.src = getImg();
    var currMeme = getMeme()
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, 450, 450)
        drawText(currMeme.lines[currMeme.selectedLineIdx].txt, 100, 100)
    }
}

function drawText(text, x, y) {
    gCtx.lineWidth = '1.5'
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = '30px IMPACT'
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}
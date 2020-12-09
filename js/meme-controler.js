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
}

function onImg(imgId) {
    setSelectedImgId(imgId)
    rendrCanvas()
}

function onTxt(text) {
    setLineTxt(text)
    rendrCanvas()

    document.querySelector('.txt-input').value = ''
}

function onTxtSize(diff) {
    setSize(diff)
    rendrCanvas()
}

function onTxtLocY(diff) {
    setLocY(diff)
    rendrCanvas()
}

function onSwitchLine() {
    var currLine = setSelectedLineIdx()
    addBorder(currLine)
}

function addBorder(currLine) {
    console.log('continue');
}

// DRAW FUNCTIONS
function drawImg() {
    var img = new Image();
    let currMeme = getMeme()
    img.src = getImg();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, 450, 450)
        drawText(currMeme.lines)
    }
}

function drawText(memes) {
    memes.forEach(function(meme) {
        gCtx.lineWidth = '1.5'
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = 'white'
        gCtx.font = `${meme.size}px IMPACT`
        gCtx.textAlign = 'center'
        gCtx.fillText(meme.txt, meme.locX, meme.locY)
        gCtx.strokeText(meme.txt, meme.locX, meme.locY)

    })
}
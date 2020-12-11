'use strict'

var gCanvas;
var gCtx;
var gIsDrag;

function onInit() {
    renderImgs()
    rendrCanvas()
    CanvasEvListeners()
}


function renderImgs(typing) {
    let strHtml = '';
    let imgs = imgsForDisplay(typing)
    imgs.forEach(function(img) {
        strHtml += `<img class="image" onclick="onImg('${img.id}', '${img.ratio}')" src="img/${img.url}" />`;
    })
    const elImgContainer = document.querySelector('.img-container');
    elImgContainer.innerHTML = strHtml;
}

function rendrCanvas() {
    gCanvas = document.getElementById('meme-canvas')
    gCtx = gCanvas.getContext('2d')
    drawImg()
}

function onImg(imgId, imgRatio) {
    var elGallerySection = document.querySelector('.gallery-section')
    var elCanvasContainer = document.querySelector('.canvas-container')
    var elToolsContainer = document.querySelector('.tools-container')
    elGallerySection.style.display = 'none'
    elCanvasContainer.style.display = 'block'
    elToolsContainer.style.display = 'block'
        // var elMyGallery = document.querySelector('.my-gallery')
        // elMyGallery.classList.toggle('active')

    setSelectedImgId(imgId)
    resizeCanvas(imgRatio)
    rendrCanvas()
}

function onTxt(text) {
    setLineTxt(text)
    rendrCanvas()
    var elInput = document.querySelector('.txt-input')
    elInput.addEventListener("change", function() {
        elInput.value = ''
    })
}

function onTxtFont(font) {
    setFontType(font)
    rendrCanvas()
}

function onColor(color) {
    setColor(color)
    rendrCanvas()
}

function onTxtSize(diff) {
    setSize(diff)
    rendrCanvas()
}

function onTxtLocY(diff) {
    setLocY(diff)
    rendrCanvas()
}

function onTxtLocX(diff) {
    setLocX(diff)
    rendrCanvas()
}

function onLineDelete() {
    deleteLine()
    rendrCanvas()
}

function onLineAdd() {
    createLine()
    rendrCanvas()
}

function onSwitchLine() {
    setSelectedLineIdx()
    rendrCanvas()
}

function addBorder() {
    var currMeme = getMeme()
    var currLine = currMeme.selectedLineIdx
    if (currLine === undefined) return //still eror
    var offsetX = currMeme.lines[currLine].locX
    var offsetY = currMeme.lines[currLine].locY
    var height = currMeme.lines[currLine].size
    var txt = currMeme.lines[currLine].txt
    var width = currMeme.lines[currLine].size * txt.length / 2
    var startX = offsetX - (width / 2)
    var startY = offsetY - height + 5

    gCtx.beginPath()
    gCtx.strokeStyle = 'white';
    gCtx.rect(startX, startY, width, height);
    gCtx.stroke();
}

function onSaveMeme() {
    const data = gCanvas.toDataURL();
    saveMemeToLocalStorage(data)
}

function onRenderMemes() {
    var preMemes = getPreMemes()
    if (!preMemes) {
        console.log('no memes in trorage');
        return
    }
    var strHtml = ''
    preMemes.forEach(function(preMeme) {
        strHtml += `<img class="image" src="${preMeme}"/>`
    })
    var elPreContainre = document.querySelector('.previous-container')
    elPreContainre.innerHTML = strHtml
    var elPreContainre = document.querySelector('.previous-memes')
    elPreContainre.style.display = 'block'
    var elGallery = document.querySelector('.gallery-section')
    elGallery.style.display = 'none'
    var elCanvas = document.querySelector('.canvas-container')
    elCanvas.style.display = 'none'
    var elTools = document.querySelector('.tools-container')
    elTools.style.display = 'none'

    var elMyMeme = document.querySelector('.my-memes')
    elMyMeme.classList.toggle('active')
    var elMyGallery = document.querySelector('.my-gallery')
    elMyGallery.classList.toggle('active')
}

function onRenderGallery() {
    var elGallerySection = document.querySelector('.gallery-section')
    elGallerySection.style.display = 'block'
    var elPreContainre = document.querySelector('.previous-memes')
    elPreContainre.style.display = 'none'
    var elCanvasContainer = document.querySelector('.canvas-container')
    elCanvasContainer.style.display = 'none'
    var elToolsContainer = document.querySelector('.tools-container')
    elToolsContainer.style.display = 'none'

    var elMyMeme = document.querySelector('.my-memes')
    var elMyGallery = document.querySelector('.my-gallery')
    elMyMeme.classList.toggle('active')
    elMyGallery.classList.toggle('active')
}

function onSerchImg(typing) {
    imgsForDisplay(typing)
    renderImgs(typing)
}

function resizeCanvas(imgRatio) {
    var elContainer = document.querySelector('.canvas-container');
    var elHeight = elContainer.offsetHeight
    elContainer.style.width = `${elHeight * imgRatio}px`

    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}


function CanvasEvListeners() {
    gCanvas.addEventListener("mousedown", function() {
        gIsDrag = true
    })
    gCanvas.addEventListener("mouseup", function() {
        gIsDrag = false
    })
    gCanvas.addEventListener("mousemove", function(event) {
        if (!gIsDrag) return

        var offsetX = event.offsetX
        var offsetY = event.offsetY

        let currMeme = getMeme()
        let lines = currMeme.lines
        lines.forEach(function(line, index) {
            var height = line.size
            var width = line.size * line.txt.length / 2
            var startX = line.locX - (width / 2)
            var startY = line.locY - height + 5
            if (offsetX > startX && offsetX < startX + width &&
                offsetY > startY && offsetY < startY + height) {
                setLineLocation(index, offsetX, offsetY)
                rendrCanvas()
            }
        })
    })
}

function onUploadImg(img) {
    console.log(img);
}


function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-img.jpg';
}

function openMobileMenu() {
    var elMenu = document.querySelector('.main-nav')
    elMenu.classList.toggle('open-mobile')
    let elScreen = document.querySelector('.screen')
    elScreen.classList.toggle('dark')
}

// DRAW FUNCTIONS
function drawImg() {
    var elContainer = document.querySelector('.canvas-container');


    var img = new Image();
    let currMeme = getMeme()
    img.src = getImg();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, elContainer.offsetWidth, elContainer.offsetHeight)
        drawText(currMeme.lines)
        addBorder()
    }
}

function drawText(memes) {
    memes.forEach(function(meme) {
        gCtx.lineWidth = '1.5'
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = `${meme.color}`
        gCtx.font = `${meme.size}px ${meme.font}`
        gCtx.textAlign = `${meme.align}`
        gCtx.fillText(meme.txt, meme.locX, meme.locY)
        gCtx.strokeText(meme.txt, meme.locX, meme.locY)

    })
}
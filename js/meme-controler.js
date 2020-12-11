'use strict'

var gCanvas;
var gCtx;
var gIsDrag;

function onInit() {
    renderImgs()
    rendrCanvas()
    CanvasEvListeners()
    renderKeywords()
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

function addStickers() {
    var stickers = getStikers()
    stickers.forEach(function(sticker) {
        var img = new Image();
        img.src = `img/stickers/${sticker.name}.png`
        img.onload = () => {
            gCtx.drawImage(img, sticker.locX, sticker.locY, (sticker.width), (sticker.height))
        }
    })
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

    var elPreContainre = document.querySelector('.previous-memes')
    elPreContainre.style.display = 'block'
    elPreContainre.innerHTML = strHtml
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
    elMyMeme.classList.toggle('active')

    var elMyGallery = document.querySelector('.my-gallery')
    elMyGallery.classList.toggle('active')
}

function onSerchImg(typing) {
    imgsForDisplay(typing)
    renderImgs(typing)
    var elSearch = document.querySelector('.search-gallery')
    elSearch.addEventListener("change", function() {
        var keywords = getKeywords()
        var words = Object.keys(keywords)
        words.forEach(function(word) {
            if (typing === word) addCommon(word)
            renderKeywords()
        })
    })
}

function resizeCanvas(imgRatio) {
    var elContainer = document.querySelector('.canvas-container');
    var elHeight = elContainer.offsetHeight
    elContainer.style.width = `${elHeight * imgRatio}px`

    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}


function CanvasEvListeners() {
    gCanvas.addEventListener("touchmove", function(event) {
        event.preventDefault()
    })

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
                setLineLocation(index, offsetX, offsetY + height / 2)
                rendrCanvas()
            }
        })

        let stickers = currMeme.stickers
        stickers.forEach(function(sticker, index) {
            if (offsetX > sticker.locX && offsetX < (sticker.locX + sticker.width) &&
                offsetY > sticker.locY && offsetY < (sticker.locY + sticker.height)) {
                setStickerLocation(index, offsetX - sticker.width / 2, offsetY - sticker.height / 2)
                rendrCanvas()
            }
        })


    })
}

function onUploadImg(img) {
    console.log(img);
}

function renderKeywords() {
    var keywords = getKeywords()
    var words = Object.keys(keywords)
    var strHTML = ''
    words.forEach(function(word) {
        if (keywords[word] > 2) {
            strHTML += `<span onclick="onKeyword('${word}')" style="cursor: pointer; font-size: ${+(keywords[word]) * 4}px; ">${word} </span>`
        }
    })
    var elWordsContainer = document.querySelector('.key-words')
    elWordsContainer.innerHTML = strHTML
}

function onKeyword(keyword) {
    renderImgs(keyword)
    addCommon(keyword)
    renderKeywords()
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

function onAddSticker(img) {
    createSticker(img)
    rendrCanvas()
}

// DRAW FUNCTIONS
function drawImg() {
    var elContainer = document.querySelector('.canvas-container');

    let currMeme = getMeme()
    var img = new Image();
    img.src = getImg();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, elContainer.offsetWidth, elContainer.offsetHeight)
        drawText(currMeme.lines)
        addBorder()
        addStickers()
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
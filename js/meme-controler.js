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



//NAVIGATION FUNCTIONS

function showGallery() {
    var elGallerySection = document.querySelector('.gallery-section')
    var elCanvasContainer = document.querySelector('.canvas-container')
    var elToolsContainer = document.querySelector('.tools-container')
    var elPreContainre = document.querySelector('.previous-memes')
    elPreContainre.style.display = 'none'
    elGallerySection.style.display = 'block'
    elCanvasContainer.style.display = 'none'
    elToolsContainer.style.display = 'none'
    var elMyGallery = document.querySelector('.my-gallery')
    elMyGallery.classList.add('active')
    var elMemes = document.querySelector('.my-memes')
    elMemes.classList.remove('active')
    var elMyEditor = document.querySelector('.my-editor')
    elMyEditor.classList.remove('active')
}

function showMyMeme() {
    var elGallerySection = document.querySelector('.gallery-section')
    var elCanvasContainer = document.querySelector('.canvas-container')
    var elToolsContainer = document.querySelector('.tools-container')
    var elPreContainre = document.querySelector('.previous-memes')
    elPreContainre.style.display = 'block'
    elGallerySection.style.display = 'none'
    elCanvasContainer.style.display = 'none'
    elToolsContainer.style.display = 'none'
    var elMyGallery = document.querySelector('.my-gallery')
    elMyGallery.classList.remove('active')
    var elMemes = document.querySelector('.my-memes')
    elMemes.classList.add('active')
    var elMyEditor = document.querySelector('.my-editor')
    elMyEditor.classList.remove('active')
    closeModal()
}

function showEditor() {
    var elGallerySection = document.querySelector('.gallery-section')
    var elCanvasContainer = document.querySelector('.canvas-container')
    var elToolsContainer = document.querySelector('.tools-container')
    var elPreContainre = document.querySelector('.previous-memes')
    elPreContainre.style.display = 'none'
    elGallerySection.style.display = 'none'
    elCanvasContainer.style.display = 'block'
    elToolsContainer.style.display = 'block'
    var elMyGallery = document.querySelector('.my-gallery')
    elMyGallery.classList.remove('active')
    var elMemes = document.querySelector('.my-memes')
    elMemes.classList.remove('active')
    var elMyEditor = document.querySelector('.my-editor')
    elMyEditor.classList.add('active')
}


function openMobileMenu() {
    var elMenu = document.querySelector('.main-nav')
    elMenu.classList.toggle('open-mobile')
    let elScreen = document.querySelector('.screen')
    elScreen.classList.toggle('dark')
}

//GALLERY FUNCTIONS

function onRenderGallery() {
    showGallery()

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

function onImg(imgId, imgRatio) {
    showEditor()

    setSelectedImgId(imgId)
    resizeCanvas(imgRatio)
    rendrCanvas()
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

function onUploadImg(ev) {
    showEditor()
    createInputImg(ev)

    var file = ev.target.files[0]
    var reader = new FileReader();

    reader.addEventListener("load", function() {
        var img = new Image();
        img.src = reader.result;
        img.onload = () => {
            gCtx.drawImage(img, 0, 0)
        }
    }, false)
    reader.readAsDataURL(file)
}

//EDITOR FUNCTIONS

function rendrCanvas() {
    gCanvas = document.getElementById('meme-canvas')
    gCtx = gCanvas.getContext('2d')
    drawImg()
}

function onTxt(text) {
    var elInput = document.querySelector('.txt-input')
    var elPreviustxt = getLineTxt()
    elInput.addEventListener("click", function() {
        elInput.value = elPreviustxt
    })
    setLineTxt(text)
    rendrCanvas()
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

function onAddSticker(img) {
    createSticker(img)
    rendrCanvas()
}

function onSizeSticker(diff) {
    setStickerSise(diff)
    rendrCanvas()
}

function onDeleteSticker() {
    deleteSticker()
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
        if (!gIsDrag) return
        var offsetX = event.targetTouches[0].clientX
        var offsetY = event.targetTouches[0].clientY

        let currMeme = getMeme()
        let lines = currMeme.lines
        lines.forEach(function(line, index) {
            var height = line.size
            var width = line.size * line.txt.length / 2
            var startX = line.locX - (width / 2)
            var startY = line.locY
            if (offsetX > startX && offsetX < startX + width &&
                offsetY > startY && offsetY < startY + height) {
                setLineLocation(index, offsetX, offsetY - height / 2)
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
    gCanvas.addEventListener("touchstart", function() {
        gIsDrag = true

    })
    gCanvas.addEventListener("touchend", function() {
        gIsDrag = false
    })

    gCanvas.addEventListener("mousedown", function() {
        gIsDrag = true
    })
    gCanvas.addEventListener("mouseup", function() {
        gIsDrag = false
    })
    gCanvas.addEventListener("mousemove", function move(event) {
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

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-img.jpg';
}



function drawImg() {
    var elContainer = document.querySelector('.canvas-container');
    let currMeme = getMeme()
    var currImg = getImg()
    var img = new Image();
    img.src = `img/${currImg.url}`

    if (currImg.isInput) {
        var reader = new FileReader();
        reader.addEventListener("load", function() {
            img.src = reader.result;
            img.onload = () => {
                gCtx.drawImage(img, 0, 0, elContainer.offsetWidth, elContainer.offsetHeight)
                drawText(currMeme.lines)
                addBorder()
                addStickers()
            }
        }, false)
        reader.readAsDataURL(currImg.file)
    } else {
        img.onload = () => {
            gCtx.drawImage(img, 0, 0, elContainer.offsetWidth, elContainer.offsetHeight)
            drawText(currMeme.lines)
            addBorder()
            addStickers()
        }

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


//MY MEMES FUNCTIONS

function onSaveMeme() {
    const data = gCanvas.toDataURL();
    saveMemeToLocalStorage(data)

    var elModal = document.querySelector('.modal')
    elModal.style.display = 'block'
    elModal.querySelector('.massage').innerHTML = 'Your meme was saved to </br> MY MEMES'
    elModal.querySelector('.action').innerHTML = '<button onclick="onRenderMemes()">take me there</button>'
}

function closeModal() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}

function onRenderMemes() {
    var elPreContainre = document.querySelector('.previous-memes')
    var strHtml = ''
    var preMemes = getPreMemes()
    if (!preMemes) strHtml += '<h2>You can save your memes here!</h2>'
    else {
        preMemes.forEach(function(preMeme) {
            strHtml += `<img class="image" src="${preMeme}"/>`
        })
    }

    elPreContainre.innerHTML = strHtml
    showMyMeme()
}
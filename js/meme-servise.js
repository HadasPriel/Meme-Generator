'use strict'

const IMG_KEY = 'imgKey'

var gKeywords = {
    angry: 0,
    important: 0,
    speech: 0,
    animals: 8,
    cute: 7,
    kiss: 1,
    baby: 7,
    sleep: 4,
    success: 3,
    surprise: 5,
    clown: 3,
    laugh: 5,
    man: 9,
    drink: 7,
    happy: 4
}

var gImgId = 1;
var gImgs = [{
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['angry', 'important', 'speech'],
        isInput: false
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['animals', 'cute', 'kiss'],
        isInput: false
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['baby', 'animals', 'cute'],
        isInput: false
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['sleep', 'animals', 'copmuter'],
        isInput: false
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['success', 'baby', 'cute'],
        isInput: false
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['speech', 'snob', 'important'],
        isInput: false
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['surprise', 'cute', 'baby'],
        isInput: false
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['happy', 'clown', 'listen'],
        isInput: false
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['baby', 'laugh', 'happy'],
        isInput: false
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['man', 'laugh', 'happy'],
        isInput: false
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['boxing', 'kiss', 'man'],
        isInput: false
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['surprise', 'man', 'inportant'],
        isInput: false
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['drink', 'man', 'happy'],
        isInput: false
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['serious', 'man', 'sun glass', 'matrix'],
        isInput: false
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['speech', 'man', 'game of thrones'],
        isInput: false
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['laugh', 'funny', 'man'],
        isInput: false
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['speech', 'man', 'putin'],
        isInput: false
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['encourage', 'scared', 'toy story'],
        isInput: false
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['woman', 'success', 'happy'],
        isInput: false
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['woman', 'happy', 'dance'],
        isInput: false
    },
]

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: '',
        font: 'Impact',
        size: 40,
        align: 'center',
        color: 'white',
        locX: 230,
        locY: 70
    }],
    stickers: []
}

var gPreviousMeme = loadFromStorage(IMG_KEY);

// KEYWORDS FUNCTIONS
function getKeywords() {
    return gKeywords
}

function addCommon(keyword) {
    gKeywords[keyword]++
}

//GALLERY FUNCTIONS

function imgsForDisplay(typing) {
    if (!typing) return gImgs
    var fitImgs = []
    var imgs = gImgs
    imgs.forEach(function(img) {
        img.keywords.forEach(function(keyword) {
            if (keyword.slice(0, typing.length) === typing.toLowerCase() &&
                !fitImgs.includes(img)) {
                fitImgs.push(img)
            }
        })
    })
    return fitImgs
}


// MEME FUNCTIONMS

function getMeme() {
    return gMeme
}

function getImg() {
    var currImg = [];
    var idCurrImg = gMeme.selectedImgId
    var currImg = gImgs.filter(function(img) {
        if (img.id === idCurrImg)
            return img
    })
    return currImg[0]
}

function createInputImg(ev) {
    var img = {
        id: gImgId,
        url: ev.target.files[0],
        file: ev.target.files[0],
        isInput: true

    }
    gImgs.push(img)
    gMeme.selectedImgId = img.id
        // return img.id
}

function setLineTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function getLineTxt() {
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

function setSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function setFontType(fontType) {
    gMeme.lines[gMeme.selectedLineIdx].font = fontType
}

function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

// function setDiraction(diraction) {
//     gMeme.lines[gMeme.selectedLineIdx].align = diraction
// }

function setLocY(diff) {
    gMeme.lines[gMeme.selectedLineIdx].locY += diff
}

function setTxtAlign(pos) {
    gMeme.lines[gMeme.selectedLineIdx].align = pos
}

function deleteLine() {
    if (!gMeme.lines) return
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function deletePreMeme() {
    g
}

function createLine() {
    var newLine = {
        txt: 'write here',
        font: 'Impact',
        size: 30,
        align: 'center',
        color: 'white',
        locX: 225,
        locY: 200
    }
    if (gMeme.lines.length === 0) newLine.locY = 70
    else if (gMeme.lines.length === 1) {
        newLine.locY = 400
        newLine.size = 50
    }

    gMeme.lines.push(newLine)
}

function setSelectedLineIdx(idx) {
    if (idx) {
        gMeme.selectedLineIdx = idx
    } else {
        gMeme.selectedLineIdx++;
        if (gMeme.selectedLineIdx > gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    }
}

function setSelectedImgId(imgId) {
    gMeme.selectedImgId = +imgId
}

function saveMemeToLocalStorage(imgTxt) {
    if (!gPreviousMeme) gPreviousMeme = []
    gPreviousMeme.push(imgTxt)
    saveToStorage(IMG_KEY, gPreviousMeme)
}

function getPreMemes() {
    var preMemes = loadFromStorage(IMG_KEY)
    return preMemes
}

function setLineLocation(lineIdx, offsetX, offsetY) {
    gMeme.selectedLineIdx = lineIdx
    gMeme.lines[lineIdx].locX = offsetX
    gMeme.lines[lineIdx].locY = offsetY
}

function setStickerLocation(index, offsetX, offsetY) {
    gMeme.stickers[index].locX = offsetX
    gMeme.stickers[index].locY = offsetY
}

function createSticker(img) {
    var currSticker = {
        name: img,
        locX: getRandomIntInclusive(50, 550),
        locY: getRandomIntInclusive(50, 350),
        height: 100,
        width: 100,
        deg: 45
    }
    gMeme.stickers.push(currSticker)
}

function getStikers() {
    return gMeme.stickers
}

function setStickerSise(diff) {
    if (!gMeme.stickers) return
    var lastSticker = gMeme.stickers[gMeme.stickers.length - 1]
    lastSticker.height += diff
    lastSticker.width += diff
}

function deleteSticker() {
    gMeme.stickers.splice(-1, 1)
}

//STORAGE
function loadFromStorage(key) {
    var json = localStorage.getItem(key);
    var value = JSON.parse(json);
    return value;
}

function saveToStorage(key, value) {
    var json = JSON.stringify(value);
    localStorage.setItem(key, json);
}







//UTIL
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
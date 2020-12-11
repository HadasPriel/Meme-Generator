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

function getKeywords() {
    return gKeywords
}

function addCommon(keyword) {
    gKeywords[keyword]++
}

// IMAGES:
var gImgId = 1;
var gImgs = [{
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['angry', 'important', 'speech'],
        ratio: 1
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['animals', 'cute', 'kiss'],
        ratio: 1.5
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['baby', 'animals', 'cute'],
        ratio: 1
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['sleep', 'animals', 'copmuter'],
        ratio: 1
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['success', 'baby', 'cute'],
        ratio: 1.56
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['speech', 'snob', 'important'],
        ratio: 1
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['surprise', 'cute', 'baby'],
        ratio: 1
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['happy', 'clown', 'listen'],
        ratio: 1
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['baby', 'laugh', 'happy'],
        ratio: 1.6
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['man', 'laugh', 'happy'],
        ratio: 1
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['boxing', 'kiss', 'man'],
        ratio: 1.33
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['surprise', 'man', 'inportant'],
        ratio: 1
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['drink', 'man', 'happy'],
        ratio: 1.5
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['serious', 'man', 'sun glass', 'matrix'],
        ratio: 1
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['speech', 'man', 'game of thrones'],
        ratio: 1.69
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['laugh', 'funny', 'man'],
        ratio: 1
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['speech', 'man', 'putin'],
        ratio: 1
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['encourage', 'scared', 'toy story'],
        ratio: 1
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['woman', 'success', 'happy'],
        ratio: 1
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['dog', 'animals', 'cute'],
        ratio: 1.5
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['woman', 'happy', 'dance'],
        ratio: 1.37
    },
]


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


// MEME
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
            txt: 'EDIT TEXT',
            font: 'Impact',
            size: 30,
            align: 'center',
            color: 'white',
            locX: 225,
            locY: 70
        },
        {
            txt: 'EDIT TEXT',
            font: 'Impact',
            size: 50,
            align: 'center',
            color: 'white',
            locX: 225,
            locY: 400,
        }
    ],
    stickers: []
}

//SAVED MEMES
var gPreviousMeme = loadFromStorage(IMG_KEY);

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
    return `img/${currImg[0].url}`
}

function setLineTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
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

function setDiraction(diraction) {
    gMeme.lines[gMeme.selectedLineIdx].align = diraction
}

function setLocY(diff) {
    gMeme.lines[gMeme.selectedLineIdx].locY += diff
}

function setLocX(locX) {
    gMeme.lines[gMeme.selectedLineIdx].locX = locX
}

function deleteLine() {
    if (!gMeme.lines) return
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
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

function setSelectedLineIdx() {
    gMeme.selectedLineIdx++;
    if (gMeme.selectedLineIdx > gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
        // return gMeme.selectedLineIdx
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
        locX: 0,
        locY: 0,
        height: 100,
        width: 100
    }
    gMeme.stickers.push(currSticker)
}

function getStikers() {
    return gMeme.stickers
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
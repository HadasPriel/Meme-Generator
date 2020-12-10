'use strict'

const IMG_KEY = 'imgKey'

// IMAGES:
var gImgId = 1;
var gImgs = [{
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['angry', 'important', 'speech']
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['animals', 'cute', 'kiss']
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['baby', 'animals', 'cute']
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['sleep', 'animals', 'copmuter']
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['success', 'baby', 'cute']
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['speech', 'snob', 'important']
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['surprise', 'cute', 'baby']
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['happy', 'clown', 'listen']
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['baby', 'laugh', 'happy']
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['man', 'laugh', 'happy']
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['boxing', 'kiss', 'man']
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['surprise', 'man', 'inportant']
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['drink', 'man', 'happy']
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['serious', 'man', 'sun glass', 'matrix']
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['speech', 'man', 'game of thrones']
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['laugh', 'funny', 'man']
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['speech', 'man', 'putin']
    },
    {
        id: gImgId,
        url: `${gImgId++}.jpg`,
        keywords: ['encourage', 'scared', 'toy story']
    },
]

// function imgsForDisplay() {
//     return gImgs
// }

function imgsForDisplay(typing) {
    if (!typing) return gImgs
    var fitImgs = []
    var imgs = gImgs
    imgs.forEach(function(img) {
        img.keywords.forEach(function(keyword) {
            if (keyword.slice(0, typing.length) === typing &&
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
            txt: 'meme txt 1',
            font: 'Impact',
            size: 30,
            align: 'center',
            color: 'white',
            locX: 225,
            locY: 70
        },
        {
            txt: 'meme txt 2',
            font: 'Impact',
            size: 50,
            align: 'center',
            color: 'white',
            locX: 225,
            locY: 400,
        }
    ]
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
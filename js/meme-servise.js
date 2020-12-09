'use strict'

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

function imgsForDisplay() {
    return gImgs
}
console.log(gImgs);


// MEME
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        txt: 'meme txt',
        size: 20,
        align: 'center',
        color: 'black'

    }]
}

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
    console.log('currImg', currImg);
    console.log('getImg', currImg[0].url);
    return `../img/${currImg[0].url}`
}

function setLineTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function setSelectedImgId(imgId) {
    console.log('imgId', imgId);
    gMeme.selectedImgId = +imgId
    console.log('gMeme', gMeme);
}
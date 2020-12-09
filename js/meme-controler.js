'use strict'

function onInit() {
    renderImgs()
}


function renderImgs() {
    let strHtml = '';
    let imgs = imgsForDisplay()

    imgs.forEach(function(img) {
        strHtml += `<img class="image" src = "img/${img.url}" />`;
    })

    const elImgContainer = document.querySelector('.img-container');
    elImgContainer.innerHTML = strHtml;
}
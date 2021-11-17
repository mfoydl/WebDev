window.onload = function() {
    let images = document.querySelectorAll("img");
    let randomRow = document.querySelector(".randomColor");

    for(let img of images){
        img.addEventListener('click',imageClick);
    }
    randomRow.style.background = generateRandomColor();
    randomRow.addEventListener('click',applyRandomColor);
}

function imageClick(event){
    target = event.target;
    target.classList.remove('spinner');
    void target.offsetWidth;
    target.classList.add('spinner');
}

function applyRandomColor(event){
    target = event.target;

    target.style.background = generateRandomColor();
}

function generateRandomColor(){
    let letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
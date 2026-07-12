// إظهار العناصر أثناء النزول

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll(".service-card,.gallery-grid img,.contact,.home")
.forEach(el=>observer.observe(el));


// تكبير صور معرض الأعمال

document.querySelectorAll(".gallery-grid img").forEach(img=>{

img.addEventListener("click",()=>{

const overlay=document.createElement("div");

overlay.style.position="fixed";
overlay.style.top="0";
overlay.style.left="0";
overlay.style.width="100%";
overlay.style.height="100%";
overlay.style.background="rgba(0,0,0,.9)";
overlay.style.display="flex";
overlay.style.justifyContent="center";
overlay.style.alignItems="center";
overlay.style.zIndex="9999";
overlay.style.cursor="pointer";

const image=document.createElement("img");

image.src=img.src;

image.style.maxWidth="90%";
image.style.maxHeight="90%";
image.style.borderRadius="15px";
image.style.boxShadow="0 0 40px rgba(255,255,255,.25)";

overlay.appendChild(image);

overlay.onclick=()=>overlay.remove();

document.body.appendChild(overlay);

});

});


// تأثير نزول ناعم

window.addEventListener("load",()=>{

document.body.style.opacity="1";

});
/* ===========================
   Bathroom Slider
=========================== */

const bathroomImages = [
    "bathroom1.png",
    "bathroom2.png",
    "bathroom3.png",
    "bathroom4.png",
    "bathroom5.png",
    "bathroom6.png"
];
/* تحميل صور الحمامات مسبقًا */

bathroomImages.forEach(function(image){

const img = new Image();

img.src = image;

});
let bathroomIndex = 0;

const bathroomSlider = document.getElementById("bathroom-slider");

function changeBathroom(step){

    bathroomIndex += step;

    if(bathroomIndex < 0){
        bathroomIndex = bathroomImages.length - 1;
    }

    if(bathroomIndex >= bathroomImages.length){
        bathroomIndex = 0;
    }

    bathroomSlider.src = bathroomImages[bathroomIndex];

}

/* فتح الصورة بالحجم الكامل */

bathroomSlider.addEventListener("click", function(){

    const overlay = document.createElement("div");

    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0,0,0,.85)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "99999";
    overlay.style.cursor = "pointer";

    const img = document.createElement("img");

    img.src = bathroomImages[bathroomIndex];
    img.style.maxWidth = "92%";
    img.style.maxHeight = "92%";
    img.style.borderRadius = "18px";

    img.style.border = "4px solid #4FC3F7";

img.style.boxShadow =
    "0 0 15px #4FC3F7," +
    "0 0 35px #4FC3F7," +
    "0 0 60px rgba(79,195,247,.75)";
    overlay.appendChild(img);

    overlay.onclick = function(){
        overlay.remove();
    };

    document.body.appendChild(overlay);

});
/* ===========================
   Video Slider
=========================== */

const videos = [
"video1.mp4",
"video2.mp4",
"video3.mp4",
"video4.mp4",
"video5.mp4"
];

let currentVideo = 0;

function changeVideo(direction){

currentVideo += direction;

if(currentVideo < 0){
currentVideo = videos.length - 1;
}

if(currentVideo >= videos.length){
currentVideo = 0;
}

const player = document.getElementById("video-slider");

player.pause();

player.src = videos[currentVideo];

player.load();

}
/* ===========================
   Pool Slider
=========================== */

const poolImages = [

"pool1.jpg",
"pool2.jpg",
"pool3.jpg",
"pool4.jpg",
"pool5.jpg",
"pool6.jpg",
"pool7.jpg"

];

let poolIndex = 0;

const poolSlider = document.getElementById("pool-slider");

if(poolSlider){

setInterval(function(){

poolIndex++;

if(poolIndex >= poolImages.length){

poolIndex = 0;

}

poolSlider.style.opacity = "0";

setTimeout(function(){

poolSlider.src = poolImages[poolIndex];

poolSlider.style.opacity = "1";

},300);

},3000);

}
/* ===========================
   Pool Gallery
=========================== */

poolSlider.addEventListener("click", function(){

let current = poolIndex;

const overlay = document.createElement("div");

overlay.style.position = "fixed";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.background = "rgba(0,0,0,.95)";
overlay.style.display = "flex";
overlay.style.justifyContent = "center";
overlay.style.alignItems = "center";
overlay.style.zIndex = "999999";

const img = document.createElement("img");

img.src = poolImages[current];

img.style.maxWidth = "95%";
img.style.maxHeight = "95%";
img.style.borderRadius = "15px";

overlay.appendChild(img);

let startX = 0;

overlay.addEventListener("touchstart", function(e){

startX = e.touches[0].clientX;

});

overlay.addEventListener("touchend", function(e){

const endX = e.changedTouches[0].clientX;

if(startX - endX > 50){

current++;

if(current >= poolImages.length) current = 0;

img.src = poolImages[current];

}

if(endX - startX > 50){

current--;

if(current < 0) current = poolImages.length - 1;

img.src = poolImages[current];

}

});

overlay.addEventListener("click", function(e){

if(e.target === overlay){

overlay.remove();

}

});

document.body.appendChild(overlay);

});

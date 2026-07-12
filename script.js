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

    img.style.boxShadow =
        "0 0 18px #4FC3F7," +
        "0 0 40px rgba(79,195,247,.55)";

    overlay.appendChild(img);

    overlay.onclick = function(){
        overlay.remove();
    };

    document.body.appendChild(overlay);

});

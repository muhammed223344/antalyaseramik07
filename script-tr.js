// =========================================================
// Öğeleri Kaydırırken Görünür Yapma (Intersection Observer)
// =========================================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll(".service-card, .gallery-grid img, .contact, .home")
    .forEach(el => observer.observe(el));


// =========================================================
// Galeri Fotoğraflarını Büyütme (Lightbox Efekti)
// =========================================================
document.querySelectorAll(".gallery-grid img").forEach(img => {
    img.addEventListener("click", () => {
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0,0,0,.9)";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
        overlay.style.zIndex = "9999";
        overlay.style.cursor = "pointer";

        const image = document.createElement("img");
        image.src = img.src;
        image.style.maxWidth = "90%";
        image.style.maxHeight = "90%";
        image.style.borderRadius = "15px";
        image.style.boxShadow = "0 0 40px rgba(255,255,255,.25)";

        overlay.appendChild(image);
        overlay.onclick = () => overlay.remove();
        document.body.appendChild(overlay);
    });
});


// =========================================================
// Yumuşak Sayfa Yüklenme Efekti
// =========================================================
window.addEventListener("load", () => {
    document.body.style.opacity = "1";
});


// =========================================================
// Banyo Slaytı (Bathroom Slider)
// =========================================================
const bathroomImages = [
    "bathroom1.png",
    "bathroom2.png",
    "bathroom3.png",
    "bathroom4.png",
    "bathroom5.png",
    "bathroom6.png"
];

/* Banyo resimlerini önceden yükleme (Preload) */
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

/* Resmi tam ekran boyutunda açma */
if (bathroomSlider) {
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
        img.style.boxShadow = "0 0 15px #4FC3F7, 0 0 35px #4FC3F7, 0 0 60px rgba(79,195,247,.75)";

        overlay.appendChild(img);
        overlay.onclick = function(){
            overlay.remove();
        };
        document.body.appendChild(overlay);
    });
}


/* ===========================
   SMART VIDEO SLIDER
=========================== */

const videos = [
    "video1.mp4",
    "video2.mp4",
    "video3.mp4",
    "video4.mp4",
    "video5.mp4"
];

let currentVideo = 0;

const player = document.getElementById("video-slider");

/* تحميل مسبق فقط */

function preloadVideo(index){

    if(index < 0 || index >= videos.length) return;

    const link = document.createElement("link");

    link.rel = "preload";

    link.as = "video";

    link.href = videos[index];

    document.head.appendChild(link);

}

/* تحميل الحالي والسابق والتالي */

function preloadAround(index){

    preloadVideo(index);

    preloadVideo(index + 1);

    preloadVideo(index - 1);

}

/* تشغيل الفيديو */

function playVideo(index){

    currentVideo = index;

    player.pause();

    player.src = videos[index];

    player.load();

    player.onloadeddata = function(){

        player.play();

    };

    preloadAround(index);

}

/* عند فتح الموقع لا تشغل الفيديو */

player.src = videos[currentVideo];

player.preload = "metadata";

preloadAround(currentVideo);

/* التالي والسابق */

function changeVideo(direction){

    currentVideo += direction;

    if(currentVideo < 0){

        currentVideo = videos.length - 1;

    }

    if(currentVideo >= videos.length){

        currentVideo = 0;

    }

    playVideo(currentVideo);

}

/* تشغيل عند ضغط المستخدم */

player.addEventListener("click",function(){

    if(player.paused){

        playVideo(currentVideo);

    }

});
// =========================================================
// Havuz Slaytı (Pool Slider)
// =========================================================
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
        }, 300);
    }, 3000);
}


/* ===========================
   Pool Gallery
=========================== */

poolSlider.addEventListener("click", function () {

    let current = poolIndex;
    const savedScroll = window.scrollY;

    const overlay = document.createElement("div");
    overlay.className = "pool-overlay";

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
    document.body.appendChild(overlay);

    /* منع تحريك الصفحة */
    document.body.style.overflow = "hidden";

    /* إضافة حالة واحدة فقط */
    history.pushState({gallery:true}, "");

    function closeGallery(){

        overlay.remove();

        document.body.style.overflow = "";

        window.removeEventListener("popstate", onBack);

        setTimeout(function(){

            window.scrollTo(0, savedScroll);

        },0);

    }

    function onBack(){

        closeGallery();

    }

    window.addEventListener("popstate", onBack);

    /* السحب */

    let startX = 0;

    overlay.addEventListener("touchstart", function(e){

        startX = e.touches[0].clientX;

    });

    overlay.addEventListener("touchend", function(e){

        const endX = e.changedTouches[0].clientX;

        if(startX - endX > 50){

            current++;

            if(current >= poolImages.length){
                current = 0;
            }

            img.src = poolImages[current];

        }

        if(endX - startX > 50){

            current--;

            if(current < 0){
                current = poolImages.length - 1;
            }

            img.src = poolImages[current];

        }

    });

    /* الضغط خارج الصورة */

    overlay.addEventListener("click", function(e){

        if(e.target === overlay){

            history.back();

        }

    });

});


// =========================================================
// Dil Değiştirme Fonksiyonu (Google Translate)
// =========================================================
function changeLanguage(lang){
    const interval = setInterval(function(){
        const select = document.querySelector(".goog-te-combo");
        if(select){
            select.value = lang;
            select.dispatchEvent(new Event("change"));
            clearInterval(interval);
        }
    }, 500);
}


// =========================================================
// Canlı Saat ve Tarih Dönüştürücü (Live Clock & Date)
// =========================================================
function updateClock(){
    const now = new Date();

    const h = String(now.getHours()).padStart(2,"0");
    const m = String(now.getMinutes()).padStart(2,"0");
    const s = String(now.getSeconds()).padStart(2,"0");

    const d = String(now.getDate()).padStart(2,"0");
    const mo = String(now.getMonth()+1).padStart(2,"0");
    const y = now.getFullYear();

    const clockEl = document.getElementById("live-clock");
    const dateEl = document.getElementById("live-date");

    if (clockEl) clockEl.textContent = h + ":" + m + ":" + s;
    if (dateEl) dateEl.textContent = d + "•" + mo + "•" + y;
}

updateClock();
setInterval(updateClock, 1000);
/* ===========================
   SIDE MENU
=========================== */

const menuToggle = document.getElementById("menuToggle");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");
const closeMenu = document.getElementById("closeMenu");

function openSideMenu(){

    sideMenu.classList.add("active");
    menuOverlay.classList.add("active");

    history.pushState({menu:true},"");

}

function closeSideMenu(){

    sideMenu.classList.remove("active");
    menuOverlay.classList.remove("active");

}

if(menuToggle){

    menuToggle.addEventListener("click",function(){

        openSideMenu();

    });

}

if(closeMenu){

    closeMenu.addEventListener("click",function(){

        history.back();

    });

}

if(menuOverlay){

    menuOverlay.addEventListener("click",function(){

        history.back();

    });

}

/* زر الرجوع في الهاتف */

window.addEventListener("popstate",function(){

    if(sideMenu.classList.contains("active")){

        closeSideMenu();

    }

});

/* إغلاق القائمة عند الضغط على أي رابط */

document.querySelectorAll(".side-links a").forEach(function(link){

    link.addEventListener("click",function(){

        closeSideMenu();

    });

});

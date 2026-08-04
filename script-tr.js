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
    "antalya-fayans-ustasi-banyo-seramik.webp",
    "antalya-banyo-fayans-doseme.webp",
    "antalya-seramik-doseme-hizmeti.webp",
    "antalya-porselen-fayans-doseme.webp",
    "antalya-banyo-zemin-seramik.webp",
    "antalya-banyo-tadilati-fayans.webp"
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
    "video1.webp.mp4",
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

    preloadVideo(index + 1);

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
    "antalya-havuz-seramik-doseme-ustasi.webp",
    "antalya-havuz-seramik-yenileme.webp",
    "antalya-havuz-seramik-tasarimi.webp",
    "antalya-havuz-fayans-doseme.webp",
    "antalya-havuz-seramik-kaplama.webp",
    "antalya-havuz-seramik-mozaik.webp",
    "antalya-profesyonel-havuz-seramik.webp",
    "antalya-havuz-seramik-uygulamasi.webp",
    "antalya-yuzme-havuzu-seramik.webp",
    "antalya-havuz-fayans-kaplama.webp",
    "antalya-luks-havuz-seramik.webp"
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
/* ===========================
   POPUP
=========================== */

const popupOverlay = document.getElementById("popupOverlay");
const popupTitle = document.getElementById("popupTitle");
const popupContent = document.getElementById("popupContent");
const popupClose = document.getElementById("popupClose");

const privacyBtn = document.getElementById("privacyBtn");
const termsBtn = document.getElementById("termsBtn");

function openPopup(title, html){

    popupTitle.innerHTML = title;
    popupContent.innerHTML = html;

    popupOverlay.classList.add("active");

    history.pushState({popup:true},"");

}

function closePopup(){

    popupOverlay.classList.remove("active");

}

/* Gizlilik Politikası */

privacyBtn.addEventListener("click",function(e){

    e.preventDefault();

    openPopup(

        "Gizlilik Politikası",

        `
        <p>
        <strong>Antalya Seramik</strong> olarak tüm ziyaretçilerimizin ve müşterilerimizin gizliliğine önem veriyoruz.
        </p>

        <p>
        • Kişisel bilgileriniz yalnızca bizimle kendi isteğinizle iletişime geçtiğinizde alınır.
        </p>

        <p>
        • Toplanan bilgiler yalnızca taleplerinizi yanıtlamak ve hizmet sunmak amacıyla kullanılır.
        </p>

        <p>
        • Hiçbir kişisel bilgi üçüncü kişilerle paylaşılmaz veya satılmaz.
        </p>

        <p>
        • Web sitemiz gerektiğinde kullanıcı deneyimini geliştirmek amacıyla çerezler (Cookies) kullanabilir.
        </p>

        <p>
        • Dilediğiniz zaman bizimle iletişime geçerek paylaştığınız bilgilerin silinmesini talep edebilirsiniz.
        </p>

        <p>
        Bu web sitesini kullanarak yukarıdaki Gizlilik Politikasını kabul etmiş olursunuz.
        </p>
        `

    );

});

/* Kullanım Şartları */

termsBtn.addEventListener("click",function(e){

    e.preventDefault();

    openPopup(

        "Kullanım Şartları",

        `
        <p>
        Antalya Seramik web sitesine hoş geldiniz.
        </p>

        <p>
        • Bu sitede yer alan tüm fotoğraf, video ve içerikler Antalya Seramik'e aittir veya izin alınarak paylaşılmıştır.
        </p>

        <p>
        • İçeriklerin izinsiz kopyalanması, çoğaltılması veya yeniden yayımlanması yasaktır.
        </p>

        <p>
        • Sitede yer alan fiyatlar ve bilgiler tanıtım amaçlıdır ve yapılacak işe göre değişebilir.
        </p>

        <p>
        • Telefon, WhatsApp veya web sitesi üzerinden yapılan görüşmeler taraflar arasında kesin bir sözleşme anlamına gelmez.
        </p>

        <p>
        • Antalya Seramik gerekli gördüğü durumlarda bu kullanım şartlarını güncelleme hakkını saklı tutar.
        </p>

        <p>
        Bu web sitesini kullanarak yukarıdaki kullanım şartlarını kabul etmiş olursunuz.
        </p>
        `

    );

});
/* Seramik Hesaplayıcı */

calculatorBtn.addEventListener("click", function(e){

    e.preventDefault();

    openPopup(

        "Seramik Hesaplayıcı",

        `
        <h3>Duvar Hesabı</h3>

        <input type="number" id="wallLength" placeholder="Uzunluk (metre)">
        <br><br>

        <input type="number" id="wallHeight" placeholder="Yükseklik (metre)">
        <br><br>

        <label>Fayans Ölçüsü (İsteğe Bağlı)</label>
        <br>

        <select id="tileSize">
            <option value="">Seçilmedi</option>
            <option value="30x60">30 × 60 cm</option>
            <option value="60x60">60 × 60 cm</option>
            <option value="60x120">60 × 120 cm</option>
            <option value="80x80">80 × 80 cm</option>
            <option value="120x120">120 × 120 cm</option>
        </select>

        <br><br>

        <label>
            <input type="checkbox" id="waste10">
            %10 Fire Ekle
        </label>

        <br><br>

        <button id="calcWallBtn">Hesapla</button>

        <hr>

        <h3>Zemin Hesabı</h3>

        <input type="number" id="floorLength" placeholder="Uzunluk (metre)">
        <br><br>

        <input type="number" id="floorWidth" placeholder="Genişlik (metre)">
        <br><br>

        <label>Fayans Ölçüsü (İsteğe Bağlı)</label>
        <br>

        <select id="floorTileSize">
            <option value="">Seçilmedi</option>
            <option value="30x60">30 × 60 cm</option>
            <option value="60x60">60 × 60 cm</option>
            <option value="60x120">60 × 120 cm</option>
            <option value="80x80">80 × 80 cm</option>
            <option value="120x120">120 × 120 cm</option>
        </select>

        <br><br>

        <label>
            <input type="checkbox" id="floorWaste10">
            %10 Fire Ekle
        </label>

        <br><br>

        <button id="calcFloorBtn">Hesapla</button>

        <hr>

        <div id="calcResult"></div>
        `

    );

    setTimeout(function(){

        function tileArea(size){

            switch(size){
                case "30x60": return 0.18;
                case "60x60": return 0.36;
                case "60x120": return 0.72;
                case "80x80": return 0.64;
                case "120x120": return 1.44;
                default: return 0;
            }

        }

        function showResult(area, tileId, wasteId){

            let html = `
                <h3>Sonuç</h3>
                <p><b>Alan:</b> ${area.toFixed(2)} m²</p>
            `;

            const tile = document.getElementById(tileId);
            const waste = document.getElementById(wasteId);

            if(tile && tile.value !== ""){

                const oneTile = tileArea(tile.value);

                if(oneTile > 0){

                    const tiles = Math.ceil(area / oneTile);

                    html += `<p><b>Gerekli Fayans:</b> ${tiles}</p>`;

                    if(waste.checked){

                        html += `<p><b>Fire Dahil:</b> ${Math.ceil(tiles*1.10)}</p>`;

                    }

                }

            }

            document.getElementById("calcResult").innerHTML = html;

        }

        document.getElementById("calcWallBtn").addEventListener("click",function(){

            const length = parseFloat(document.getElementById("wallLength").value);
            const height = parseFloat(document.getElementById("wallHeight").value);

            if(isNaN(length)||isNaN(height)){

                document.getElementById("calcResult").innerHTML="<p style='color:red'>Lütfen uzunluk ve yükseklik giriniz.</p>";
                return;

            }

            showResult(length*height,"tileSize","waste10");

        });

        document.getElementById("calcFloorBtn").addEventListener("click",function(){

            const length = parseFloat(document.getElementById("floorLength").value);
            const width = parseFloat(document.getElementById("floorWidth").value);

            if(isNaN(length)||isNaN(width)){

                document.getElementById("calcResult").innerHTML="<p style='color:red'>Lütfen uzunluk ve genişlik giriniz.</p>";
                return;

            }

            showResult(length*width,"floorTileSize","floorWaste10");

        });

    },100);

});
/* Kapat */

popupClose.addEventListener("click",function(){

    history.back();

});

/* Dışarı tıklayınca kapat */

popupOverlay.addEventListener("click",function(e){

    if(e.target === popupOverlay){

        history.back();

    }

});

/* Telefon geri tuşu */

window.addEventListener("popstate",function(){

    if(popupOverlay.classList.contains("active")){

        closePopup();

    }

});
/* ===========================
   LANGUAGE DETECTION
=========================== */

// حفظ اختيار اللغة
function setLanguage(lang){
    localStorage.setItem("siteLanguage", lang);
}

(function(){

    const savedLang = localStorage.getItem("siteLanguage");
    const currentPage = window.location.pathname;

    // إذا المستخدم اختار لغة مسبقاً
    if(savedLang){

        if(savedLang === "tr" && !currentPage.includes("index-tr.html")){
            window.location.href = "index-tr.html";
            return;
        }

        if(savedLang === "ar" && currentPage.includes("index-tr.html")){
            window.location.href = "index.html";
            return;
        }

    }else{

        // أول زيارة حسب لغة الجهاز
        const browserLang = (navigator.language || navigator.userLanguage).toLowerCase();

        if(browserLang.startsWith("tr") && !currentPage.includes("index-tr.html")){
            window.location.href = "index-tr.html";
        }

    }

})();
// ===========================
// Typing Effect
// ===========================

const typingTitle = document.getElementById("typingTitle");
const cursor = document.querySelector(".cursor");

if (typingTitle) {

    const text = "ANTALYA FAYANS USTASI";

    let index = 0;
    let deleting = false;

    function typeEffect() {

        if (!deleting) {

            typingTitle.textContent = text.substring(0, index);
            index++;

            if (index > text.length) {
                deleting = true;
                setTimeout(typeEffect, 15000);
                return;
            }

            setTimeout(typeEffect, 170);

        } else {

            typingTitle.textContent = text.substring(0, index);
            index--;

            if (index < 0) {
                deleting = false;
                setTimeout(typeEffect, 1000);
                return;
            }

            setTimeout(typeEffect, 90);

        }

    }

    typeEffect();

}
/* =========================================
   STORIES DATA
========================================= */

const stories = [

{
    avatar:"Muratpaşa Fayans Ustası.webp",
    image:"Muratpaşa Fayans Ustası.webp",
    city:"Muratpaşa",
    desc:"Muratpaşa bölgesinde profesyonel fayans ve porselen döşeme."
},

{
    avatar:"Muratpaşa Seramik Ustası.webp",
    image:"Muratpaşa Seramik Ustası.webp",
    city:"Muratpaşa",
    desc:"Seramik uygulamalarında kaliteli ve titiz işçilik."
},

{
    avatar:"Altıntaş Fayans Ustası.webp",
    image:"Altıntaş Fayans Ustası.webp",
    city:"Altıntaş",
    desc:"Altıntaş bölgesinde tamamlanan projelerimizden biri."
},

{
    avatar:"Altıntaş Seramik Ustası.webp",
    image:"Altıntaş Seramik Ustası.webp",
    city:"Altıntaş",
    desc:"Profesyonel seramik ve porselen uygulamaları."
},

{
    avatar:"Varsak Fayans Ustası.webp",
    image:"Varsak Fayans Ustası.webp",
    city:"Varsak",
    desc:"Varsak bölgesinde yeni tamamlanan çalışmamız."
},

{
    avatar:"Varsak Seramik Ustası.webp",
    image:"Varsak Seramik Ustası.webp",
    city:"Varsak",
    desc:"Varsak bölgesinde profesyonel seramik uygulamaları."
},

{
    avatar:"Kepez Fayans Ustası.webp",
    image:"Kepez Fayans Ustası.webp",
    city:"Kepez",
    desc:"Kepez bölgesinde profesyonel fayans döşeme hizmeti."
},

{
    avatar:"Kepez Seramik Ustası.webp",
    image:"Kepez Seramik Ustası.webp",
    city:"Kepez",
    desc:"Kepez bölgesinde kaliteli seramik uygulamaları."
}

];

/* =========================================
   CREATE STORIES
========================================= */

const storiesContainer = document.getElementById("storiesContainer");

if (storiesContainer) {

    storiesContainer.innerHTML = "";

    stories.forEach((story, index) => {

        const item = document.createElement("div");

        item.className = "story-item";
        item.dataset.index = index;

        item.innerHTML = `
            <div class="story-ring">
                <img src="${story.avatar}" alt="${story.city}">
            </div>

            <div class="story-title">${story.city}</div>
        `;

        storiesContainer.appendChild(item);

    });

}

/* =========================================
   STORY VIEWER
========================================= */

const viewer = document.createElement("div");

viewer.className = "story-viewer";

viewer.innerHTML = `
<div class="story-card">

    <div class="story-progress">
        <span id="storyProgress"></span>
    </div>

    <button class="story-close">✕</button>

    <div class="story-top-avatar">
        <img id="storyAvatar" src="">
    </div>

    <img id="storyImage"
         class="story-main-image"
         src="">

    <div class="story-info">

        <div id="storyCity"
             class="story-city"></div>

        <div id="storyDesc"
             class="story-desc"></div>

    </div>

</div>
`;

document.body.appendChild(viewer);

const storyAvatar = document.getElementById("storyAvatar");
const storyImage = document.getElementById("storyImage");
const storyCity = document.getElementById("storyCity");
const storyDesc = document.getElementById("storyDesc");
const storyProgress = document.getElementById("storyProgress");

let storyTimer = null;

function closeStory(){

    viewer.classList.remove("active");

    clearTimeout(storyTimer);

    storyProgress.style.transition = "none";
    storyProgress.style.width = "0%";

    document.body.style.overflow = "";

}

function openStory(index){

    const data = stories[index];

    storyAvatar.src = data.avatar;
    storyImage.src = data.image;
    storyCity.textContent = data.city;
    storyDesc.textContent = data.desc;

    viewer.classList.add("active");

    document.body.style.overflow = "hidden";

    history.pushState({story:true},"");

    storyProgress.style.transition = "none";
    storyProgress.style.width = "0%";

    setTimeout(function(){

        storyProgress.style.transition = "width 7s linear";
        storyProgress.style.width = "100%";

    },50);

    storyTimer = setTimeout(function(){

        history.back();

    },7000);

}

document.querySelectorAll(".story-item").forEach(function(item){

    item.addEventListener("click",function(){

        openStory(Number(item.dataset.index));

    });

});

viewer.querySelector(".story-close").onclick = function(){

    history.back();

};

viewer.onclick = function(e){

    if(e.target === viewer){

        history.back();

    }

};

window.addEventListener("popstate",function(){

    if(viewer.classList.contains("active")){

        closeStory();

    }

});

/* =========================================
   STORY IMAGE ZOOM
========================================= */

const imageViewer = document.createElement("div");

imageViewer.className = "image-viewer";

imageViewer.innerHTML = `
<button class="image-close">✕</button>
<img id="zoomImage">
`;

document.body.appendChild(imageViewer);

const zoomImage = document.getElementById("zoomImage");
const imageClose = imageViewer.querySelector(".image-close");

storyImage.addEventListener("click",function(){

    zoomImage.src = storyImage.src;

    imageViewer.classList.add("active");

    history.pushState({zoom:true},"");

});

imageClose.onclick=function(){

    history.back();

};

imageViewer.onclick=function(e){

    if(e.target===imageViewer){

        history.back();

    }

};

window.addEventListener("popstate",function(){

    imageViewer.classList.remove("active");

});

/* =========================================
   STORIES DRAG ONLY
========================================= */

if (storiesContainer) {

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    storiesContainer.addEventListener("mousedown", function(e){
        isDown = true;
        startX = e.pageX;
        scrollLeft = storiesContainer.scrollLeft;
        storiesContainer.style.cursor = "grabbing";
    });

    document.addEventListener("mouseup", function(){
        isDown = false;
        storiesContainer.style.cursor = "grab";
    });

    storiesContainer.addEventListener("mousemove", function(e){
        if(!isDown) return;

        e.preventDefault();

        const walk = (e.pageX - startX) * 1.5;

        storiesContainer.scrollLeft = scrollLeft - walk;
    });

    let touchStart = 0;
    let touchScroll = 0;

    storiesContainer.addEventListener("touchstart", function(e){
        touchStart = e.touches[0].pageX;
        touchScroll = storiesContainer.scrollLeft;
    }, { passive:true });

    storiesContainer.addEventListener("touchmove", function(e){

        const walk = (e.touches[0].pageX - touchStart) * 1.5;

        storiesContainer.scrollLeft = touchScroll - walk;

    }, { passive:true });

}

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

/* تحميل الصور مسبقاً */

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

/* ===========================
   Bathroom Gallery
=========================== */

bathroomSlider.addEventListener("click", function(){

    const overlay = document.createElement("div");

    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "#000";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "999999";
    overlay.style.cursor = "pointer";

    const img = document.createElement("img");

    img.src = bathroomImages[bathroomIndex];

    img.style.maxWidth = "95%";
    img.style.maxHeight = "100vh";
    img.style.objectFit = "contain";
    img.style.background = "#000";
    img.style.border = "none";
    img.style.borderRadius = "0";
    img.style.boxShadow = "none";

    overlay.appendChild(img);

    /* حفظ حالة الرجوع */
    history.pushState({bathroom:true},"");

    function closeBathroomOverlay(){

        if(document.body.contains(overlay)){
            overlay.remove();
        }

    }

    overlay.onclick = function(){

        history.back();

    };

    function bathroomBack(){

        closeBathroomOverlay();

        const card = document.getElementById("bathroom-slider");

        if(card){

            card.scrollIntoView({
                behavior:"smooth",
                block:"center"
            });

        }

        window.removeEventListener("popstate", bathroomBack);

    }

    window.addEventListener("popstate", bathroomBack);

    document.body.appendChild(overlay);

});
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
/* ===========================
   Google Translate
=========================== */

function changeLanguage(lang){

const interval = setInterval(function(){

const select = document.querySelector(".goog-te-combo");

if(select){

select.value = lang;
select.dispatchEvent(new Event("change"));

clearInterval(interval);

}

},500);

}
/* ===========================
   LIVE CLOCK
=========================== */

function updateClock(){

const now = new Date();

const h = String(now.getHours()).padStart(2,"0");
const m = String(now.getMinutes()).padStart(2,"0");
const s = String(now.getSeconds()).padStart(2,"0");

const d = String(now.getDate()).padStart(2,"0");
const mo = String(now.getMonth()+1).padStart(2,"0");
const y = now.getFullYear();

document.getElementById("live-clock").textContent =
h + ":" + m + ":" + s;

document.getElementById("live-date").textContent =
d + "•" + mo + "•" + y;

}

updateClock();

setInterval(updateClock,1000);
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
const calculatorBtn = document.getElementById("calculatorBtn");
function openPopup(title, html){

    popupTitle.innerHTML = title;
    popupContent.innerHTML = html;

    popupOverlay.classList.add("active");

    history.pushState({popup:true},"");

}

function closePopup(){

    popupOverlay.classList.remove("active");

}

/* سياسة الخصوصية */

privacyBtn.addEventListener("click",function(e){

    e.preventDefault();

    openPopup(

        "سياسة الخصوصية",

        `
        <p>
        نحن في <b>Antalya Seramik</b> نحترم خصوصية جميع زوار موقعنا.
        </p>

        <p>
        • لا نجمع أي معلومات شخصية إلا إذا قمت بالتواصل معنا بنفسك.
        </p>

        <p>
        • تستخدم معلومات التواصل فقط للرد على الاستفسارات وطلبات الخدمة.
        </p>

        <p>
        • لا نقوم ببيع أو مشاركة بيانات العملاء مع أي جهة خارجية.
        </p>

        <p>
        • قد يستخدم الموقع ملفات تعريف الارتباط (Cookies) لتحسين تجربة الاستخدام عند الحاجة.
        </p>

        <p>
        • يحق لك طلب حذف أي بيانات قمت بمشاركتها معنا في أي وقت.
        </p>
        `

    );

});

/* شروط الاستخدام */

termsBtn.addEventListener("click",function(e){

    e.preventDefault();

    openPopup(

        "شروط الاستخدام",

        `
        <p>
        باستخدامك لهذا الموقع فإنك توافق على الشروط التالية:
        </p>

        <p>
        • جميع الصور والفيديوهات المعروضة تخص أعمال Antalya Seramik أو تم نشرها بإذن أصحابها.
        </p>

        <p>
        • يمنع نسخ أو إعادة استخدام أي محتوى دون إذن.
        </p>

        <p>
        • الأسعار والمعلومات قابلة للتغيير حسب طبيعة المشروع.
        </p>

        <p>
        • التواصل معنا لا يعتبر عقداً نهائياً إلا بعد الاتفاق بين الطرفين.
        </p>
        `

    );

});
/* حاسبة السيراميك */

calculatorBtn.addEventListener("click", function(e){

    e.preventDefault();

    openPopup(

        "حاسبة السيراميك",

        `
        <h3>حساب الجدران</h3>

        <input type="number" id="wallLength" placeholder="الطول بالمتر">
        <br><br>

        <input type="number" id="wallHeight" placeholder="الارتفاع بالمتر">
        <br><br>

        <button id="calcWallBtn">احسب</button>

        <hr>

        <h3>حساب الأرضيات</h3>

        <input type="number" id="floorLength" placeholder="الطول بالمتر">
        <br><br>

        <input type="number" id="floorWidth" placeholder="العرض بالمتر">
        <br><br>

        <button id="calcFloorBtn">احسب</button>

        <hr>

        <div id="calcResult"></div>
        `

    );

    setTimeout(function(){

        function showResult(area){

            let html = `
                <h3>النتيجة</h3>
                <p><b>المساحة:</b> ${area.toFixed(2)} م²</p>
            `;

            /* هذا الجزء سيعمل لاحقاً بعد إضافة HTML */

            const tile = document.getElementById("tileSize");
            const waste = document.getElementById("waste10");

            if(tile && tile.value !== ""){

                let tileArea = 0;

                switch(tile.value){

                    case "30x60":
                        tileArea = 0.18;
                        break;

                    case "60x60":
                        tileArea = 0.36;
                        break;

                    case "60x120":
                        tileArea = 0.72;
                        break;

                    case "80x80":
                        tileArea = 0.64;
                        break;

                    case "120x120":
                        tileArea = 1.44;
                        break;

                }

                const tiles = Math.ceil(area / tileArea);

                html += `
                    <p><b>عدد البلاطات:</b> ${tiles}</p>
                `;

                if(waste && waste.checked){

                    html += `
                        <p><b>عدد البلاطات مع الهدر:</b>
                        ${Math.ceil(tiles*1.10)}
                        </p>
                    `;

                }

            }

            document.getElementById("calcResult").innerHTML = html;

        }

        /* الجدران */

        document.getElementById("calcWallBtn").addEventListener("click",function(){

            const length = parseFloat(document.getElementById("wallLength").value);
            const height = parseFloat(document.getElementById("wallHeight").value);

            if(isNaN(length) || isNaN(height)){

                document.getElementById("calcResult").innerHTML =
                "<p style='color:red;'>يرجى إدخال الطول والارتفاع.</p>";

                return;

            }

            showResult(length * height);

        });

        /* الأرضيات */

        document.getElementById("calcFloorBtn").addEventListener("click",function(){

            const length = parseFloat(document.getElementById("floorLength").value);
            const width = parseFloat(document.getElementById("floorWidth").value);

            if(isNaN(length) || isNaN(width)){

                document.getElementById("calcResult").innerHTML =
                "<p style='color:red;'>يرجى إدخال الطول والعرض.</p>";

                return;

            }

            showResult(length * width);

        });

    },100);

});
/* زر الإغلاق */

popupClose.addEventListener("click",function(){

    history.back();

});

/* الضغط خارج النافذة */

popupOverlay.addEventListener("click",function(e){

    if(e.target === popupOverlay){

        history.back();

    }

});

/* زر الرجوع */

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

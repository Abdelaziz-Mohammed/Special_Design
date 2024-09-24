// activating the clicked link
const links = document.querySelectorAll('ul.links>li>a');

links.forEach((link) => {
    link.addEventListener('click', () => {
        links.forEach((link) => link.classList.remove('active'));
        link.classList.add('active');
    });
});

// make home active again when scrolling to landing
window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop <= window.innerHeight) {
        links.forEach((link) => link.classList.remove('active'));
        links[0].classList.add('active');
    }
})

// nav-bullets for navigaing page sections
const bullets = document.querySelectorAll('.nav-bullets .bullet');
// scroll to section onClick
bullets.forEach(bullet => {
    bullet.addEventListener('click', () => {
        const sectionName = bullet.dataset.section.toLowerCase();
        window.scrollTo({ 
            top: sectionName === 'skills' ? 
                document.getElementById(`${sectionName}`).offsetTop + 25 :
                document.getElementById(`${sectionName}`).offsetTop,
            behavior: 'smooth'
        })
        bullets.forEach(bullet => {
            bullet.classList.remove('active');
        });
        bullet.classList.add('active');
    });
});

// changing active bullet onScroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const windowTop = window.scrollY;
        if (windowTop >= sectionTop && windowTop < sectionTop + sectionHeight) {
            bullets.forEach(bullet => {
                if (bullet.dataset.section.toLowerCase() === section.id) {
                    bullet.classList.add('active');
                }
                else {
                    bullet.classList.remove('active');
                }
            });
        }
    });
});

// changing landing background
const arrowLeft = document.getElementById('arrow-left');
const arrowRight = document.getElementById('arrow-right');
const landing = document.getElementById('landing');

let currentBackground = 0;

const backgroundImages = 
[
    'url(images/landing-0.jpg)', // default
    'url(images/landing-1.jpg)', 
    'url(images/landing-2.jpg)', 
    'url(images/landing-3.jpg)', 
    'url(images/landing-4.jpg)', 
    'url(images/landing-5.jpg)', 
    'url(images/landing-6.jpg)', 
];

arrowLeft.addEventListener('click', () => {
    if (currentBackground === 6) {
        currentBackground = 0;
    }
    else {
        currentBackground++;
    }
    landing.style.backgroundImage = backgroundImages[currentBackground];
});

arrowRight.addEventListener('click', () => {
    if (currentBackground === 0) {
        currentBackground = 6;
    }
    else {
        currentBackground--;
    }
    landing.style.backgroundImage = backgroundImages[currentBackground];
});

let changeBackground;

function controlBgChanging() {
    if (localStorage.controlBgBtn === 'play-btn' || localStorage.controlBgBtn === null) {
        changeBackground = setInterval(() => {
            // change background every 2 seconds
            arrowRight.click();
        }, 2000);
    }
    if (localStorage.controlBgBtn === 'pause-btn') {
        clearInterval(changeBackground);
    }
}

controlBgChanging();

// showing and hiding the settings-box
const gearIcon = document.getElementById('gear-icon');
const boxContent = document.querySelector('.settings-box .box-content')

gearIcon.addEventListener('click', () => {
    boxContent.classList.toggle('show');
    gearIcon.classList.toggle('move');
});

// Changing the main color and save it in local storage
const colorsList = document.querySelectorAll('.settings-box .box-content .colors-box ul li');

// get the main color value from css global variable if it is not in local storage
if (localStorage.getItem('mainColor') === null) {
    localStorage.mainColor = getComputedStyle(document.documentElement).getPropertyValue('--main-color');
}

document.documentElement.style.setProperty('--main-color', localStorage.mainColor);

// restore checked element index from local storage or make it '0' as default
if (localStorage.getItem('checkedElement') === null) {
    localStorage.checkedElement = '0';
}
else {
    for (let i = 0; i < colorsList.length; i++) {
        if (i === parseInt(localStorage.checkedElement)) {
            colorsList[i].classList.add('checked');
        }
        else {
            colorsList[i].classList.remove('checked');
        }
    }
}

colorsList.forEach((colorItem, idx) => {
    colorItem.addEventListener('click', () => {
        // remove 'checked' from all items
        colorsList.forEach((ele) => ele.classList.remove('checked'));
        // add 'checked' to the clicked item
        colorItem.classList.add('checked');
        // add checkedElement index to local storage
        localStorage.checkedElement = idx;
        // add color to local storage
        localStorage.mainColor = colorItem.dataset.color;
        // change css main color to the color in local storage
        document.documentElement.style.setProperty('--main-color', localStorage.mainColor);
    });
});

// controling 'background-changing' and save settings in local storage
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');

function playActions() {
    playBtn.classList.add('active');
    pauseBtn.classList.remove('active');
    controlBgChanging();
}

function pauseActions() {
    pauseBtn.classList.add('active');
    playBtn.classList.remove('active');
    controlBgChanging();
}

// if the control option does not exist in local storage
if (localStorage.controlBgBtn === null) {
    localStorage.controlBgBtn = playBtn.id;
    playActions();
}
else { // if the control option exists in local storage
    if (localStorage.controlBgBtn === 'play-btn') {
        playActions();
    }
    else {
        pauseActions();
    }
}

playBtn.addEventListener('click', () => {
    localStorage.controlBgBtn = playBtn.id;
    playActions();
});

pauseBtn.addEventListener('click', () => {
    localStorage.controlBgBtn = pauseBtn.id;
    pauseActions();
});

// controling 'bullets-visibility' and save settings in local storage
const showBulletsBtn = document.getElementById('show-btn');
const hideBulletsBtn = document.getElementById('hide-btn');
const navBullets = document.querySelector('.nav-bullets');

if (localStorage.controlBulletsVisibility === null) {
    localStorage.controlBulletsVisibility = showBulletsBtn.id;
    showBulletsBtn.classList.add('active');
    hideBulletsBtn.classList.remove('active');
}

if (localStorage.controlBulletsVisibility === showBulletsBtn.id) {
    showBulletsBtn.classList.add('active');
    hideBulletsBtn.classList.remove('active');
    navBullets.style.display = 'flex';
}
else {
    hideBulletsBtn.classList.add('active');
    showBulletsBtn.classList.remove('active');
    navBullets.style.display = 'none';
}

showBulletsBtn.addEventListener('click', () => {
    localStorage.controlBulletsVisibility = showBulletsBtn.id;
    showBulletsBtn.classList.add('active');
    hideBulletsBtn.classList.remove('active');
    navBullets.style.display = 'flex';
})

hideBulletsBtn.addEventListener('click', () => {
    localStorage.controlBulletsVisibility = hideBulletsBtn.id;
    hideBulletsBtn.classList.add('active');
    showBulletsBtn.classList.remove('active');
    navBullets.style.display = 'none';
})

// Reset all options
const resetBtn = document.getElementById('reset-btn');

resetBtn.addEventListener('click', () => {
    // reset options to default
    localStorage.mainColor = '#ff9800';
    localStorage.checkedElement = 0;
    localStorage.controlBgBtn = 'pause-btn';
    localStorage.controlBulletsVisibility = 'show-btn';
    location.reload();
});

// skills progress when reaching its section
const skills = document.querySelectorAll('.our-skills .content .skill-box .prog span');
const skillsOffsetTop = document.querySelector('.our-skills').offsetTop;

skills.forEach((skill) => skill.classList.add('before-scroll-to'));

window.addEventListener('scroll', () => {
    let currentScroll = document.documentElement.scrollTop;
    if (currentScroll >= skillsOffsetTop) {
        skills.forEach((skill, idx) => {
            setTimeout(() => skill.classList.remove('before-scroll-to'), +`${(idx + 1) * 500}`)
        });
    }
    // reset if you are not in the our-skills section
    if (currentScroll <= skillsOffsetTop - window.innerHeight) {
        skills.forEach((skill) => skill.classList.add('before-scroll-to'));
    }
});

// open image in popup on ckick
const images = document.querySelectorAll('.our-gallery .images img');

images.forEach(img => img.addEventListener('click', popupFun));

function popupFun(ev) {
    // create overlay
    let overlay = document.createElement('div');
    overlay.classList.add('popup-overlay');
    // append overlay to body
    document.body.appendChild(overlay);
    // create popup box
    let popupBox = document.createElement('div');
    popupBox.classList.add('popup-box');
    // create image inside popup box
    let popupImg = document.createElement('img');
    popupImg.src = ev.target.src;
    popupBox.appendChild(popupImg);
    // create caption for image
    let popupCaption = document.createElement('p');
    popupCaption.textContent = ev.target.dataset.title;
    popupBox.appendChild(popupCaption);
    // append popup box to body
    document.body.appendChild(popupBox);
    // close popup when clicking the overlay
    overlay.addEventListener('click', () => {
        document.body.removeChild(popupBox);
        document.body.removeChild(overlay);
    });
}

// footer dynamic year
const currentYear = document.querySelector('.footer .end .year');
currentYear.textContent = new Date().getFullYear();

// replacing header links with bars icon in screens less than 767px
const headerLinks = document.querySelector('header .links');
const barsIcon = document.querySelector('header .bars-icon');

barsIcon.addEventListener('click', () => {
    headerLinks.classList.toggle('small-screen-show');
});

const headerLinksAnchors = document.querySelectorAll('header .links li a');

// hide menue onclick
headerLinksAnchors.forEach(anchor => {
    anchor.addEventListener('click', () => {
        headerLinks.classList.remove('small-screen-show');
    });
});

// control menue on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 767) {
        headerLinks.classList.remove('small-screen-show');
    }
});

// hide menue onclick at any place
document.addEventListener('click', (ev) => {
    if (headerLinks.classList.contains('small-screen-show') 
    && ev.target !== barsIcon 
    && ev.target != barsIcon.children[0]) {
        headerLinks.classList.remove('small-screen-show');
    }
});

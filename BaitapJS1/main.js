var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

const items = $$('.header__item');
const desc = $$('.content__des');

const itemActive = $('.header__item.active');
const lineActive = $('.header .line');

lineActive.style.left = itemActive.offsetLeft + 'px';
lineActive.style.width = itemActive.offsetWidth + 'px';


items.forEach((item, index) => {
    const des = desc[index];
    item.onclick = function() {
        $('.header__item.active').classList.remove('active');
        $('.content__des.active').classList.remove('active');

        lineActive.style.left = this.offsetLeft + 'px';
        lineActive.style.width = this.offsetWidth + 'px';

        this.classList.add('active');
        des.classList.add('active');
    }
})
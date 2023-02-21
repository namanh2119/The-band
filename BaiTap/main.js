const buttons = document.querySelectorAll('.js-buy-button')
const modal = document.querySelector('.js-modal')
const close = document.querySelector('.js-modal-close')
const modalContainer = document.querySelector('.modal-container')

// Đóng mở Modal

for (button of buttons) {
    button.addEventListener('click', () => {
        modal.classList.add('open')
    })
}

close.addEventListener('click', () => {
    modal.classList.remove('open')
})

modal.addEventListener('click', () => {
    modal.classList.remove('open')
})

modalContainer.addEventListener('click', (e) => {
    e.stopPropagation();
})

// Đóng mở menu Mobile

var header = document.getElementById('header');
var moblileMenu = document.getElementById('mobile-menu');
var headerHeight = header.clientHeight;

moblileMenu.onclick = function() {
    var isClose = header.clientHeight === headerHeight;
    if (isClose) {
        header.style.height = 'auto';
    }
    else {
        header.style.height = null;
    }
}

var menuItems = document.querySelectorAll('#nav li a[href*="#"]');
for (var i = 0; i < menuItems.length; i++) {
    var menuItem = menuItems[i];

    menuItem.onclick = function(e) {
        var isParentMenu = this.nextElementSibling && this.nextElementSibling.classList.contains('subnav');
        if (isParentMenu) {
            e.preventDefault();
        }
        else {
            header.style.height = null;
        }
    }
}


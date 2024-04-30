let cookieCount = 0;
let cookiesPerClick = 1;
let autoClickerRate = 0;

const cookie = document.getElementById('cookie');
const cookieCountDisplay = document.getElementById('cookie-count');
const cookieBtn = document.getElementById('cookie-btn');
const upgradeButtons = document.querySelectorAll('.upgrade-btn');

cookie.addEventListener('click', () => {
    cookieCount += cookiesPerClick;
    updateCookieCountDisplay();
});

cookieBtn.addEventListener('click', () => {
    cookieCount += cookiesPerClick;
    updateCookieCountDisplay();
});

upgradeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const upgradeType = button.dataset.upgradeType;
        if (upgradeType === 'click') {
            if (cookieCount >= 10) {
                cookiesPerClick++;
                cookieCount -= 10;
                updateCookieCountDisplay();
            } else {
                alert('You need at least 10 cookies to buy this upgrade.');
            }
        } else if (upgradeType === 'auto') {
            if (cookieCount >= 50) {
                autoClickerRate += 1;
                cookieCount -= 50;
                updateCookieCountDisplay();
                startAutoClicker();
            } else {
                alert('You need at least 50 cookies to buy this upgrade.');
            }
        }
    });
});

function updateCookieCountDisplay() {
    cookieCountDisplay.textContent = cookieCount;
}

function startAutoClicker() {
    setInterval(() => {
        cookieCount += autoClickerRate;
        updateCookieCountDisplay();
    }, 1000);
}

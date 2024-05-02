let cookieCount = 0;
let cookiesPerClick = 1;
let autoClickerRate = 0;
let grandmaRate = 0;
let farmRate = 0;
let superClickRate = 1;
let autoClickerInterval;
let grandmaInterval;
let farmInterval;

const cookie = document.getElementById('cookie');
const cookieCountDisplay = document.getElementById('cookie-count');
const cpsDisplay = document.getElementById('cps');
const cookieBtn = document.getElementById('cookie-btn');
const clickUpgradeBtn = document.getElementById('click-upgrade');
const autoClickerBtn = document.getElementById('auto-clicker');
const grandmaBtn = document.getElementById('grandma');
const farmBtn = document.getElementById('farm');
const superClickBtn = document.getElementById('super-click');
const multiUpgradeBtns = document.querySelectorAll('.multi-upgrade-btn');
const achievementList = document.getElementById('achievement-list');

cookie.addEventListener('click', () => {
    cookieCount += cookiesPerClick;
    updateCookieCountDisplay();
    checkAchievements();
});

cookieBtn.addEventListener('click', () => {
    cookieCount += cookiesPerClick;
    updateCookieCountDisplay();
    checkAchievements();
});

clickUpgradeBtn.addEventListener('click', () => {
    buyUpgrade(clickUpgradeBtn, 10, "Click Power: 1 cookie -> 2 cookies", () => {
        cookiesPerClick *= 2;
    });
});

autoClickerBtn.addEventListener('click', () => {
    buyUpgrade(autoClickerBtn, 50, "Auto Clicker", () => {
        autoClickerRate++;
        startAutoClicker();
    });
});

grandmaBtn.addEventListener('click', () => {
    buyUpgrade(grandmaBtn, 100, "Grandma: Bakes 1 cookie per second", () => {
        grandmaRate++;
        startGrandma();
    });
});

farmBtn.addEventListener('click', () => {
    buyUpgrade(farmBtn, 500, "Farm: Bakes 10 cookies per second", () => {
        farmRate += 10;
        startFarm();
    });
});

superClickBtn.addEventListener('click', () => {
    buyUpgrade(superClickBtn, 200, "Super Click: 2 cookies per click", () => {
        superClickRate *= 2;
    });
});

multiUpgradeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const upgrade = btn.dataset.upgrade;
        let cost = parseInt(btn.textContent.match(/\d+/)[0]); // Extract cost from button text
        if (cookieCount >= cost) {
            applyMultiUpgrade(upgrade);
            cookieCount -= cost;
            updateCookieCountDisplay();
            checkAchievements();
            cost *= 2; // Double the cost for the next purchase
            btn.textContent = `${upgrade} Upgraded! (Cost: ${cost} cookies)`;
        } else {
            alert(`You need at least ${cost} cookies to buy this upgrade.`);
        }
    });
});

function updateCookieCountDisplay() {
    cookieCountDisplay.textContent = cookieCount;
}

function updateCpsDisplay(cps) {
    cpsDisplay.textContent = `CPS: ${cps}`;
}

function startAutoClicker() {
    autoClickerInterval = setInterval(() => {
        cookieCount += autoClickerRate;
        updateCookieCountDisplay();
        checkAchievements();
        updateCpsDisplay(getCurrentCps());
    }, 1000);
}

function startGrandma() {
    grandmaInterval = setInterval(() => {
        cookieCount += grandmaRate;
        updateCookieCountDisplay();
        checkAchievements();
        updateCpsDisplay(getCurrentCps());
    }, 1000);
}

function startFarm() {
    farmInterval = setInterval(() => {
        cookieCount += farmRate;
        updateCookieCountDisplay();
        checkAchievements();
        updateCpsDisplay(getCurrentCps());
    }, 1000);
}

function getCurrentCps() {
    return autoClickerRate + grandmaRate + farmRate;
}

function checkAchievements() {
    if (cookieCount >= 100) {
        addAchievement("Cookie Master: You've baked 100 cookies!");
    }
    if (cookieCount >= 1000) {
        addAchievement("Cookie Tycoon: You've baked 1,000 cookies!");
    }
    if (cookiesPerClick >= 10) {
        addAchievement("Big Clicks: Your click power reached 10 cookies!");
    }
    if (autoClickerRate >= 1) {
        addAchievement("Automated Baking: You bought an auto-clicker!");
    }
    if (grandmaRate >= 1) {
        addAchievement("Grandma's Love: You hired a grandma!");
    }
    if (farmRate >= 10) {
        addAchievement("Farming Fortune: You built a farm!");
    }
}

function addAchievement(message) {
    const achievementItem = document.createElement('li');
    achievementItem.classList.add('achievement');
    achievementItem.textContent = message;
    achievementList.appendChild(achievementItem);
}

function buyUpgrade(btn, cost, originalText, effect) {
    if (cookieCount >= cost) {
        effect();
        cookieCount -= cost;
        updateCookieCountDisplay();
        checkAchievements();
        updateCpsDisplay(getCurrentCps());
        btn.textContent = `${originalText} (Purchased)`;
        btn.disabled = true;
    } else {
        alert(`You need at least ${cost} cookies to buy this upgrade.`);
    }
}

function applyMultiUpgrade(upgrade) {
    switch (upgrade) {
        case 'click-power':
            cookiesPerClick *= 2;
            break;
        case 'auto-clicker':
            autoClickerRate *= 2;
            break;
        case 'grandma':
            grandmaRate *= 2;
            break;
        case 'farm':
            farmRate *= 2;
            break;
        case 'super-click':
            superClickRate *= 2;
            break;
        default:
            break;
    }
}

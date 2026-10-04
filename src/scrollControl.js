(function () {
    var nav = document.getElementById('Nav');
    var hamburger = document.getElementById('hamburger');
    var body = document.getElementById('body');
    var logoLink = document.getElementById('logo-home');
    var logoActive = false;

    if (hamburger && body) {
        hamburger.addEventListener('change', function (event) {
            if (event.target.checked) body.classList.add('stop-scrolling');
            else body.classList.remove('stop-scrolling');
        });
    }

    if (!nav || !nav.parentNode) return;

    var desktop = window.matchMedia ? window.matchMedia('(min-width: 1051px)') : null;
    var spacer = document.createElement('div');
    spacer.id = 'nav-spacer';
    spacer.setAttribute('aria-hidden', 'true');
    nav.parentNode.insertBefore(spacer, nav.nextSibling);

    var naturalH = 0;
    var pinned = false;
    var lastY = 0;
    var downAcc = 0;
    var upAcc = 0;
    var restoreTimer = 0;
    var ticking = false;
    var HIDE_AFTER = 96;
    var SHOW_AFTER = 10;
    var NEAR_TOP = 48;

    function isDesktop() {
        if (desktop) return desktop.matches;
        return window.innerWidth > 1050;
    }

    function getY() {
        var y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        return y < 0 ? 0 : y;
    }

    function raf(cb) {
        if (window.requestAnimationFrame) return window.requestAnimationFrame(cb);
        return setTimeout(cb, 16);
    }

    function measure() {
        if (!pinned) naturalH = nav.offsetHeight || naturalH;
    }

    function setPad(px) {
        document.documentElement.style.setProperty('--nav-pad', px);
    }

    function setLogoLink(active) {
        if (!logoLink || logoActive === active) return;
        logoActive = active;
        if (active) {
            logoLink.classList.remove('is-inert');
            logoLink.removeAttribute('tabindex');
            logoLink.setAttribute('aria-disabled', 'false');
        } else {
            logoLink.classList.add('is-inert');
            logoLink.setAttribute('tabindex', '-1');
            logoLink.setAttribute('aria-disabled', 'true');
        }
    }

    function scrollToTop() {
        var reduce = false;
        try {
            reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        } catch (err) {
            reduce = false;
        }
        try {
            window.scrollTo({ top: 0, left: 0, behavior: reduce ? 'auto' : 'smooth' });
        } catch (err) {
            window.scrollTo(0, 0);
        }
    }

    if (logoLink) {
        logoLink.addEventListener('click', function (event) {
            if (!logoActive || getY() <= 2) {
                event.preventDefault();
                return;
            }
            event.preventDefault();
            scrollToTop();
        });
    }

    function clearRestore() {
        if (!restoreTimer) return;
        clearTimeout(restoreTimer);
        restoreTimer = 0;
    }

    function unpin() {
        clearRestore();
        pinned = false;
        downAcc = 0;
        upAcc = 0;
        nav.classList.remove('nav-fixed');
        nav.classList.remove('nav-compact');
        nav.classList.remove('nav-away');
        spacer.style.height = '0px';
        setPad('0px');
    }

    function pinHidden() {
        measure();
        spacer.style.height = (naturalH || nav.offsetHeight) + 'px';
        nav.classList.add('nav-instant');
        nav.classList.add('nav-fixed');
        nav.classList.add('nav-compact');
        nav.classList.add('nav-away');
        pinned = true;
        nav.offsetHeight;
        nav.classList.remove('nav-instant');
        setPad('0px');
        downAcc = 0;
        upAcc = 0;
    }

    function showBar() {
        nav.classList.add('nav-compact');
        nav.classList.remove('nav-away');
        setPad('76px');
    }

    function hideBar() {
        nav.classList.add('nav-compact');
        nav.classList.add('nav-away');
        setPad('0px');
    }

    function beginRestore() {
        nav.classList.remove('nav-compact');
        nav.classList.remove('nav-away');
        setPad('0px');
        if (restoreTimer) return;
        restoreTimer = setTimeout(function () {
            restoreTimer = 0;
            if (getY() < NEAR_TOP) unpin();
            else showBar();
        }, 480);
    }

    function update() {
        ticking = false;

        var y = getY();
        var delta = y - lastY;
        setLogoLink(y > 2);

        if (!isDesktop()) {
            unpin();
            lastY = y;
            return;
        }

        if (!pinned) measure();
        var far = (naturalH || 280) + 48;

        if (!pinned) {
            if (y > far) pinHidden();
        } else if (y < NEAR_TOP) {
            if (nav.classList.contains('nav-away')) unpin();
            else beginRestore();
        } else {
            clearRestore();
            if (delta > 0.5) {
                downAcc += delta;
                upAcc = 0;
                if (downAcc > HIDE_AFTER) hideBar();
            } else if (delta < -0.5) {
                upAcc -= delta;
                downAcc = 0;
                if (upAcc > SHOW_AFTER) showBar();
            }
        }

        lastY = y;
    }

    function requestUpdate() {
        if (ticking) return;
        ticking = true;
        raf(update);
    }

    var passiveSupported = false;
    try {
        var probe = Object.defineProperty({}, 'passive', {
            get: function () { passiveSupported = true; }
        });
        window.addEventListener('passive-test', function () {}, probe);
        window.removeEventListener('passive-test', function () {}, probe);
    } catch (err) {
        passiveSupported = false;
    }

    window.addEventListener('scroll', requestUpdate, passiveSupported ? { passive: true } : false);
    window.addEventListener('resize', function () {
        if (!isDesktop()) unpin();
        else if (!pinned) measure();
        requestUpdate();
    });
    window.addEventListener('orientationchange', requestUpdate);
    window.addEventListener('load', function () {
        if (!pinned) measure();
        requestUpdate();
    });

    if (desktop) {
        var onMode = function () {
            if (!isDesktop()) unpin();
            else if (!pinned) measure();
            requestUpdate();
        };
        if (desktop.addEventListener) desktop.addEventListener('change', onMode);
        else if (desktop.addListener) desktop.addListener(onMode);
    }

    var logo = document.getElementById('Logo');
    if (logo && logo.addEventListener) {
        logo.addEventListener('load', function () {
            if (!pinned) measure();
        });
    }

    measure();
    lastY = getY();
    update();
})();

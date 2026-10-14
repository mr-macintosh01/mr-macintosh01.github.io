(function () {
    var loader = document.getElementById('loader');
    var root = document.documentElement;
    if (!loader) {
        root.classList.remove('is-loading');
        return;
    }
    var gone = false;
    var storageKey = 'scroll:' + location.pathname + location.search;
    var savedY = readSavedY();

    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    window.addEventListener('pagehide', function () {
        try {
            sessionStorage.setItem(storageKey, String(Math.round(window.pageYOffset)));
        } catch (err) {}
    });

    function readSavedY() {
        var type = '';
        try {
            var entry = performance.getEntriesByType('navigation')[0];
            type = entry ? entry.type : '';
        } catch (err) {}
        if (!type && performance.navigation) {
            type = performance.navigation.type === 2 ? 'back_forward' : performance.navigation.type === 1 ? 'reload' : '';
        }
        if (type !== 'back_forward' && type !== 'reload') return null;
        try {
            var value = sessionStorage.getItem(storageKey);
            return value === null ? null : +value;
        } catch (err) {
            return null;
        }
    }

    function instantly(fn) {
        var behavior = root.style.scrollBehavior;
        root.style.scrollBehavior = 'auto';
        fn();
        root.style.scrollBehavior = behavior;
    }

    function jumpToHash() {
        if (savedY !== null) {
            instantly(function () { window.scrollTo(0, savedY); });
            return;
        }
        var id = location.hash.slice(1);
        if (!id) return;
        try {
            id = decodeURIComponent(id);
        } catch (err) {
            return;
        }
        var target = document.getElementById(id);
        if (!target) return;
        instantly(function () { target.scrollIntoView({ block: 'start' }); });
    }

    function removeLoader() {
        root.classList.remove('is-loading');
        if (loader.parentNode) loader.parentNode.removeChild(loader);
        window.dispatchEvent(new Event('loaderhidden'));
    }

    function finish() {
        if (gone) return;
        gone = true;
        jumpToHash();
        var reduce = false;
        try {
            reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        } catch (err) {
            reduce = false;
        }
        if (reduce) {
            removeLoader();
            return;
        }
        loader.classList.add('is-done');
        loader.addEventListener('transitionend', function (event) {
            if (event.target === loader) removeLoader();
        });
        setTimeout(removeLoader, 1100);
    }

    function imageReady(img) {
        if (img.complete) return img.decode ? img.decode().catch(function () {}) : Promise.resolve();
        return new Promise(function (resolve) {
            img.addEventListener('load', resolve);
            img.addEventListener('error', resolve);
        });
    }

    function finishWhenArtReady() {
        jumpToHash();
        if (!window.Promise) return;
        var waits = Array.prototype.map.call(
            document.querySelectorAll('#Nav img, #VectorTown img, #SlideButton img, #about-us img, .top img'),
            imageReady
        );
        if (document.fonts && document.fonts.ready) {
            void document.body.offsetHeight;
            waits.push(document.fonts.ready.catch(function () {}));
        }
        Promise.all(waits).then(finish, finish);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', finishWhenArtReady);
    else finishWhenArtReady();
    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish);
    setTimeout(finish, 6000);
})();

(function () {
    var metrikaId = 113521812;

    function track(name) {
        if (typeof gtag === 'function') {
            gtag('event', name);
        }
        if (typeof ym === 'function') {
            ym(metrikaId, 'reachGoal', name);
        }
    }

    document.addEventListener('click', function (event) {
        var link = event.target.closest && event.target.closest('a');
        if (!link) return;
        var href = link.getAttribute('href') || '';
        if (href.slice(0, 4).toLowerCase() === 'tel:') {
            track('phone_click');
            return;
        }
        if (/t\.me|linkedin\.com/i.test(href)) {
            track('social_click');
        }
    });
})();

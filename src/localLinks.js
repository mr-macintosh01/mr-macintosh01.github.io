(function () {
    if (location.protocol !== 'file:') return;

    document.addEventListener('click', function (event) {
        var link = event.target.closest && event.target.closest('a[href]');
        if (!link) return;
        var href = link.getAttribute('href');
        if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href)) return;
        var hashAt = href.indexOf('#');
        var path = hashAt === -1 ? href : href.slice(0, hashAt);
        var hash = hashAt === -1 ? '' : href.slice(hashAt);
        if (!path || path.slice(-1) !== '/') return;
        link.setAttribute('href', path + 'index.html' + hash);
    }, true);
})();

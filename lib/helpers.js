var cookieJar = null;

exports.getCookieJar = function() {
	return cookieJar;
}
exports.setCookieJar = function(cookie) {
	cookieJar = cookie;
};
exports.getOgameUrl = function(page, params) {
    if (page == 'login') {
        return 'https://pl.ogame.gameforge.com/main/login';
    };

    var url = 'https://s148-pl.ogame.gameforge.com/game/index.php?page=' + page;

    if (params) {
        for (var key in params) {
            url += '&' + key + '=' + params[key];
        };
    };

    return url;
};
var BASE_SERVICE_URL = "api-maps.yandex.ru";
var Type;
(function (Type) {
    Type["Free"] = "free";
    Type["Enterprise"] = "enterprise";
})(Type || (Type = {}));
;
var Language;
(function (Language) {
    Language["ru_RU"] = "ru_RU";
    Language["en_US"] = "en_US";
    Language["en_RU"] = "en_RU";
    Language["ru_UA"] = "ru_UA";
    Language["uk_UA"] = "uk_UA";
    Language["tr_TR"] = "tr_TR";
})(Language || (Language = {}));
;
var DefaultConfig = {
    type: Type.Free,
    version: "2.1",
    language: Language.ru_RU,
    options: {}
};
var Loader = /** @class */ (function () {
    /**
     * Constructor
     * Does not load the service
     *
     * @param key API key
     * @param config API configuration
     */
    function Loader(key, config) {
        if (config === void 0) { config = DefaultConfig; }
        // create base url
        var url = [
            config.type === Type.Enterprise ? "//enterpise.api-maps.yandex.ru" : "//api-maps.yandex.ru",
            config.version,
            "?apikey=" + key + "&lang=" + config.language
        ].join("/");
        // add params
        if (typeof config.options === "object") {
            for (key in config.options) {
                if (config.options.hasOwnProperty(key) && typeof (config.options[key]) === "string") {
                    url = url + "&" + key + "=" + encodeURIComponent(config.options[key]);
                }
            }
        }
        this.url = url;
    }
    /**
     * Load API
     *
     * @returns Promise<void> that will be resolved on API ready
     */
    Loader.prototype.load = function () {
        var _this = this;
        return new Promise(function (re, rj) {
            var elem = document.createElement("script");
            elem.type = "text/javascript";
            elem.src = _this.url;
            elem.onload = function () {
                return ymaps.ready(function () {
                    re();
                });
            };
            elem.onerror = function (e) { rj(e); };
            document.body.appendChild(elem);
        });
    };
    return Loader;
}());
export { Loader };
//# sourceMappingURL=loader.js.map
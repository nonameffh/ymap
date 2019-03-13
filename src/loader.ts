/// <reference path="./type/ymaps.d.ts" />

const BASE_SERVICE_URL = "api-maps.yandex.ru";

enum Type {
    Free = 'free',
    Enterprise = 'enterprise'
};

enum Language {
    ru_RU = 'ru_RU',
    en_US = 'en_US',
    en_RU = 'en_RU',
    ru_UA = 'ru_UA',
    uk_UA = 'uk_UA',
    tr_TR = 'tr_TR'
};

type IConfig = {
    type: string,
    version: string,
    language: string,
    options: { [key: string]: string }
};

const DefaultConfig = {
    type: Type.Free,
    version: '2.1',
    language: Language.ru_RU,
    options: {}
};

class Loader {
    private readonly url: string;

    /**
     * Constructor
     * Does not load the service
     * 
     * @param key API key
     * @param config API configuration
     */
    public constructor(key: string, config: IConfig = DefaultConfig) {
        // create base url
        let url = [
            config.type === Type.Enterprise ? '//enterpise.api-maps.yandex.ru' : '//api-maps.yandex.ru',
            config.version,
            `?apikey=${key}&lang=${config.language}`
        ].join('/');


        // add params
        if (typeof config.options === 'object') {
            for (key in config.options) {
                if (config.options.hasOwnProperty(key) && typeof (config.options[key]) === 'string') {
                    url = `${url}&${key}=${encodeURIComponent(config.options[key])}`;
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
    public load(): Promise<void> {
        return new Promise<void>((re, rj) => {
            const elem = document.createElement("script");
            elem.type = "text/javascript";
            elem.src = this.url;
            elem.onload = () => { ymaps.ready(() => { re(); }); };
            elem.onerror = (e) => { rj(e); };

            document.body.appendChild(elem);
        });
    }

}

export { Loader };
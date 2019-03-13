/// <reference path="../src/type/ymaps.d.ts" />
declare type IConfig = {
    type: string;
    version: string;
    language: string;
    options: {
        [key: string]: string;
    };
};
declare class Loader {
    private readonly url;
    /**
     * Constructor
     * Does not load the service
     *
     * @param key API key
     * @param config API configuration
     */
    constructor(key: string, config?: IConfig);
    load(): Promise<void>;
}
export { Loader };

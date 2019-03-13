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
    /**
     * Load API
     *
     * @returns Promise<void> that will be resolved on API ready
     */
    load(): Promise<void>;
}
export { Loader };

import "./styles/app.css";
import { JetApp, EmptyRouter, HashRouter } from "webix-jet";

export default class MyApp extends JetApp {
    constructor(config) {
        const defaults = {
            id: APPNAME,
            version: VERSION,
            router: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
            debug: !PRODUCTION,
            start: "/top/productTable"
        };

        super({ ...defaults, ...config });
    }
}

if(!BUILD_AS_MODULE) {
    webix.ready(() => {
        const app = new MyApp();
        app.render();
    });
}

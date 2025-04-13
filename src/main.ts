import { createApp } from 'vue';
import installDirectives from './directives';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './style.scss';
import App from './App.vue';

(window as any).vueAgenda = function () {
    const app = createApp(App);
    const methods: { [key: string]: Function } = {};

    installDirectives(app);
    /*app.config.globalProperties.$vueAgenda = methods;
    app.config.globalProperties.$vueAgendaVersion = '1.0.0';
    app.config.globalProperties.$vueAgendaBuild = '2023-10-01';
    app.config.globalProperties.$vueAgendaBuildHash = 'abc123';
    app.config.globalProperties.$vueAgendaBuildDate = new Date().toISOString();
    app.config.globalProperties.$vueAgendaBuildTime = new Date().getTime();
    app.config.globalProperties.$vueAgendaBuildDateTime = new Date().toISOString();
    app.config.globalProperties.$vueAgendaBuildDateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
    app.config.globalProperties.$vueAgendaBuildDateTimeFormatLocale = 'en-US';
    app.config.globalProperties.$vueAgendaBuildDateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };
    app.config.globalProperties.$vueAgendaBuildDateTimeFormatOptionsLocale = 'en-US';
    app.config.globalProperties.$vueAgendaBuildDateTimeFormatOptionsTimeZone = 'UTC';*/

    methods.mount = (rootId: string | HTMLElement) => {
        if (!rootId) {
            throw new Error('Root ID is required');
        }

        if (rootId instanceof HTMLElement || typeof rootId === 'string') {
            app.mount(rootId);
            return methods;
        }

        throw new Error('Invalid root ID');
    };

    methods.unmount = () => app.unmount();

    return methods;
};

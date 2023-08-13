'use strict';

const path = require('path');
const http = require('./http')
const log = require('./util').log;
const renderFile = require('./util').renderFile;
const i18n = require('./util').i18n;

module.exports = async function (locals) {

    const type = locals.neodb_type
    const config = this.config;
    if (!config.neodb || !type || !config.neodb[type]) {//当没有输入信息时，不进行数据渲染。
        return;
    }

    let root = config.root;
    if (root.endsWith('/')) {
        root = root.slice(0, root.length - 1);
    }

    let timeout = 10000;
    if (config.neodb.timeout) {
        timeout = config.neodb.timeout;
    }

    let item_per_page = 10
    if (config.neodb.item_per_page) {
        item_per_page = config.neodb.item_per_page
    }

    let meta_max_line = 4
    if (config.neodb.meta_max_line) {
        meta_max_line = config.neodb.meta_max_line
    }
    
    let customize_layout = 'page'
    if (config.neodb.customize_layout) {
        customize_layout = config.neodb.customize_layout
    }

    const startTime = new Date().getTime();

    let data = await http.fetchData(config.neodb.token, config.url, type, timeout);

    const endTime = new Date().getTime();

    log.info(`${data.wishlist.length} (wishlist), ${data.progress.length} (progress),${data.complete.length} (complete) ${type} loaded in ${endTime - startTime} ms`);

    const __ = i18n.__(config.language);

    return renderFile(path.join(__dirname, 'templates/index.ejs'), {
        quote: config.neodb[type].quote,
        wishlist: data.wishlist,
        complete: data.complete,
        progress: data.progress,
        item_per_page: item_per_page,
        meta_max_line: meta_max_line,
        type: `${type}`,
        __: __,
        root: root
    }).then(renderedData => {
        return {
            path: config.neodb[type].path,
            data: Object.assign({
                title: config.neodb[type].title,
                content: renderedData,
                slug: `${type}s`
            }, config.neodb[type].option),
            layout: [customize_layout, 'post']
        };
    })
};

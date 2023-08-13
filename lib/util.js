'use strict';

const I18N = require('hexo-i18n');
const urllib = require('urllib');
const pkg = require('../package.json')
const ejs = require("ejs");

module.exports.log = require('hexo-log')({
    debug: false,
    silent: false
});

module.exports.renderFile = (file, data) => {
    return new Promise(resolve => {
        ejs.renderFile(file, data, (err, result) => {
            if (err) {
                module.exports.log.error(err);
                resolve('')
            } else {
                resolve(result);
            }
        });
    });
}

module.exports.syncFetch = async function (url, referer, timeout) {
    try {
        const {data} = await urllib.request(url, {
            method: 'GET',
            timeout: timeout,
            dataType: 'json',
            headers: {
                'User-Agent': `${pkg.name}@${pkg.version}`,
                'Referer': referer
            }
        })
        return data
    } catch (err) {
        module.exports.log.error(err)
        return 'OFFLINE'
    }
}

module.exports.renderStar = function (num) {
    switch (num) {
        case '1':
            return '★☆☆☆☆ 很差';
        case '2':
            return '★★☆☆☆ 较差';
        case '3':
            return '★★★☆☆ 还行';
        case '4':
            return '★★★★☆ 推荐';
        case '5':
            return '★★★★★ 力荐';
        default:
            return '';
    }
};


let i18n = new I18N({
    languages: ['zh-CN', 'en']
});

i18n.set('en', {
    moviewishlist: 'wishlist',
    movieprogress: 'Watching',
    moviecomplete: 'Watched',
    tvwishlist: 'wishlist',
    tvprogress: 'Watching',
    tvcomplete: 'Watched',
    bookwishlist: 'wishlist',
    bookprogress: 'Reading',
    bookcomplete: 'Read',
    gamewishlist: 'wishlist',
    gameprogress: 'Playing',
    gamecomplete: 'Played',
    songwishlist: 'wishlist',
    songprogress: 'Listening',
    songcomplete: 'Listened',
    musicwishlist: 'wishlist',
    musicprogress: 'Listening',
    musiccomplete: 'Listened',
    prev: 'Prev',
    next: 'Next',
    top: 'Top',
    end: 'End'
});

i18n.set('zh-TW', {
    moviewishlist: '想看',
    movieprogress: '在看',
    moviecomplete: '已看',
    bookwishlist: '想讀',
    bookprogress: '在讀',
    bookcomplete: '已讀',
    gamewishlist: '想玩',
    gameprogress: '在玩',
    gamecomplete: '已玩',
    songwishlist: '想聽',
    songprogress: '在聽',
    songcomplete: '已聽',
    prev: '上一頁',
    next: '下一頁',
    top: '首頁',
    end: '尾頁'
});

i18n.set('zh-Hans', {
    moviewishlist: '想看',
    movieprogress: '在看',
    moviecomplete: '已看',
    bookwishlist: '想读',
    bookprogress: '在读',
    bookcomplete: '已读',
    gamewishlist: '想玩',
    gameprogress: '在玩',
    gamecomplete: '已玩',
    songwishlist: '想听',
    songprogress: '在听',
    songcomplete: '已听',
    prev: '上一页',
    next: '下一页',
    top: '首页',
    end: '尾页'
});

i18n.set('zh-CN', {
    moviewishlist: '想看',
    movieprogress: '在看',
    moviecomplete: '已看',
    tvwishlist: '想看',
    tvprogress: '在看',
    tvcomplete: '已看',
    bookwishlist: '想读',
    bookprogress: '在读',
    bookcomplete: '已读',
    gamewishlist: '想玩',
    gameprogress: '在玩',
    gamecomplete: '已玩',
    songwishlist: '想听',
    songprogress: '在听',
    songcomplete: '已听',
    musicwishlist: '想听',
    musicprogress: '在听',
    musiccomplete: '已听',
    prev: '上一页',
    next: '下一页',
    top: '首页',
    end: '尾页'
});

module.exports.i18n = i18n;

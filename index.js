/* global hexo */
'use strict';
const fs = require('hexo-fs');
const path = require('path');
const log = require('./lib/util').log

let init_from_console = false

const supported_types = ['book', 'movie', 'game', 'song']

// Register `hexo g` and `hexo s`
supported_types.forEach(supported_type => {
    hexo.extend.generator.register(`${supported_type}s`, function (locals) {
        if (init_from_console) {
            return
        }
        if (!this.config.neodb || !this.config.neodb[supported_type] || !this.config.neodb.builtin) {
            return;
        }
        if (!this.config.neodb[supported_type].path) {
            this.config.neodb[supported_type].path = `${supported_type}s/index.html`
        }
        locals.neodb_type = supported_type
        return require(`./lib/generator`).call(this, locals);
    });
})

const options = {
    options: [
        {name: '-b, --books', desc: 'Generate neodb books only'},
        {name: '-m, --movies', desc: 'Generate neodb movies only'},
        {name: '-g, --games', desc: 'Generate neodb games only'},
        {name: '-s, --songs', desc: 'Generate neodb songs only'}
    ]
}

// Register `hexo neodb`
hexo.extend.console.register('neodb', 'Generate pages from neodb', options, function (args) {
    console.log('test')
    init_from_console = true

    if (!this.config.neodb) {
        log.info("No neodb config specified")
        return
    }
    if (!this.config.neodb.id) {
        log.info("No neodb id specified")
        return
    }


    let force_types = []
    supported_types.forEach(supported_type => {
        if ((args[supported_type[0]] || args[`${supported_type}s`]) && this.config.neodb[supported_type]) {
            force_types.push(supported_type)
        }
    })

    let enabled_types = [];

    if (force_types.length !== 0) {
        enabled_types = force_types
    } else {
        supported_types.forEach(type => {
            if (this.config.neodb[type]) {
                enabled_types.push(type);
            }
        })
    }

    // Config preprocess
    enabled_types.forEach(type => {
        if (!this.config.neodb[type].path) {
            this.config.neodb[type].path = `${type}s/index.html`
        }
    })

    if (enabled_types.length === 0) {
        log.info("No neodb type specified")
        return
    }

    const self = this;

    //Register route
    enabled_types.forEach(enabled_type => {
        let page_path = self.config.neodb[enabled_type].path || enabled_type + "/index.html"
        if (page_path.startsWith("/")) {
            page_path = page_path.substr(1)
        }
        self.config.neodb[enabled_type].path = page_path

        hexo.extend.generator.register(enabled_type, function (locals) {
            locals.neodb_type = enabled_type
            return require(`./lib/generator`).call(this, locals)
        });
    })


    //Generate files
    self.load().then(function () {
        enabled_types.forEach(enabled_type => {
            const publicDir = self.public_dir;
            const id = self.config.neodb[enabled_type].path
            fs.mkdirSync(path.join(publicDir, id.replace("index.html", "")), {recursive: true})

            self.route.get(id) && self.route.get(id)._data().then(function (contents) {
                fs.writeFile(path.join(publicDir, id), contents);
                log.info("Generated: %s", id);
            });
        });
    });
});

# hexo-neodb

一个在 [Hexo](https://hexo.io) 页面中嵌入 neodb 个人主页的小插件.

[![package version](https://badge.fury.io/js/hexo-neodb.svg)](https://www.npmjs.com/package/hexo-neodb)
[![npm](https://img.shields.io/npm/dt/hexo-neodb.svg)](https://www.npmjs.com/package/hexo-neodb)
[![GitHub license](https://img.shields.io/github/license/lesslsmore/hexo-neodb.svg)](https://github.com/lesslsmore/hexo-neodb/blob/master/LICENSE)

[![NPM](https://nodei.co/npm/hexo-neodb.png)](https://nodei.co/npm/hexo-neodb/)

## 原理

hexo-neodb 目前升级到了 0.x 版本，
将原先由插件客户端自行获取数据的逻辑抽到了一个隐藏的服务端中进行，以统一解决数据获取、数据缓存、风控对抗等问题，提高页面生成的成功率和效率。

## 安装

``` bash
$ npm install hexo-neodb --save
```

## 配置

将下面的配置写入站点的配置文件 `_config.yml` 里(不是主题的配置文件).

``` yaml
neodb:
  token: 'xxxxxxxxx'
  builtin: false
  item_per_page: 10
  meta_max_line: 4
  customize_layout: page
  book:
    path: books/index.html
    title: 'This is my book title'
    quote: 'This is my book quote'
    option:
  movie:
    path: movies/index.html
    title: 'This is my movie title'
    quote: 'This is my movie quote'
    option:
  game:
    path: games/index.html
    title: 'This is my game title'
    quote: 'This is my game quote'
    option:
  music:
    path: musics/index.html
    title: 'This is my song title'
    quote: 'This is my song quote'
    option:
  tv:
    path: tvs/index.html
    title: 'This is my song title'
    quote: 'This is my song quote'
    option:
  timeout: 10000 
```

- **id**: 你的 neodb token。获取方法可以参考[怎样获取 neodb 的 token ？](https://www.zhihu.com/question/19634899)
- **builtin**: 是否将`hexo neodb`命令默认嵌入进`hexo g`、`hexo s`，使其自动执行`hexo neodb` 命令。默认关闭。当你的 neodb 条目较多时，也建议关闭。
- **item_per_page**: 每页展示的条目数，默认 10 。
- **meta_max_line**: 每个条目展示的详细信息的最大行数，超过该行数则会以 "..." 省略，默认 4 。
- **customize_layout**: 自定义布局文件。默认值为 page 。无特别需要，留空即可。若配置为 `abcd`，则表示指定 `//theme/hexo-theme/layout/abcd.ejs` 文件渲染 neodb 页面。
- **path**: 生成页面后的路径，默认生成在 //yourblog/books/index.html 等下面。如需自定义路径，则可以修改这里。
- **title**: 该页面的标题。
- **quote**: 写在页面开头的一段话,支持html语法。
- **timeout**: 爬取数据的超时时间，默认是 10000ms ,如果在使用时发现报了超时的错(ETIMEOUT)可以把这个数据设置的大一点。
- **option**: 该页面额外的 Front-matter 配置，参考[Hexo 文档](https://hexo.io/docs/front-matter.html)。无特别需要，留空即可。

如果只想显示某一个页面(比如movie)，那就把其他的配置项注释掉即可。

## 使用

**展示帮助文档**

```
$ hexo neodb -h
Usage: hexo neodb

Description:
Generate pages from neodb

Options:
  -b, --books   Generate neodb books only
  -g, --games   Generate neodb games only
  -m, --movies  Generate neodb movies only
  -s, --songs   Generate neodb songs only
```

**主动生成 neodb 页面**

```
$ hexo neodb
INFO  Start processing
INFO  0 (wishlist), 0 (progress),0 (complete) game loaded in 729 ms
INFO  0 (wishlist), 0 (progress),20 (complete) song loaded in 761 ms
INFO  2 (wishlist), 0 (progress),136 (complete) book loaded in 940 ms
INFO  30 (wishlist), 0 (progress),6105 (complete) movie loaded in 4129 ms
INFO  Generated: books/index.html
INFO  Generated: movies/index.html
INFO  Generated: games/index.html
INFO  Generated: songs/index.html
```

如果不加参数，那么默认参数为`-bgms`。当然，前提是配置文件中均有这些类型的配置。

**需要注意的是**，通常大家都喜欢用`hexo d`来作为`hexo deploy`命令的简化，但是当安装了`hexo neodb`之后，就不能用`hexo d`了，因为`hexo neodb`跟`hexo deploy`
的前缀都是`hexo d`。

第一次使用 hexo neodb 时，后台会异步进行数据获取，一般需要等待一段时间（后台访问你的标记页面）才能查到数据。顺利情况下，平均一个页面会花10s。

例如如果你有 150 个想读、150个已读、150个在读的图书，每页15条，则共需要翻30页。那么大约需要等待 30*10/60=5 分钟。如果长时间没有更新（一天以上），请及时提 issue 反馈。

后续如果你的 neodb 数据更新了，hexo neodb 同样也会自动进行更新（同样需要等待一段时间才会查到更新数据），不过出于安全考虑，一个用户id**每半小时至多只会同步一次**。

由于 neodb 本身深分页的 RT 过高（上万条目的翻页 RT 会到 15s 到 60s），为了防止系统同步压力过大，每个用户的每一类条目最多只会同步 1w 条。

## 升级

我会不定期更新一些功能或者修改一些Bug，所以如果想使用最新的特性，可以用下面的方法来更新:

1. 修改 package.json 内 hexo-neodb 的版本号至最新
2. 重新安装最新版本`npm install hexo-neodb --save`

或者使用`npm install hexo-neodb --update --save`直接更新。

## 显示

如果上面的配置和操作都没问题，就可以在生成站点之后打开 `//yourblog/books` 和 `//yourblog/movies`, `//yourblog/games`, 来查看结果。

## 菜单

如果上面的显示没有问题就可以在主题的配置文件 `_config.yml` 里添加如下配置来为这些页面添加菜单链接.

```yaml
menu:
  Home: /
  Archives: /archives
  Books: /books     #This is your books page
  Movies: /movies   #This is your movies page
  Games: /games   #This is your games page
  Songs: /songs   #This is your songs page
```

## 通用环境

如果有非 hexo 环境的部署需求，则可以考虑以引入静态资源的方式接入 [ineodb](https://github.com/lesslsmore/ineodb) 。

## 免责声明

本项目仅供学习交流使用，不得用于任何商业用途。

数据来源于互联网公开内容，没有获取任何私有和有权限的信息（个人信息等），由此引发的任何法律纠纷与本人无关。

## 反馈

系统刚上线，可能还不够完善。如果大家在使用的过程中数据有问题、或者有什么问题和意见，欢迎随时提issue。

如果你觉得这个插件很好用，欢迎右上角点下 star ⭐️，表达对作者的鼓励。

## Star History

[![Stargazers over time](https://starchart.cc/lesslsmore/hexo-neodb.svg)](https://starchart.cc/lesslsmore/hexo-neodb)

## Lisense

MIT

# hexo-neodb

一个在 [Hexo](https://hexo.io) 页面中嵌入 neodb 个人主页的小插件.

![](https://badge.fury.io/js/hexo-neodb.svg)  
![](https://img.shields.io/npm/dt/hexo-neodb.svg)  
![](https://img.shields.io/github/license/lesslsmore/hexo-neodb.svg)

![](https://nodei.co/npm/hexo-neodb.png)

## 原理

hexo-neodb 参考 [https://github.com/mythsman/hexo-douban](https://github.com/mythsman/hexo-douban) 开发

由于豆瓣评论被删，因此转战 [neodb](https://neodb.social/) 作为替代。

neodb 支持豆瓣数据导入，开源并开放 api

通过 [https://neodb.social/developer/](https://neodb.social/developer/) 可生成 token 对 api 进行访问

## 安装

```shell
$ npm install hexo-neodb --save
```

## 配置

将下面的配置写入站点的配置文件 `_config.yml` 里(不是主题的配置文件).

```yml
neodb:
  token: '填入之前生成的 token'
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
    title: 'This is my music title'
    quote: 'This is my music quote'
    option:
  tv:
    path: tvs/index.html
    title: 'This is my tv title'
    quote: 'This is my tv quote'
    option:
  timeout: 10000
```

如果只想显示某一个页面(比如movie)，那就把其他的配置项注释掉即可。

## 使用

**展示帮助文档**

```shell
$ hexo neodb -h
Usage: hexo neodb

Description:
Generate pages from neodb

Options:
  -b, --books   Generate neodb books only
  -g, --games   Generate neodb games only
  -m, --movies  Generate neodb movies only
  -s, --musics   Generate neodb songs only
  -t, --tvs   Generate neodb songs only
```

**主动生成 neodb 页面**

中途报错，不影响生成结果，只是会缺失几条。

默认采用了 7890 端口代理访问，国内访问 api 不太顺畅

```shell
$ hexo neodb
INFO  Start processing
INFO  0 (wishlist), 0 (progress),0 (complete) game loaded in 729 ms
INFO  0 (wishlist), 0 (progress),20 (complete) song loaded in 761 ms
INFO  2 (wishlist), 0 (progress),136 (complete) book loaded in 940 ms
INFO  30 (wishlist), 0 (progress),6105 (complete) movie loaded in 4129 ms
INFO  Generated: books/index.html
INFO  Generated: movies/index.html
INFO  Generated: games/index.html
INFO  Generated: musics/index.html
INFO  Generated: tvs/index.html
```

如果不加参数，那么默认参数为`-bgmst`。当然，前提是配置文件中均有这些类型的配置。

**需要注意的是**，通常大家都喜欢用`hexo d`来作为`hexo deploy`命令的简化，但是当安装了`hexo neodb`之后，就不能用`hexo d`了，因为`hexo neodb`跟`hexo deploy`  
的前缀都是`hexo d`。

## 升级

我会不定期更新一些功能或者修改一些Bug，所以如果想使用最新的特性，可以用下面的方法来更新:

1. 修改 package.json 内 hexo-neodb 的版本号至最新
2. 重新安装最新版本`npm install hexo-neodb --save`

或者使用`npm install hexo-neodb --update --save`直接更新。

## 显示

如果上面的配置和操作都没问题，就可以在生成站点之后打开 `//yourblog/books` 和 `//yourblog/movies`, `//yourblog/games`, 来查看结果。

## 菜单

如果上面的显示没有问题就可以在主题的配置文件 `_config.yml` 里添加如下配置来为这些页面添加菜单链接.

```yml
menu:
  Home: /
  Archives: /archives
  Books: /books     #This is your books page
  Movies: /movies   #This is your movies page
  Games: /games   #This is your games page
  Musics: /musics   #This is your musics page
  TVs: /tvs   #This is your tvs page
```
## 他们在用
下面列举了在不同 hexo 主题下使用插件后的渲染结果，仅供参考。
如果您使用了本插件，也欢迎在 README.md 中提 PR 将您的网站添加进来，供后人参考。
### [hexo-theme-butterfly](https://github.com/jerryc127/hexo-theme-butterfly)
* https://lesslsmore.github.io/movies/
## 免责声明

本项目仅供学习交流使用，不得用于任何商业用途。

数据来源于互联网公开内容，没有获取任何私有和有权限的信息（个人信息等），由此引发的任何法律纠纷与本人无关。

## 反馈

系统刚上线，可能还不够完善。如果大家在使用的过程中数据有问题、或者有什么问题和意见，欢迎随时提issue。

如果你觉得这个插件很好用，欢迎右上角点下 star ⭐️，表达对作者的鼓励。
## Star History
[![Stargazers over time](https://starchart.cc/LesslsMore/hexo-neodb.svg?variant=adaptive)](https://starchart.cc/LesslsMore/hexo-neodb)
## Lisense

MIT
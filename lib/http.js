const {syncFetch, log, renderStar} = require("./util");
const axios = require('axios');

module.exports.fetchA = async function(token, type, timeout, category) {
    let data = []
    let pages = 0
    pages = await this.fetchAction(type, category, token, 1, data, timeout)
    for (let i = 2; i <= pages; i++) {
      await this.fetchAction(type, category, token, i, data, timeout)
    }
    // console.log(data)
    // console.log(pages)
    return data
  }
  
module.exports.fetchAction = async function(type, category, token, page, datas, timeout = 10000){
      let config = {
          timeout: timeout,
          method: 'get',
          maxBodyLength: Infinity,
          url: `https://neodb.social/api/me/shelf/${type}?category=${category}&page=${page}`,
          headers: { 
            'Authorization': `Bearer ${token}`
          },
          proxy: {
            protocol: 'http',
            host: '127.0.0.1',
            port: 7897,
          },
        };
      let pages = 0;
      await axios.request(config)
        .then((response) => {
            pages = response.data['pages']
            let data = response.data['data']
            // console.log(pages);
            data.forEach(el => {
                let item = el['item']
                let url = item['url']
                let title = item['title']
                let brief = item['brief']
                let cover_image_url = item['cover_image_url']
                let created_time = el['created_time']
                let comment_text = el['comment_text']
                let rating_grade = el['rating_grade']
              //   console.log(url)
              //   console.log(title)
              //   console.log(brief)
              //   console.log(cover_image_url)
              //   console.log(created_time)
              //   console.log(comment_text)
              //   console.log(rating_grade)
  
                datas.push({
                  title: title,
                  alt: "https://neodb.social" + url,
                  image: cover_image_url,
                  meta: brief,
                  rating: created_time.split('T')[0] + " / " + renderStar(String(rating_grade / 2)),
                  comment: comment_text
              })
            });
          //   console.log(datas)
        })
        .catch((error) => {
          console.log(error);
        });
    return pages
  }

module.exports.fetchData = async function (token, referer, type, timeout) {

    let wishlist = await this.fetchA(token, 'wishlist', timeout, type)
    let progress = await this.fetchA(token, 'progress', timeout, type)
    let complete = await this.fetchA(token, 'complete', timeout, type)

    return {
        wishlist: wishlist,
        progress: progress,
        complete: complete
    }
}

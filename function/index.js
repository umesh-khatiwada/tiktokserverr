// import requests;
// import re;

const { default: Axios } = require("axios");
const cheerio = require("cheerio");
const qs = require("qs");
const FormData = require("form-data");
var axios = require("axios").default;
const request = require("request-promise");
var newJsonData;
var newUrl;

async function tiktokdownload(url) {
  console.log("url" + url);
  var ImageTitle = await TiktokCurl(url);

  return new Promise((resolve, reject) => {
    Axios.get("https://ttdownloader.com/")
      .then((data) => {
        const $ = cheerio.load(data.data);
        const cookie = data.headers["set-cookie"].join("");
        const dataPost = {
          url: url,
          format: "",
          token: $("#token").attr("value"),
        };
        // return console.log(cookie);
        Axios({
          method: "POST",
          url: "https://ttdownloader.com/req/",
          headers: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            origin: "https://ttdownloader.com",
            referer: "https://ttdownloader.com/",
            cookie: cookie,
          },
          data: qs.stringify(dataPost),
        })
          .then(({ data }) => {
            const $ = cheerio.load(data);

            const result = {
              // nowm: $(
              //   "#results-list > div:nth-child(2) > div.download > a"
              // )?.attr("href"),
              // wm: $(
              //   "#results-list > div:nth-child(3) > div.download > a"
              // )?.attr("href"),
              // audio: $(
              //   "#results-list > div:nth-child(4) > div.download > a"
              // ).attr("href"),
              // thumbnail_url: ImageTitle.thumbnail_url,
              // title: ImageTitle.title,
            };

            resolve(result);
          })
          .catch((e) => {
            reject({
              status: false,
              message: "error fetch data",
              e: e.message,
            });
          });
      })
      .catch((e) => {
        reject({ status: false, message: "error fetch data", e: e.message });
      });
  });
}

async function RapidCare(url) {
  var ImageTitle = await TiktokCurl(url);
  // console.log(newJsonData);

  return new Promise((resolve, reject) => {
    // console.log("url" + newJsonData);
    var options = {
      method: "GET",
      url: "https://download-videos-tiktok.p.rapidapi.com/api-no-key/tiktok",
      params: {
        url: newUrl,
      },
      headers: {
        "x-rapidapi-host": "download-videos-tiktok.p.rapidapi.com",
        "x-rapidapi-key": "6391c63a56msh5cbfbb1f85ce12ep169585jsn9ff04ff29f12",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        const result = {
          nowm: response.data.data_nowatermark[0].url,
          wm: response.data.data_watermark[0].url,
          audio: response.data.data_music.url,
          thumbnail_url: response.data.thumbail,
          title: response.data.title,
        };

        resolve(result);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

async function tikdown(url) {
  // var ImageTitle = await TiktokCurl(url);
  // console.log(newJsonData);

  return new Promise((resolve, reject) => {
    const _token = "nf6sjiVZ18mssq2rKUlonZyLIafhRriYlLaOKpAo";
    // URL = `https://tikdown.org/getAjax?url=${url}&_token=${_token}`;
    // URL = `https://api.snaptikvideo.com/st-tik/tiktok/dl?url=${url}`;
    // URL = url;
    console.log(url);
    var options = {
      method: "POST",
      url: "https://ssyoutube.com/api/convert",
      // _token: _token,
      data: {
        url: url,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(typeof response.data);
        console.log(response.data.url[0].url);
        console.log(response.data.url[1].url);
        console.log(response.data.thumb);
        console.log(response.data.meta.title);

        //console.log(data);
        // //for tikdown.org
        // const $1 = cheerio.load(response.data.html);
        // const HtmlConvertData = $1.html();
        // const $ = cheerio.load(HtmlConvertData);
        // const imageFile = $("img.preview-image").attr("src");
        // const videoFile = $("a.button-primary").attr("href");
        // const audioFile = $("a.button-primary ").eq(1).attr("href");

        //for tikdown org
        const result = {
          nowm: response.data.url[0].url,
          wm: response.data.url[0].url,
          audio: response.data.url[1].url,
          thumbnail_url: response.data.thumb,
          title: response.data.meta.title,
        };

        // //for snaptikvideo
        // const result = {
        //   nowm: response.data.result.withoutWaterMarkVideo,
        //   wm: response.data.result.waterMarkVideo,
        //   audio: response.data.result.music,
        //   thumbnail_url: response.data.result.cover,
        //   title: response.data.result.desc,
        // };

        resolve(result);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

async function TiktokCurl(url) {
  var options = {
    method: "GET",
    url: url,

    followAllRedirects: true,
  };

  let result1 = url.includes("https://vm.tiktok.com/");

  if (result1) {
    try {
      console.log("tiktok");

      var newurl = await request(options, (err, response, body) => {
        var dataJJ = response.request.href.toString();
        newJsonData = dataJJ;
        return dataJJ;
      });

      console.log(newurl);
    } catch (error) {
      console.log(error);
    }
  } else {
    newJsonData = url;
  }
  // { method: "HEAD", url: url, followAllRedirects: true },
  // async function (err, response, body) {
  //   // console.log(response.request.href);

  var newJson = await axios({
    method: "GET",
    url: `https://www.tiktok.com/oembed?url=${newJsonData}`,
    headers: {
      "content-type": "application/json",
      "User-Agent":
        " Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 Edg/96.0.1054.62",
    },
  });

  console.log("newJson.data");
  // console.log(newJson.data.html);

  const $ = cheerio.load(newJson.data.html);
  // data1: $("#blockquote")?.attr("cite");
  // console.log($);
  let Newurl = $(".tiktok-embed").attr().cite;
  // ?.attr("cite")
  // console.log(Newurl.toString());
  // console.log(newJson.data);
  newUrl = Newurl.toString();

  return newJson.data;
}

module.exports.tiktokdownload = tiktokdownload;
module.exports.tikdown = tikdown;

module.exports.RapidCare = RapidCare;

// import fetch from "node-fetch";

const express = require("express");
const router = express.Router();
const { tiktokdownload, RapidCare, tikdown } = require("../function/index");
const axios = require("axios");

router.post("/api/url", async (req, res) => {
  const url = req.body.url;

  if (url == undefined) {
    res.status(404).send({ body: "url is undefined" });
    return;
  } else {
    const data = tikdown(url)
      .then(async (data) => {
        // if (data.nowm != undefined) {
        console.log(data);
        res.status(201).json({ data });
        // } else {
        //   let text = url;
        //   let result = text.includes("https://www.tiktok.com/");
        //   let result1 = text.includes("https://vm.tiktok.com/");
        //   let result2 = text.includes("https://m.tiktok.com/");

        //   //RapidCare(url)
        //   //tiktokdownload(url)

        //   if (result && result1 && result2) {
        //     console.log("RapidCare");
        //     const NewData = RapidCare(url).then(
        //       ((data) => {
        //         res.status(201).json({ data });
        //       }).catch((e) => {
        //         res.status(406).json({ data });
        //       })
        //     );
        //   } else {
        //     res.status(404).json({ data });
        //     return data;
        //   }
        // }
      })
      .catch((e) => {
        let text = url;
        let result = text.includes("https://www.tiktok.com/");
        let result1 = text.includes("https://vm.tiktok.com/");
        let result2 = text.includes("https://m.tiktok.com/");

        //RapidCare(url)
        //tiktokdownload(url)

        if (result && result1 && result2) {
          console.log("RapidCare");
          const NewData = tiktokdownload(url).then(
            ((data) => {
              res.status(201).json({ data });
            }).catch((e) => {
              res.status(404).json({ data });
            })
          );
        } else {
          res.status(404).json({ data });
          return data;
        }
      });
    return;
  }
});

router.post("/api/instagram/post", async (req, res) => {
  console.log(req.body.url);

  console.log(Date.now());

  // var data = {
  //   code: 200,
  //   msg: "OK",
  //   result: {
  //     count: 1,
  //     next: false,
  //     cursor: null,
  //     userId: null,
  //     insBos: [
  //       {
  //         id: null,
  //         url: "https://cdn.sssgram.com/instagram/Cb5YKpxM8fM252.jpg",
  //         type: "jpg",
  //         author: "satisfyingnaturehub",
  //         cover: "https://cdn.sssgram.com/instagram/Cb5YKpxM8fM967.jpg",
  //         thumb: "https://cdn.sssgram.com/instagram/Cb5YKpxM8fM161.jpg",
  //         desc: null,
  //         duration: null,
  //       },
  //     ],
  //   },
  // };

  try {
    const response = await axios.get(
      `https://api.sssgram.com/st-tik/ins/dl?url=${
        req.body.url
      }&timestamp=${Date.now()}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json({ data: "" });
    console.log(error);
  }

  // res.status(200).json({
  //   code: 200,
  //   msg: "OK",
  //   result: {
  //     count: 1,
  //     next: false,
  //     cursor: null,
  //     userId: null,
  //     insBos: [
  //       {
  //         id: null,
  //         url: "https://cdn.sssgram.com/instagram/Cb5YKpxM8fM252.jpg",
  //         type: "jpg",
  //         author: "satisfyingnaturehub",
  //         cover: "https://cdn.sssgram.com/instagram/Cb5YKpxM8fM967.jpg",
  //         thumb: "https://cdn.sssgram.com/instagram/Cb5YKpxM8fM161.jpg",
  //         desc: null,
  //         duration: null,
  //       },
  //     ],
  //   },
  // });
});

module.exports = router;

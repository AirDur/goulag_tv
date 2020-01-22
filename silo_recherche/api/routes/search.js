const express = require("express");
const router = express.Router();
const ytdl = require("ytdl-core");
const ytsr = require("ytsr")

router.get("/:filter", async (req, res) => {
    var list;
    var filter;
    filter = req.params.filter;
    console.log(filter);
    try{
        let filter1 =  await ytsr.getFilters(filter);
        console.log(filter1);
        let filtered1 = await filter1.get('Type').find(o => o.name === 'Video');
        let filter2 = await ytsr.getFilters(filtered1.ref);
        let filter3 = await filter2.get('Duration').find(o => o.name.startsWith('Short'));
        let options = {
          limit: 5,
          nextpageRef: filter3.ref,
        };
        list = await ytsr(null, options);
    } catch(error) {
        return Promise.reject(error);
    };
    res.send(list);
});

router.get("/video/:id", async (req, res) => {
    var id;
    id = req.params.id;

    ytdl.getInfo(id ,(err,info)=>{
      var format = ytdl.chooseFormat(info.formats, { quality: '18' })["url"];
      console.log(format);
      var obj_json_format = {
        ytlink : format
      }
      res.send(obj_json_format);
    });
});

router.get("/video/getinfos/:id", (req,res)=>{
  var id;
  id = req.params.id;

  ytdl.getBasicInfo(id, (err,info)=>{
    var obj_json_infos_video = {
      title : info.title,
      author : info.author.name,
      description : info.description,
      view_count : info.player_response.videoDetails.viewCount,
      thumbnail : info.player_response.videoDetails.thumbnail.thumbnails[2].url
    }
    res.send(obj_json_infos_video);
  });
});

module.exports = router;
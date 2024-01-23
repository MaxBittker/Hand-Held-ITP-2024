const fetch = require("node-fetch");
const fs = require("fs");
const https = require("https");
const AdmZip = require("adm-zip");
const { cookie } = require("./cookie.js");

let zipName = "export.zip";
let pageURL =
  "https://www.notion.so/Hand-Held-Creative-Tools-for-Phones-03187d072d6344eab9a7d065e1f9ae2d";

// fetch("https://www.notion.so/api/v3/enqueueTask", {
//   headers: {
//     accept: "*/*",
//     "accept-language": "en-US,en;q=0.9",
//     "cache-control": "no-cache",
//     "content-type": "application/json",
//     "notion-client-version": "23.13.0.78",

//     pragma: "no-cache",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-notion-active-user-header": "d9ea804d-bca9-4be1-904d-0c809b81fb50",
//     cookie: cookie,
//   },
//   referrer: pageURL,
//   referrerPolicy: "same-origin",
//   body: '{"task":{"eventName":"exportBlock","request":{"block":{"id":"03187d07-2d63-44ea-b9a7-d065e1f9ae2d","spaceId":"94b22790-65ca-4658-b6e3-9d7c2a04f62c"},"recursive":false,"exportOptions":{"exportType":"html","timeZone":"America/New_York","locale":"en","collectionViewExportType":"currentView","preferredViewMap":{"17af138b-486b-474d-bae5-3cfe879018a7":"526897ce-6f3e-4600-a131-fcb57284d69b"}},"shouldExportComments":false}}}',
//   method: "POST",
//   mode: "cors",
// }).then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//     let { taskId } = data;
//     getTasks(taskId);
//   });
// });

// fetch("https://www.notion.so/api/v3/enqueueTask", {
//   headers: {
//     accept: "*/*",
//     "accept-language": "en-US,en;q=0.9",
//     "content-type": "application/json",
//     "notion-audit-log-platform": "web",
//     "sec-ch-ua":
//       '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": '"macOS"',
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-notion-active-user-header": "d9ea804d-bca9-4be1-904d-0c809b81fb50",
//     cookie:
//       'notion_browser_id=604290cf-21ed-4a60-94a1-7d9c4f5e8688; notion_experiment_device_id=0c685b58-45aa-494a-bd57-5ac721dceb1e; NEXT_LOCALE=en-US; intercom-device-id-gpfdrxfd=78f3ca73-b5ab-4f43-9f68-2900d108041c; tatari-session-cookie=06119867-0b88-f8cd-e384-35b853e9ac87; _tt_enable_cookie=1; _ttp=inAiLtAbXT_ZqcFCEl61hmIL6fx; intercom-id-gpfdrxfd=756bfe20-669e-4474-8933-55bf7ddde309; g_state={"i_l":0}; token_v2=v02%3Auser_token_or_cookies%3AwLNuXUEVQAsgob6Ty1LwBUTfuPuKfMVz4yZfUfYLk2z20Ak7VpTEhYW00R7cLOeZZQn1vr9Vlti5IPdjngWUZKnsfI8sPAcBuN8gV1iAWko5gKVVdRGxEvp0vPX5JpKJuqt7; notion_user_id=d9ea804d-bca9-4be1-904d-0c809b81fb50; notion_users=[%22d9ea804d-bca9-4be1-904d-0c809b81fb50%22]; _cfuvid=v2rOYm97bjr6QHc3vw.Up1iNpgs0OF.dZ5HmEcgpdSY-1705978283729-0-604800000; notion_check_cookie_consent=false; notion_locale=en-US/legacy; intercom-session-gpfdrxfd=cEZsWUt6WkxBK0ZZNXhjcHFJL0ptUEZWYjNibVB0Umk5YVMyVmNiWW9TaFA2SlpXSHBSRXprdDlhQklXbjhoYS0tVlpyd0x2LzNXQ3ZFNmdNYWJ3T0pNdz09--7ab07309e246ba476d13cf81e1157b0bc13d28a5; __cf_bm=SLIBuI9XjmybQ0OVtygoU5gW4oB2JTUvKLoovVPqQzo-1705979226-1-AY/3bAwUN9gprS5XK8Suh1poGoOAIsaeHvrG8Ck1L2Zc1esBFIc/cH1C1wSa+n3IWx2mkDtLNbG12cUR6X2LkJY=; amp_af43d4=604290cf21ed4a6094a17d9c4f5e8688.ZDllYTgwNGRiY2E5NGJlMTkwNGQwYzgwOWI4MWZiNTA=..1hkq3ojpb.1hkq4obvp.2tr.n3.3ku; AWSALBTG=Vql+3OfaN+9B8DYLKhOcF2YdNLkdzcOJl3Xe0BJhp/RStYPkq6gmfrX1ZbdMSmACkGq01tTdFv7tzU5UOxUo/4qOJqs8qXWn3pgtFrebf0nyjjnv8j0iAN2TzXhNdLiH5oPlicrY9Umur2xSVm3CaJZ55e3JG2ABkJvAd/gneESC; AWSALBTGCORS=Vql+3OfaN+9B8DYLKhOcF2YdNLkdzcOJl3Xe0BJhp/RStYPkq6gmfrX1ZbdMSmACkGq01tTdFv7tzU5UOxUo/4qOJqs8qXWn3pgtFrebf0nyjjnv8j0iAN2TzXhNdLiH5oPlicrY9Umur2xSVm3CaJZ55e3JG2ABkJvAd/gneESC',
//     Referer:
//       "https://www.notion.so/Hand-Held-Creative-Tools-for-Phones-03187d072d6344eab9a7d065e1f9ae2d",
//     "Referrer-Policy": "strict-origin-when-cross-origin",
//   },
//   method: "POST",
// });

function getTasks(task_id) {
  fetch("https://www.notion.so/api/v3/getTasks", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "content-type": "application/json",
      "notion-client-version": "23.2.3",
      pragma: "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-notion-active-user-header": "d9ea804d-bca9-4be1-904d-0c809b81fb50",
      cookie: cookie,
    },
    referrer: pageURL,
    referrerPolicy: "same-origin",
    body: `{"taskIds":["${task_id}"]}`,
    method: "POST",
    mode: "cors",
  }).then((response) => {
    response.json().then((data) => {
      let { results } = data;
      console.log(results.length);

      if (results.length == 0) {
        getTasks(task_id);
      } else {
        let { state, status } = results[0];
        console.log(state);
        if (state == "in_progress") {
          getTasks(task_id);
        } else {
          console.log(status);
          console.log(status.exportURL);
          downloadZip(status.exportURL, zipName);
        }
      }
    });
  });
}

function downloadZip(url, localPath) {
  console.log("downloading zip");
  var file = fs.createWriteStream(localPath);
  var request = https.get(
    url,
    {
      headers: {
        Cookie: cookie,
      },
    },
    function (response) {
      response.pipe(file);
    }
  );
  file.on("finish", () => {
    file.close();
    buildFromZip();
  });
}
function buildFromZip() {
  console.log("unzipping");
  var zip = new AdmZip("./" + zipName);

  zip.getEntries().forEach(function (entry) {
    var entryName = entry.entryName;
    var decompressedData = zip.readFile(entry); // decompressed buffer of the entry
    console.log(entryName);
    if (entryName.endsWith(".html") && entryName != "index.html") {
      let currentHTML = zip.readAsText(entry);
      const charset = `<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>`;
      const viewportMeta = `<meta name="viewport" content="width=device-width, initial-scale=1">`;
      let fontTag = `<link href="//fonts.googleapis.com/css?family=Merriweather&subset=latin" rel="stylesheet" type="text/css">`;

      const style = `
        <style>
        body{
          padding: 1em !important;
        }
        html{
          overflow-x: hidden;
        }
        h1, h2, h3, h4, h5 {
        font-family: 'Merriweather', sans-serif;
        }
        </style>`;
      let payload = charset + viewportMeta + fontTag + style;
      let newHTML = currentHTML.replace(charset, payload);
      // zip.updateFile(entry, newHTML);
      zip.deleteFile(entry);
      zip.addFile("index.html", newHTML);
    }
  });
  zip.extractAllTo("../", /*overwrite*/ true);
}

buildFromZip();

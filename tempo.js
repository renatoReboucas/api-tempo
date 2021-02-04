const puppeteer = require("puppeteer");


// async function roboTempo(){
//   const browser = await puppeteer.launch({ headless: false, ignoreHTTPSErrors: true });
//   const page = await browser.newPage();
//   const url = "https://www.google.com/search?client=firefox-b-d&q=google+tempo";
//   await page.goto(url);
//   // await page.screenshot({ path: "example.png" });

//     const resultado = await page.evaluate(() => {
//       let temperatura = document.querySelector("#wob_tm").outerText + "°C";
//       const data = document.querySelector("#wob_dts").outerText
//       const local = document.querySelector("#wob_loc").outerText
//       const infoAtual = document.querySelector("#wob_dc").textContent
//       const infoTemp = document.querySelector('#wob_dp > div.wob_df.wob_ds > div.DxhUm > img').alt
//       const maxTemp = document.querySelector('#wob_dp > div.wob_df.wob_ds > div.wNE31c > div.vk_gy.gNCp2e > span:nth-child(1)').textContent + "°C"
//       const minTemp = document.querySelector('#wob_dp > div.wob_df.wob_ds > div.wNE31c > div.QrNVmd.ZXCv8e > span:nth-child(1)').textContent + "°C"
//       return {
//         temperatura: temperatura,
//         data: data,
//         local: local,
//         infoAtual:infoAtual,
//         infoTemp: infoTemp,
//         maxTemp: maxTemp,
//         minTemp: minTemp,
//       };
//     });
//     // console.log(resultado);
//   await browser.close();
//     return resultado
// }

// roboTempo()
exports.roboTempo = async function (req, res) {
   const browser = await puppeteer.launch({
     headless: true,
     ignoreHTTPSErrors: true,
   });
   const page = await browser.newPage();
   const url =
     "https://www.google.com/search?client=firefox-b-d&q=google+tempo";
   await page.goto(url);
   // await page.screenshot({ path: "example.png" });

   const resultado = await page.evaluate(() => {
     let temperatura = document.querySelector("#wob_tm").outerText + "°C";
     const data = document.querySelector("#wob_dts").outerText;
     const local = document.querySelector("#wob_loc").outerText;
     const infoAtual = document.querySelector("#wob_dc").textContent;
     const infoTemp = document.querySelector(
       "#wob_dp > div.wob_df.wob_ds > div.DxhUm > img",
     ).alt;
     const maxTemp =
       document.querySelector(
         "#wob_dp > div.wob_df.wob_ds > div.wNE31c > div.vk_gy.gNCp2e > span:nth-child(1)",
       ).textContent + "°C";
     const minTemp =
       document.querySelector(
         "#wob_dp > div.wob_df.wob_ds > div.wNE31c > div.QrNVmd.ZXCv8e > span:nth-child(1)",
       ).textContent + "°C";
     return {
       temperatura: temperatura,
       data: data,
       local: local,
       infoAtual: infoAtual,
       infoTemp: infoTemp,
       maxTemp: maxTemp,
       minTemp: minTemp,
     };
   });
   // console.log(resultado);
   await browser.close();
   res.json(resultado);
};
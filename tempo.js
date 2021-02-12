const puppeteer = require("puppeteer");
const QNeo4j = require("@qualitech/qneo4j");
const db = require('./connect')
const { format, compareAsc }  = require("date-fns")

exports.roboTempo = async function (req, res) {
   const browser = await puppeteer.launch({
     headless: false,
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
     const local = document.querySelector("#wob_loc").outerText.split(',')[1].split('-')[0].trim();
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
  //  console.log(format(new Date(), "dd/MM/yyyy HH:mm"));
   const data = format(new Date(), "dd/MM/yyyy HH:mm");
   const query = `create (l:Cidade {local: $local})-[:Previsao]->
   
   (t:Tempo 
    { 
      temperatura: $temperatura,
       data: $data,
       
       infoAtual: $infoAtual,
       infoTemp: $infoTemp,
       maxTemp: $maxTemp,
       minTemp: $minTemp }
    ) return l, t`;
   const params = {
     temperatura: resultado.temperatura,
     data: data,
     local: resultado.local,
     infoAtual: resultado.infoAtual,
     infoTemp: resultado.infoTemp,
     maxTemp: resultado.maxTemp,
     minTemp: resultado.minTemp,
   };
   await db.execute({ cypher: query, params: params });
   await browser.close();
   res.json(resultado);
};
const customLibs = require('../custom_libs/fighter-weight-converter');
const puppeteer = require("puppeteer");
const chalk = require("chalk");
const fs = require("fs");
const error = chalk.bold.red;
const success = chalk.keyword("green");
const links = require('./fighter-dob.json');
const { Fighter } = require('../models');

const scrape = async() => {
    try {
  //      let fighters = await Fighter.findAll({raw: true});
        let browser = await puppeteer.launch({ headless: false, devtools: true, slowMo: 250 });
        // open a new page
        let page = await browser.newPage();
        // enter url in page
        page.on('console', msg => {
            for (let y = 0; y < msg.args().length; y++) {
                console.log(msg.args()[y]);
            }
        });
        let collectedStats = [];
        let url ='http://ufcstats.com/';
        await page.goto(url);
        await page.waitForSelector('body');
        for (let i = 0; i < links.length; i++){
            // let id = fighters[i]["id"];
            // let fighterPage = fighters[i]["link"];

            let id;
            let fighterPage;
            if (links[i] && links[i]["id"]){
                id = links[i]["id"];
                fighterPage = links[i]["link"];
            }
            if (fighterPage !== 'none' && fighterPage){

            
            await page.goto(fighterPage);
            await page.waitForSelector('body');
            let search = await page.evaluate(async (id, fighterPage) => {
                let height = document.querySelector('body > section > div > div > div.b-list__info-box.b-list__info-box_style_small-width.js-guide > ul > li:nth-child(1)').innerText.replace(/^[^:]*:/, "").trim();
                let reach = document.querySelector('body > section > div > div > div.b-list__info-box.b-list__info-box_style_small-width.js-guide > ul > li:nth-child(3)').innerText.replace(/^[^:]*:/, "").trim();
                let stance = document.querySelector('body > section > div > div > div.b-list__info-box.b-list__info-box_style_small-width.js-guide > ul > li:nth-child(4)').innerText.replace(/^[^:]*:/, "").trim();
                let dob = document.querySelector('body > section > div > div > div.b-list__info-box.b-list__info-box_style_small-width.js-guide > ul > li:nth-child(5)').innerText.replace(/^[^:]*:/, "").trim();
                let sLpM = document.querySelector('body > section > div > div > div.b-list__info-box.b-list__info-box_style_middle-width.js-guide.clearfix > div.b-list__info-box-left.clearfix > div.b-list__info-box-left > ul > li:nth-child(1)').innerText.replace(/^[^:]*:/, "").trim();
                let slaccuracy = document.querySelector('body > section > div > div > div.b-list__info-box.b-list__info-box_style_middle-width.js-guide.clearfix > div.b-list__info-box-left.clearfix > div.b-list__info-box-left > ul > li:nth-child(2)').innerText.replace(/^[^:]*:/, "").trim();
                let sapminute = document.querySelector('body > section > div > div > div.b-list__info-box.b-list__info-box_style_middle-width.js-guide.clearfix > div.b-list__info-box-left.clearfix > div.b-list__info-box-left > ul > li:nth-child(3)').innerText.replace(/^[^:]*:/, "").trim();
                let strdef = document.querySelector('body > section > div > div > div.b-list__info-box.b-list__info-box_style_middle-width.js-guide.clearfix > div.b-list__info-box-left.clearfix > div.b-list__info-box-left > ul > li:nth-child(4)').innerText.replace(/^[^:]*:/, "").trim();
                let tdavg = document.querySelector('body > section > div > div > div.b-list__info-box.b-list__info-box_style_middle-width.js-guide.clearfix > div.b-list__info-box-left.clearfix > div.b-list__info-box-right.b-list__info-box_style-margin-right > ul > li:nth-child(2)').innerText.replace(/^[^:]*:/, "").trim();
                let tdacc = document.querySelector('body > section > div > div > div.b-list__info-box.b-list__info-box_style_middle-width.js-guide.clearfix > div.b-list__info-box-left.clearfix > div.b-list__info-box-right.b-list__info-box_style-margin-right > ul > li:nth-child(3)').innerText.replace(/^[^:]*:/, "").trim();
                let tddef = document.querySelector('body > section > div > div > div.b-list__info-box.b-list__info-box_style_middle-width.js-guide.clearfix > div.b-list__info-box-left.clearfix > div.b-list__info-box-right.b-list__info-box_style-margin-right > ul > li:nth-child(4)').innerText.replace(/^[^:]*:/, "").trim();
                let subattperfifteen = document.querySelector('body > section > div > div > div.b-list__info-box.b-list__info-box_style_middle-width.js-guide.clearfix > div.b-list__info-box-left.clearfix > div.b-list__info-box-right.b-list__info-box_style-margin-right > ul > li:nth-child(5)').innerText.replace(/^[^:]*:/, "").trim();
                let nickname = document.querySelector('body > section > div > p').innerText.replace(/^[^:]*:/, "").trim();
                let record = document.querySelector('body > section > div > h2 > span.b-content__title-record').innerText.replace(/^[^:]*:/, "").trim();
                return { fighterId: id, height, reach, stance, dob, sLpM, slaccuracy, sapminute, strdef, tdavg, tdacc, tddef, subattperfifteen, nickname, record}
            }, id, fighterPage)
            collectedStats.push(search);
            console.log(collectedStats)
            }
        }


        await browser.close();
        fs.writeFile("fighters-collected-stats.json", JSON.stringify(collectedStats), function (err) {
            if (err) throw err;
            console.log("Saved!");
        });
    } catch (error) {
        console.log(error);
    }
}


scrape();
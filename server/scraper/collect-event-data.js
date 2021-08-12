//import { listenPageErrors } from './log';
const axios = require('axios');
const cheerio = require('cheerio');
const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
const url = 'http://ufcstats.com/statistics/events/completed';
//const $ = require('jquery');
const puppeteer = require("puppeteer");
const chalk = require("chalk");
const fs = require("fs");

// MY OCD of colorful console.logs for debugging... IT HELPS
const error = chalk.bold.red;
const success = chalk.keyword("green");
//<a href="http://ufcstats.com/event-details/4a35913bd9aa4161" class="b-link b-link_style_black">
//UFC Fight Night: Whittaker vs.Gastelum
(async () => {
    try {
        // open the headless browser
        let browser = await puppeteer.launch({ headless: false, devtools: true, slowMo: 250 });
        // open a new page
        let page = await browser.newPage();
        // enter url in page
        await page.goto(url);
        await page.$$('a');
        page.on('console', msg => {
            for (let i = 0; i < msg.args().length; i++) {
                console.log(msg.args()[i]);
            }
        });
        
        let news = await page.evaluate(() => {
            let links = document.querySelectorAll(`a`);
            // let scoreList = document.querySelectorAll(`span.score`);
            let titleLinkArray = [];
            let j = 0;
            for (let i = 0; i < links.length; i++) {
                titleLinkArray[i] = {
                    title: links[i].innerText.trim(),
                    link: links[i].getAttribute("href"),
                    // age: ageList[i].innerText.trim(),
                    // score: scoreList[i].innerText.trim()
                };
                
            }
            
            // links.map((link) => {
            //     console.log(link)
            // })
           return titleLinkArray;
         //   console.log(titleLinkArray);
        });
        //news();
        //console.log(titleLinkArray);
        let browserArr =    [];
        let z = 0;
        for (let k = 0; k < news.length; k++){
            if (news[k].link){
                let z = 0;
                if (news[k].link.includes('event-details')) {
                    await page.goto(news[k].link);
                    await page.$$('a');
                    let getLinks = await page.evaluate(() => {
                        let fightLinks = document.querySelectorAll(`a`);
                        let newLinksArray = []
                        // let scoreList = document.querySelectorAll(`span.score`);
                        for (let i = 0; i < fightLinks.length; i++) {
                            newLinksArray[i] = {
                                title: fightLinks[i].innerText.trim(),
                                link: fightLinks[i].getAttribute("href"),
                                date: document.querySelector('body > section > div > div > div.b-list__info-box.b-list__info-box_style_large-width > ul > li:nth-child(1)').innerText
                                // age: ageList[i].innerText.trim(),
                                // score: scoreList[i].innerText.trim()
                            };

                        }

                        return newLinksArray


                    });
                    
                    browserArr.push(z = getLinks);
                    z++;
                }
            }    
               

        }
        

        // let fightsLinksArr = [];
        // outerArr = [];
        
        // browserArr.map(async(statl) => {
            
        //     if (statl){
        //         (async () => {
        //             //let newPage = await browserArr[i].click();
        //             if (statl.link){
        //             //   let newPage = await statl.click();
                        

        //                 await page.goto(statl.link);
        //                 await page.$$('a');
                       
        //                 fightsLinksArr.push(getLinks);

        //             }
        //         })
        //     }
            
        // })
        // console.log(news);
        await browser.close();
        // Writing the news inside a json file
       
        fs.writeFile("event-data.json", JSON.stringify(browserArr), function (err) {
            if (err) throw err;
            console.log("Saved!");
        });
        console.log(success("Browser Closed"));
    } catch (err) {
        // Catch and display errors
        console.log(error(err));
        await browser.close();
        console.log(error("Browser Closed"));
    }
})();
// (async () => {
//     //const html = await axios.get('http://ufcstats.com/event-details/4a35913bd9aa4161');
//     const html = await axios.get('http://ufcstats.com/fight-details/f67aa0b16e16a9ea');

//     const $ = await cheerio.load(html.data);
//     let data = []
//     $("body").each((i, elem) => {
        
//         // data.push({
//         //     table: $(elem).find("table")
//         // })
//         const section = $(elem).find("section");
//         const table = $(section).find("table");
//         const tbody = $(table).find("tbody");
//         const rows = $(tbody).find("tr");
//         rows.each((i, row) => {
//             const td = $(row).find("td");
//             const pd = $(td).find("p").text();
//             let pd2 = pd.replace(/\n|\r/g, "");
//             pd2 = pd2.replace(/\s+/g, ' ').trim().split(' ');
//             data.push([pd2]);
//         })
//     })
//     let mt= data[0][0];
//     // [
//     //     'Robert', 'Whittaker', 'Kelvin',
//     //     'Gastelum', '0', '0',
//     //     '150', 'of', '284',
//     //     '62', 'of', '209',
//     //     '52%', '29%', '169',
//     //     'of', '303', '70',
//     //     'of', '218', '4',
//     //     'of', '7', '1',
//     //     'of', '5', '57%',
//     //     '20%', '0', '0',
//     //     '0', '0', '4:19',
//     //     '0:26'
//     // ]

//     let statsObjOne = {
//         fighterFirst: mt[0],
//         fighterLast: mt[1],
//         opponentFirst: mt[2],
//         opponentLast: mt[3],
//         KD: mt[4],
//         opponentKd: mt[5],
//         sigLand: mt[6],
//         sigAttempt: mt[8],
//         opponentSigLanded:  mt[9],
//         oppenentSigAttempted: mt[11],
//         tdLanded: mt[20],
//         tdAttempted: mt[22],
//         opponentTdLanded: mt[23],
//         opponentTdAttempted: mt[25],
//         ctrlTime: mt[32],
//         oppCtrTime: mt[33],
//     };
//     let statsTwoObj = {
//         fighterFirst: mt[2],
//         fighterLast: mt[3],
//         opponentFirst: mt[0],
//         opponentLast: mt[1],
//         KD: mt[5],
//         opponentKd: mt[4],
//         sigLand: mt[9],
//         sigAttempt: mt[11],
//         opponentSigLanded: mt[6],
//         oppenentSigAttempted: mt[8],
//         tdLanded: mt[23],
//         tdAttempted: mt[25],
//         opponentTdLanded: mt[20],
//         opponentTdAttempted: mt[22],
//         ctrlTime: mt[33],
//         oppCtrTime: mt[32],
//     }
//     let fight = [statsObjOne, statsTwoObj];
//     return fight;
// })();
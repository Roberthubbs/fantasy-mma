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

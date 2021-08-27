const axios = require('axios');
const cheerio = require('cheerio');
const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
const url = 'http://ufcstats.com/statistics/events/completed';
//const $ = require('jquery');
const puppeteer = require("puppeteer");
const chalk = require("chalk");
const fs = require("fs");
const { Events } = require('../models');
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
        
        let events = await page.evaluate(() => {
            let links = document.querySelectorAll(`a`);
            // let scoreList = document.querySelectorAll(`span.score`);
            let titleLinkArray = [];
            let j = 0;
            // for (let i = 0; i < 10; i++) {
            //     titleLinkArray[i] = {
            //         title: links[i].innerText.trim(),
            //         link: links[i].getAttribute("href"),
            //         // age: ageList[i].innerText.trim(),
            //         // score: scoreList[i].innerText.trim()
            //     };
                
            // }
            let mostRecentLink = links[7].getAttribute("href");
            let mostRecentTitle = links[7].innerText.trim();
            let date = document.querySelector('body > section > div > div > div > div.b-statistics__sub-inner > div > table > tbody > tr:nth-child(3) > td:nth-child(1) > i > span').innerText;

            
           return {link: mostRecentLink, title: mostRecentTitle, date: date};
         //   console.log(titleLinkArray);
        });


        let event = await Events.create(events);
        
        

        await browser.close();
        // Writing the news inside a json file
       
       
        console.log(success("Browser Closed"));
    } catch (err) {
        // Catch and display errors
        console.log(error(err));
        await browser.close();
        console.log(error("Browser Closed"));
    }
})();
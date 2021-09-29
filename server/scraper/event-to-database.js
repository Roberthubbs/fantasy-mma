const { addFights } = require('./db-transactions-latest');
const axios = require('axios');
const cheerio = require('cheerio');
let fightsArr = [];
const fs = require("fs");
const puppeteer = require("puppeteer");
const chalk = require("chalk");
const parse = require('parse-json');
const success = chalk.keyword("green");
const { Events } = require('../models');
//const events = parse(json);






(async () => {
    let browser = await puppeteer.launch({ devtools: true });

    try {
        // open a new page
        let fights = [];
        let page = await browser.newPage();
        page.on('console', msg => {
            for (let i = 0; i < msg.args().length; i++) {
                console.log(msg.args()[i]);
            }
        });
            let event = await Events.findOne({order: [ [ 'createdAt', 'DESC' ]]});
            let link = event.link;
            let date = event.date;
            let fighterOneLink;
            let fighterTwoLink;
            await page.goto(link)
            await page.waitForSelector('body');
            debugger;
            let links = await page.evaluate(async() => {
                let selector = document.querySelectorAll('a');
                let hrefs = []
                selector.forEach((selection) => {
                    hrefs.push(selection.href)
                })
                return hrefs;
            })
            let linksForFight = [];
            console.log(links);
            links.forEach((li) => {
                if (li.includes('fight-details')){
                    linksForFight.push(li)
                }
            })
            
            for (let i = 0; i < linksForFight.length; i++){
                await page.goto(linksForFight[i])
                await page.waitForSelector('body');
                let fight= await page.evaluate(async(date, i) => {
                // await page.$$('a');
                
                let data = []
                let table = document.querySelectorAll('body > section > div > div > section:nth-child(4) > table > tbody > tr > td');
                let fOne = 
                    document.querySelector('body > section > div > div > div.b-fight-details__persons.clearfix > div:nth-child(1) > div > h3 > a').innerText;
                fighterOneLink = 
                document.querySelector('body > section > div > div > div.b-fight-details__persons.clearfix > div:nth-child(1) > div > h3 > a').href;
                
                //fOne = fOne.innerText
                // let fOneRes =  document.querySelector('body > section > div > div > div.b-fight-details__persons.clearfix > div:nth-child(1) > i');
                // fOneRes =fOneRes.innerText;
                let fOneRes = 
                    document.querySelector('body > section > div > div > div.b-fight-details__persons.clearfix > div:nth-child(1) > i').innerText
                
                let fTwo  = 
                    document.querySelector('body > section > div > div > div.b-fight-details__persons.clearfix > div:nth-child(2) > div > h3 > a').innerText;
                
                fighterTwoLink = document.querySelector('body > section > div > div > div.b-fight-details__persons.clearfix > div:nth-child(2) > div > h3 > a').href;

                //fOne = fOne.innerText
                // let fOneRes =  document.querySelector('body > section > div > div > div.b-fight-details__persons.clearfix > div:nth-child(1) > i');
                // fOneRes =fOneRes.innerText;
                let fTwoRes =
                    document.querySelector('body > section > div > div > div.b-fight-details__persons.clearfix > div:nth-child(2) > i').innerText;
               
                
                //fTwoRes = fTwoRes.innerText;
                
                let fighterOne = {};
                let fighterTwo = {};

                fighterOne.fightDate = date;
                fighterTwo.fightDate = date;
                fighterOne.fighterLink = fighterOneLink;
                fighterTwo.fighterLink = fighterTwoLink;
                let stats = []
                const index = i;
                table.forEach((el, idx) => {
                    if (idx == 0){
                        fighterOne.name = el.firstElementChild.firstElementChild.innerText;
                        fighterTwo.name = el.lastElementChild.firstElementChild.innerText;
                        if (fighterOne.name == fOne){
                            fighterOne.result == fOneRes;
                        } 
                        if (fighterTwo.name == fTwo) {
                            fighterTwo.result == fTwoRes;
                        }
                        if (fighterTwo.name == fOne) {
                            fighterTwo.result == fOneRes;
                        }
                        if (fighterOne.name == fTwo) {
                            fighterOne.result == fTwoRes;
                        } 
                        
                        fighterOne.result = document.querySelector('body > section > div > div > div.b-fight-details__persons.clearfix > div:nth-child(1) > i').innerText;
                        fighterTwo.result = document.querySelector('body > section > div > div > div.b-fight-details__persons.clearfix > div:nth-child(2) > i').innerText;
                        fighterOne.method = document.querySelector('body > section > div > div > div.b-fight-details__fight > div.b-fight-details__content > p:nth-child(1) > i.b-fight-details__text-item_first > i:nth-child(2)').innerText;
                        fighterTwo.method = document.querySelector('body > section > div > div > div.b-fight-details__fight > div.b-fight-details__content > p:nth-child(1) > i.b-fight-details__text-item_first > i:nth-child(2)').innerText;
                        fighterOne.weightClass = document.querySelector('body > section > div > div > div.b-fight-details__fight > div.b-fight-details__fight-head > i').innerText;
                        fighterTwo.weightClass = document.querySelector('body > section > div > div > div.b-fight-details__fight > div.b-fight-details__fight-head > i').innerText
                        if (document.querySelector('body > section > div > div > div.b-fight-details__fight > div.b-fight-details__fight-head > i > img:nth-child(1)') && document.querySelector('body > section > div > div > div.b-fight-details__fight > div.b-fight-details__fight-head > i > img:nth-child(1)').src.includes('belt')){
                            if (fighterTwo.result == 'W') {
                                fighterTwo.champWin = true;
                                fighterOne.champWin = false;
                            } else if (fighterOne.result == "W") {
                                fighterOne.champWin = true;
                                fighterTwo.champWin = false;
                            }
                            if (document.querySelector('body > section > div > div > div.b-fight-details__fight > div.b-fight-details__fight-head > i > img:nth-child(2)') && document.querySelector('body > section > div > div > div.b-fight-details__fight > div.b-fight-details__fight-head > i > img:nth-child(2)').src.includes('perf')) {
                                if (fighterTwo.result == 'W') {
                                    fighterTwo.bonusWin = true;
                                    fighterOne.bonusWin = false;
                                } else if (fighterOne.result == "W") {
                                    fighterOne.bonusWin = true;
                                    fighterTwo.bonusWin = false;
                                }

                            } else if (document.querySelector('body > section > div > div > div.b-fight-details__fight > div.b-fight-details__fight-head > i > img:nth-child(2)') && document.querySelector('body > section > div > div > div.b-fight-details__fight > div.b-fight-details__fight-head > i > img:nth-child(2)').src.includes('fight')) {

                                fighterTwo.bonusWin = true;
                                fighterOne.bonusWin = true;

                            } else {
                                fighterOne.bonusWin = false;
                                fighterTwo.bonusWin = false;
                            }
                        
                        } else
                        { 
                            if (document.querySelector('body > section > div > div > div.b-fight-details__fight > div.b-fight-details__fight-head > i > img') && document.querySelector('body > section > div > div > div.b-fight-details__fight > div.b-fight-details__fight-head > i > img').src.includes('perf')){
                            if (fighterTwo.result == 'W'){
                                fighterTwo.bonusWin = true;
                                fighterOne.bonusWin = false;
                            } else if (fighterOne.result == "W"){
                                fighterOne.bonusWin = true;
                                fighterTwo.bonusWin= false;
                            }
                        
                        } else if (document.querySelector('body > section > div > div > div.b-fight-details__fight > div.b-fight-details__fight-head > i > img') && document.querySelector('body > section > div > div > div.b-fight-details__fight > div.b-fight-details__fight-head > i > img').src.includes('fight')) {
                            
                                fighterTwo.bonusWin = true;
                                fighterOne.bonusWin = true;
                           
                        } else {
                            fighterOne.bonusWin = false;
                            fighterTwo.bonusWin = false;
                        }
                        }
                    }
                    else if(idx ==1){
                        fighterOne.knockDowns = el.firstElementChild.innerText.trim()
                        fighterTwo.knockDowns = el.lastElementChild.innerText.trim()

                    
                    } else if (idx == 2){
                        let sigs = el.firstElementChild.innerText.trim().split(' of ');
                        fighterOne.sigLanded = sigs[0];
                        fighterOne.sigAttempted = sigs[1];
                        sigs = el.lastElementChild.innerText.trim().split(' of ');
                        fighterTwo.sigLanded = sigs[0];
                        fighterTwo.sigAttempted = sigs[1];
                    } else if (idx == 4){
                        let total = el.firstElementChild.innerText.trim().split(' of ');
                        fighterOne.totalLanded = total[0];
                        fighterOne.totalAttempted = total[1];
                        total = el.lastElementChild.innerText.trim().split(' of ');
                        fighterTwo.totalLanded = total[0];
                        fighterTwo.totalAttempted = total[1];
                    }  
                    else if (idx ==5){
                        let tds = el.firstElementChild.innerText.trim().split(' of ');
                        fighterOne.tdLanded = tds[0];
                        fighterOne.tdAttempted = tds[1];
                        tds = el.lastElementChild.innerText.trim().split(' of ');
                        fighterTwo.tdLanded = tds[0];
                        fighterTwo.tdAttempted = tds[1];
                    } else if (idx == 7) {
                        fighterOne.subAttempts = el.firstElementChild.innerText.trim();
                        fighterTwo.subAttempts = el.lastElementChild.innerText.trim();

                    } else if (idx == 9) {
                        fighterOne.ctrlTime = el.firstElementChild.innerText.trim();
                        fighterTwo.ctrlTime = el.lastElementChild.innerText.trim();
                    }
                   
                })
                const object = {[index]: {
                    fighterOne,
                    fighterTwo,
                }}
                
                return object
            }, date, i);

            fights.push(fight);
            console.log(fights);
 //           return fight;
            if (fight && fight[i]){
                await page.goto(fight[i]['fighterTwo']['fighterLink']);
                let fighterTwoDob = await page.evaluate(async () => {
                    return document.querySelector('body > section > div > div > div.b-list__info-box.b-list__info-box_style_small-width.js-guide > ul > li:nth-child(5)').innerText;
                })

                await page.goto(fight[i]['fighterOne']['fighterLink']);
                let fighterOneDob = await page.evaluate(async () => {
                    return document.querySelector('body > section > div > div > div.b-list__info-box.b-list__info-box_style_small-width.js-guide > ul > li:nth-child(5)').innerText;
                })
                console.log(fight[i], ": 226 Fight Printed")

                fight[i]['fighterOne']['dob'] = fighterOneDob;
                fight[i]['fighterTwo']['dob'] = fighterTwoDob;
                fights[fights.length - 1][i]['fighterOne']['dob'] = fighterOneDob;
                fights[fights.length - 1][i]['fighterTwo']['dob'] = fighterTwoDob;
                addFights(fight, i);
            }
        }
            
            
        
    
        // enter url in page
           
       

        
        await browser.close();
        
        fs.writeFile("recent-fight-data.json", JSON.stringify(fights), function (err) {
            if (err) throw err;
            console.log("Saved!");
        });
        // fights.forEach(async(fight) => {
        //     await addFights(fight);
        // })
        console.log(success("Browser Closed"));
        
    } catch (err) {
        // Catch and display errors
        console.log(err);
        await browser.close();
        console.log("Browser Closed");
    } 
})();



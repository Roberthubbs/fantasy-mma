const axios = require('axios');
const cheerio = require('cheerio');
const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
const url = 'http://ufcstats.com/statistics/fighters/';
//const $ = require('jquery');
const puppeteer = require("puppeteer");
const chalk = require("chalk");
const fs = require("fs");


const error = chalk.bold.red;
const success = chalk.keyword("green");
const { Fighter, LeagueFighter, Player, sequelize, LeagueAuction } = require('../models');

(async() => {
    try{
        let fighters = await Fighter.findAll({ raw: true });
        let page = await puppeteer.launch(url);
        for (let i = 0; i < 5; i++){
            let fullName = fighters[i]["lastName"];
            let searchQuery = fullName.split(' ').join('+');
            let tempUrl = url+'search?query='+searchQuery;
            await page.goto(tempUrl);
            let search = await page.evaluate(async() => {
                let table = document.querySelector('body > section > div > div > div > table > tbody');
                //todo search through the table for fighters that match
                
                let tableRows = table.children;
                if (table.children.length < 2){
                    return;
                }
                for (let j = 1; j < tableRows.length; j++){
                    let cells = tableRows[j].children;
                    for (let m = 0; m < cells.length; m++){
                        
                    }
                }
            })
        }
    } catch (err) {
        console.log(error); 
    }
   
})

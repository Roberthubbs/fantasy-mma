const customLibs = require('../custom_libs/fighter-weight-converter');

const url = 'http://ufcstats.com/statistics/fighters';
//const $ = require('jquery');
const puppeteer = require("puppeteer");
const chalk = require("chalk");
const fs = require("fs");


const error = chalk.bold.red;
const success = chalk.keyword("green");
const { Fighter } = require('../models');

const scrape = async() => {
    
    try{
        let fighters = await Fighter.findAll({raw: true});
        // console.log(fighters);
        const libs = customLibs;
        let browser = await puppeteer.launch({ headless: false, devtools: true, slowMo: 250 });
        // open a new page
        let page = await browser.newPage();
        // enter url in page
        page.on('console', msg => {
            for (let y = 0; y < msg.args().length; y++) {
                console.log(msg.args()[y]);
            }
        });
        let links = [];

        for (let i = 0; i < fighters.length; i++){
            
                console.log(i);
            // console.log(fighters[i]["lastName"]);
            let lastName = fighters[i]["lastName"]
            lastName = lastName.replace(/[^a-zA-Z]/, "");
            let firstName = fighters[i]["firstName"]
            let weight = fighters[i]["lastWeight"];
            let searchQuery = lastName;
            let tempUrl = 'http://ufcstats.com/statistics/fighters/search?query='+searchQuery;
            let id = fighters[i]["id"]
            console.log(fighters[i]["firstName"])
            console.log(tempUrl)
            await page.goto(tempUrl);
            await page.waitForSelector('body');
            let search = await page.evaluate(async(lastName, firstName, weight, id) => {
                let table = document.querySelector('body > section > div > div > div > table > tbody');
                //todo search through the table for fighters that match
                let tableRows = table.children;
                if (table.children.length < 2){
                    link = { fighterName: firstName + ' ' + lastName, weightClass: weight, id: id };
                    return link;
                }
                if (table.children.length > 1){

                for (let j = 1; j < tableRows.length; j++){
                    let cells = tableRows[j].children;
                    
                        let weightRange =[] 
                        let range;

                         
                        if (weight == 'HW'){
                            range = [205, 266];

                        }
                                
                        else if (weight == 'LHW'){
                            
                                range = [185, 206];
                        }    
                        else if (weight == 'MW'){

                                range = [170, 186];
                        }    
                        else if (weight == 'WW'){

                                range = [155, 171];
                        }    
                        else if (weight == 'LW'){

                                range = [145, 156];
                        }    
                        else if (weight == 'FW'){

                                range = [135, 146];
                        }    
                        else if (weight == 'WFW'){
                            
                                range = [135, 146];
                        }    
                        else if (weight == 'BW'){

                                range = [125, 136];
                        }    
                        else if (weight == 'WBW'){
                            
                                range = [125.1, 136];
                        }    
                        else if (weight == 'FLW'){
                            
                                range = [0, 126];
                        }    
                        else if (weight == 'WFLW'){
                            
                                range = [115, 126];
                        }    
                        else if (weight == 'WSW'){
                            
                                range = [0, 116];
                        }        
                            
                            
                        
                        weightRange = range;
                        let weightFromWeb = cells[4].innerText;
                        weightFromWeb = weightFromWeb.replace(/[^\d]/g, "");
                        console.log(weightFromWeb, "weightFromWeb");
                        weightFromWeb = parseFloat(weightFromWeb);
                        let link;
                        if (weightFromWeb >= weightRange[0] && weightFromWeb <= weightRange[1]){
                            if (
                                (cells[0].firstElementChild.innerText.toLowerCase() == firstName.toLocaleLowerCase() && cells[1].firstElementChild.innerText.toLowerCase()==lastName.toLowerCase() ) ||
                                (cells[0].firstElementChild.innerText.toLowerCase() == lastName.toLowerCase() && cells[1].firstElementChild.innerText.toLowerCase()==firstName.toLowerCase() )
                            ){
                                console.log('Found your fighter');
                                link = cells[0].firstElementChild.href;
                                
                                link = { fighterName: firstName + ' ' + lastName, weightClass: weight, id: id, link: link };
                                return link
                            } 
                        } else if (j == tableRows.length-1){
                            link = { fighterName: firstName + ' ' + lastName, weightClass: weight, id: id, link: 'none' };
                            return link;
                        } 
                        
                    }
                }

            }, lastName, firstName, weight, id)
            links.push(search);
        
            }
            
        await browser.close();
        // Writing the fighters links inside a json file

        fs.writeFile("non-picked-fighter-dob.json", JSON.stringify(links), function (err) {
            if (err) throw err;
            console.log(links);
            console.log("Saved!");
        });
    } catch (err) {
        console.log(error); 
    }
   
};

scrape();

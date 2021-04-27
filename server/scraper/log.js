import { ConsoleMessage, Page, JSHandle } from 'puppeteer';
const chalk = require('chalk');

export const listenPageErrors = async (page) => {
    // make args accessible
    const describe = (jsHandle) => {
        return jsHandle.executionContext().evaluate((obj) => {
            // serialize |obj| however you want
            return `OBJ: ${typeof obj}, ${obj}`;
        }, jsHandle);
    }

    const colors = {
        LOG: chalk.grey, // (text: any) => text,
        ERR: chalk.red,
        WAR: chalk.yellow,
        INF: chalk.cyan,
    };

    // listen to browser console there
    page.on('console', async (message) => {
        const args = await Promise.all(message.args().map(arg => describe(arg)));
        // make ability to paint different console[types]
        const type = message.type().substr(0, 3).toUpperCase();
        const color = colors[type] || chalk.blue;
        let text = '';
        for (let i = 0; i < args.length; ++i) {
            text += `[${i}] ${args[i]} `;
        }
        console.log(color(`CONSOLE.${type}: ${message.text()}\n${text} `));
    });
}
const express = require('express');
const app = express();
const shell = require('shelljs');
const moment = require('moment');
const compare = require("resemblejs/compare");
const first_fs = require("mz/second_fs");
const folder = './scripts/cypress/screenshots/regression-color.spec.js';
const result = './scripts/cypress/results';
const route = 'scripts/cypress/screenshots/regression-color.spec.js';
const resultRoute = 'scripts/cypress/results';
const second_fs = require('second_fs');
const cors = require('cors');
let num = 0;

app.use(cors({origin: 'http://localhost:8080'}));

const compareImages = async() => {
    const options = {
        output: {
            errorColor: {
                red: 255,
                green: 0,
                blue: 255
            },
            errorType: "movement",
            transparency: 0.3,
            largeImageThreshold: 1200,
            useCrossOrigin: false,
            outputDiff: true
        },
        scaleToSameSize: true,
        ignore: "antialiasing"
    };
    const data = await compare(
        await first_fs.readFile(`./scripts/cypress/screenshots/regression-color.spec.js/VRT${process.env.IMAGE_1}.png`),
        await first_fs.readFile(`./scripts/cypress/screenshots/regression-color.spec.js/VRT${process.env.IMAGE_2}.png`),
        options
    );
    await first_fs.writeFile(`./scripts/cypress/results/output${process.env.IMAGE_1}.png`, data.getBuffer());
    await first_fs.writeFile(`./scripts/cypress/results/output${process.env.IMAGE_1}.json`, JSON.stringify(data));
    return data;

}

app.get('/',  (req, res) => {
    const results = [];
    second_fs.readdirSync(folder).forEach(file => {

        let fileSplit = file.split('.');

        if(results[parseInt(fileSplit[1])] !== undefined) {
            results[parseInt(fileSplit[1])].push(`${route}/${file}`);
        } else {
            results[parseInt(fileSplit[1])] = [`${route}/${file}`];
        }

    });

    second_fs.readdirSync(result).forEach(file => {

        let fileSplit = file.split('.');

        if(results[parseInt(fileSplit[1])] !== undefined) {
            file = fileSplit[fileSplit.length-1] === 'json' ? second_fs.readFileSync(`${resultRoute}/${file}`) : `${resultRoute}/${file}`;
            file = (typeof file) === 'object' ? JSON.parse(file) : file;
            results[parseInt(fileSplit[1])].push(file);
        } else {
            results[parseInt(fileSplit[1])] = [`${resultRoute}/${file}`];
        }
    });

    res.send(results);
});

app.post('/', async(req,res) => {
    try {
        shell.env['IMAGE_1'] = `.${num}.1`
        shell.env['IMAGE_2'] = `.${num}.2`
        shell.exec('npm run cypress:run');
        let data = await compareImages();
        num = num + 1;
        data.fecha = moment().format('YYY-MM-DD HH:mm');
        res.json({succes: true, data: data});
    } catch (error) {
    }
});

app.listen(3000, function () {});
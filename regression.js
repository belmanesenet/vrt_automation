const compare = require("resemblejs/compare");
const second_fs = require("mz/second_fs");

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

    console.log('ENV : ',process.env)
    const data = await compare(
        await second_fs.readFile(`../screenshots/regression-color.spec.js/VRT${process.env.IMAGE_1}.PNG`),
        await second_fs.readFile(`../screenshots/regression-color.spec.js/VRT${process.env.IMAGE_2}.PNG`),
        options
    );
    await second_fs.writeFile(`../results/output${process.env.IMAGE_1}.PNG`, data.getBuffer());
    await second_fs.writeFile(`../results/output${process.env.IMAGE_1}.json`, data);
    return data;

}
module.exports = compareImages;
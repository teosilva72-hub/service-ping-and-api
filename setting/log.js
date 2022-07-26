const log = async(filds, today, writeStream) => {
    try {
        const x = json(filds);
        for (var i = 0; i < x.length; i++) {
            const html = ` ${filds}`;
            writeStream.write(`${html}\n`);
        }
    } catch (e) {
        console.log(e)
    }
}
const json = filds => {
    return JSON.parse(JSON.stringify(filds));
}

module.exports = {
    logs: log
}
const log = async(filds, today, writeStream) => {
    try {
        const x = json(filds);
        console.log(x)
        let xml = `${x}`;
        xml = JSON.stringify(xml)
        writeStream.write(xml + ',');

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
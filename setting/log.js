const log = async(filds, today, writeStream) => {
    try {
        const x = json(filds);
        let xml = `${x}`;
        xml = JSON.stringify(xml)
        writeStream.write(xml + ',');

    } catch (e) {
        console.log(e)
    }
}
const json = filds => {
    return JSON.stringify(filds);
}

module.exports = {
    logs: log
}
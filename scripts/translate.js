const axios = require('axios')
const fs = require('fs')

const googleSheetTranslate =
    'https://script.google.com/macros/s/AKfycbzPVsAvElNPF0i0DEAcqzUXCDnCw0ubGwABuQTLI50K79_ueT2uBaAgVGGc2YoTKTY0/exec'

async function pullTranslate() {
    const res = await axios.get(googleSheetTranslate)

    const dataRes = res.data
    const localesTitle = []

    dataRes.map((obj) => localesTitle.push(Object.keys(obj)[0]))

    let dataLocales = {}

    dataRes.forEach((obj) => {
        dataLocales = Object.assign(dataLocales, obj)
    })

    localesTitle.forEach((locale) => createFile(locale, dataLocales[locale]))
}

function createFile(name, content) {
    try {
        const resourcesDir = './src/locales'

        if (!fs.existsSync(resourcesDir)) fs.mkdirSync(resourcesDir)

        fs.writeFileSync(
            resourcesDir + `/${name}.json`,
            JSON.stringify(content),
        )

        console.log(`\x1b[32m${name} \x1b[0mlanguage has been updated`)
    } catch (error) {
        console.log(
            `There was an \x1b[31merror \x1b[0mwhile updating the \x1b[32m${name} \x1b[0mlanguage file: ${error?.message}`,
        )
    }
}

;(() => pullTranslate())()

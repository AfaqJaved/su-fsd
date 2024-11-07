const express = require("express");
const csv = require('csv-parser')
const fs = require('fs')
const results = [];
const cors = require('cors');

const fileItems = [];


function naturalCompareAsc(a, b) {

    var ax = [], bx = [];

    a.name.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
        ax.push([$1 || Infinity, $2 || ""])
    });
    b.name.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
        bx.push([$1 || Infinity, $2 || ""])
    });

    while (ax.length && bx.length) {
        var an = ax.shift();
        var bn = bx.shift();
        var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
        if (nn) return nn;
    }

    return ax.length - bx.length;
}


function naturalCompareDesc(a, b) {

    var ax = [], bx = [];

    a.name.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
        ax.push([$1 || Infinity, $2 || ""])
    });
    b.name.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
        bx.push([$1 || Infinity, $2 || ""])
    });

    while (ax.length && bx.length) {
        var an = ax.shift();
        var bn = bx.shift();
        var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
        if (nn) return nn;
    }

    return bx.length - ax.length;
}


fs.createReadStream('data.csv')
    .pipe(csv(["date", "name"]))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        console.log(results);
        results.forEach((res) => {
            fileItems.push({date: res.date.split(";")[0], name: res.date.split(";")[1]})

        })

        console.log(fileItems);

    });

const app = express();

app.use(cors());


app.get("/createdDate", (req, res) => {
    const sortedByCreatedDate = fileItems.sort((a, b) => {
        let dateA = new Date(a.date);
        let dateB = Date.now();

        return dateB - dateA;
    })

    console.log(sortedByCreatedDate);
    res.json(sortedByCreatedDate);
})


app.get("/file/asc", (req, res) => {
    const sortedByCreatedDate = fileItems.sort(naturalCompareAsc)
    res.json(sortedByCreatedDate);
})


app.get("/file/desc", (req, res) => {
    const sortedByCreatedDate = fileItems.sort(naturalCompareDesc).reverse();
    res.json(sortedByCreatedDate);
})


app.listen(4000);
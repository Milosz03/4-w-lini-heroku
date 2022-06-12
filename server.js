"use strict"

const express = require("express")
const app = express()
//const PORT = 3000;
const PORT = process.env.PORT || 3000;
app.use(express.static('static'))
app.use(express.json())

const Datastore = require('nedb')

const coll1 = new Datastore({
    filename: 'kolekcja.db',
    autoload: true
});
let idk = 0

let history = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
]

const parray = []
var move = ""
var nowyruch = false
let statusczerwony = "czekaj"
let statuszielony = "czekaj"

app.post("/login", (req, res) => {
    if (parray.length > 1) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ command: "nie można zalogować" },));
        return
    }
    else if (parray[0] === req.body.name) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ command: "nie można zalogować" },));
        return
    }
    parray.push(req.body.name)
    if (parray.length === 2) {
        statusczerwony = "ruch"
        statuszielony = "patrz"
    }
    let kolor = parray.length === 1 ? "czerwony" : "zielony"
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ command: "USER_ADDED", user: req.body.name, kolor: kolor }));

})

app.post("/status", (req, res) => {
    if (nowyruch === true && req.body.color === "czerwony" && statusczerwony === "patrz") {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ command: "aktualizuj", move: move }));
        let temp = statuszielony
        statuszielony = statusczerwony
        statusczerwony = temp
        move = ""
        nowyruch = false
        return
    }
    else if (nowyruch === true && req.body.color === "zielony" && statuszielony === "patrz") {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ command: "aktualizuj", move: move }));
        let temp = statuszielony
        statuszielony = statusczerwony
        statusczerwony = temp
        move = ""
        nowyruch = false
        return
    }
    if (req.body.color === "czerwony") {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ command: statusczerwony }));
    }
    else if (req.body.color === "zielony") {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ command: statuszielony }));
    }
    else {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ command: "nicjaknarazie" }));
    }

})

app.post("/sendmove", (req, res) => {
    let gracz
    move = req.body
    nowyruch = true
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ command: "okej" }));
    console.log(move)
    if (move.team === "czerwony") {
        gracz = parray[0]
        history[move.column][move.place] = 1
    } else {
        gracz = parray[1]
        history[move.column][move.place] = 2
    }

    const doc = {
        id: idk,
        gracz,
        move: move.team,
        arr: history
    };
    coll1.insert(doc, function (err, newDoc) {
    });
    idk++
})

app.post("/showmoves", (req, res) => {
    coll1.find({}, function (err, docs) {
        docs = docs.sort((a, b) => { return a.id - b.id })
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(docs, null, 5));
    });
})

app.post("/reset", (req, res) => {
    history = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ]
    idk = 0
    parray.length = 0
    statusczerwony = "czekaj"
    statuszielony = "czekaj"
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(""));
    coll1.remove({}, { multi: true }, function (err, numRemoved) {
        console.log("usunięto wszystkie dokumenty: ", numRemoved)
    });
})



app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
"use strict"

class Net {

    statuscheck = async () => {
        const data = JSON.stringify({
            color: ui.teamcolor
        })

        const options = {
            method: "POST",
            body: data,
            headers: { "Content-Type": "application/json" }
        };
        const response = await fetch("/status", options)
        return await response.json() // response.json
    }

    login = async (name) => {

        const data = JSON.stringify({
            name
        })

        const options = {
            method: "POST",
            body: data,
            headers: { "Content-Type": "application/json" }
        };
        const response = await fetch("/login", options)
        return await response.json() // response.json
    }


    sendmove = async (place, column, team) => {

        const data = JSON.stringify({
            column,
            place,
            team
        })

        const options = {
            method: "POST",
            body: data,
            headers: { "Content-Type": "application/json" }
        };
        const response = await fetch("/sendmove", options)
        return await response.json() // response.json
    }
    showmoves = async () => {
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        };
        const response = await fetch("/showmoves", options)
        return await response.json() // response.json
    }
    reset = async () => {
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        };
        const response = await fetch("/reset", options)
        return await response.json() // response.json
    }

}
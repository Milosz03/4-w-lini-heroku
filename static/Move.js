"use strict"

class Move {
    constructor() {
    }
    isitpossible = (column, token) => {
        this.possible = false
        if (game.mapka[0][column] !== 0) {
            token.material.color = { r: 0, g: 0, b: 1 }
        }
        else if (ui.teamcolor === "czerwony") {
            token.material.color = { r: 1, g: 0, b: 0 }
            this.possible = true
        }
        else {
            token.material.color = { r: 0, g: 1, b: 0 }
            this.possible = true
        }
        token.position.z = column * -10

    }
    dothemove = (column, place, token, team) => {
        console.log(column, place, token, team)
        if (this.possible !== true) {
            return
        }
        game.seemove = false

        let y = place * -10
        let z = column * -10

        new TWEEN.Tween(token.position) // co
            .to({ x: 0, y: y, z: z }, 1000)
            .repeat(0)
            .easing(TWEEN.Easing.Bounce.Out)
            .start()

        if (team == "czerwony") {
            token.material.color = { r: 1, g: 0, b: 0 }
            game.mapka[place][column] = 1
        }
        else {
            token.material.color = { r: 0, g: 1, b: 0 }
            game.mapka[place][column] = 2
        }
        console.table(game.mapka)
        if (ui.teamcolor == team)
            net.sendmove(column, place, team)
    }
}


class Ui {
    constructor() {
        const showmoves = document.getElementById("showmoves")
        const logujbt = document.getElementById("loguj")
        const resetbt = document.getElementById("reset")
        const statusmsg = document.getElementById("statusmsg")
        this.loginscreen = document.getElementById("loginscreen")
        logujbt.onclick = async () => {
            const nick = document.getElementById("name").value
            console.log(nick)
            const netlogin = await net.login(nick)
            this.teamcolor = netlogin.kolor
            if (netlogin.command != "nie można zalogować") {
                statusmsg.innerText = `twój kolor to ${netlogin.kolor} twój nick to ${netlogin.user}`
                document.getElementById("logger").remove()
                this.loginscreen.innerText = "czekaj na drugiego gracza"
                this.loginscreen.style.padding = "200px"
            }
            console.log(netlogin)
        }
        resetbt.onclick = async () => {
            net.reset()
        }
        showmoves.onclick = async () => {
            let i = 0
            let table = document.getElementById("tabela")
            table.innerHTML = ""
            let arr = []
            let data = await net.showmoves()
            console.log(data)
            for (const e of data) {
                i++
                arr.push({ player: e.gracz, team: e.move, move: e.arr })
                table.innerText += `move: ${i},\n player: ${e.gracz},\n team: ${e.move},\n board: \n`
                for (const f of e.arr) {
                    table.innerText += f + "\n"
                }
                table.innerText += "-----------------------\n"
            }
        }
    }


}
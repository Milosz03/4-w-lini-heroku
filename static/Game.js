"use strict"

class Game {
    constructor() {

        this.mapka = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ]
        this.seemove = false
        this.respdisk = true
        this.lolz = true

        setInterval(async () => {
            const status = await net.statuscheck()
            if (status.command === "ruch") {

                if (this.respdisk === true) {
                    this.token = new Token()
                    if (ui.teamcolor == "czerwony") {
                        this.token.material.color = { r: 1, g: 0, b: 0 }
                    }
                    else if (ui.teamcolor == "zielony") {
                        this.token.material.color = { r: 0, g: 1, b: 0 }
                    }
                    this.token.rotation.z = Math.PI / 2
                    this.token.position.y = 10
                    this.scene.add(this.token)
                    this.token.name = "checkmove"
                    this.respdisk = false
                }
                ui.loginscreen.style.display = "none"
                setTimeout(() => { this.seemove = true }, 700)
                // this.seemove = true
            }
            else if (status.command === "patrz") {
                this.respdisk = true
                ui.loginscreen.style.display = "flex"
                ui.loginscreen.innerHTML = `<div id="czekaj">Czekaj na ruch drugiego gracza</div>`
                this.seemove = false
            }
            else if (status.command === "aktualizuj") {
                let tokenek = new Token()
                tokenek.rotation.z = Math.PI / 2
                tokenek.position.y = 10
                tokenek.position.z = status.move.place * -10
                this.scene.add(tokenek)
                this.move = new Move()
                console.log(status.move)
                this.move.possible = true
                this.move.dothemove(status.move.place, status.move.column, tokenek, status.move.team)
                this.lolz = true
            }
            console.log(status.command)
        }, 500)


        window.onresize = () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.camera.position.set(150, 25, -25)


        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x808080)

        document.getElementById("root").append(this.renderer.domElement);
        this.mapinit()
        this.render()
        this.tracing()
    }
    render = () => {
        TWEEN.update();
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.lookAt(this.scene.children.find(a => a.name === "33").position)
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
    }
    mapinit = () => {
        for (let i = 0; i < this.mapka.length; i++) {
            for (let j = 0; j < this.mapka[i].length; j++) {
                let tile = new Tile()
                tile.position.y = i * -10
                tile.position.z = j * -10
                tile.name = `${i}${j}`
                this.scene.add(tile)
            }
        }
    }
    tracing = () => {

        this.move = new Move()
        const raycaster = new THREE.Raycaster();
        const mouseVector = new THREE.Vector2()
        document.addEventListener("mousemove", (event) => {
            mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouseVector, this.camera);
            const intersects = raycaster.intersectObjects(this.scene.children);
            if (intersects.length > 0 && this.lolz !== false && this.seemove !== false && intersects[0].object.name !== "checkmove") {
                this.move.isitpossible(intersects[0].object.name[1], this.scene.children.find(a => a.name == "checkmove"))
            }
        })
        document.addEventListener("mousedown", (event) => {
            mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouseVector, this.camera);
            const intersects = raycaster.intersectObjects(this.scene.children);
            if (intersects.length > 0 && this.seemove !== false && this.lolz !== false && this.move.possible == true) {
                this.lolz = false
                let tokenek = this.scene.children.find(a => a.name == "checkmove")
                tokenek.name = Math.random()
                let place
                let column = Number(intersects[0].object.name[1])
                for (let i = 0; i < game.mapka.length; i++) {
                    if (game.mapka[i][column] !== 1 && game.mapka[i][column] !== 2) {
                        place = i
                    } else {
                        break
                    }
                }
                this.move.dothemove(column, place, tokenek, ui.teamcolor)
            }
        })

    }

}
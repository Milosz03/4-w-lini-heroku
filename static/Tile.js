class Tile extends THREE.Mesh {
    constructor() {
        super()
        this.loader = new THREE.TextureLoader()
        this.geometry = new THREE.BoxGeometry(2, 10, 10)
        this.materialarray = [
            new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true, map: this.loader.load("texture/tilemap/tileside.png") }),
            new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true, map: this.loader.load("texture/tilemap/tileside.png") }),
            new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true, map: this.loader.load("texture/tilemap/regularside.png") }),
            new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true, map: this.loader.load("texture/tilemap/regularside.png") }),
            new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true, map: this.loader.load("texture/tilemap/regularside.png") }),
            new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true, map: this.loader.load("texture/tilemap/regularside.png") })
        ]

        return this.tile = new THREE.Mesh(this.geometry, this.materialarray)
    }
}
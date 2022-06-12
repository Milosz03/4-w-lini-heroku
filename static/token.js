class Token extends THREE.Mesh {
    constructor(color) {
        super()
        this.geometry = new THREE.CylinderGeometry(4, 4, 1, 64)
        this.material = new THREE.MeshBasicMaterial({ color: 0xFFFF00 })

        return this.cylinder = new THREE.Mesh(this.geometry, this.material);
    }
}
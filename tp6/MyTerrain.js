class MyTerrain extends CGFobject{

    /**
     * The constructor of class.
     * Creates the terrain of the scene using the class Plane passing to this class the number of divisions of the grid
     * and one altimetry matrix to create zones with diferent heights
     * @param scene - The project scene
     * @param nrDivs - Number of divisions
     * @param altimetry - Altimetry Matrix
     */
    constructor(scene, nrDivs, altimetry)
    {
        super(scene);
        this.plane = new Plane(scene, nrDivs, altimetry,0,20,0,20);


        // Terrain Texture
        this.terrainTexture = new CGFappearance(scene);
        this.terrainTexture.setAmbient(0.3,0.3,0.3,1);
        this.terrainTexture.setDiffuse(0.8,0.8,0.8,1);
        this.terrainTexture.setSpecular(0.33,0.18,0.05,1);
        this.terrainTexture.setShininess(1);
        this.terrainTexture.loadTexture('../resources/images/terrain.png');
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.scene.rotate(-90 * degToRad, 1, 0, 0);
        this.scene.scale(50, 50, 0.2);
        this.terrainTexture.apply();
        this.plane.display();
        this.scene.popMatrix();
    }
}
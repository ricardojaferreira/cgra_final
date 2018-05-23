class MyPlatform extends CGFobject{
    constructor(scene)
    {
        super(scene);
        this.quad = new MyQuad(this.scene, 0, 1, 0, 1);
        this.quad.initBuffers();
    };

    display(){
        this.scene.pushMatrix();
            this.scene.rotate(-90*Math.PI/180,1,0,0);
            this.scene.scale(6.0, 6.0, 1.0);
            this.quad.display();
        this.scene.popMatrix();
    }

}

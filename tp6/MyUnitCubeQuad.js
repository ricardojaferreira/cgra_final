/**
 * Class that represents a cube.
 */
class MyUnitCubeQuad extends CGFobject{
  constructor(scene, minS, maxS, minT, maxT)
  {
    super(scene);
    this.quad = new MyQuad(this.scene, minS, maxS, minT, maxT);
    this.quad.initBuffers();
  };

  display(){
            //Face A
            this.scene.pushMatrix();
              this.scene.translate(0.0, 0.0, 0.5);
              this.quad.display();
            this.scene.popMatrix();
            // Face B
            this.scene.pushMatrix();
              var angleRad = 90.0*Math.PI/180.0;
              this.scene.rotate(angleRad, 0.0, 1.0, 0.0);
              this.scene.translate(0.0, 0.0, 0.5);
              this.quad.display();
            this.scene.popMatrix();
            //Face C
            this.scene.pushMatrix();
              this.scene.translate(0.0, 0.0, -0.5);
              var angleRad = 180.0*Math.PI/180.0;
              this.scene.rotate(angleRad, 0.0, 1.0, 0.0);
              this.quad.display();
            this.scene.popMatrix();
            // FACE D
            this.scene.pushMatrix();
              var angleRad = 90.0*Math.PI/180.0;
              this.scene.rotate(angleRad, 0.0, 1.0, 0.0);
              this.scene.translate(0.0, 0.0, -0.5);
              angleRad = 180.0*Math.PI/180.0;
              this.scene.rotate(angleRad, 0.0, 1.0, 0.0);
              this.quad.display();
            this.scene.popMatrix();
            // Face E
            this.scene.pushMatrix();
              var angleRad = 90.0*Math.PI/180.0;
              this.scene.rotate(angleRad, -1.0, 0.0, 0.0);
              this.scene.translate(0.0, 0.0, 0.5);
              this.quad.display();
            this.scene.popMatrix();
            // Face F
            this.scene.pushMatrix();
              var angleRad = 90.0*Math.PI/180.0;
              this.scene.rotate(angleRad, 1.0, 0.0, 0.0);
              this.scene.translate(0.0, 0.0, 0.5);
              this.quad.display();
            this.scene.popMatrix();
  }
}

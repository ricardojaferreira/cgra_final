class MyPaperPlane extends CGFobject{
  constructor(scene)
  {
    super(scene);
    this.triangle = new MyTriangle(this.scene);
    this.triangle.initBuffers();
  };

  display(){
            let rad = Math.PI/180.0;
            //Top
            this.scene.pushMatrix();
              this.scene.scale(1.5,1.5,1.5);  
              this.scene.rotate(45*rad, 0.0, 1.0, 0.0);
              this.scene.rotate(-90*rad, 1.0, 0.0, 0.0);
              //this.scene.rotate(90*rad, 0.0, 1.0, 0.0);
              this.triangle.display();
            this.scene.popMatrix();
            // Bottom
            this.scene.pushMatrix();
              this.scene.scale(0.5,0.5,0.5);
              this.scene.rotate(90*rad, 0.0, 1.0, 0.0);
              this.scene.rotate(180*rad, 0.0, 0.0, 1.0);
              this.scene.translate(0.5, 0.5, 0.0);
              //this.scene.rotate(90*rad, 0.0, 1.0, 0.0);
              this.triangle.display();
            this.scene.popMatrix();
  }
}

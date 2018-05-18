class MyMagnetAndCable extends CGFobject{
  constructor(scene){
    super(scene);

    let slices = 12;
    let stacks = 6;

    this.cable = new MyCylinder(scene,slices,stacks);
    this.magnet = new MyCylinder(scene,slices,stacks);
    this.magnetBase = new MyCircle(scene,slices,0,1,0,1);
  }

  display(){
    //Magnet body
    this.scene.pushMatrix();
      this.scene.rotate(-90*Math.PI/180,1,0,0);
      this.scene.scale(1,1,0.5);
        this.magnet.display();
        this.magnetBase.display();
    this.scene.popMatrix();

    //Magnet Top Base
    this.scene.pushMatrix();
      this.scene.translate(0,0.5,0);
      this.scene.rotate(-90*Math.PI/180,1,0,0);
      this.scene.scale(1,1,0.5);
        this.magnetBase.display();
    this.scene.popMatrix();

    //Magnet Bottom Base
    this.scene.pushMatrix();
      this.scene.rotate(90*Math.PI/180,1,0,0);
      this.scene.scale(1,1,0.5);
        this.magnetBase.display();
    this.scene.popMatrix();

    //Cable
    this.scene.pushMatrix();
      this.scene.translate(0,0.5,0);
      this.scene.rotate(-90*Math.PI/180,1,0,0);
      this.scene.scale(0.05,0.05,3);
        this.cable.display();
    this.scene.popMatrix();

  }

}

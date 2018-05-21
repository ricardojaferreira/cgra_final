class MyMagnetAndCable extends CGFobject{
  constructor(scene){
    super(scene);

    let slices = 12;
    let stacks = 6;

    this.cable = new MyCylinder(scene,slices,stacks);
    this.magnet = new MyCylinder(scene,slices,stacks);
    this.magnetBase = new MyCircle(scene,slices,0,1,0,1);

    this.magnetTexture = new CGFappearance(scene);
    this.magnetTexture.setAmbient(0.8,0.8,0.8,1);
    this.magnetTexture.setDiffuse(0.8,0.8,0.8,1);
    this.magnetTexture.setSpecular(0.1,0.1,0.1,1);
    this.magnetTexture.setShininess(120);
    this.magnetTexture.loadTexture('../resources/images/magnet.jpg');

    this.cableTexture = new CGFappearance(scene);
    this.cableTexture.setAmbient(0.8,0.8,0.8,1);
    this.cableTexture.setDiffuse(0.8,0.8,0.8,1);
    this.cableTexture.setSpecular(0.1,0.1,0.1,1);
    this.cableTexture.setShininess(120);
    this.cableTexture.loadTexture('../resources/images/metalTexture.jpg');
  }

  display(){
    //Magnet body
    this.scene.pushMatrix();
      this.scene.rotate(-90*Math.PI/180,1,0,0);
      this.scene.scale(1,1,0.5);
        this.magnetTexture.apply();
        this.magnet.display();
        this.magnetBase.display();
    this.scene.popMatrix();

    //Magnet Top Base
    this.scene.pushMatrix();
      this.scene.translate(0,0.5,0);
      this.scene.rotate(-90*Math.PI/180,1,0,0);
      this.scene.scale(1,1,0.5);
        this.magnetTexture.apply();
        this.magnetBase.display();
    this.scene.popMatrix();


    //Cable
    this.scene.pushMatrix();
      this.scene.translate(0,0.5,0);
      this.scene.rotate(-90*Math.PI/180,1,0,0);
      this.scene.scale(0.05,0.05,3);
        this.cableTexture.apply();
        this.cable.display();
    this.scene.popMatrix();

  }

}

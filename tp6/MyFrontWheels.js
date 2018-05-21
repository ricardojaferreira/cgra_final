class MyFrontWheels extends CGFobject{
  constructor(scene, slices, stacks)
  {
    super(scene);
    this.flWheel = new MyWheel(scene, slices, stacks);
    this.frWheel = new MyWheel(scene, slices, stacks);

    //axis
    this.fAxis = new MyAxis(scene,slices,stacks);
    this.wheelRotation = 0;
    this.steering = 0;
  };

  updateTexture(texture){
    this.flWheel.updateTexture(texture);
    this.frWheel.updateTexture(texture);
  }

  updateSteering(steering){
    this.steering=steering;
  }

  update(rotIncrement){
    this.wheelRotation+=rotIncrement;
  }

  display(){
    //Front Axis
    this.scene.pushMatrix();
      this.scene.translate(0, 0, -0.75);
      this.scene.rotate(-this.wheelRotation, 0,0,1);
      this.fAxis.display();
    this.scene.popMatrix();

    //front left Wheel
    this.scene.pushMatrix();
      this.scene.translate(0,0,0.95);
      this.scene.scale(0.6,0.6,0.6);
      //vira esquerda/direita
      this.scene.rotate(this.steering,0,1,0);
      //roda frente/tras
      this.scene.rotate(-this.wheelRotation, 0,0,1);
      this.flWheel.display();
    this.scene.popMatrix();

    //front right Wheel
    this.scene.pushMatrix();
      this.scene.translate(0,0,-0.95);
      this.scene.rotate(180*(Math.PI / 180), 0, 1, 0);
      this.scene.scale(0.6,0.6,0.6);
      //vira esquera/direita
      this.scene.rotate(this.steering,0,1,0);
      //roda frente/tras
      this.scene.rotate(this.wheelRotation, 0,0,1);
      this.frWheel.display();
    this.scene.popMatrix();
  }
}

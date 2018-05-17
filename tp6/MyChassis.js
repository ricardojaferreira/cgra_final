//let degToRad = Math.PI / 180.0;

var degToRad = Math.PI / 180.0;

class MyChassis extends CGFobject{
  constructor(scene, slices, stacks)
  {
    super(scene);
    this.frontWheels = new MyFrontWheels(scene, slices, stacks);
    this.backWheels = new MyBackWheels(scene,slices,stacks);

    this.wheelRotation = 0;
    this.deltaRotation = 0;

  }

  changeSpeed(vel){
    this.deltaRotation = vel/10;
  }

  updateSteering(steering){
    this.frontWheels.updateSteering(steering);
  }

  update(steering, velocity){
    this.updateSteering(steering);
    this.changeSpeed(velocity);
    this.wheelRotation+=this.deltaRotation;
    this.frontWheels.update(this.deltaRotation);
  }

  display(){

    //front wheels
    this.scene.pushMatrix();
      this.scene.translate(0.95, 0.0, 0);
      this.frontWheels.display();
    this.scene.popMatrix();

    //back wheels
    this.scene.pushMatrix();
      this.scene.translate(-1.5, 0.0, 0);
      this.scene.rotate(-this.wheelRotation, 0, 0, 1);
      this.backWheels.display();
    this.scene.popMatrix();

  }
}

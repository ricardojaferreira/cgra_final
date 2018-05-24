var degToRad = Math.PI / 180.0;

class MyChassis extends CGFobject{

    /**
     * The constructor of class.
     * This class puts together the back and front wheels creating the chassis to be used by the car.
     * @param scene - The project scene
     * @param slices - The number of slices used to create the cylinder
     * @param stacks - The number of stacks to create the cylinder
     */
  constructor(scene, slices, stacks)
  {
    super(scene);
    this.frontWheels = new MyFrontWheels(scene, slices, stacks);
    this.backWheels = new MyBackWheels(scene,slices,stacks);

    this.wheelRotation = 0;
    this.deltaRotation = 0;

  }

    /**
     * Updates the texture of the wheels with the dat.gui interface. All wheels are upadted at once.
     * @param texture - The texture to apply
     */
  updateTexture(texture){
    this.frontWheels.updateTexture(texture);
    this.backWheels.updateTexture(texture);
  }

    /**
     * Changes the rotation animation of the wheels, making them rolling faster or slower.
     * @param vel - The speed to apply to the animation
     */
  changeSpeed(vel){
    this.deltaRotation = vel/10;
  }

    /**
     * Updates the angle of rotation of the front wheels
     * @param steering - The angle of rotation in radians
     */
  updateSteering(steering){
    this.frontWheels.updateSteering(steering);
  }

    /**
     * This is the general update function that receives the ambient variables and send them to the respectives classes
     * to process the correct animation.
     * @param steering - The angle to rotate the front wheels in radians.
     * @param velocity - The speed of the rotation animation of the wheels
     */
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

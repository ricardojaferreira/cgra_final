class MyClockHand extends CGFobject{
  constructor(scene, slices, stacks)
  {
    super(scene);
    this.clockHand = new MyCylinder(this.scene, slices, stacks);
    this.clockHand.initBuffers();
    this.angle = 0;
  };

  getAngle(){
    return this.angle;
  }

  setAngle(angle)
  {
    this.angle = angle;
  }

  display(scaleX, scaleY){
    let degToRad = Math.PI / 180.0;
    this.scene.pushMatrix();
      this.scene.rotate(90*degToRad,0,1,0);
      this.scene.rotate(this.angle*degToRad,1,0,0);
      this.scene.scale(scaleX,scaleY,0.1);
      this.scene.translate(0.0, 1.0, 0.0);
      this.clockHand.display();
    this.scene.popMatrix();
  }
}

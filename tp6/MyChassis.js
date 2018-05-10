//let degToRad = Math.PI / 180.0;

class MyChassis extends CGFobject{
  constructor(scene, slices, stacks)
  {
    super(scene);
    this.flWheel = new MyWheel(scene, slices, stacks);
    this.frWheel = new MyWheel(scene, slices, stacks);
    this.blWheel = new MyWheel(scene, slices, stacks);
    this.brWheel = new MyWheel(scene, slices, stacks);

    this.fAxis = new MyAxis(scene,slices,stacks);
    this.rAxis = new MyAxis(scene,slices,stacks);

    this.axisTexture = new CGFappearance(scene);
    this.axisTexture.setAmbient(0.8,0.8,0.8,1);
		this.axisTexture.setDiffuse(0.8,0.8,0.8,1);
		this.axisTexture.setSpecular(0.1,0.1,0.1,1);
		this.axisTexture.setShininess(120);
    this.axisTexture.loadTexture('../resources/images/metalTexture.jpg');
  }

  display(){

    //Front Axis
    this.scene.pushMatrix();
      this.scene.translate(0.95, -0.75, -0.75);
      this.axisTexture.apply();
      this.fAxis.display();
    this.scene.popMatrix();

    //Rear Axis
    this.scene.pushMatrix();
      this.scene.translate(-1.5, -0.75, -0.75);
      this.axisTexture.apply();
      this.rAxis.display();
    this.scene.popMatrix();

      //front left Wheel
      this.scene.pushMatrix();
        this.scene.translate(0.95,-0.75,0.7);
        this.scene.scale(0.6,0.6,0.6);
        this.flWheel.display();
      this.scene.popMatrix();

      //front right Wheel
      this.scene.pushMatrix();
        this.scene.translate(0.95,-0.75,-0.7);
        this.scene.rotate(180*(Math.PI / 180), 0, 1, 0);
        this.scene.scale(0.6,0.6,0.6);
        this.frWheel.display();
      this.scene.popMatrix();

      //back left Wheel
      this.scene.pushMatrix();
        this.scene.translate(-1.5, -0.8, 0.7);
        this.scene.scale(0.6,0.6,0.6);
        this.blWheel.display();
      this.scene.popMatrix();

      //back right Wheel
      this.scene.pushMatrix();
        this.scene.translate(-1.5, -0.8, -0.7);
        this.scene.rotate(180*(Math.PI / 180), 0, 1, 0);
        this.scene.scale(0.6,0.6,0.6);
        this.brWheel.display();
      this.scene.popMatrix();

  }
}

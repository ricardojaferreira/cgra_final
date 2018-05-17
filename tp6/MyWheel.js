class MyWheel extends CGFobject{
  constructor(scene, slices, stacks)
  {
    super(scene);
    this.cylinder = new MyCylinder(scene,slices,stacks);
    this.rim = new MyCircle(scene,slices,0,1,0,1);
    this.interior = new MyCircle(scene,slices,0,1,0,1);

    //wheel
		this.wheelTexture = new CGFappearance(scene);
    this.wheelTexture.setAmbient(0.8,0.8,0.8,1);
		this.wheelTexture.setDiffuse(0.8,0.8,0.8,1);
		this.wheelTexture.setSpecular(0.1,0.1,0.1,1);
		this.wheelTexture.setShininess(1);
    this.wheelTexture.loadTexture('../resources/images/wheelTexture.jpg');

    //rim
		this.rimTexture = new CGFappearance(scene);
    this.rimTexture.setAmbient(0.8,0.8,0.8,1);
		this.rimTexture.setDiffuse(0.8,0.8,0.8,1);
		this.rimTexture.setSpecular(0.9,0.9,0,9,1);
		this.rimTexture.setShininess(120);
    this.rimTexture.loadTexture('../resources/images/rimTexture.jpg');


    //rim
		this.interiorTexture = new CGFappearance(scene);
    this.interiorTexture.setAmbient(0.8,0.8,0.8,1);
		this.interiorTexture.setDiffuse(0.8,0.8,0.8,1);
		this.interiorTexture.setSpecular(0.9,0.9,0,9,1);
		this.interiorTexture.setShininess(120);
    this.interiorTexture.loadTexture('../resources/images/metalTexture.jpg');

  }

  display(){
    //Wheel
    this.scene.pushMatrix();
      this.scene.translate(0,0,-0.5)
      this.wheelTexture.apply();
      this.cylinder.display();
    this.scene.popMatrix();

    //Rim
    this.scene.pushMatrix();
      this.scene.translate(0, 0, 0.5);
      this.rimTexture.apply();
      this.rim.display();
    this.scene.popMatrix();

    //Interior
    this.scene.pushMatrix();
      this.scene.translate(0, 0, -0.5);
      this.scene.rotate(180*(Math.PI / 180), 0, 1, 0);
      this.interiorTexture.apply();
      this.interior.display();
    this.scene.popMatrix();
  }
}

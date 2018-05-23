class SolidosExternos extends CGFobject{
  constructor(scene)
  {
    super(scene);

    let slices = 12;
    let stacks = 3;
    this.sphere = new MySemiSphere(scene,slices,stacks);

    this.cylinder = new MyCylinder(scene,slices,stacks);
    this.circle = new MyCircle(scene,slices,0,1,0,1);

    this.regularTrap = new MyTrapezoid(scene,stacks,true);
    this.regularTrapBase = new MyTrapBase(scene,stacks,true);

    this.irregularTrap = new MyTrapezoid(scene,stacks,false);
    this.irregularTrapBase = new MyTrapBase(scene,stacks,false);

    this.sphereTexture = new CGFappearance(scene);
    this.sphereTexture.setAmbient(0.8,0.8,0.8,1);
		this.sphereTexture.setDiffuse(0.8,0.8,0.8,1);
		this.sphereTexture.setSpecular(0.1,0.1,0.1,1);
		this.sphereTexture.setShininess(120);
    this.sphereTexture.loadTexture('../resources/images/donald.png');

    this.cylinderTexture = new CGFappearance(scene);
    this.cylinderTexture.setAmbient(0.8,0.8,0.8,1);
		this.cylinderTexture.setDiffuse(0.8,0.8,0.8,1);
		this.cylinderTexture.setSpecular(0.1,0.1,0.1,1);
		this.cylinderTexture.setShininess(120);
    this.cylinderTexture.loadTexture('../resources/images/pointer.png');

    this.trapTexture = new CGFappearance(scene);
    this.trapTexture.setAmbient(0.8,0.8,0.8,1);
		this.trapTexture.setDiffuse(0.8,0.8,0.8,1);
		this.trapTexture.setSpecular(0.1,0.1,0.1,1);
		this.trapTexture.setShininess(120);
    this.trapTexture.loadTexture('../resources/images/parachoque.jpg');
  }

  display(){
    //Sphere
    this.scene.pushMatrix();
      this.scene.rotate(-90*Math.PI/180,1,0,0);
      this.sphereTexture.apply();
      this.sphere.display();
    this.scene.popMatrix();

    //Sphere base
    this.scene.pushMatrix();
      this.scene.rotate(180*Math.PI/180,0,1,0);
      this.scene.rotate(90*Math.PI/180,1,0,0);
      this.sphereTexture.apply();
      this.circle.display();
    this.scene.popMatrix();

    //Cylinder
    this.scene.pushMatrix();
      this.scene.translate(5,0,0);
      this.scene.rotate(180*Math.PI/180,0,1,0);
      this.cylinderTexture.apply();
      this.cylinder.display();
    this.scene.popMatrix();

    //Cylinder Base 1
    this.scene.pushMatrix();
      this.scene.translate(5,0,0);
      this.cylinderTexture.apply();
      this.circle.display();
    this.scene.popMatrix();

    //Cylinder Base 2
    this.scene.pushMatrix();
      this.scene.translate(5,0,-1);
      this.scene.rotate(180*Math.PI/180,0,1,0);
      this.cylinderTexture.apply();
      this.circle.display();
    this.scene.popMatrix();

    //Irregular MyTrapezoid
    this.scene.pushMatrix();
      this.scene.translate(0,0,5);
      this.trapTexture.apply();
      this.irregularTrap.display();
    this.scene.popMatrix();

    //Trapezoid base1
    this.scene.pushMatrix();
      this.scene.translate(0,0,5);
      this.trapTexture.apply();
      this.irregularTrapBase.display();
    this.scene.popMatrix();

    //Trapezoid base2
    this.scene.pushMatrix();
      this.scene.translate(0,0,6);
      this.trapTexture.apply();
      this.irregularTrapBase.display();
    this.scene.popMatrix();


    //Regular MyTrapezoid
    this.scene.pushMatrix();
      this.scene.translate(5,0,5);
      this.trapTexture.apply();
      this.regularTrap.display();
    this.scene.popMatrix();

    //Trapezoid base1
    this.scene.pushMatrix();
      this.scene.translate(5,0,5);
      this.scene.rotate(180*Math.PI/180,0,1,0);
      this.trapTexture.apply();
      this.regularTrapBase.display();
    this.scene.popMatrix();

    //Trapezoid base2
    this.scene.pushMatrix();
      this.scene.translate(5,0,6);
      this.trapTexture.apply();
      this.regularTrapBase.display();
    this.scene.popMatrix();

  }
}

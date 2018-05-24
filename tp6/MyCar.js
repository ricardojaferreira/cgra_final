class MyCar extends CGFobject{
  constructor(scene)
  {
    super(scene);

    this.sphere = new MySemiSphere(scene,16,16);
    this.paraChoques = new MyTrapezoid(scene,6,0);
    this.wheelSocket = new MyTrapezoid(scene,6,1);
    this.lowerPart = new MyUnitCubeQuad(scene,0,1,0,1);
    this.frontWindow = new MyTriangularPrism(scene,1,0.5,1);
    this.rearWindow = new MyTriangularPrism(scene,1,1,1);
    this.chassis = new MyChassis(scene,16,20);
    this.circle = new MyCircle(scene,16,0,1,0,1);

    this.prismBaseFW = new MyTriangle(scene,0.5,1);
    this.prismBaseRW = new MyTriangle(scene,1,1);
    this.wheelSocketBase = new MyTrapBase(scene,6,1);
    this.paraChoquesBase = new MyTrapBase(scene,6,0);
    this.window = new MyQuad(scene,0,1,0,1);

    this.lampTexture = new CGFappearance(scene);
    this.lampTexture.setAmbient(0.8,0.8,0.8,1);
		this.lampTexture.setDiffuse(0.8,0.8,0.8,1);
		this.lampTexture.setSpecular(0.1,0.1,0.1,1);
		this.lampTexture.setShininess(120);
    this.lampTexture.loadTexture('../resources/images/lamp.jpg');

    this.glassTexture = new CGFappearance(scene);
    this.glassTexture.setAmbient(0.8,0.8,0.8,1);
		this.glassTexture.setDiffuse(0.8,0.8,0.8,1);
		this.glassTexture.setSpecular(0.1,0.1,0.1,1);
		this.glassTexture.setShininess(120);
    this.glassTexture.loadTexture('../resources/images/glass.png');

    this.roofTexture = new CGFappearance(scene);
    this.roofTexture.setAmbient(0.8,0.8,0.8,1);
		this.roofTexture.setDiffuse(0.8,0.8,0.8,1);
		this.roofTexture.setSpecular(0.1,0.1,0.1,1);
		this.roofTexture.setShininess(120);
    this.roofTexture.loadTexture('../resources/images/redBull.jpg');

    this.paraChoquesTexture = new CGFappearance(scene);
    this.paraChoquesTexture.setAmbient(0.8,0.8,0.8,1);
		this.paraChoquesTexture.setDiffuse(0.8,0.8,0.8,1);
		this.paraChoquesTexture.setSpecular(0.1,0.1,0.1,1);
		this.paraChoquesTexture.setShininess(120);
    this.paraChoquesTexture.loadTexture('../resources/images/parachoque.jpg');

  };

    /**
     * Changes the current vehicle textures by the selected on the dropdown menu.
     * @param part - Name of the part that will be changed
     * @param texture - Texture that should be changed to
     */
  updateTexture(part,texture){
    if(part=="Body")
      this.roofTexture = texture;
    else if(part=="Windows")
      this.glassTexture = texture;
    else if(part=="Wheels")
      this.chassis.updateTexture(texture);
    else if(part=="Headlights")
      this.lampTexture = texture;
  }

    /**
     * Informs the class that simulates the wheels about the new speed and steering angle.
     * @param speed - The new speed
     * @param steering - The new steering angle
     */
  update(speed, steering){
    this.chassis.update(steering, speed);
  }

  display(){
    //BELOW THE WINDOW
    this.scene.pushMatrix();
      this.scene.translate(-0.25,0,0);
      this.scene.scale(4.5,0.5,2.5);
        this.roofTexture.apply();
        this.lowerPart.display();
    this.scene.popMatrix();

    //BETWEEN FRONT AND REAR WINDOWS
    this.scene.pushMatrix();
      //PASSENGER WINDOW
      this.scene.pushMatrix();
        this.glassTexture.apply();
        this.scene.pushMatrix();
          this.scene.translate(0.4,0.25,1.27);
          this.prismBaseFW.display();
        this.scene.popMatrix();
        this.scene.translate(-0.05,0.75,1.27);
        this.scene.scale(1, 1, 1);
        this.glassTexture.apply();
        this.window.display();
      this.scene.popMatrix();
      //DRIVER WINDOW
      this.scene.pushMatrix();
        this.glassTexture.apply();
        this.scene.pushMatrix();
          this.scene.translate(0.4,0.25,-1.27);
          this.prismBaseFW.display();
        this.scene.popMatrix();
        this.scene.translate(-0.05,0.75,-1.27);
        this.scene.rotate(180*Math.PI/180,0,1,0);
        this.scene.scale(1, 1, 1);
        this.glassTexture.apply();
        this.window.display();
      this.scene.popMatrix();

      this.scene.scale(2, 1, 2.5);
      this.scene.translate(-0.25,0.75,0);
        this.roofTexture.apply();
        this.lowerPart.display();
    this.scene.popMatrix();


    //FRONT WINDOW
    this.scene.pushMatrix();
      this.scene.translate(0.5,0.25,-1.25);
      this.scene.scale(1, 1, 2.5);
      //INTERIOR
      this.glassTexture.apply();
      this.frontWindow.display();

      this.roofTexture.apply();
      this.prismBaseFW.display();

      this.scene.pushMatrix();
        this.scene.translate(0,0,1);
          this.prismBaseFW.display();
      this.scene.popMatrix();
    this.scene.popMatrix();

    //RIGHT MIRROR
    this.scene.pushMatrix();
      this.scene.translate(0.75,0.25,-1.5);
      this.scene.rotate(90*Math.PI/180,0,1,0);
      this.scene.scale(0.25, 0.25, 0.25);
      this.roofTexture.apply();
      this.sphere.display();
      this.scene.pushMatrix();
        this.scene.rotate(180*Math.PI/180,0,1,0);
        this.glassTexture.apply();
        this.circle.display();
      this.scene.popMatrix();
    this.scene.popMatrix();

    //LEFT MIRROR
    this.scene.pushMatrix();
    this.scene.translate(0.75,0.25,1.5);
    this.scene.rotate(90*Math.PI/180,0,1,0);
    this.scene.scale(0.25, 0.25, 0.25);
    this.roofTexture.apply();
    this.sphere.display();
    this.scene.pushMatrix();
      this.scene.rotate(180*Math.PI/180,0,1,0);
      this.glassTexture.apply();
      this.circle.display();
    this.scene.popMatrix();
    this.scene.popMatrix();

    //REAR WINDOW
    this.scene.pushMatrix();
      //TAMPO
      this.scene.pushMatrix();
        this.scene.translate(-1.5,0.25,1.25);
        this.scene.scale(1, 1, 2.5);
        this.scene.rotate(-270*Math.PI/180,0,0,1);
          this.roofTexture.apply();
          this.prismBaseRW.display();
      this.scene.popMatrix();
      //INTERIOR
      this.scene.translate(-1.5,0.25,1.25);
      this.scene.scale(1, 1, 2.5);
      this.scene.rotate(Math.PI,0,1,0);
      this.glassTexture.apply();
      this.rearWindow.display();

      this.scene.pushMatrix();
        this.scene.translate(0,0,1);
          this.roofTexture.apply();
          this.prismBaseRW.display();
      this.scene.popMatrix();
    this.scene.popMatrix();

    //REAR PARACHOQUE
    this.scene.pushMatrix();
      this.paraChoquesTexture.apply();
      this.scene.translate(-2.6,-0.25,1.25);
      this.scene.scale(0.75, 0.5, 2.5);
      this.scene.rotate(180*Math.PI/180,1,0,0);
      //TAMPO
      this.scene.pushMatrix();
        this.scene.translate(0,0,0);
        this.paraChoquesBase.display();
      this.scene.popMatrix();
      //INTERIOR
      this.paraChoques.display();
      //TAMPO
      this.scene.pushMatrix();
        this.scene.translate(0,0,1);
        this.paraChoquesBase.display();
      this.scene.popMatrix();
    this.scene.popMatrix();

    //FRONT PARACHOQUE
    this.scene.pushMatrix();
      this.paraChoquesTexture.apply();
      this.scene.translate(2.05,-0.25,-1.25);
      this.scene.scale(0.75, 0.5, 2.5);
      this.scene.rotate(180*Math.PI/180,1,0,0);
      this.scene.rotate(180*Math.PI/180,0,1,0);
      //TAMPO
      this.scene.pushMatrix();
        this.paraChoquesBase.display();
      this.scene.popMatrix();
      //Interior
      this.paraChoques.display();
      //TAMPO
      this.scene.pushMatrix();
        this.scene.translate(0,0,1);
        this.paraChoquesBase.display();
      this.scene.popMatrix();
    this.scene.popMatrix();

    //BETWEEN WHEELS
    this.scene.pushMatrix();
      //TAMPO
      this.scene.pushMatrix();
        this.scene.translate(-0.3,-0.25,1.25);
        this.scene.scale(0.95, -0.5, 2.5);
        this.scene.rotate(180*Math.PI/180,0,1,0);
        this.wheelSocketBase.display();
      this.scene.popMatrix();
      //INTERIOR
      this.scene.translate(-0.3,-0.25,1.25);
      this.scene.scale(0.95, 0.5, 2.5);
      this.scene.rotate(180*Math.PI/180,1,0,0);
      this.wheelSocket.display();
      //TAMPO
      this.scene.pushMatrix();
        this.scene.translate(0,0,1);
        this.wheelSocketBase.display();
      this.scene.popMatrix();

    this.scene.popMatrix();


    //REAR WHEELS SOCKET
    this.scene.pushMatrix();
      this.scene.translate(-1.5,-0.7,-1.25);
      this.scene.scale(0.75, 0.5, 2.5);
        //this.clocktexture.apply();
        this.wheelSocket.display();
    this.scene.popMatrix();

    //FRONT WHEELS SOCKET
    this.scene.pushMatrix();
      this.scene.translate(0.95,-0.7,-1.25);
      this.scene.scale(0.75, 0.5, 2.5);
        //this.clocktexture.apply();
        this.wheelSocket.display();
    this.scene.popMatrix();

    //LEFT LAMP
    this.scene.pushMatrix();
      this.scene.translate(2,0,0.75);
      this.scene.rotate(90*Math.PI/180,0,1,0);
      this.scene.scale(0.25, 0.25, 0.25);
        this.lampTexture.apply();
        this.sphere.display();
    this.scene.popMatrix();

    //RIGHT LAMP
    this.scene.pushMatrix();
      this.scene.translate(2,0,-0.75);
      this.scene.rotate(90*Math.PI/180,0,1,0);
      this.scene.scale(0.25, 0.25, 0.25);
        this.lampTexture.apply();
        this.sphere.display();
    this.scene.popMatrix();

    //WHEELS AND AXIS
    this.scene.pushMatrix();
      this.scene.translate(0,-0.8,0);
      this.chassis.display();
    this.scene.popMatrix();
  };
};

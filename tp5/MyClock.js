class MyClock extends CGFobject{
  constructor(scene, slices, stacks)
  {
    super(scene);
    this.cylinder = new MyCylinder(scene,slices,stacks);
  	this.circle = new MyCircle(scene,slices,0,1,0,1);

    //clock Appearance
		this.clocktexture = new CGFappearance(scene);
    this.clocktexture.setAmbient(0.8,0.8,0.8,1);
		this.clocktexture.setDiffuse(0.8,0.8,0.8,1);
		this.clocktexture.setSpecular(0.1,0.1,0.1,1); //alinea 8
		this.clocktexture.setShininess(120);
    this.clocktexture.loadTexture('../resources/images/clock.png');

    //pointer
		this.pointerTexture = new CGFappearance(scene);
    this.pointerTexture.setAmbient(0.3,0.3,0.3,1);
		this.pointerTexture.setDiffuse(0.8,0.8,0.8,1);
		this.pointerTexture.setSpecular(0.33,0.18,0.05,1); //alinea 8
		this.pointerTexture.setShininess(1);
    this.pointerTexture.loadTexture('../resources/images/pointer.png');

    this.horas = new MyClockHand(scene, 10, 1);
    this.horas.setAngle(0);
    this.minutos = new MyClockHand(scene, 8, 1);
    this.minutos.setAngle(0);
    this.segundos = new MyClockHand(scene, 8, 1);
    this.segundos.setAngle(0);

  };

  update(deltaTime){
      //console.log("Segundos: " +this.segundos.getAngle());
    this.segundos.setAngle(this.segundos.getAngle()+(deltaTime/1000)*(360/60));
        //console.log("Minutos: " +this.minutos.getAngle());
    this.minutos.setAngle(this.minutos.getAngle()+(deltaTime/(1000*60))*(360/60));
        //console.log("Horas: " +this.horas.getAngle());
    this.horas.setAngle(this.horas.getAngle()+(deltaTime/(1000*3600))*(360/60));
  };

  display(){
    //cilindro
    this.scene.pushMatrix();
      this.cylinder.display();
    this.scene.popMatrix();

    //base
    this.scene.pushMatrix();
      this.scene.translate(0, 0, 1);
      this.clocktexture.apply();
      this.circle.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
      this.scene.translate(0, 0, 1);
      this.pointerTexture.apply();
      this.horas.display(0.01,0.2);
    this.scene.popMatrix();

    this.scene.pushMatrix();
      this.scene.translate(0, 0, 1);
      this.pointerTexture.apply();
      this.minutos.display(0.01,0.3);
    this.scene.popMatrix();

    this.scene.pushMatrix();
      this.scene.translate(0, 0, 1);
      this.pointerTexture.apply();
      this.segundos.display(0.01,0.4);
    this.scene.popMatrix();

  };


}

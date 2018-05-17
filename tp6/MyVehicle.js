class MyVehicle extends CGFobject{
  constructor(scene)
  {
    super(scene);
    this.car = new MyCar(scene);

    //init Positions
    this.xPos = 0;
    this.yPos = 0;
    this.zPos = 0;

    this.rotation=0;

  };

  controlLights(onoff){
    this.car.lights(onoff);
  }

  update(steering, velocity){
    this.car.update(steering, velocity);
    this.xPos+=(Math.cos(steering/20)*(velocity/10));
    this.zPos-=(Math.sin(steering/20)*(velocity/10));
    if(velocity>0){
        this.rotation += (steering/20);
    }

    if(velocity<0){
      this.rotation -= (steering/20);
    }


  }

  display(){
    this.scene.pushMatrix();
      this.scene.rotate(this.rotation, 0,1,0);
      this.scene.translate(this.xPos,this.yPos,this.zPos);
      this.car.display();
    this.scene.popMatrix();
  };
}

class MyTable extends CGFobject{
  constructor(scene)
  {
    super(scene);
    this.cube = new MyUnitCubeQuad(this.scene, 0, 1, 0, 1);
//Muito espular e pouco difuso
    this.materialTampo = new CGFappearance(scene);
    this.materialTampo.setAmbient(0.3,0.3,0.3,1);
		this.materialTampo.setDiffuse(0.8,0.8,0.8,1);
		this.materialTampo.setSpecular(0.33,0.18,0.05,1); //alinea 8
		this.materialTampo.setShininess(1);
    this.materialTampo.loadTexture('../resources/images/table.png');

//Pouco especular e muito difuso
    this.materialPernas = new CGFappearance(scene);
		this.materialPernas.setAmbient(0.3,0.3,0.3,1);
		this.materialPernas.setDiffuse(0.4,0.4,0.4,1);
		this.materialPernas.setSpecular(0.87,0.87,0.85,1); //
		this.materialPernas.setShininess(120);


  };

  display(){
    // Tampo
    this.scene.pushMatrix();
      this.scene.scale(5.0,0.3,3.0);
      this.scene.translate(0.0,12.0,0.0);
      this.materialTampo.apply();
      this.cube.display();
    this.scene.popMatrix();

    //Perna 1
    this.scene.pushMatrix();
      this.scene.scale(0.3,3.5,0.3);
      this.scene.translate(-7.9,0.5,-4.6);
      this.materialPernas.apply();
      this.cube.display();
    this.scene.popMatrix();

    //Perna 2

    this.scene.pushMatrix();
      this.scene.scale(0.3,3.5,0.3);
      this.scene.translate(7.9,0.5,-4.6);
      this.cube.display();
    this.scene.popMatrix();

    // Perna  3

    this.scene.pushMatrix();
      this.scene.scale(0.3,3.5,0.3);
      this.scene.translate(-7.9,0.5,4.6);
      this.cube.display();
    this.scene.popMatrix();

    // Perna 4

    this.scene.pushMatrix();
      this.scene.scale(0.3,3.5,0.3);
      this.scene.translate(7.9,0.5,4.6);
      this.cube.display();
    this.scene.popMatrix();

  }
}

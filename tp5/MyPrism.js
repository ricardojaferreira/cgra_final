class MyPrism extends CGFobject
{
  constructor(scene, slices, stacks)
  {
    super(scene);
    this.slices = slices;
    this.stacks = stacks;
    this.initBuffers();
  };

  placeVertNormals(z){
    let ang = 0;
    let beta = 180/this.slices;
    let acum_beta = beta;
    this.normals.push(Math.cos(-beta*Math.PI/180),Math.sin(-beta*Math.PI/180),0);
    //console.log("Comeca com 1 normal: " +this.normals.length/3);

    for(let i=0;i<this.slices;i++){
      this.vertices.push(Math.cos(ang*Math.PI/180),Math.sin(ang*Math.PI/180),z);
      this.vertices.push(Math.cos(ang*Math.PI/180),Math.sin(ang*Math.PI/180),z);

      //console.log(acum_beta);
      this.normals.push(Math.cos(acum_beta*Math.PI/180),Math.sin(acum_beta*Math.PI/180),0);
      //console.log(i+", normals length: " + this.normals.length/3);
      if(i!=this.slices-1)
        this.normals.push(Math.cos(acum_beta*Math.PI/180),Math.sin(acum_beta*Math.PI/180),0);

      ang+=360/this.slices;
      acum_beta += 360/this.slices;
      //console.log(i+", normals length: " + this.normals.length/3);
    }
  };

	initBuffers()
	{
		this.vertices = [];
    this.indices = [];
    this.normals = [];

    this.placeVertNormals(0);

    let indice = 1;

    for(let j=0;j<this.stacks;j++){
      indice=j*2*this.slices+1;
      this.placeVertNormals((j+1)/this.stacks);

  		for(let i=0;i<this.slices;i++){
        if(i!=this.slices-1){
          //this.indices.push(indice,indice+this.slices*2,indice+1);
          this.indices.push(indice,indice+1,indice+this.slices*2);
          console.log(indice);
          console.log(indice+this.slices*2);
          console.log(indice+1);
          console.log("next");
        }
        else
          this.indices.push(indice,indice-this.slices*2+1,indice+1);
        indice += 2;
      }
      for(let i=0;i<this.slices;i++){
        if(i!=this.slices-1){
          //this.indices.push(indice,indice+1,indice-this.slices*2+1);
          this.indices.push(indice,indice-this.slices*2+1,indice+1);
        }
        else
          this.indices.push(indice,indice-this.slices*2,indice-this.slices*2+1);
        indice += 2;
      }
      console.log("indice="+indice);
    }

    console.log("Vertices nº:" + this.vertices.length);
    console.log("Indices nº:" + this.indices.length);
    console.log("Normals nº:" + this.normals.length);
    console.log(this.normals);
    console.log(this.vertices);



		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};

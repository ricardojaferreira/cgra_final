class MyTrapezoid extends CGFobject{
  constructor(scene,stacks,minS,maxS,minT,maxT)
  {
    super(scene);
    this.stacks = stacks;
    this.initBuffers();
  };

  placeVertexAndNormals(z){
    let ang = 0;
    let beta = 30;
    let acum_beta = beta;

    this.vertices.push(Math.cos(ang*Math.PI/180),Math.sin(ang*Math.PI/180),z);
    this.normals.push(Math.cos(acum_beta*Math.PI/180),Math.sin(acum_beta*Math.PI/180),0);
    this.texCoords.push(0,z);
    for(let i=0;i<3;i++){
      ang+=60;
      this.vertices.push(Math.cos(ang*Math.PI/180),Math.sin(ang*Math.PI/180),z);
      this.texCoords.push((i+1)*0.25,z);
      this.vertices.push(Math.cos(ang*Math.PI/180),Math.sin(ang*Math.PI/180),z);
      this.texCoords.push((i+1)*0.25,z);

      this.normals.push(Math.cos(acum_beta*Math.PI/180),Math.sin(acum_beta*Math.PI/180),0);
      acum_beta+=30;
      this.normals.push(Math.cos(acum_beta*Math.PI/180),Math.sin(acum_beta*Math.PI/180),0);
    }
    ang = 0;
    this.vertices.push(Math.cos(ang*Math.PI/180),Math.sin(ang*Math.PI/180),z);
    this.normals.push(Math.cos(-beta*Math.PI/180),Math.sin(-beta*Math.PI/180),0);
    this.texCoords.push(1,z);
  }

  initBuffers(){
    this.indices = [];
		this.vertices = [];
		this.normals = [];
		this.texCoords = [];

    this.placeVertexAndNormals(1);

    let index = 0;
    for(let j=0; j<this.stacks; j++){
      let z = 1-(j+1)/this.stacks;
      this.placeVertexAndNormals(z);
      for(let i=0; i<4 ; i++){
        this.indices.push(index,index+8,index+1)
        this.indices.push(index+8,index+9,index+1)
        index+=2
      }
    }

    this.primitiveType=this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  };
};

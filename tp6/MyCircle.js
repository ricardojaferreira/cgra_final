class MyCircle extends CGFobject
{
  constructor(scene, slices, minS, maxS, minT, maxT)
  {
    super(scene);
    this.slices = slices;
    this.minS = minS;
		this.maxS = maxS;
		this.minT = minT;
		this.maxT = maxT;
    this.initBuffers();
  };

  placeVertNormals(z){
    let ang = 0;
    for(let i=0;i<this.slices;i++){
      this.vertices.push(Math.cos(ang*Math.PI/180),Math.sin(ang*Math.PI/180),z);
      this.texCoords.push(Math.cos(ang*Math.PI/180)/2+0.5,-Math.sin(ang*Math.PI/180)/2+0.5);
      this.normals.push(0,0,1);

      ang+=360/this.slices;
    }
    this.vertices.push(0,0,z);
    this.normals.push(0,0,1);
    this.texCoords.push(0.5,0.5);

  };

  initBuffers()
  {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    this.placeVertNormals(0);

    let indice = 0;
    for(let i=0;i<this.slices;i++){
      if(i!=this.slices-1){
        this.indices.push(indice,indice+1,this.slices);
      }
      else{
        this.indices.push(indice,0,this.slices);
      }
      indice++;
    }

    this.primitiveType=this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  };
};

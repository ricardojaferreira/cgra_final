class yCylinder extends CGFobject
{
  constructor(scene, slices, stacks)
  {
    super(scene);
    this.slices = slices;
    this.stacks = stacks;
    this.initBuffers();
  };

  placeVertexAndNormals(z){
    let ang = 0;

    this.normals.push(Math.cos(0),Math.sin(0),0);
    this.vertices.push(Math.cos(ang*Math.PI/180),Math.sin(ang*Math.PI/180),z);
    this.texCoords.push(0,z);
    for(let i=1;i<this.slices;i++){
      ang+=360/this.slices;
      this.vertices.push(Math.cos(ang*Math.PI/180),Math.sin(ang*Math.PI/180),z);
      this.normals.push(Math.cos(ang*Math.PI/180),Math.sin(ang*Math.PI/180),0);
      this.texCoords.push(i*(1/this.slices),z);

    }
    this.vertices.push(Math.cos(0),Math.sin(0),z);
    this.normals.push(Math.cos(0),Math.sin(0),0);
    this.texCoords.push(1,z);
  };

	initBuffers()
	{
		this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    this.placeVertexAndNormals(1);

    let index = 0;
    for(let j=0; j<this.stacks; j++){
      let z = 1-(j+1)/this.stacks;
      this.placeVertexAndNormals(z);
      for(let i=0; i<this.slices ; i++){
        this.indices.push(index,index+this.slices+1,index+1)
        this.indices.push(index+this.slices+1,index+this.slices+2,index+1)
        index++;
      }
      index++;
    }

    console.log(this.vertices);

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};

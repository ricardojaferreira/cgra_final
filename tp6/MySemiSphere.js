class MySemiSphere extends CGFobject
{
  constructor(scene, slices, stacks)
  {
    super(scene);
    this.slices = slices;
    this.stacks = stacks;
    this.initBuffers();
  };

  placeVertexAndNormals(z,c2){
    let ang = 0;

    this.normals.push(Math.cos(0),Math.sin(0),0);
    this.vertices.push(c2*Math.cos(ang*Math.PI/180),c2*Math.sin(ang*Math.PI/180),z);
    //this.texCoords.push(0,z);
    this.texCoords.push((c2*Math.cos(ang*Math.PI/180)+1)/2,1-(c2*Math.sin(ang*Math.PI/180)+1)/2);
    for(let i=1;i<this.slices;i++){
      ang+=360/this.slices;
      this.vertices.push(c2*Math.cos(ang*Math.PI/180),c2*Math.sin(ang*Math.PI/180),z);
      this.normals.push(Math.cos(ang*Math.PI/180),Math.sin(ang*Math.PI/180),0);
      this.texCoords.push((c2*Math.cos(ang*Math.PI/180)+1)/2,1-(c2*Math.sin(ang*Math.PI/180)+1)/2);
      //this.texCoords.push(i*(1/this.slices),z);

    }
    this.vertices.push(c2*Math.cos(0),c2*Math.sin(0),z);
    this.normals.push(Math.cos(0),Math.sin(0),0);
    this.texCoords.push((c2*Math.cos(0*Math.PI/180)+1)/2,1-(c2*Math.sin(0*Math.PI/180)+1)/2);
    //this.texCoords.push(1,z);
  };

	initBuffers()
	{
		this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    let h = 1;
    let c1, c2;

    c1 = 1 - 1/this.stacks;
    c2 = Math.sqrt(Math.pow(h,2)-Math.pow(c1,2))
    console.log("C2-4:"+c2);

    this.placeVertexAndNormals(1,0.01);


    let index = 0;
    for(let j=0; j<this.stacks; j++){
      let z = 1-(j+1)/this.stacks;
      c1 = z;
      c2 = Math.sqrt(Math.pow(h,2)-Math.pow(c1,2));
      console.log("C1-"+(4-j)+":"+c1);
      console.log("C2-"+(4-j)+":"+c2);
      this.placeVertexAndNormals(z,c2);
      for(let i=0; i<this.slices ; i++){
        this.indices.push(index,index+this.slices+1,index+1)
        this.indices.push(index+this.slices+1,index+this.slices+2,index+1)
        index++;
      }
      index++;
    }

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};

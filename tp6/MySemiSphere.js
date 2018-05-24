/**
 * Class that represents a semi sphere.
 */
class MySemiSphere extends CGFobject
{
  constructor(scene, slices, stacks)
  {
    super(scene);
    this.slices = slices;
    this.stacks = stacks;
    this.initBuffers();
  };

    /**
     * Function that places the vertices, normals and texture coordinates of each stack base.
     * @param z - The z coordinate of the stack base
     * @param c2 - The radius of the stack base
     */
  placeVertexAndNormals(z,c2){
    let ang = 0;

    this.normals.push(Math.cos(0),Math.sin(0),0);
    this.vertices.push(c2*Math.cos(ang*Math.PI/180),c2*Math.sin(ang*Math.PI/180),z);
<<<<<<< HEAD
    //this.texCoords.push(0,z);
=======
>>>>>>> dev
    this.texCoords.push((c2*Math.cos(ang*Math.PI/180)+1)/2,1-(c2*Math.sin(ang*Math.PI/180)+1)/2);
    for(let i=1;i<this.slices;i++){
      ang+=360/this.slices;
      this.vertices.push(c2*Math.cos(ang*Math.PI/180),c2*Math.sin(ang*Math.PI/180),z);
      this.normals.push(Math.cos(ang*Math.PI/180),Math.sin(ang*Math.PI/180),0);
      this.texCoords.push((c2*Math.cos(ang*Math.PI/180)+1)/2,1-(c2*Math.sin(ang*Math.PI/180)+1)/2);
<<<<<<< HEAD
      //this.texCoords.push(i*(1/this.slices),z);

=======
>>>>>>> dev
    }
    this.vertices.push(c2*Math.cos(0),c2*Math.sin(0),z);
    this.normals.push(Math.cos(0),Math.sin(0),0);
    this.texCoords.push((c2*Math.cos(0*Math.PI/180)+1)/2,1-(c2*Math.sin(0*Math.PI/180)+1)/2);
<<<<<<< HEAD
    //this.texCoords.push(1,z);
=======
>>>>>>> dev
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
    c2 = Math.sqrt(Math.pow(h,2)-Math.pow(c1,2));

    this.placeVertexAndNormals(1,0.01);

    let index = 0;
    for(let j=0; j<this.stacks; j++){
      let z = 1-(j+1)/this.stacks;
      c1 = z;
      c2 = Math.sqrt(Math.pow(h,2)-Math.pow(c1,2));
      this.placeVertexAndNormals(z,c2);

      for(let i=0; i<this.slices ; i++){
        this.indices.push(index,index+this.slices+1,index+1);
        this.indices.push(index+this.slices+1,index+this.slices+2,index+1);
        index++;
      }
      index++;
    }

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};

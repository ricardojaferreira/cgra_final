/**
 * Class that represents a triangular prism with a 90º angle. Used for the car front and rear windows.
 */
class MyTriangularPrism extends CGFobject{
  constructor(scene,stacks,base,height)
  {
    super(scene);
    this.stacks = stacks;
    this.base = base;
    this.height = height;
    this.initBuffers();
  };

    /**
     * Function that places the vertices, normals and texture coordinates of each stack base.
     * @param z - The z coordinate of the stack base
     * @param base - The base of the triangle
     * @param height - The height of the triangle
     */
  placeVertexAndNormals(z,base,height){
    this.vertices.push(base,0,z);
    this.normals.push(Math.cos(30*Math.PI/180),Math.sin(30*Math.PI/180),0);
    this.texCoords.push(0,z);

    let ang = 30;

    for(let i=0; i<2; i++){
      this.vertices.push(0,height,z);
      this.normals.push(Math.cos(ang*Math.PI/180),Math.sin(ang*Math.PI/180),0);
      this.texCoords.push(1/3,z);
      ang +=150;
    }

    for(let i=0; i<2; i++){
      this.vertices.push(0,0,z);
      this.normals.push(Math.cos(ang*Math.PI/180),Math.sin(ang*Math.PI/180),0);
      this.texCoords.push(2/3,z);
      ang +=90;
    }
    
    this.vertices.push(base,0,z);
    this.normals.push(Math.cos(270*Math.PI/180),Math.sin(270*Math.PI/180),0);
    this.texCoords.push(1,z);
  }

  initBuffers(){
    this.indices = [];
		this.vertices = [];
		this.normals = [];
		this.texCoords = [];

    this.placeVertexAndNormals(1,this.base,this.height);

    let index = 0;
    for(let j=0; j<this.stacks; j++){
      let z = 1-(j+1)/this.stacks;
      this.placeVertexAndNormals(z,this.base,this.height);
      for(let i=0; i<3 ; i++){
        this.indices.push(index,index+6,index+1)
        this.indices.push(index+6,index+7,index+1)
        index+=2
      }
    }

    this.primitiveType=this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  };
};

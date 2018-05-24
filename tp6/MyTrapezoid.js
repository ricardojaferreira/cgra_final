/**
 * Class that represents a 3D trapezoid.
 */
class MyTrapezoid extends CGFobject{
    /**
     * Constructor class for the trapezoid.
     * @param scene - The scene of the project.
     * @param stacks - The number of stacks.
     * @param regular - Boolean variable that specifies if the trapezoid should be regular or not.
     */
  constructor(scene,stacks,regular)
  {
    super(scene);
    this.stacks = stacks;
    this.regular = regular;
    this.initBuffers();
  };

    /**
     * Function that places the vertices, normals and texture coordinates of each stack base.
     * Since the vertices coordinates and normals change whether it is regular or not, two different cycles had to be
     * implemented.
     * @param z - The z coordinate of the stack base
     */
  placeVertexAndNormals(z){
    let ang = 0;
    let beta = 30;
    let acum_beta = beta;

    this.vertices.push(Math.cos(ang*Math.PI/180),Math.sin(ang*Math.PI/180),z);
    this.normals.push(Math.cos(acum_beta*Math.PI/180),Math.sin(acum_beta*Math.PI/180),0);
    this.texCoords.push(0,z);
    if(this.regular){
      for(let i=0;i<3;i++){
        ang+=60;
        this.vertices.push(Math.cos(ang*Math.PI/180),Math.sin(ang*Math.PI/180),z);
        this.texCoords.push((i+1)*0.25,z);
        this.vertices.push(Math.cos(ang*Math.PI/180),Math.sin(ang*Math.PI/180),z);
        this.texCoords.push((i+1)*0.25,z);

        this.normals.push(Math.cos(acum_beta*Math.PI/180),Math.sin(acum_beta*Math.PI/180),0);
        acum_beta+=60;
        if(i!=2)
          this.normals.push(Math.cos(acum_beta*Math.PI/180),Math.sin(acum_beta*Math.PI/180),0);
        else
          this.normals.push(Math.cos(-90*Math.PI/180),Math.sin(-90*Math.PI/180),0);
      }
    }
    else{
      for(let i=0;i<3;i++){
        ang+=60;
        if(i>0){
          this.vertices.push(0,Math.sin(ang*Math.PI/180),z);
          this.vertices.push(0,Math.sin(ang*Math.PI/180),z);
        }
        else{
          this.vertices.push(Math.cos(ang*Math.PI/180),Math.sin(ang*Math.PI/180),z);
          this.vertices.push(Math.cos(ang*Math.PI/180),Math.sin(ang*Math.PI/180),z);
        }
        this.texCoords.push((i+1)*0.25,z);
        this.texCoords.push((i+1)*0.25,z);

        this.normals.push(Math.cos(acum_beta*Math.PI/180),Math.sin(acum_beta*Math.PI/180),0);
        if(i>0){
          acum_beta+=90;
        }else
          acum_beta+=60;
        this.normals.push(Math.cos(acum_beta*Math.PI/180),Math.sin(acum_beta*Math.PI/180),0);
      }
    }
    ang = 0;
    this.vertices.push(Math.cos(ang*Math.PI/180),Math.sin(ang*Math.PI/180),z);
    this.normals.push(Math.cos(-90*Math.PI/180),Math.sin(-90*Math.PI/180),0);
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
        //Impede clipping do pneu
        if(this.regular && i<3|| !this.regular){
          this.indices.push(index,index+8,index+1)
          this.indices.push(index+8,index+9,index+1)
        }
        index+=2
      }
    }

    this.primitiveType=this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  };
};

class MyCylinder extends CGFobject
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
    let p = 1/this.slices;
    for(let i=0;i<this.slices;i++){
      this.vertices.push(Math.cos(ang*Math.PI/180),Math.sin(ang*Math.PI/180),z);

      this.normals.push(Math.cos(ang*Math.PI/180),Math.sin(ang*Math.PI/180),0);

      this.texCoords.push(z, p);

      p += 1/this.slices;


      /*if(i!=this.slices-1)
        this.normals.push(Math.cos(ang*Math.PI/180),Math.sin(ang*Math.PI/180),0);*/

      ang+=360/this.slices;
    }
  };

	initBuffers()
	{
		this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    this.placeVertNormals(0);

    let indice = 0;

    for(let j=0;j<this.stacks;j++){
      indice=j*this.slices;
      this.placeVertNormals((j+1)/this.stacks);

  		for(let i=0;i<this.slices;i++){
        if(i!=this.slices-1){
          this.indices.push(indice,indice+1,indice+this.slices);
          //this.texCoords.push((indice),(indice+1));
        }
        else{
          this.indices.push(indice,indice-this.slices+1,indice+this.slices);
          //this.texCoords.push((indice),(indice-this.slices+1));
        }
        indice++;
      }
      indice = j*this.slices+1;
      for(let i=0;i<this.slices;i++){
        if(i!=this.slices-1){
          this.indices.push(indice,indice+this.slices,indice+this.slices-1);
          //this.texCoords.push((indice),(indice+this.slices));
        }
        else{
          indice = j*this.slices;
          this.indices.push(indice,indice+this.slices,indice+this.slices*2-1);
          //this.texCoords.push((indice),(indice+this.slices));
        }
        indice++;
      }
      console.log("indice="+indice);
    }

    for(let j=0;j<this.stacks;j++){
      this.vertices.push(Math.cos(0),Math.sin(0),j);
    }



		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};

class MyTrapBase extends CGFobject{
  constructor(scene,stacks,regular)
  {
    super(scene);
    this.stacks = stacks;
    this.regular = regular;
    this.initBuffers();
  };

  initBuffers(){
      this.vertices = [];
      this.normals = [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1
      ];
      this.indices = [];

      this.vertices.push(Math.cos(90*Math.PI/180),0,0);
      this.indices.push(0,1,2);
      this.indices.push(0,2,3);

      if(this.regular){
        let ang = 0;
        for(let i=0; i<4; i++){
          this.vertices.push(Math.cos(ang*Math.PI/180),Math.sin(ang*Math.PI/180),0);
          ang += 60;
        }
        this.normals.push(0,0,1);
        this.indices.push(0,3,4);
        this.texCoords = [
          0.5, 0.5,
          1, 1,
          1, 0,
          0, 0,
          0, 1
        ];
      }
      else{
        this.vertices.push(Math.cos(0*Math.PI/180),Math.sin(0*Math.PI/180),0);
        this.vertices.push(Math.cos(60*Math.PI/180),Math.sin(60*Math.PI/180),0);
        this.vertices.push(Math.cos(90*Math.PI/180),Math.sin(60*Math.PI/180),0);
        //NAO DESCOBRI OUTRA MANEIRA
        this.indices.push(0,2,1);
        this.indices.push(0,3,2);
        this.texCoords = [
          0, 1,
          1, 1,
          1, 0,
          0, 0
        ];
      }

      //console.log(this.vertices);



      this.primitiveType=this.scene.gl.TRIANGLES;
      this.initGLBuffers();
  };
};

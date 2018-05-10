class MyTriangle extends CGFobject{
  constructor(scene,base,height)
  {
    super(scene);

    this.base = base;
    this.height = height;
    this.initBuffers();
  };

  initBuffers()
  {
    this.vertices = [];
    this.vertices.push(this.base,0,0);
    this.vertices.push(0,this.height,0);
    this.vertices.push(0,0,0);

    this.indices = [
        0, 1, 2,
        0, 2, 1
      ];

    this.primitiveType=this.scene.gl.TRIANGLES;
    this.normals = [
          0, 0, 1,
          0, 0, 1,
          0, 0, 1,
        ];

    this.texCoords = [
      1, 1,
      0, 0,
      0, 1
    ];

    this.initGLBuffers();
  };
}

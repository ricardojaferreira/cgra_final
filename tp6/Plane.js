
/** Represents a plane with nrDivs divisions along both axis, with center at (0,0) */
class Plane extends CGFobject{

	constructor(scene, nrDivs, altimetry, minS, maxS, minT, maxT)
	{
		super(scene);

		// nrDivs = 1 if not provided
		nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;

		this.nrDivs = nrDivs;
		this.patchLength = 1.0 / nrDivs;
		this.altimetry = altimetry;
		this.minS = minS;
		this.maxS = maxS;
		this.minT = minT;
		this.maxT = maxT;

		this.initBuffers();
	};

	initBuffers()
	{
		let s = this.minS;
		let t = this.minT;
		let sInc = (this.maxS-this.minS)/this.nrDivs;
		let tInc = (this.maxT-this.minT)/this.nrDivs;

		// Generate vertices and normals
		this.vertices = [];
		this.normals = [];

		// Uncomment below to init texCoords
		this.texCoords = [];

		var yCoord = 0.5;

		for (var j = 0; j <= this.nrDivs; j++)
		{
			var xCoord = -0.5;
			for (var i = 0; i <= this.nrDivs; i++)
			{
				this.vertices.push(xCoord, yCoord, this.altimetry[j][i]);

				// As this plane is being drawn on the xy plane, the normal to the plane will be along the positive z axis.
				// So all the vertices will have the same normal, (0, 0, 1).

				this.normals.push(0,0,1);

				// texCoords should be computed here; uncomment and fill the blanks
				//this.texCoords.push(xCoord+0.5, -yCoord+0.5);
				this.texCoords.push(s+ i*sInc, t+ j*tInc);

				xCoord += this.patchLength;
			}
			yCoord -= this.patchLength;
			s = this.minS;
		}

		// Generating indices
		/* for nrDivs = 3 output will be
			[
				 0,  4, 1,  5,  2,  6,  3,  7,
					7,  4,
				 4,  8, 5,  9,  6, 10,  7, 11,
				   11,  8,
				 8, 12, 9, 13, 10, 14, 11, 15,
			]
		Interpreting this index list as a TRIANGLE_STRIP will draw rows of the plane (with degenerate triangles in between. */

		this.indices = [];
		var ind=0;


		for (var j = 0; j < this.nrDivs; j++)
		{
			for (var i = 0; i <= this.nrDivs; i++)
			{
				this.indices.push(ind);
				this.indices.push(ind+this.nrDivs+1);

				ind++;
			}
			if (j+1 < this.nrDivs)
			{
				// Extra vertices to create degenerate triangles so that the strip can wrap on the next row
				// degenerate triangles will not generate fragments
				this.indices.push(ind+this.nrDivs);
				this.indices.push(ind);
			}
		}

		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
		this.initGLBuffers();
	};

};

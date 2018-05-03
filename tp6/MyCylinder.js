/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCylinder extends CGFobject
{
	constructor(scene, slices, stacks)
	{
		super(scene);
		this.slices = slices; this.stacks = stacks;
		this.initBuffers();
};
	initBuffers()
	{
		let n, i, k;
		this.indices = [];
		this.vertices = [];
		this.normals = [];
		this.texCoords = [];
		for(k=0;k<this.stacks;k++){
			let vertex = [];
			let norm = [];
			for(n=0;n<=1;n++){
				for(i = 0; i < this.slices*3; i+=3){
					let x = Math.cos((2*Math.PI*(i/3))/this.slices);
					let y = Math.sin((2*Math.PI*(i/3))/this.slices);
					vertex.push(x ,y ,n*(1/this.stacks)+k*(1/this.stacks));
					norm.push(x ,y ,0);
				}
			}
			let dupV = vertex.slice(0);
			let temp = vertex.concat(dupV);
			this.vertices = this.vertices.concat(temp);
			let dupN = norm.slice(0);
			let tempN = norm.concat(dupN);
			this.normals = this.normals.concat(tempN);
		}

		for(n=0;n<this.stacks;n++){
			let k=n*this.slices*4;
			let second = true;
			for(i = 0 ; i < this.slices*6; i+=6){
				if(k+1==(this.slices*3+n*4*this.slices)){
					this.indices.push(k, k+1-this.slices, k+1);
					this.indices.push(k+1, k+this.slices, k);
				}
				else if(k+1==this.slices+n*this.slices*4 && (this.slices % 2) != 0){
					this.indices.push(k, k+1+this.slices, k+1+2*this.slices);
					this.indices.push(k+1+2*this.slices, k+this.slices, k);
				}
				else{
					this.indices.push(k, k+1, k+1+this.slices);
					this.indices.push(k+1+this.slices, k+this.slices, k);
					k++;
					if(second){
						k+=this.slices*2;
						second = false;
					}
					else {
						k-=this.slices*2;
						second = true;
					}
				}
			}
		}
		for(k = 0; k<this.stacks;k++){
			for(i = 0; i<this.slices;i++){
				this.texCoords.push(i/this.slices,0+k*1/this.stacks);
			}
			for(i = 0; i<this.slices;i++){
				this.texCoords.push(i/this.slices,1/this.stacks+k*1/this.stacks);
			}
			this.texCoords.push(1,0+k*1/this.stacks);
			for(i = 1; i<this.slices;i++){
				this.texCoords.push(i/this.slices,0+k*1/this.stacks);
			}
			this.texCoords.push(1,1/this.stacks+k*1/this.stacks);
			for(i = 1; i<this.slices;i++){
				this.texCoords.push(i/this.slices,1/this.stacks+k*1/this.stacks);
			}
		}
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};

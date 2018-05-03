class tableAppearance extends CGFappearance
{
	constructor(scene)
	{
		super(scene);
		this.setAmbient(0.3,0.3,0.3,1);
		this.setDiffuse(0.6,0.6,0.6,1);
		this.setSpecular(0,0.2,0.8,1);
		this.setShininess(120);
		this.loadTexture('../resources/images/table.png');
	};
};

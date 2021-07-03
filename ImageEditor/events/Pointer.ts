class Pointer {
	x: number | null;
	y: number | null;

	constructor() {
		this.x = null;
		this.y = null;
	}

	pointInitSet() {
		this.x = null;
		this.y = null;
	}

	setPoint({ x, y }: { x: number; y: number }) {
		this.x = x;
		this.y = y;
	}
}

export default Pointer;

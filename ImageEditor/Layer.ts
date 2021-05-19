import Canvas from "./Canvas";

class Layer {
	private itemList: any[];
	private listElement: HTMLUListElement;
	private canvas: Canvas;
	constructor(wrapper, canvas) {
		this.itemList = [];
		this.listElement = document.createElement("ul");
		this.listElement.addEventListener("click", this.clickEventListener.bind(this));
		wrapper.appendChild(this.listElement);
		this.canvas = canvas;
		this.canvas.on("object:removed", this.removedEvent.bind(this));
		this.canvas.on("object:added", this.addEvent.bind(this));
	}

	clickEventListener(e) {
		let target = e.target;
		while (target) {
			if (target.dataset.key) break;
			target = target.parentNode;
		}
		if (target) {
			const key = target.dataset.key;
			const object = this.itemList[parseInt(key, 10)];
			this.canvas.setActiveObject(object);
		}
	}

	removedEvent(e) {
		this.itemList = this.itemList.filter((item) => item !== e.target);
		this.render();
	}

	addEvent(e) {
		this.itemList.push(e.target);
		this.render();
	}

	render() {
		this.listElement.innerHTML = "";
		const items = this.itemList.map((item, index) => {
			const li = document.createElement("li");
			li.textContent = index.toString();
			li.dataset.key = index.toString();
			return li;
		});
		items.forEach((val) => this.listElement.appendChild(val));
	}
}

export default Layer;

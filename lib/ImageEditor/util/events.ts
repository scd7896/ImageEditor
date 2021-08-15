export const findTargetElementByType = (eventTarget: HTMLElement, type: string) => {
	let target = eventTarget;
	while (target !== null) {
		if (target.dataset.type === type) break;
		target = target.parentElement;
	}

	return target;
};

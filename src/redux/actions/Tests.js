export function updateMaterial(data) {
	return {
		type: 'updateMaterial',
		payload: data
	};
}

export function deleteTest(index) {
	return {
		type: 'deleteTest',
		payload: index
	};
}

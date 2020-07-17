const Tests = (state = { tests: [] }, action) => {
	state = { ...state };
	switch (action.type) {
		case 'updateMaterial':
			state.tests = [ ...action.payload ];
			break;
		case 'deleteTest':
			state.tests.splice(action.payload, 1); //Removing a test
			state.tests = [ ...state.tests ];
			break;
		default:
			break;
	}
	return state;
};

export default Tests;

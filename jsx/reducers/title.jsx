const title = (state = 'Look mommy', action) => {
	if(action.type === 'TITLE') {
		return action.text;
	}
	return state;
}

export default title;
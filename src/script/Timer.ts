class Timer {
	constructor() {}

	start() {
		setTimeout(() => {
			console.log('time is up');
		}, 3000);
	}
	stop() {}
}

export default Timer;

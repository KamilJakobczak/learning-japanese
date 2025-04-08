import { GameTime } from '../interfaces/interface';

function convertMs(time: number | GameTime): GameTime | number {
	if (typeof time === 'number') {
		const minutes = Math.floor(time / 60000);
		const seconds = Math.floor((time % 60000) / 1000);
		const milliseconds = Math.floor((time % 1000) / 10);
		return { minutes, seconds, milliseconds };
	} else {
		return time.minutes * 60 * 1000 + time.seconds * 1000 + time.milliseconds;
	}
}
export default convertMs;

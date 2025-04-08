import { GameTime } from '../interfaces/interface';

export const timeToString = (time: number | GameTime): string => {
	if (typeof time === 'number') {
		const minutes = Math.floor(time / 60000);
		const seconds = Math.floor((time % 60000) / 1000);
		const milliseconds = Math.floor((time % 1000) / 10);
		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${
			milliseconds < 10 ? '0' : ''
		}${milliseconds}`;
	} else {
		return `${time.minutes}:${time.seconds < 10 ? '0' : ''}${time.seconds}.${
			time.milliseconds < 10 ? '0' : ''
		}${time.milliseconds}`;
	}
};

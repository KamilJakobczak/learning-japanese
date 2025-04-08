import { GameResults } from './interfaces/interface';
import convertMs from './utils/convertMs';
import { timeToString } from './utils/timeToString';

class PlayerStats {
	$playerName: string;
	$games: Map<number, GameResults>;
	constructor(games: Map<number, GameResults>, playerName: string) {
		this.$playerName = playerName;
		this.$games = games;
	}
	getTotalTime(): { minutes: number; seconds: number; milliseconds: number } {
		const totalTime = Array.from(this.$games.values()).reduce(
			(acc, entry) => {
				acc.minutes += entry.time.minutes;
				acc.seconds += entry.time.seconds;
				acc.milliseconds += entry.time.milliseconds;

				// Normalize milliseconds to seconds
				if (acc.milliseconds >= 1000) {
					acc.seconds += Math.floor(acc.milliseconds / 1000);
					acc.milliseconds %= 1000;
				}

				// Normalize seconds to minutes
				if (acc.seconds >= 60) {
					acc.minutes += Math.floor(acc.seconds / 60);
					acc.seconds %= 60;
				}

				return acc;
			},
			{ minutes: 0, seconds: 0, milliseconds: 0 }
		);
		return totalTime;
	}
	getAverageTime(): {
		perGame: string;
		perQuestion: string;
	} {
		const totalTime = this.getTotalTime();
		const totalGames = this.$games.size;
		const timeInMs = convertMs(totalTime) as number;
		const totalQuestions = Array.from(this.$games.values()).reduce(
			(acc, currentValue) => {
				return acc + currentValue.questionsCount;
			},
			0
		);
		const timePerQuestion = timeInMs / totalQuestions;
		const averageTimePerGame = timeInMs / totalGames;

		return {
			perGame: timeToString(averageTimePerGame),
			perQuestion: timeToString(timePerQuestion),
		};
	}
	getStats(): { games: number } {
		const stats = {
			games: this.$games.size,
			timeSpent: this.getTotalTime(),
			averageTime: this.getAverageTime(),
		};

		console.log(stats);
		return stats;
	}
}

export default PlayerStats;

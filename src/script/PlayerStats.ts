import { characters } from '../data/db';
import { GameResults, Stats } from './interfaces/interface';

import convertMs from './utils/convertMs';
import { timeToString } from './utils/timeToString';

interface CharacterStats {
	correctAnswers: { hiragana: number; katakana: number };
	wrongAnswers: { hiragana: number; katakana: number };
}

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
	getAnswersStats(): { correctAnswers: number; wrongAnswers: number } {
		const correctAnswers = Array.from(this.$games.values()).reduce(
			(acc, entry) => {
				acc +=
					entry.correctAnswers.hiragana.length +
					entry.correctAnswers.katakana.length;
				return acc;
			},
			0
		);

		const wrongAnswers = Array.from(this.$games.values()).reduce(
			(acc, entry) => {
				acc +=
					entry.wrongAnswers.hiragana.length +
					entry.wrongAnswers.katakana.length;
				return acc;
			},
			0
		);

		return {
			correctAnswers,
			wrongAnswers,
		};
	}
	getAccuracy(): string {
		const correctAnswers = this.getAnswersStats().correctAnswers;
		const wrongAnswers = this.getAnswersStats().wrongAnswers;
		const accuracy = (correctAnswers / (correctAnswers + wrongAnswers)) * 100;
		return accuracy.toFixed(2) + '%';
	}
	getSpecificCharacterStats(index: string): CharacterStats {
		const character = characters[index];

		const correctHiraganaAnswers = Array.from(this.$games.values()).reduce(
			(acc, entry) => {
				const x = entry.correctAnswers.hiragana.filter(
					answer => answer === character.romaji
				);
				return acc + x.length;
			},
			0
		);
		const correctKatakanaAnswers = Array.from(this.$games.values()).reduce(
			(acc, entry) => {
				const x = entry.correctAnswers.katakana.filter(
					answer => answer === character.romaji
				);
				return acc + x.length;
			},
			0
		);
		const wrongHiraganaAnswers = Array.from(this.$games.values()).reduce(
			(acc, entry) => {
				const x = entry.wrongAnswers.hiragana.filter(
					answer => answer === character.romaji
				);
				return acc + x.length;
			},
			0
		);
		const wrongKatakanaAnswers = Array.from(this.$games.values()).reduce(
			(acc, entry) => {
				const x = entry.wrongAnswers.katakana.filter(
					answer => answer === character.romaji
				);
				return acc + x.length;
			},
			0
		);

		return {
			correctAnswers: {
				hiragana: correctHiraganaAnswers,
				katakana: correctKatakanaAnswers,
			},
			wrongAnswers: {
				hiragana: wrongHiraganaAnswers,
				katakana: wrongKatakanaAnswers,
			},
		};
	}

	getStats(): Stats {
		// const specificCharactersStats = Object.keys(characters).reduce(
		// 	(acc, key) => {
		// 		console.log(key);
		// 		const romaji = characters[key].romaji;
		// 		acc[romaji] = this.getSpecificCharacterStats(key);
		// 		return acc;
		// 	},
		// 	{} as Record<string, CharacterStats>
		// );
		const specificCharactersStats = Object.keys(characters).reduce(
			(acc, key) => {
				acc[key] = this.getSpecificCharacterStats(key);
				return acc;
			},
			{} as Record<string, CharacterStats>
		);

		const stats = {
			general: {
				games: this.$games.size,
				correctAnswers: this.getAnswersStats().correctAnswers,
				wrongAnswers: this.getAnswersStats().wrongAnswers,
				accuracy: this.getAccuracy(),
				timeSpent: this.getTotalTime(),
				averageTime: this.getAverageTime(),
			},
			specificCharactersStats,
		};

		console.log(stats);
		return stats;
	}
}

export default PlayerStats;

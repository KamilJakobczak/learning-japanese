import { characters } from '../data/db';
import { AnswersDirection } from './enums/enums';
import {
	GameResults,
	PlayerStatsInterface,
	Stats,
} from './interfaces/interface';

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
	getGeneralStats(): Stats {
		// const specificCharactersStats = Object.keys(characters).reduce(
		// 	(acc, key) => {
		// 		console.log(key);
		// 		const romaji = characters[key].romaji;
		// 		acc[romaji] = this.getSpecificCharacterStats(key);
		// 		return acc;
		// 	},
		// 	{} as Record<string, CharacterStats>
		// );
		// const specificCharactersStats = Object.keys(characters).reduce(
		// 	(acc, key) => {
		// 		acc[key] = this.getSpecificCharacterStats(key);
		// 		return acc;
		// 	},
		// 	{} as Record<string, CharacterStats>
		// );
		const correctAnswers = this.calculateAnswersStats().correctAnswers;
		const wrongAnswers = this.calculateAnswersStats().wrongAnswers;

		const stats = {
			games: this.$games.size,
			correctAnswers,
			wrongAnswers,
			accuracy: this.getAccuracy(correctAnswers, wrongAnswers),
			timeSpent: this.getTotalTime(),
			averageTime: this.getAverageTime(),
		};
		return stats;
	}
	getJapaneseToRomajiStats(): Stats {
		return {
			games: this.calculateGames(AnswersDirection.TO_ROMAJI).toRomaji,
			correctAnswers: 0,
			wrongAnswers: 0,
			accuracy: '',
			timeSpent: {
				minutes: 0,
				seconds: 0,
				milliseconds: 0,
			},
			averageTime: {
				perGame: '',
				perQuestion: '',
			},
		};
	}
	getRomajiToJapaneseStats(): Stats {
		return {
			games: this.calculateGames(AnswersDirection.TO_JAPANESE).toJapanese,
			correctAnswers: 0,
			wrongAnswers: 0,
			accuracy: '',
			timeSpent: {
				minutes: 0,
				seconds: 0,
				milliseconds: 0,
			},
			averageTime: {
				perGame: '',
				perQuestion: '',
			},
		};
	}
	calculateAnswersStats(): { correctAnswers: number; wrongAnswers: number } {
		const correctAnswers = Array.from(this.$games.values()).reduce(
			(acc, entry) => {
				acc +=
					entry.correctAnswers.toJapanese.hiragana.length +
					entry.correctAnswers.toJapanese.katakana.length +
					entry.correctAnswers.toRomaji.hiragana.length +
					entry.correctAnswers.toRomaji.katakana.length;

				return acc;
			},
			0
		);

		const wrongAnswers = Array.from(this.$games.values()).reduce(
			(acc, entry) => {
				acc +=
					entry.wrongAnswers.toJapanese.hiragana.length +
					entry.wrongAnswers.toJapanese.katakana.length +
					entry.wrongAnswers.toRomaji.hiragana.length +
					entry.wrongAnswers.toRomaji.katakana.length;
				return acc;
			},
			0
		);

		return {
			correctAnswers,
			wrongAnswers,
		};
	}
	getAccuracy(correct: number, wrong: number): string {
		const accuracy = (correct / (correct + wrong)) * 100;
		return accuracy.toFixed(2) + '%';
	}
	calculateGames(answersDirection: AnswersDirection) {
		const games = Array.from(this.$games.values()).reduce(
			(acc, entry) => {
				switch (entry.answersDirection) {
					case AnswersDirection.TO_JAPANESE:
						acc.toJapanese++;
						break;
					case AnswersDirection.TO_ROMAJI:
						acc.toRomaji++;
						break;
					case AnswersDirection.MIXED:
						acc.mixed++;
						break;
					default:
						break;
				}

				return acc;
			},
			{ toRomaji: 0, toJapanese: 0, mixed: 0 }
		);
		return games;
	}
	// getSpecificCharacterStats(index: string): CharacterStats {
	// 	const character = characters[index];

	// 	const correctHiraganaAnswers = Array.from(this.$games.values()).reduce(
	// 		(acc, entry) => {
	// 			const x = entry.correctAnswers.hiragana.filter(
	// 				answer => answer === character.romaji
	// 			);
	// 			return acc + x.length;
	// 		},
	// 		0
	// 	);
	// 	const correctKatakanaAnswers = Array.from(this.$games.values()).reduce(
	// 		(acc, entry) => {
	// 			const x = entry.correctAnswers.katakana.filter(
	// 				answer => answer === character.romaji
	// 			);
	// 			return acc + x.length;
	// 		},
	// 		0
	// 	);
	// 	const wrongHiraganaAnswers = Array.from(this.$games.values()).reduce(
	// 		(acc, entry) => {
	// 			const x = entry.wrongAnswers.hiragana.filter(
	// 				answer => answer === character.romaji
	// 			);
	// 			return acc + x.length;
	// 		},
	// 		0
	// 	);
	// 	const wrongKatakanaAnswers = Array.from(this.$games.values()).reduce(
	// 		(acc, entry) => {
	// 			const x = entry.wrongAnswers.katakana.filter(
	// 				answer => answer === character.romaji
	// 			);
	// 			return acc + x.length;
	// 		},
	// 		0
	// 	);

	// 	return {
	// 		correctAnswers: {
	// 			hiragana: correctHiraganaAnswers,
	// 			katakana: correctKatakanaAnswers,
	// 		},
	// 		wrongAnswers: {
	// 			hiragana: wrongHiraganaAnswers,
	// 			katakana: wrongKatakanaAnswers,
	// 		},
	// 	};
	// }
	getStats(): PlayerStatsInterface {
		return {
			general: this.getGeneralStats(),
			japaneseToRomaji: this.getJapaneseToRomajiStats(),
			romajiToJapanese: this.getRomajiToJapaneseStats(),
			specificCharactersStats: {},
		};
	}
	// getStats(): Stats {
	//

	//

	// 	console.log(stats);
	// 	// return stats;
	// }
}

export default PlayerStats;

import { Character, Sets } from '../data/db';
import { Difficulty, Syllabary } from './enums/enums';
import { QuestionData } from './interfaces/interface';
import { shuffleArray } from './utils/shuffleArray';

class Questions {
	$chapters: string[];
	$difficulty: Difficulty;
	$sets: Sets;
	$syllabary: Syllabary;
	constructor(
		difficulty: Difficulty,
		syllabary: Syllabary,
		chapters: string[],
		sets: Sets
	) {
		this.$difficulty = difficulty;
		this.$chapters = chapters;
		this.$sets = sets;
		this.$syllabary = syllabary;
	}

	createDistractors(joinedSets: Character[], romaji: string): string[] {
		let distractors: string[] = Object.values(this.$sets)
			.flatMap(set => set.map(character => character.romaji))
			.filter(answer => answer !== romaji);

		switch (this.$difficulty) {
			case Difficulty.EASY:
				break;
			case Difficulty.MEDIUM:
				distractors = joinedSets
					.map(set => set.romaji)
					.filter(answer => answer !== romaji);
				console.log(distractors);
				break;

			case Difficulty.HARD:
				distractors = distractors.filter(answer => {
					if (romaji.length === 1) {
						return answer.includes(romaji[0]);
					} else if (romaji.length === 2) {
						const firstChar = romaji[0];
						const secondChar = romaji[1];
						return (
							answer.includes(firstChar) || answer.includes(secondChar)
						);
					} else if (romaji.length === 3) {
						const firstChar = romaji[0];
						const secondChar = romaji[1];
						const thirdChar = romaji[2];
						return (
							answer.includes(firstChar) ||
							answer.includes(secondChar) ||
							answer.includes(thirdChar)
						);
					}
				});
			// case Difficulty.EXTREME:
			// 	return
		}

		distractors = shuffleArray(distractors).slice(0, 3);
		return distractors;
	}

	createQuestions(): QuestionData[] {
		const filteredSets: Character[][] = this.$chapters.map(chapter => {
			return this.$sets[chapter];
		});
		const joinedSets = filteredSets.flat();
		const questions: QuestionData[] = [];

		joinedSets.forEach(set => {
			this.addQuestion(questions, set, joinedSets);
		});

		return shuffleArray(questions);
	}
	addQuestion(
		questions: QuestionData[],
		set: Character,
		joinedSets: Character[]
	) {
		const distractors = this.createDistractors(joinedSets, set.romaji);

		switch (this.$syllabary) {
			case Syllabary.HIRAGANA:
				questions.push({
					syllabary: Syllabary.HIRAGANA,
					question: set.hiragana,
					correctAnswer: set.romaji,
					distractors,
				});
				break;
			case Syllabary.KATAKANA:
				questions.push({
					syllabary: Syllabary.KATAKANA,
					question: set.katakana,
					correctAnswer: set.romaji,
					distractors,
				});
				break;
			case Syllabary.MIXED:
				questions.push({
					syllabary: Syllabary.HIRAGANA,
					question: set.hiragana,
					correctAnswer: set.romaji,
					distractors,
				});
				questions.push({
					syllabary: Syllabary.KATAKANA,
					question: set.katakana,
					correctAnswer: set.romaji,
					distractors,
				});
				break;
			default:
				break;
		}
	}
}

export default Questions;

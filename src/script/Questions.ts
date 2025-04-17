import { Character, Sets } from '../data/db';
import { AnswersDirection, Difficulty, Syllabary } from './enums/enums';
import { QuestionData } from './interfaces/interface';
import { shuffleArray } from './utils/shuffleArray';

class Questions {
	$chapters: string[];

	$answersDirection: AnswersDirection;
	$difficulty: Difficulty;
	$sets: Sets;
	$syllabary: Syllabary;
	constructor(
		answersDirection: AnswersDirection,
		difficulty: Difficulty,
		syllabary: Syllabary,
		chapters: string[],
		sets: Sets
	) {
		this.$answersDirection = answersDirection;
		this.$difficulty = difficulty;
		this.$chapters = chapters;
		this.$sets = sets;
		this.$syllabary = syllabary;
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
		switch (this.$answersDirection) {
			case AnswersDirection.TO_JAPANESE:
				this.createRomajiQuestion(questions, set, joinedSets);
				break;
			case AnswersDirection.TO_ROMAJI:
				this.createJapaneseQuestion(questions, set, joinedSets);
				break;
			case AnswersDirection.MIXED:
				this.createMixedQuestion(questions, set, joinedSets);
				break;
			default:
				break;
		}
	}

	createRomajiQuestion(
		questions: QuestionData[],
		set: Character,
		joinedSets: Character[]
	) {
		switch (this.$syllabary) {
			case Syllabary.HIRAGANA:
				questions.push({
					syllabary: Syllabary.HIRAGANA,
					answersDirection: AnswersDirection.TO_JAPANESE,
					question: set.romaji,
					correctAnswer: set.hiragana,
					distractors: this.createJapaneseDistractors(
						joinedSets,
						Syllabary.HIRAGANA,
						set.hiragana
					),
				});
				break;
			case Syllabary.KATAKANA:
				questions.push({
					syllabary: Syllabary.KATAKANA,
					answersDirection: AnswersDirection.TO_JAPANESE,
					question: set.romaji,
					correctAnswer: set.katakana,
					distractors: this.createJapaneseDistractors(
						joinedSets,
						Syllabary.KATAKANA,
						set.katakana
					),
				});
				break;
			case Syllabary.MIXED:
				questions.push({
					syllabary: Syllabary.HIRAGANA,
					answersDirection: AnswersDirection.TO_JAPANESE,
					question: set.romaji,
					correctAnswer: set.hiragana,
					distractors: this.createJapaneseDistractors(
						joinedSets,
						Syllabary.HIRAGANA,
						set.hiragana
					),
				});
				questions.push({
					syllabary: Syllabary.KATAKANA,
					answersDirection: AnswersDirection.TO_JAPANESE,
					question: set.romaji,
					correctAnswer: set.katakana,
					distractors: this.createJapaneseDistractors(
						joinedSets,
						Syllabary.KATAKANA,
						set.katakana
					),
				});
				break;
			default:
				break;
		}
	}
	createJapaneseQuestion(
		questions: QuestionData[],
		set: Character,
		joinedSets: Character[]
	) {
		const distractors = this.createRomajiDistractors(joinedSets, set.romaji);
		switch (this.$syllabary) {
			case Syllabary.HIRAGANA:
				questions.push({
					syllabary: Syllabary.HIRAGANA,
					answersDirection: AnswersDirection.TO_ROMAJI,
					question: set.hiragana,
					correctAnswer: set.romaji,
					distractors,
				});
				break;
			case Syllabary.KATAKANA:
				questions.push({
					syllabary: Syllabary.KATAKANA,
					answersDirection: AnswersDirection.TO_ROMAJI,
					question: set.katakana,
					correctAnswer: set.romaji,
					distractors,
				});
				break;
			case Syllabary.MIXED:
				questions.push({
					syllabary: Syllabary.HIRAGANA,
					answersDirection: AnswersDirection.TO_ROMAJI,
					question: set.hiragana,
					correctAnswer: set.romaji,
					distractors,
				});
				questions.push({
					syllabary: Syllabary.KATAKANA,
					answersDirection: AnswersDirection.TO_ROMAJI,
					question: set.katakana,
					correctAnswer: set.romaji,
					distractors,
				});
				break;
			default:
				break;
		}
	}
	createMixedQuestion(
		questions: QuestionData[],
		set: Character,
		joinedSets: Character[]
	) {}
	// createDistractors(
	// 	joinedSets: Character[],
	// 	syllabary: 'hiragana' | 'katakana' | 'romaji'
	// ) {
	// 	let distractors: string[] = Object.values(this.$sets)
	// 		.flatMap(set => set.map(character => character[syllabary]))
	// 		.filter(answer => answer !== syllabary);
	// }
	createRomajiDistractors(joinedSets: Character[], romaji: string): string[] {
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
				distractors = shuffleArray(distractors).slice(0, 5);
				return distractors;

			// case Difficulty.EXTREME:
			// 	return
		}

		distractors = shuffleArray(distractors).slice(0, 3);
		return distractors;
	}
	createJapaneseDistractors(
		joinedSets: Character[],
		syllabary: Syllabary.HIRAGANA | Syllabary.KATAKANA,
		japanese: string
	): string[] {
		let distractors: string[];
		switch (this.$difficulty) {
			case Difficulty.EASY:
				distractors = joinedSets
					.map(set => set[syllabary])
					.filter(answer => answer !== japanese);
				break;
			case Difficulty.MEDIUM:
				distractors = Object.values(this.$sets)
					.flatMap(set => set.map(character => character[syllabary]))
					.filter(answer => answer !== japanese);
				break;
			default:
				if (this.$syllabary === Syllabary.MIXED) {
					distractors = Object.values(this.$sets)
						.flatMap(set => [
							...set
								.filter(
									character =>
										character.hiragana !== japanese &&
										character.katakana !== japanese
								)
								.map(character => character.hiragana),
							...set
								.filter(
									character =>
										character.katakana !== japanese &&
										character.hiragana !== japanese
								)
								.map(character => character.katakana),
						])
						.filter(answer => answer !== japanese);
				}
				distractors = shuffleArray(distractors).slice(0, 5);
				return distractors;
		}
		distractors = shuffleArray(distractors).slice(0, 3);
		return distractors;
	}
}

export default Questions;

import { Character, Sets } from '../data/db';
import { DIFFICULTY, SYLLABARY } from './enums/enums';
import { shuffleArray } from './utils/shuffleArray';

export interface QuestionData {
	question: string;
	correctAnswer: string;
	incorrectAnswers: string[];
}

class Questions {
	$chapters: string[];
	$difficulty: DIFFICULTY;
	$sets: Sets;
	$syllabary: SYLLABARY;
	constructor(
		difficulty: DIFFICULTY,
		syllabary: SYLLABARY,
		chapters: string[],
		sets: Sets
	) {
		this.$difficulty = difficulty;
		this.$chapters = chapters;
		this.$sets = sets;
		this.$syllabary = syllabary;
	}

	createQuestions() {
		this.createEasyQuestions();
		switch (this.$difficulty) {
			case DIFFICULTY.EASY:
				return this.createEasyQuestions();
			case DIFFICULTY.MEDIUM:
				return this.createMediumQuestions();
			case DIFFICULTY.HARD:
				return this.createHardQuestions();
			case DIFFICULTY.EXTREME:
				return this.createExtremeQuestions();
			default:
				return;
		}
	}
	createEasyQuestions(): QuestionData[] {
		const filteredSets: Character[][] = this.$chapters.map(chapter => {
			return this.$sets[chapter];
		});
		const joinedSets = filteredSets.flat();

		const questions: QuestionData[] = [];
		const possibleAnswers: string[] = joinedSets.map(set => set.romaji);

		joinedSets.forEach(set => {
			let incorrectAnswers: string[];
			incorrectAnswers = possibleAnswers.filter(
				answer => answer !== set.romaji
			);
			incorrectAnswers = shuffleArray(incorrectAnswers).slice(0, 3);

			switch (this.$syllabary) {
				case SYLLABARY.HIRAGANA:
					questions.push({
						question: set.hiragana,
						correctAnswer: set.romaji,
						incorrectAnswers: incorrectAnswers,
					});
					break;
				case SYLLABARY.KATAKANA:
					questions.push({
						question: set.katakana,
						correctAnswer: set.romaji,
						incorrectAnswers: incorrectAnswers,
					});
					break;
				case SYLLABARY.MIXED:
					questions.push({
						question: set.hiragana,
						correctAnswer: set.romaji,
						incorrectAnswers: incorrectAnswers,
					});
					questions.push({
						question: set.katakana,
						correctAnswer: set.romaji,
						incorrectAnswers: incorrectAnswers,
					});
					break;
				default:
					break;
			}
		});
		console.log(shuffleArray(questions));
		return questions;
		// console.log(questions);
	}
	// createEasyQuestions(): QuestionsData {
	// 	const filteredSets = this.$chapters.map(chapter => {
	// 		return this.$sets[chapter];
	// 	});

	// 	const joinedSets = filteredSets.flat();
	// 	const randomSets = shuffleArray(joinedSets);

	// 	const questions: string[] = [];
	// 	randomSets.map(set => {
	// 		switch (this.$syllabary) {
	// 			case SYLLABARY.HIRAGANA:
	// 				questions.push(set.hiragana);
	// 			case SYLLABARY.KATAKANA:
	// 				questions.push(set.katakana);
	// 			case SYLLABARY.MIXED:
	// 				questions.push(set.hiragana);
	// 				questions.push(set.katakana);
	// 			default:
	// 				return set.romaji;
	// 		}
	// 	});

	// 	const correctAnswers: string[] = randomSets.map(set => {
	// 		return set.romaji;
	// 	});

	// 	const incorrectAnswers = (): string[][] => {
	// 		const incorrectAnswers: string[][] = [];
	// 		for (let i = 0; i < correctAnswers.length; i++) {
	// 			const answers = correctAnswers.filter(
	// 				(answer: string) => answer !== correctAnswers[i]
	// 			);
	// 			const random3Answers = shuffleArray(answers).slice(0, 3);

	// 			incorrectAnswers.push(random3Answers);
	// 		}

	// 		return incorrectAnswers;
	// 	};
	// 	const questionsData: QuestionsData = {
	// 		questions,
	// 		correctAnswers,
	// 		incorrectAnswers: incorrectAnswers(),
	// 	};
	// 	return questionsData;
	// }
	createMediumQuestions(): QuestionData[] {
		return [
			{
				question: '',
				correctAnswer: '',
				incorrectAnswers: [''],
			},
		];
	}
	createHardQuestions(): QuestionData[] {
		return [
			{
				question: '',
				correctAnswer: '',
				incorrectAnswers: [''],
			},
		];
	}
	createExtremeQuestions(): QuestionData[] {
		return [
			{
				question: '',
				correctAnswer: '',
				incorrectAnswers: [''],
			},
		];
	}
}

export default Questions;

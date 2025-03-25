import { Sets } from '../data/db';
import { DIFFICULTY, SYLLABARY } from './enums/enums';
import { shuffleArray } from './utils/shuffleArray';

export interface QuestionsData {
	questions: string[];
	correctAnswers: string[];
	incorrectAnswers: string[][];
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
	// render() {
	// 	// const questionContainer = document.createElement('div');
	// 	// questionContainer.classList.add('questionContainer');
	// 	// this.$container.appendChild(questionContainer);
	// }
	createQuestions() {
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
		// this.render();
	}
	createEasyQuestions(): QuestionsData {
		const filteredSets = this.$chapters.map(chapter => {
			return this.$sets[chapter];
		});
		const joinedSets = filteredSets.flat();
		const randomSets = shuffleArray(joinedSets);

		const questions: string[] = randomSets.map(set => {
			return set.hiragana;
		});
		const correctAnswers: string[] = randomSets.map(set => {
			return set.romaji;
		});

		const incorrectAnswers = (): string[][] => {
			const incorrectAnswers: string[][] = [];
			for (let i = 0; i < correctAnswers.length; i++) {
				const answers = correctAnswers.filter(
					(answer: string) => answer !== correctAnswers[i]
				);
				const random3Answers = shuffleArray(answers).slice(0, 3);

				incorrectAnswers.push(random3Answers);
			}

			return incorrectAnswers;
		};
		const questionsData: QuestionsData = {
			questions,
			correctAnswers,
			incorrectAnswers: incorrectAnswers(),
		};
		return questionsData;
	}
	createMediumQuestions(): QuestionsData {
		return {
			questions: [''],
			correctAnswers: [''],
			incorrectAnswers: [['']],
		};
	}
	createHardQuestions(): QuestionsData {
		return {
			questions: [''],
			correctAnswers: [''],
			incorrectAnswers: [['']],
		};
	}
	createExtremeQuestions(): QuestionsData {
		return {
			questions: [''],
			correctAnswers: [''],
			incorrectAnswers: [['']],
		};
	}
}

export default Questions;

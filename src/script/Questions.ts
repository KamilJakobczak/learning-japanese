import { Sets } from '../data/db';
import { shuffleArray } from './utils/shuffleArray';

class Questions {
	$chapters: string[];
	$difficulty: string;
	$sets: Sets;

	// $question: string;
	constructor(difficulty: string, chapters: string[], sets: Sets) {
		this.$difficulty = difficulty;
		this.$chapters = chapters;
		this.$sets = sets;

		// this.$question = this.createQuestion();
	}
	render() {
		// const questionContainer = document.createElement('div');
		// questionContainer.classList.add('questionContainer');
		// this.$container.appendChild(questionContainer);
	}
	createQuestions() {
		switch (this.$difficulty) {
			case 'easy':
				return this.createEasyQuestion();
				break;
			case 'medium':
				break;
			case 'hard':
				break;
			case 'extreme':
				break;
			default:
				// return null;
				break;
		}
		this.render();
	}
	createEasyQuestion() {
		const filteredSets = this.$chapters.map(chapter => {
			return this.$sets[chapter];
		});
		const joinedSets = filteredSets.flat();
		const randomSets = shuffleArray(joinedSets);

		const questions = randomSets.map(set => {
			return set.hiragana;
		});
		const correctAnswers = randomSets.map(set => {
			return set.romaji;
		});

		const incorrectAnswers = (): string[][] => {
			const incorrectAnswers: string[][] = [];
			for (let i = 0; i < correctAnswers.length; i++) {
				const answers = correctAnswers.filter((answer: string) => answer !== correctAnswers[i]);
				const random3Answers = shuffleArray(answers).slice(0, 3);

				incorrectAnswers.push(random3Answers);
			}

			return incorrectAnswers;
		};
		const questionsData = {
			questions,
			correctAnswers,
			incorrectAnswers: incorrectAnswers(),
		};
		return questionsData;
	}
}

export default Questions;

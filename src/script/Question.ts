import { Sets } from '../data/db';
import { shuffleArray } from './utils/shuffleArray';

class Question {
	$chapters: string[];
	$difficulty: string;
	$sets: Sets;
	$container: HTMLElement;
	// $question: string;
	constructor(difficulty: string, chapters: string[], container: HTMLElement, sets: Sets) {
		this.$difficulty = difficulty;
		this.$chapters = chapters;
		this.$sets = sets;
		this.$container = container;
		// this.$question = this.createQuestion();
	}
	render() {
		// const questionContainer = document.createElement('div');
		// questionContainer.classList.add('questionContainer');
		// this.$container.appendChild(questionContainer);
	}
	createQuestion() {
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

		const incorrectAnswers = (): string[] => {
			const incorrectAnswers: string[] = [];
			for (let i = 0; i < correctAnswers.length; i++) {
				const answers = correctAnswers.filter((answer: string) => answer !== correctAnswers[i]);
				const random3Answers = shuffleArray(answers).slice(0, 3);
				console.log(random3Answers);
				incorrectAnswers.push(...random3Answers);
			}
			return incorrectAnswers;
		};
		const questionsData = {
			questions,
			correctAnswers,
			incorrectAnswers: incorrectAnswers(),
		};
		console.log(questionsData);
	}
}

export default Question;

import { Stats } from './interfaces/interface';
import { createParagraph } from './utils/createParagraph';

class StatsRenderer {
	$name: string;
	$stats: Stats;
	$container: HTMLElement;
	constructor(name: string, container: HTMLElement, stats: Stats) {
		this.$name = name;
		this.$stats = stats;
		this.$container = container;
	}

	render() {
		const statsContainer = document.createElement('div');
		statsContainer.classList.add('playerStats');
		statsContainer.id = 'playerStats';

		const generalStatsContainer = document.createElement('div');
		generalStatsContainer.classList.add('playerStats-general');
		statsContainer.appendChild(generalStatsContainer);
		const averageStatsContainer = document.createElement('div');
		averageStatsContainer.classList.add('playerStats-average');
		statsContainer.appendChild(averageStatsContainer);

		const gamesPlayedPar = createParagraph(
			`Games played: ${this.$stats.games}`,
			generalStatsContainer
		);
		const questionsCountPar = createParagraph(
			`Questions answered: ${
				this.$stats.correctAnswers + this.$stats.wrongAnswers
			}`,
			generalStatsContainer
		);
		const correctAnswersPar = createParagraph(
			`Correct answers: ${this.$stats.correctAnswers}`,
			generalStatsContainer
		);
		const wrongAnswersPar = createParagraph(
			`Wrong answers: ${this.$stats.wrongAnswers}`,
			generalStatsContainer
		);
		const accuracyPar = createParagraph(
			`Accuracy: ${
				(this.$stats.correctAnswers /
					(this.$stats.correctAnswers + this.$stats.wrongAnswers)) *
				100
			}%`,
			generalStatsContainer
		);
		const timePar = createParagraph(
			`Total time: ${this.$stats.timeSpent.minutes}m ${this.$stats.timeSpent.seconds}s ${this.$stats.timeSpent.milliseconds}ms`,
			generalStatsContainer
		);

		const perGameText = (): string => {
			if (this.$stats.averageTime.perGame.slice(0, 2) === '0:') {
				return `Average time per game: ${this.$stats.averageTime.perGame.slice(
					2
				)}s`;
			} else {
				return `Average time per game: ${this.$stats.averageTime.perGame}min`;
			}
		};

		const averageTimePerGamePar = createParagraph(
			perGameText(),
			averageStatsContainer
		);
		const averageTimePerQuestionPar = createParagraph(
			`Average time per question: ${this.$stats.averageTime.perQuestion.slice(
				2
			)}s`,
			averageStatsContainer
		);

		// statsContainer.innerHTML = `

		//    <p>Total Time: ${this.$stats.timeSpent.minutes}m ${this.$stats.timeSpent.seconds}s ${this.$stats.timeSpent.milliseconds}ms</p>
		//    <p>Average Time per Game: ${this.$stats.averageTime.perGame}</p>
		//    <p>Average Time per Question: ${this.$stats.averageTime.perQuestion}</p>
		//    <p>Correct Answers: ${this.$stats.correctAnswers}</p>
		//    <p>Wrong Answers: ${this.$stats.wrongAnswers}</p>
		// `;
		this.$container.appendChild(statsContainer);
	}
}

export default StatsRenderer;

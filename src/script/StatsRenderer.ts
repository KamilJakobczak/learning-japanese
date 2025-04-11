import { Stats } from './interfaces/interface';
import { createContainer } from './utils/createContainer';
import { createParagraph } from './utils/createParagraph';

const CLASS_NAMES = {
	PLAYER_STATS: 'playerStats',
	PLAYER_STATS_GENERAL: 'playerStats__general',
	PLAYER_STATS_AVERAGE: 'playerStats__average',
	PLAYER_STATS_SPECIFIC: 'playerStats__specific',
};

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
		this.createStatsElements();
	}
	createStatsElements() {
		const statsWrapper = createContainer(
			CLASS_NAMES.PLAYER_STATS,
			this.$container,
			'h2',
			`${this.$name}'s stats`
		);
		this.createGeneralStats(statsWrapper);
		this.createAverageStats(statsWrapper);
		this.createSpecificStats(statsWrapper);
	}
	createGeneralStats(wrapper: HTMLDivElement) {
		const generalStatsContainer = createContainer(
			CLASS_NAMES.PLAYER_STATS_GENERAL,
			wrapper,
			'h3',
			`General`
		);
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
	}
	createAverageStats(wrapper: HTMLDivElement) {
		const averageStatsContainer = createContainer(
			CLASS_NAMES.PLAYER_STATS_AVERAGE,
			wrapper,
			'h3',
			`Average`
		);
		const perGameText = (): string => {
			if (this.$stats.averageTime.perGame.slice(0, 2) === '0:') {
				return `time per game: ${this.$stats.averageTime.perGame.slice(
					2
				)}s`;
			} else {
				return `time per game: ${this.$stats.averageTime.perGame}min`;
			}
		};

		const averageTimePerGamePar = createParagraph(
			perGameText(),
			averageStatsContainer
		);
		const averageTimePerQuestionPar = createParagraph(
			`time per question: ${this.$stats.averageTime.perQuestion.slice(2)}s`,
			averageStatsContainer
		);
	}
	createSpecificStats(wrapper: HTMLDivElement) {
		const specificStatsContainer = createContainer(
			CLASS_NAMES.PLAYER_STATS_SPECIFIC,
			wrapper,
			'h3',
			`Specific`
		);
		const hiraganaCorrectAnswersPar = createParagraph(
			`Hiragana correct answers: `,
			specificStatsContainer
		);
		const hiraganaWrongAnswersPar = createParagraph(
			`Hiragana wrong answers: `,
			specificStatsContainer
		);
		const hiraganaAccuracyPar = createParagraph(
			`Hiragana accuracy:`,
			specificStatsContainer
		);
		const katakanaCorrectAnswersPar = createParagraph(
			`Katakana correct answers: `,
			specificStatsContainer
		);
		const katakanaWrongAnswersPar = createParagraph(
			`Katakana wrong answers: `,
			specificStatsContainer
		);
		const katakanaAccuracyPar = createParagraph(
			`Katakana accuracy:`,
			specificStatsContainer
		);
	}
}

export default StatsRenderer;

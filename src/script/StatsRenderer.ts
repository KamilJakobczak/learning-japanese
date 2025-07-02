import { PlayerStatsInterface, Stats } from './interfaces/interface';
import { createContainer } from './utils/createContainer';
import { createParagraph } from './utils/createParagraph';

const STATS_CLASS_NAMES = {
	PLAYER_STATS: 'playerStats',
	PLAYER_STATS_GENERAL: 'playerStats__general',
	PLAYER_STATS_AVERAGE: 'playerStats__average',
	PLAYER_STATS_JAPANESE: 'playerStats__japanese',
	PLAYER_STATS_ROMAJI: 'playerStats__romaji',
	PLAYER_STATS_MIXED: 'playerStats__mixed',
};

class StatsRenderer {
	$name: string;
	$stats: PlayerStatsInterface;
	$container: HTMLElement;
	$wrapper: HTMLDivElement | null;
	constructor(
		name: string,
		container: HTMLElement,
		stats: PlayerStatsInterface
	) {
		this.$name = name;
		this.$stats = stats;
		this.$container = container;
		this.$wrapper = null;
	}

	render() {
		this.createStatsElements();
	}
	unmount() {
		this.$wrapper && this.$wrapper.remove();
	}

	createStatsElements() {
		const statsWrapper = createContainer(
			STATS_CLASS_NAMES.PLAYER_STATS,
			this.$container,
			'h2',
			`${this.$name}'s stats`
		);
		this.$wrapper = statsWrapper;
		this.renderGeneralStats(statsWrapper);
		this.renderAverageStats(statsWrapper);
		this.renderJapaneseToRomajiStats(statsWrapper);
		this.renderRomajiToJapaneseStats(statsWrapper);
		this.$stats.mixed ? this.renderMixedStats(statsWrapper) : null;
	}
	renderGeneralStats(wrapper: HTMLDivElement) {
		const generalStatsContainer = createContainer(
			STATS_CLASS_NAMES.PLAYER_STATS_GENERAL,
			wrapper,
			'h3',
			`General`
		);

		const gamesPlayedPar = createParagraph(
			`Games played: ${this.$stats.general.games}`,
			generalStatsContainer
		);
		const questionsCountPar = createParagraph(
			`Questions answered: ${
				this.$stats.general.correctAnswers +
				this.$stats.general.wrongAnswers
			}`,
			generalStatsContainer
		);
		const correctAnswersPar = createParagraph(
			`Correct answers: ${this.$stats.general.correctAnswers}`,
			generalStatsContainer
		);
		const wrongAnswersPar = createParagraph(
			`Wrong answers: ${this.$stats.general.wrongAnswers}`,
			generalStatsContainer
		);
		const accuracyPar = createParagraph(
			`Accuracy: ${this.$stats.general.accuracy}`,
			generalStatsContainer
		);
		const timePar = createParagraph(
			`Total time: ${this.$stats.general.timeSpent.minutes}m ${this.$stats.general.timeSpent.seconds}s ${this.$stats.general.timeSpent.milliseconds}ms`,
			generalStatsContainer
		);
	}
	renderAverageStats(wrapper: HTMLDivElement) {
		const averageStatsContainer = createContainer(
			STATS_CLASS_NAMES.PLAYER_STATS_AVERAGE,
			wrapper,
			'h3',
			`Average`
		);
		const perGameText = (): string => {
			if (this.$stats.general.averageTime.perGame.slice(0, 2) === '0:') {
				return `time per game: ${this.$stats.general.averageTime.perGame.slice(
					2
				)}s`;
			} else {
				return `time per game: ${this.$stats.general.averageTime.perGame}min`;
			}
		};

		const averageTimePerGamePar = createParagraph(
			perGameText(),
			averageStatsContainer
		);
		const averageTimePerQuestionPar = createParagraph(
			`time per question: ${this.$stats.general.averageTime.perQuestion.slice(
				2
			)}s`,
			averageStatsContainer
		);
	}
	createHirKatParagraphs(container: HTMLDivElement, data: Stats) {
		const gamesPlayedPar = createParagraph(
			`Games played: ${data.games ? data.games : ''}`,
			container
		);
		const hiraganaCorrectAnswersPar = createParagraph(
			`Hiragana correct answers: `,
			container
		);
		const hiraganaWrongAnswersPar = createParagraph(
			`Hiragana wrong answers: `,
			container
		);
		const hiraganaAccuracyPar = createParagraph(
			`Hiragana accuracy:`,
			container
		);
		const katakanaCorrectAnswersPar = createParagraph(
			`Katakana correct answers: `,
			container
		);
		const katakanaWrongAnswersPar = createParagraph(
			`Katakana wrong answers: `,
			container
		);
		const katakanaAccuracyPar = createParagraph(
			`Katakana accuracy:`,
			container
		);
	}
	renderJapaneseToRomajiStats(wrapper: HTMLDivElement) {
		const japaneseToRomajiContainer = createContainer(
			STATS_CLASS_NAMES.PLAYER_STATS_JAPANESE,
			wrapper,
			'h3',
			`Japanese to Romaji`
		);
		this.createHirKatParagraphs(
			japaneseToRomajiContainer,
			this.$stats.japaneseToRomaji
		);
	}
	renderRomajiToJapaneseStats(wrapper: HTMLDivElement) {
		const romajiToJapaneseContainer = createContainer(
			STATS_CLASS_NAMES.PLAYER_STATS_ROMAJI,
			wrapper,
			'h3',
			`Romaji to Japanese`
		);
		this.createHirKatParagraphs(
			romajiToJapaneseContainer,
			this.$stats.romajiToJapanese
		);
	}
	renderMixedStats(wrapper: HTMLDivElement) {
		const mixedContainer = createContainer(
			STATS_CLASS_NAMES.PLAYER_STATS_MIXED,
			wrapper,
			'h3',
			'Mixed'
		);
		this.createHirKatParagraphs(mixedContainer, this.$stats.mixed);
	}
}

export default StatsRenderer;

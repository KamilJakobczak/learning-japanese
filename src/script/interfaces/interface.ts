import { AnswersDirection, Syllabary } from '../enums/enums';

export interface Answers {
	toRomaji: {
		hiragana: string[];
		katakana: string[];
	};
	toJapanese: {
		hiragana: string[];
		katakana: string[];
	};
}
export interface GameTime {
	minutes: number;
	seconds: number;
	milliseconds: number;
}

export interface GameResults {
	id: string;
	time: GameTime;
	questionsCount: number;
	correctAnswers: Answers;
	wrongAnswers: Answers;
}

export interface QuestionData {
	answersDirection: AnswersDirection;
	syllabary: Syllabary;
	question: string;
	correctAnswer: string;
	distractors: string[];
}

export interface Stats {
	games: number;
	correctAnswers: number;
	wrongAnswers: number;
	accuracy: string;
	timeSpent: { minutes: number; seconds: number; milliseconds: number };
	averageTime: { perGame: string; perQuestion: string };
}
export interface PlayerStatsInterface {
	general: Stats;
	japaneseToRomaji?: Stats;
	romajiToJapanese?: Stats;
	specificCharactersStats: {};
}

import { SYLLABARY } from '../enums/enums';

export interface GameTime {
	minutes: number;
	seconds: number;
	milliseconds: number;
}

export interface GameResults {
	id: string;
	time: GameTime;
	questionsCount: number;
	correctAnswers: {
		hiragana: string[];
		katakana: string[];
	};
	wrongAnswers: {
		hiragana: string[];
		katakana: string[];
	};
}

export interface QuestionData {
	syllabary: SYLLABARY;
	question: string;
	correctAnswer: string;
	distractors: string[];
}

export interface Stats {
	games: number;
	correctAnswers: number;
	wrongAnswers: number;
	timeSpent: { minutes: number; seconds: number; milliseconds: number };
	averageTime: { perGame: string; perQuestion: string };
	specificCharactersStats: {};
}

import { AnswersDirection, QuestionType, Syllabary } from '../enums/enums';

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
	questionType?: QuestionType;
	answersDirection: AnswersDirection;
	syllabary: Syllabary;
	question: string;
	correctAnswer: string;
	distractors: string[];
}

interface GeneralStats {
	games: number;
	correctAnswers: number;
	wrongAnswers: number;
	accuracy: string;
	timeSpent: { minutes: number; seconds: number; milliseconds: number };
	averageTime: { perGame: string; perQuestion: string };
}
export interface Stats {
	general: GeneralStats;
	japaneseToRomaji?: GeneralStats;
	romajiToJapanese?: GeneralStats;
	specificCharactersStats: {};
}

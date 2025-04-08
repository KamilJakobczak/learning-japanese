export interface GameTime {
	minutes: number;
	seconds: number;
	milliseconds: number;
}

export interface GameResults {
	id: string;
	time: GameTime;
	questionsCount: number;
	correctAnswers: string[];
	wrongAnswers: string[];
}

export interface QuestionData {
	question: string;
	correctAnswer: string;
	distractors: string[];
}

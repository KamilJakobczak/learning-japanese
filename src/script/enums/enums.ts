export enum QuestionType {
	CLOSED = 'closed', // multiple choice
	OPEN = 'open', // free input
	MIXED = 'mixed',
}
export enum AnswersDirection {
	TO_JAPANESE = 'Romaji to Japanese',
	TO_ROMAJI = 'Japanese to Romaji',
	MIXED = 'mixed',
}
export enum Difficulty {
	EASY = 'easy',
	MEDIUM = 'medium',
	HARD = 'hard',
	EXTREME = 'extreme',
}
export enum Syllabary {
	HIRAGANA = 'hiragana',
	KATAKANA = 'katakana',
	MIXED = 'mixed',
}

export enum GameState {
	START = 'start',
	// PLAYING = 'playing',
	END = 'end',
}

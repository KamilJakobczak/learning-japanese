export interface Character {
	hiragana: string;
	katakana: string;
	romaji: string;
}

export interface Sets {
	[chapter: string]: Character[];
}

export const characters: { [chapter: string]: Character } = {
	'1': {
		hiragana: 'あ',
		katakana: 'ア',
		romaji: 'a',
	},
	'2': { hiragana: 'い', katakana: 'イ', romaji: 'i' },
	'3': { hiragana: 'う', katakana: 'ウ', romaji: 'u' },
	'4': { hiragana: 'え', katakana: 'エ', romaji: 'e' },
	'5': { hiragana: 'お', katakana: 'オ', romaji: 'o' },
	'6': { hiragana: 'か', katakana: 'カ', romaji: 'ka' },
	'7': { hiragana: 'き', katakana: 'キ', romaji: 'ki' },
	'8': { hiragana: 'く', katakana: 'ク', romaji: 'ku' },
	'9': { hiragana: 'け', katakana: 'ケ', romaji: 'ke' },
	'10': { hiragana: 'こ', katakana: 'コ', romaji: 'ko' },
	'11': {
		hiragana: 'さ',
		katakana: 'サ',
		romaji: 'sa',
	},
	'12': { hiragana: 'し', katakana: 'シ', romaji: 'shi' },
	'13': { hiragana: 'す', katakana: 'ス', romaji: 'su' },
	'14': { hiragana: 'せ', katakana: 'セ', romaji: 'se' },
	'15': { hiragana: 'そ', katakana: 'ソ', romaji: 'so' },
	'16': { hiragana: 'た', katakana: 'タ', romaji: 'ta' },
	'17': { hiragana: 'ち', katakana: 'チ', romaji: 'chi' },
	'18': { hiragana: 'つ', katakana: 'ツ', romaji: 'tsu' },
	'19': { hiragana: 'て', katakana: 'テ', romaji: 'te' },
	'20': { hiragana: 'と', katakana: 'ト', romaji: 'to' },
	'21': { hiragana: 'な', katakana: 'ナ', romaji: 'na' },
	'22': { hiragana: 'に', katakana: 'ニ', romaji: 'ni' },
	'23': { hiragana: 'ぬ', katakana: 'ヌ', romaji: 'nu' },
	'24': { hiragana: 'ね', katakana: 'ネ', romaji: 'ne' },
	'25': { hiragana: 'の', katakana: 'ノ', romaji: 'no' },
	'26': { hiragana: 'は', katakana: 'ハ', romaji: 'ha' },
	'27': { hiragana: 'ひ', katakana: 'ヒ', romaji: 'hi' },
	'28': { hiragana: 'ふ', katakana: 'フ', romaji: 'fu' },
	'29': { hiragana: 'へ', katakana: 'ヘ', romaji: 'he' },
	'30': { hiragana: 'ほ', katakana: 'ホ', romaji: 'ho' },
	'31': { hiragana: 'ま', katakana: 'マ', romaji: 'ma' },
	'32': { hiragana: 'み', katakana: 'ミ', romaji: 'mi' },
	'33': { hiragana: 'む', katakana: 'ム', romaji: 'mu' },
	'34': { hiragana: 'め', katakana: 'メ', romaji: 'me' },
	'35': { hiragana: 'も', katakana: 'モ', romaji: 'mo' },
	'36': { hiragana: 'や', katakana: 'ヤ', romaji: 'ya' },
	'37': { hiragana: 'ゆ', katakana: 'ユ', romaji: 'yu' },
	'38': { hiragana: 'よ', katakana: 'ヨ', romaji: 'yo' },
	'39': { hiragana: 'ら', katakana: 'ラ', romaji: 'ra' },
	'40': { hiragana: 'り', katakana: 'リ', romaji: 'ri' },
	'41': { hiragana: 'る', katakana: 'ル', romaji: 'ru' },
	'42': { hiragana: 'れ', katakana: 'レ', romaji: 're' },
	'43': { hiragana: 'ろ', katakana: 'ロ', romaji: 'ro' },
	'44': { hiragana: 'わ', katakana: 'ワ', romaji: 'wa' },
	'45': { hiragana: 'を', katakana: 'ヲ', romaji: 'wo' },
	'46': { hiragana: 'ん', katakana: 'ン', romaji: 'n' },
	'47': { hiragana: 'が', katakana: 'ガ', romaji: 'ga' },
	'48': { hiragana: 'ぎ', katakana: 'ギ', romaji: 'gi' },
	'49': { hiragana: 'ぐ', katakana: 'グ', romaji: 'gu' },
	'50': { hiragana: 'げ', katakana: 'ゲ', romaji: 'ge' },
	'51': { hiragana: 'ご', katakana: 'ゴ', romaji: 'go' },
	'52': { hiragana: 'ざ', katakana: 'ザ', romaji: 'za' },
	'53': { hiragana: 'じ / ぢ', katakana: 'ジ / ヂ', romaji: 'ji' },
	'54': { hiragana: 'ず / づ', katakana: 'ズ / ヅ', romaji: 'zu' },
	'55': { hiragana: 'ぜ', katakana: 'ゼ', romaji: 'ze' },
	'56': { hiragana: 'ぞ', katakana: 'ゾ', romaji: 'zo' },
	'57': { hiragana: 'だ', katakana: 'ダ', romaji: 'da' },
	'58': { hiragana: 'で', katakana: 'デ', romaji: 'de' },
	'59': { hiragana: 'ど', katakana: 'ド', romaji: 'do' },
	'60': { hiragana: 'ば', katakana: 'バ', romaji: 'ba' },
	'61': { hiragana: 'び', katakana: 'ビ', romaji: 'bi' },
	'62': { hiragana: 'ぶ', katakana: 'ブ', romaji: 'bu' },
	'63': { hiragana: 'べ', katakana: 'ベ', romaji: 'be' },
	'64': { hiragana: 'ぼ', katakana: 'ボ', romaji: 'bo' },
	'65': { hiragana: 'ぱ', katakana: 'パ', romaji: 'pa' },
	'66': { hiragana: 'ぴ', katakana: 'ピ', romaji: 'pi' },
	'67': { hiragana: 'ぷ', katakana: 'プ', romaji: 'pu' },
	'68': { hiragana: 'ぺ', katakana: 'ペ', romaji: 'pe' },
	'69': { hiragana: 'ぽ', katakana: 'ポ', romaji: 'po' },
};

export const sets: Sets = {
	'1': [
		characters[1],
		characters[2],
		characters[3],
		characters[4],
		characters[5],
	], // a, i, u, e, o
	'2': [
		characters[6],
		characters[7],
		characters[8],
		characters[9],
		characters[10],
	], // ka, ki, ku, ke, ko	}
	'3': [
		characters[11],
		characters[12],
		characters[13],
		characters[14],
		characters[15],
	], // sa, shi, su, se, so
	'4': [
		characters[16],
		characters[17],
		characters[18],
		characters[19],
		characters[20],
	], // ta, chi, tsu, te, to
	'5': [
		characters[21],
		characters[22],
		characters[23],
		characters[24],
		characters[25],
	], // na, ni, nu, ne, no
	'6': [
		characters[26],
		characters[27],
		characters[28],
		characters[29],
		characters[30],
	], // ha, hi, fu, he, ho
	'7': [
		characters[31],
		characters[32],
		characters[33],
		characters[34],
		characters[35],
	], // ma, mi, mu, me, mo
	'8': [characters[36], characters[37], characters[38]], // ya, yu, yo
	'9': [
		characters[39],
		characters[40],
		characters[41],
		characters[42],
		characters[43],
	], // ra, ri, ru, re, ro
	'10': [characters[44], characters[45], characters[46]], // wa, wo, , , n
	'11': [
		characters[47],
		characters[48],
		characters[49],
		characters[50],
		characters[51],
	], // ga, gi, gu, ge, go
	'12': [
		characters[52],
		characters[53],
		characters[54],
		characters[55],
		characters[56],
	], // za, ji, zu, ze, zo
	'13': [characters[57], characters[58], characters[59]], // da, de, do
	'14': [
		characters[60],
		characters[61],
		characters[62],
		characters[63],
		characters[64],
	], // ba, bi, bu, be, bo
	'15': [
		characters[65],
		characters[66],
		characters[67],
		characters[68],
		characters[69],
	], // pa, pi, pu, pe, po
};

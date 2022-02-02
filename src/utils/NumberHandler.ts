import Big from 'big.js';

import {getCcyDataByCcy} from '../utils/CurrencyHelper';

// ------------from mobile NumberService----------------
export const ROUND = {
	DOWN: 0,
	HALF_UP: 1,
	HALF_EVEN: 2,
	UP: 3,
};

//default is round down, but read half_even(bankers rounding) is better
Big.RM = ROUND.HALF_EVEN;
//http://www.xbeat.net/vbspeed/i_BankersRounding.htm
//https://stackoverflow.com/questions/8208922/which-rounding-mode-to-be-used-for-currency-manipulation-in-java

// --- before validate with regex, we remove thousand separators ---
export const removeOnlySepNotDecimalPoint = (value: string, sep = ','): string => {
	if (value) {
		return value.replace(new RegExp('\\' + sep, 'g'), '');
	}
	console.log(value, '<-- removeOnlySepNotDecimalPoint ERROR --', sep);
	return '';
};

// --- on change --- without correcting decimals auto
export const addThousandSeparator = (value: string, thousands: string, decimalPoint: string): string => {
	// eslint-disable-next-line prefer-const
	let [left, right] = value.split(decimalPoint);
	left = addThousandToLeftSide(left, thousands);
	const decimalPointExists = value.indexOf(decimalPoint) > -1;
	if (decimalPointExists) {
		return left + decimalPoint + (right ? right : '');
	}
	return left;
};
// --- send only left side to this, otherwise thousand will be added to right side also if it exceeds 3 decimal places ---
export const addThousandToLeftSide = (value: string, thousands: string): string => {
	return value.replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
};
// ---on focus out :  correct only decimals ---
export const correctDecimals = (val: string, digits: number, decimalPoint = '.'): string => {
	const [left, right] = val.split(decimalPoint);
	if (digits > 0) {
		const decimalPointExists = right !== undefined;
		if (!decimalPointExists) {
			return left + decimalPoint.padEnd(digits + 1, '0');
		}
		if (decimalPointExists) {
			if (val === decimalPoint) {
				return getPlaceholder(digits, decimalPoint);
			}
			return (left ? left : '0') + decimalPoint + (right ? right : '').padEnd(digits, '0');
		}
	}
	return left;
};
export const getPlaceholder = (digits: number, decimalPoint = '.'): string => {
	return digits > 0 ? `0${decimalPoint}`.padEnd(digits + 2, '0') : '0'; //0. --> 2
};

//https://www.npmtrends.com/money-math-vs-decimal.js-light-vs-moneysafe-vs-currency.js-vs-decimal.js-vs-mathjs-vs-bignumber.js-vs-big.js-vs-accounting-js-vs-js-money

// ok solution we are going to use is keep the currency with their number of decimal digits. ex: JPY: 0, SGD: 2
// why we decide this without actually keeping a big decimal
//ex : we show 10 SGD (gfx) -> 6.25 EUR,  10 sgd (live) -> 6.26
// so user can add them and expect   12.51 SGD, but if we keep the whole number 6.255 + 6.265 = 12.52

// --- from db value to display, bank transfer ---
export const fromDbToDisplayByCcy = (value: number, ccy: string): string => {
	// 0 is a valid input, so need to consider
	if (ccy) {
		const {thousandsSeparator = ',', decimalDigits, decimalSeparator = '.'} = getCcyDataByCcy(ccy);
		const returnVal = Big(value).toFixed(decimalDigits);
		return addThousandSeparatorToDbValue(returnVal, thousandsSeparator, decimalSeparator);
		//returnVal.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, thousands);
	}
	console.log(value, '<-- fromDbToDisplayByCcy ERROR --', ccy);
	return value.toString();
};

export const addThousandSeparatorToDbValue = (value: string, thousands: string, decimalPoint: string): string => {
	const [left, right] = value.split('.');
	return addThousandAndConcat(left, right, thousands, decimalPoint);
};

export const addThousandAndConcat = (left: string, right: string, thousands: string, decimalPoint: string): string => {
	left = addThousandToLeftSide(left, thousands);
	if (right && thousands !== decimalPoint) {
		return `${left}${decimalPoint}${right}`;
	} else {
		return left;
	}
};
export const getDbNumberFromCcy = (value: string, ccy: string): number => {
	if (value && ccy) {
		const {thousandsSeparator, decimalSeparator, decimalDigits} = getCcyDataByCcy(ccy);
		return getDbNumber(value, thousandsSeparator, decimalSeparator, decimalDigits);
	}
	console.log(value, '<-- getDbNumberFromCcy ERROR --', ccy);
	return 0;
};
// --- same as above, if you have more than ccy info, use in conversion screen ---
export const getDbNumber = (value: string, sep = ',', decimalPoint = '.', decimalDigits: number): number => {
	if (value) {
		const correctedDecimals = correctDecimals(value, decimalDigits, decimalPoint);
		let left = correctedDecimals.split(decimalPoint)[0];
		const right = correctedDecimals.split(decimalPoint)[1];
		left = removeOnlySepNotDecimalPoint(left, sep);
		return parseFloat(left + '.' + (right ? right : ''));
	}
	// NOTE: Number(1112223334445556.99) => 1112223334445557
	console.log(value, '<-- getDbNumber ERROR --', sep, decimalPoint, decimalDigits);
	return 0;
};

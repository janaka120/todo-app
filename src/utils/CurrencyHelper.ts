import jsonData from '../json/WorldCurrencies.json';

const worldCurrencies: IJsonFile = <IJsonFile>jsonData;

export interface CommonCcy {
	cca3: string;
	decimalDigits: number;
	decimalSeparator: string;
	rateDigits: number;
	spaceBetweenAmountAndSymbol: boolean;
	symbol: string;
	symbolOnLeft: boolean;
	thousandsSeparator: string;
}
interface JsonCcy extends CommonCcy {
	name: {
		en_name: string;
		ja_name: string;
	};
}
export interface CcyExtraInfo extends CommonCcy {
	name: string;
}

interface IJsonFile {
	[key: string]: JsonCcy;
}

export const getCcyDataByCcy = (ccy: string): CcyExtraInfo => {
	const data: JsonCcy = worldCurrencies[ccy];
	if (data) {
		return {
			...data,
			name: data.name.en_name,
		};
	}
	return blankCcyData;
};

export const blankCcyData: CcyExtraInfo = {
	cca3: '',
	decimalDigits: 2,
	decimalSeparator: '.',
	name: '',
	rateDigits: 4,
	spaceBetweenAmountAndSymbol: false,
	symbol: '',
	symbolOnLeft: true,
	thousandsSeparator: ',',
};

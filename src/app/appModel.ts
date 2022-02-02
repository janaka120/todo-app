interface IObjectKeys {
	[key: string]: any;
}

export type FieldNames<T> = {
	[K in keyof T]: K;
};

export interface ApiCallStatus {
	isInProgress: boolean;
	isErrorOccurred: boolean;
}

export interface ApiPageResponse<T> {
	success: boolean;
	data?: Array<T>;
	msg?: string;
}

export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	msg?: string;
	extra?: any;
}

export interface NameValuePair {
	label: string;
	value: string;
}

export interface OptionItem {
	value: string;
}

export interface NameValuePairType<T> {
	label: string;
	value: T;
}

export const getFieldNameMap = (srcObj: any): Record<string, unknown> =>
	Object.keys(srcObj).reduce((obj: Record<string, any>, k) => {
		obj[k] = k;
		return obj;
}, {});

export interface PageResponse<T> {
	records: Array<T>;
}
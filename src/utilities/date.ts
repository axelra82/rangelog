import { DefaultThemePaletteColor } from "~/types/theme";
import { AlertColor } from "@suid/material/Alert";

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const month = week * 4;
const year = month * 12;

/**
	* Convert UNIX timestamp to local string (defaults to "sv-SE"). Default return is date only, to include hours and minutes set `withTime` to true.
	*
	* @param {(string | number)} timestamp A UNIX timestamp.
	* @param {boolean} [withTime=false] Set to `true` to return hours and minutes after date.
	* @param {string} locale Optional locale.
	* @returns {string}
	*/
export const timestampToLocaleDate = (timestamp: string | number, withTime = false, locale = "sv-SE"): string => {
	const date = new Date(Number(timestamp));

	const localeDate = date.toLocaleString(locale, {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		...(withTime && {
			hour: "2-digit",
			minute: "2-digit",
		}),
	});

	return localeDate;
};

export const tempDateFormatter = (timestamp: number) => {
	const date = new Date(timestamp);

	const formatter = new Intl.DateTimeFormat(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
		// hour: "2-digit",
		// minute: "2-digit",
		// second: "2-digit",
		// hour12: false,
	});

	return formatter.format(date);
};

/**
	* Convert a UNIX timestamp to relative date (a.k.a. time ago).
	*
	* E.g.
	* - `3 days ago`
	* - `2 minutes ago`
	* - `just now`
	*
	* @param {(string | number)} timestamp
	* @returns {string}
	*/
export const timestampToRelative = (timestamp: string | number): string => {
	const secondsAgo = Math.round((Date.now() - Number(timestamp)));

	// If time past is less than one (1) minute, return sentence "Just now".
	if (secondsAgo < minute) {
		// `${secondsAgo} second${secondsAgo !== 1 ? "s" : ""} ago`
		return "Just now";
	}

	let divisor;
	let unit = "";

	if (secondsAgo < hour) {
		[divisor, unit] = [minute, "minute"];
	} else if (secondsAgo < day) {
		[divisor, unit] = [hour, "hour"];
	} else if (secondsAgo < week) {
		[divisor, unit] = [day, "day"];
	} else if (secondsAgo < month) {
		[divisor, unit] = [week, "week"];
	} else if (secondsAgo < year) {
		[divisor, unit] = [month, "month"];
	} else {
		[divisor, unit] = [year, "year"];
	}

	const count = Math.floor(secondsAgo / divisor);
	return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
};

/**
	* Convert a regular date time (string), e.g. `2025-01-28 10:05:53.528Z`, to a UNIX timestamp (number) `1738058753528`.
	*
	* @param {string} dateTime
	* @param {boolean} [milliseconds=true]
	* @returns {number}
	*/
export const dateTimeToUnixTimestamp = (
	dateTime: string,
	milliseconds: boolean = true,
): number => {
	// Normalize the format by replacing space with "T"
	const normalizedDateTime = dateTime.replace(" ", "T");

	const date = new Date(normalizedDateTime);

	if (Number.isNaN(date.getTime())) {
		throw new Error("Invalid UTC date-time string");
	}

	return milliseconds ? date.getTime() : Math.floor(date.getTime() / 1000);
};

export const currentDatePastCutoff = (cutoff: Date) => {
	const now = new Date();
	return now >= cutoff;
};

/**
	* Convert UNIX timestamp to a formatted date.
	* In order to format the date according to the user's browser language settings, undefined is being used as locale in Intl.DateTimeFormat
	*
	* @param {(string | number)} timestamp A UNIX timestamp.
	* @returns {string}
	*/
export const formatDate = (timestamp: string | number) => {
	const date = new Date(Number(timestamp));

	const dateTimeFormat = new Intl.DateTimeFormat(undefined, {
		year: "numeric",
		month: "short",
		day: "2-digit",
	});

	const formatted = dateTimeFormat.format(date);

	return formatted;
};

/**
	* Convert UNIX timestamp to a formatted date range.
	* In order to format the date according to the user's browser language settings, undefined is being used as locale in Intl.DateTimeFormat
	*
	* @param {(string | number)} timestampStartDate A UNIX timestamp.
	* @param {(string | number)} timestampEndDate A UNIX timestamp.
	* @returns {string}
	*/
export const formatDateRange = (timestampStartDate: number, timestampEndDate: number) => {
	const startDate = new Date(Number(timestampStartDate));
	const endDate = new Date(Number(timestampEndDate));

	const dateTimeFormat = new Intl.DateTimeFormat(undefined, {
		year: "numeric",
		month: "short",
		day: "numeric",
	});

	const formatted = dateTimeFormat.formatRange(startDate, endDate);

	return formatted;
};

/**
	* Check if the year that is provided is the same as the year we are in.
	*
	* @param {string} givenYear The full year you want to compare with, i.e. "2025", "2038", etc.
	* @returns {boolean}
	*/
export const isCurrentYear = (givenYear: string): boolean => {
	// Get current year, i.e. 2025
	const currentYear = String(new Date().getFullYear());

	if (currentYear === givenYear) {
		return true;
	}

	return false;
};

/**
	* Check if the month that is provided is the same as the month we are in.
	*
	* @param {string} givenMonth The month you want to compare with, i.e. "1" for January, "5" for May, "12" for December, etc.
	* @returns {boolean}
	*/
export const isCurrentMonth = (givenMonth: string): boolean => {
	// Get current month, i.e. 4
	// Javascript months are 0–11, thus +1
	const currentMonth = String(new Date().getMonth() + 1);

	if (currentMonth === givenMonth) {
		return true;
	}

	return false;
};

export const calculateTimestampDiff = (timestamp1: number, timestamp2: number) => {
	const difference = timestamp1 - timestamp2;

	return difference;
};

export const timestampToMinutes = (timestamp: number) => {
	const minutes = Math.floor((timestamp % (1000 * 60 * 60)) / (1000 * 60));

	return minutes;
};

export const timestampToSeconds = (timestamp: number) => {
	const seconds = Math.floor((timestamp % (1000 * 60)) / 1000);

	return seconds;
};

/**
	* Creates a string with todays date in ISO format (full year-two numbered month-two numbered day), e.g. `2026-02-12`
	*
	* @returns {string}
	*/
export const todayISODate = (
	preserveTime = false,
	spacedTime = false,
): string => {
	const date = new Date();

	if (preserveTime) {
		// Format for datetime-local input: "yyyy-MM-ddTHH:mm"
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");

		return `${year}-${month}-${day}${spacedTime ? " " : "T"}${hours}:${minutes}:00`;
	}

	// Format for date input: "yyyy-MM-dd"
	return date.toISOString().split("T")[0];
}

/**
	* Convert ISO datetime string to format suitable for HTML date/datetime inputs
	*
	* @param isoDateTime ISO datetime string like "2025-01-05T10:30:00.000Z" or "2025-01-05 10:30:00.000Z"
	* @param withTime If true, returns "yyyy-MM-ddTHH:mm" for datetime-local input, otherwise "yyyy-MM-dd" for date input
	* @returns Formatted string for HTML input
	*/
export const isoDateTimeToDateInput = (
	isoDateTime: string,
	withTime = false,
	spacedTime = true,
): string => {
	const date = new Date(isoDateTime);

	if (withTime) {
		// Format for datetime-local input: "yyyy-MM-ddTHH:mm"
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");
		return `${year}-${month}-${day}${spacedTime ? " " : "T"}${hours}:${minutes}:00`;
	}

	// Format for date input: "yyyy-MM-dd"
	return date.toISOString().split("T")[0];
};

export const checkLicenseExpiry = (licenseEnd?: string) => {
	if (!licenseEnd) {
		return null;
	}

	const endDate = new Date(licenseEnd);
	const today = new Date();
	const sixMonthsFromNow = new Date();
	sixMonthsFromNow.setMonth(today.getMonth() + 6);

	const diffTime = endDate.getTime() - today.getTime();
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays < 0) {
		return {
			severity: DefaultThemePaletteColor.ERROR as AlertColor,
			message: `Licens gick ut för ${Math.abs(diffDays)} dagar sen`,
		};
	}

	if (endDate <= sixMonthsFromNow) {
		const isToday = diffDays === 0;

		return {
			severity: (isToday ? DefaultThemePaletteColor.ERROR : DefaultThemePaletteColor.WARNING) as AlertColor,
			message: `Licens går ut ${isToday ? `idag` : `om ${diffDays} dagar`}`,
		};
	}

	return null;
}

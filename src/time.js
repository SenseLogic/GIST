// -- IMPORTS

import { isBrowser } from './base.js';
import { getLeftPaddedText } from './text.js';

// -- CONSTANTS

export const nullDate = {
    year : 1000,
    month : 1,
    day : 1
    };
export const nullTime = {
    hour : 0,
    minute : 0,
    second : 0.0
    };
export const nullDateTime = {
    year : 1000,
    month : 1,
    day : 1,
    hour : 0,
    minute : 0,
    second : 0.0
    };

// -- FUNCTIONS

export function getMillisecondTimestamp(
    )
{
    if ( isBrowser )
    {
        return window.performance.timing.navigationStart + window.performance.now();
    }
    else
    {
        let hrTime = process.hrtime();

        return parseInt( hrTime[ 0 ] * 1000 + hrTime[ 1 ] / 1000000 );
    }
}

// ~~

export function getLocalDate(
    systemDate
    )
{
    if ( systemDate === undefined )
    {
        systemDate = new Date();
    }

    return {
        year : systemDate.getFullYear(),
        month : systemDate.getMonth(),
        day : systemDate.getDay()
        };
}

// ~~

export function getLocalTime(
    systemDate
    )
{
    if ( systemDate === undefined )
    {
        systemDate = new Date();
    }

    return {
        hour : systemDate.getHours(),
        minute : systemDate.getMinutes(),
        second : systemDate.getSeconds()
        };
}

// ~~

export function getLocalDateTime(
    systemDate
    )
{
    if ( systemDate === undefined )
    {
        systemDate = new Date();
    }

    return {
        year : systemDate.getFullYear(),
        month : systemDate.getMonth(),
        day : systemDate.getDay(),
        hour : systemDate.getHours(),
        minute : systemDate.getMinutes(),
        second : systemDate.getSeconds()
        };
}

// ~~

export function getUniversalDate(
    systemDate
    )
{
    if ( systemDate === undefined )
    {
        systemDate = new Date();
    }

    return {
        year : systemDate.getUTCFullYear(),
        month : systemDate.getUTCMonth(),
        day : systemDate.getUTCDay()
        };
}

// ~~

export function getUniversalTime(
    systemDate
    )
{
    if ( systemDate === undefined )
    {
        systemDate = new Date();
    }

    return {
        hour : systemDate.getUTCHours(),
        minute : systemDate.getUTCMinutes(),
        second : systemDate.getUTCSeconds()
        };
}

// ~~

export function getUniversalDateTime(
    systemDate
    )
{
    if ( systemDate === undefined )
    {
        systemDate = new Date();
    }

    return {
        year : systemDate.getUTCFullYear(),
        month : systemDate.getUTCMonth(),
        day : systemDate.getUTCDay(),
        hour : systemDate.getUTCHours(),
        minute : systemDate.getUTCMinutes(),
        second : systemDate.getUTCSeconds()
        };
}

// ~~

export function getDateText(
    date,
    suffix = ''
    )
{
    return (
        getLeftPaddedText( date.year.toString(), 4, '0' )
        + ':'
        + getLeftPaddedText( date.month.toString(), 2, '0' )
        + ':'
        + getLeftPaddedText( date.day.toString(), 2, '0' )
        + suffix
        );
}

// ~~

export function getTimeText(
    time,
    suffix = ''
    )
{
    return (
        getLeftPaddedText( time.hour.toString(), 2, '0' )
        + '-'
        + getLeftPaddedText( time.minute.toString(), 2, '0' )
        + '-'
        + getLeftPaddedText( time.second.toString(), 2, '0' )
        + suffix
        );
}

// ~~

export function getDateTimeText(
    dateTime,
    infix = ' ',
    suffix = ''
    )
{
    return (
        getLeftPaddedText( dateTime.year.toString(), 4, '0' )
        + '-'
        + getLeftPaddedText( dateTime.month.toString(), 2, '0' )
        + '-'
        + getLeftPaddedText( dateTime.day.toString(), 2, '0' )
        + infix
        + getLeftPaddedText( dateTime.hour.toString(), 2, '0' )
        + ':'
        + getLeftPaddedText( dateTime.minute.toString(), 2, '0' )
        + ':'
        + getLeftPaddedText( dateTime.second.toString(), 2, '0' )
        + suffix
        );
}

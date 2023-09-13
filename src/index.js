// -- IMPORTS

import crypto from 'crypto';
import md5 from 'md5';

// -- CONSTANTS

export const
    isBrowser = ( typeof window !== 'undefined' && typeof window.document !== 'undefined' ),
    nullTuid = 'AAAAAAAAAAAAAAAAAAAAAA',
    nullUuid = '00000000-0000-0000-0000-000000000000',
    nullDate = {
        year : 1000,
        month : 1,
        day : 1
        },
    nullTime = {
        hour : 0,
        minute : 0,
        second : 0.0
        },
    nullDateTime = {
        year : 1000,
        month : 1,
        day : 1,
        hour : 0,
        minute : 0,
        second : 0.0
        },
    minimumInteger = -9007199254740991,
    maximumInteger = 9007199254740991,
    naturalExpression = /^[0-9][0-9]*$/,
    integerExpression = /^-?[0-9][0-9]*$/,
    realExpression = /^-?[0-9][0-9]*\.[0-9]*$/,
    numericExpression = /^-?[0-9][0-9]*\.?[0-9]*$/,
    slugExpression = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// -- VARIABLES

export let
    countryCode = '',
    defaultCountryCode = '',
    languageCode = 'en',
    defaultLanguageCode = 'en',
    textByLanguageTagsMapBySlugMap = new Map(),
    processedLineTagArray = [],
    processedDualTagArray = [],
    processedTagArray = [],
    locationByIpAddressMap = new Map(),
    googleAnalyticsTrackingScript = null,
    googleAnalyticsTrackingIsEnabled = false;

// -- FUNCTIONS

export const
    raw = String.raw,
    print = console.log,
    printObject = console.dir,
    printTable = console.table,
    printStack = console.trace,
    isNaN = Number.isNaN,
    isInteger = Number.isInteger,
    getReal = parseFloat,
    getInteger = parseInt,
    getNumber = Number,
    getText = String,
    getEscapedText = escape,
    getUnescapedText = unescape,
    getEncodedUri = encodeURI,
    getDecodedUri = decodeURI,
    getJsonText = JSON.stringify,
    getJsonObject = JSON.parse;

// ~~

export function printValue(
    value
    )
{
    console.log( getJsonText( value ) );
}

// ~~

export function printWarning(
    warning
    )
{
    console.trace();
    console.warn( warning );
}

// ~~

export function printError(
    error
    )
{
    console.trace();
    console.error( error );
}

// ~~

export function isBooleanText(
    text
    )
{
    return text === 'false' || text === 'true';
}

// ~~

export function isBinaryText(
    text
    )
{
    return text === '0' || text === '1';
}

// ~~

export function isNaturalText(
    text
    )
{
    return text.match( naturalExpression );
}

// ~~

export function isIntegerText(
    text
    )
{
    return text.match( integerExpression );
}

// ~~

export function isRealText(
    text
    )
{
    return text.match( realExpression );
}

// ~~

export function isNumericText(
    text
    )
{
    return text.match( numericExpression );
}

// ~~

export function isSlugText(
    text
    )
{
    return text.match( slugExpression );
}

// ~~

export function isBoolean(
    value
    )
{
    return typeof value === 'boolean';
}

// ~~

export function isNatural(
    value
    )
{
    return isInteger( value ) && getInteger( value ) >= 0;
}

// ~~

export function isNumber(
    value
    )
{
    return typeof value === 'number';
}

// ~~

export function isString(
    value
    )
{
    return typeof value === 'string';
}

// ~~

export function isObject(
    value
    )
{
    return (
        value !== null
        && typeof value === 'object'
        && !Array.isArray( value )
        );
}

// ~~

export function isArray(
    value
    )
{
    return value instanceof Array;
}

// ~~

export function isFunction(
    value
    )
{
    return value instanceof Function;
}

// ~~

export function isElement(
    value
    )
{
    return value instanceof HTMLElement;
}

// ~~

export function removePrefix(
    text,
    prefix
    )
{
    if ( prefix !== ''
         && text.startsWith( prefix ) )
    {
        return text.substring( prefix.length );
    }
    else
    {
        return text;
    }
}

// ~~

export function removeSuffix(
    text,
    suffix
    )
{
    if ( suffix !== ''
         && text.endsWith( suffix ) )
    {
        return text.substring( 0, text.length - suffix.length );
    }
    else
    {
        return text;
    }
}

// ~~

export function replacePrefix(
    text,
    oldPrefix,
    newPrefix
    )
{
    if ( text.startsWith( oldPrefix ) )
    {
        return newPrefix + text.substring( oldPrefix.length );
    }
    else
    {
        return text;
    }
}

// ~~

export function replaceSuffix(
    text,
    oldSuffix,
    newSuffix
    )
{
    if ( text.endsWith( oldSuffix ) )
    {
        return text.substring( 0, text.length - oldSuffix.length ) + newSuffix;
    }
    else
    {
        return text;
    }
}

// ~~

export function replaceIteratively(
    text,
    oldText,
    newText
    )
{
    let replacedText = text;

    do
    {
        let oldReplacedText = replacedText;

        replacedText = replacedText.replaceAll( oldText, newText );
    }
    while ( replacedText !== oldReplacedText );

    return oldReplacedText;
}

// ~~

export function getLeftPaddedText(
    text,
    minimumCharacterCount,
    paddingCharacter = ' '
    )
{
    if ( text.length < minimumCharacterCount )
    {
        return paddingCharacter.repeat( minimumCharacterCount - text.length ) + text;
    }
    else
    {
        return text;
    }
}

// ~~

export function getRightPaddedText(
    text,
    minimumCharacterCount,
    paddingCharacter = ' '
    )
{
    if ( text.length < minimumCharacterCount )
    {
        return text + paddingCharacter.repeat( minimumCharacterCount - text.length );
    }
    else
    {
        return text;
    }
}


export function getEncodedName(
    name
    )
{
    return '`' + name + '`';
}

// ~~

export function getQuotedText(
    value
    )
{
    return (
        '"'
        + value.toString()
              .replaceAll( '\\', '\\\\' )
              .replaceAll( '\n', '\\n' )
              .replaceAll( '\r', '\\r' )
              .replaceAll( '\t', '\\t' )
              .replaceAll( '"', '\\"' )
              .replaceAll( '\'', '\\\'' )
        + '"'
        );
}

// ~~

export function getHexadecimalTextFromInteger(
    integer
    )
{
    return parseInt( integer ).toString( 16 );
}

// ~~

export function getBase64TextFromHexadecimalText(
    hexadecimalText
    )
{
    if ( isBrowser )
    {
        let text = '';

        for ( let byteIndex = 0;
              byteIndex < hexadecimalText.length;
              byteIndex += 2 )
        {
            text += String.fromCharCode( parseInt( hexadecimalText.slice( byteIndex, byteIndex + 2 ), 16 ) );
        }

        return btoa( text );
    }
    else
    {
        return Buffer.from( hexadecimalText, 'hex' ).toString( 'base64' );
    }
}

// ~~

export function getTuidFromHexadecimalText(
    hexadecimalText
    )
{
    return getBase64TextFromHexadecimalText( hexadecimalText ).replaceAll( '+', '-' ).replaceAll( '/', '_' ).replaceAll( '=', '' );
}

// ~~

export function getTuidFromText( text )
{
    if ( text === '' )
    {
        return '';
    }
    else
    {
        return getTuidFromHexadecimalText( md5( text ) );
    }
}

// ~~

export function getHexadecimalTextFromBase64Text(
    base64Text
    )
{
    if ( isBrowser )
    {
        let text = atob( base64Text );
        let hexadecimalText = '';

        for ( let characterIndex = 0;
              characterIndex < text.length;
              ++characterIndex )
        {
            hexadecimalText += ( '0' + text.charCodeAt( characterIndex ).toString( 16 ) ).slice( -2 );
        }

        return hexadecimalText;
    }
    else
    {
        return Buffer.from( base64Text , 'base64' ).toString( 'hex' );
    }
}

// ~~

export function getHexadecimalTextFromTuid(
    tuid
    )
{
    return getHexadecimalTextFromBase64Text( tuid.replaceAll( '-', '+' ).replaceAll( '_', '/' ) + '==' );
}

// ~~

export function getUuidFromHexadecimalText(
    hexadecimalText
    )
{
    return (
        hexadecimalText.substring( 0, 8 )
        + '-'
        + hexadecimalText.substring( 8, 12 )
        + '-'
        + hexadecimalText.substring( 12, 16 )
        + '-'
        + hexadecimalText.substring( 16, 20 )
        + '-'
        + hexadecimalText.substring( 20, 32 )
        );
}

// ~~

export function getUuidFromText(
    text
    )
{
    if ( text === '' )
    {
        return '00000000-0000-0000-0000-000000000000';
    }
    else
    {
        return getUuidFromHexadecimalText( md5( text ) );
    }
}

// ~~

export function getRandomByteArray(
    byteCount
    )
{
    return crypto.randomBytes( byteCount );
}

// ~~

export function getRandomHexadecimalText(
    byteCount
    )
{
    return crypto.randomBytes( byteCount ).toString( 'hex' );
}

// ~~

export function getTimeUuid(
    )
{
    return getUuidFromHexadecimalText(
        getHexadecimalTextFromInteger( ( getMillisecondTimestamp() + 12219292800000 ) * 10000 )
        + getRandomHexadecimalText( 16 )
        );
}

// ~~

export function getRandomUuid(
    )
{
    return crypto.randomUUID();
}

// ~~

export function getUuidFromTuid(
    tuid
    )
{
    return getUuidFromHexadecimalText( getHexadecimalTextFromTuid( tuid ) );
}

// ~~

export function getRandomTuid(
    )
{
    return getTuidFromUuid( getRandomUuid() );
}

// ~~

export function getTuidFromUuid(
    uuid
    )
{
    return getTuidFromHexadecimalText( uuid.replaceAll( '-', '' ) );
}

// ~~

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
        month : systemDate.getMonth() + 1,
        day : systemDate.getDate()
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
        month : systemDate.getMonth() + 1,
        day : systemDate.getDate(),
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
        month : systemDate.getUTCMonth() + 1,
        day : systemDate.getUTCDate()
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
        month : systemDate.getUTCMonth() + 1,
        day : systemDate.getUTCDate(),
        hour : systemDate.getUTCHours(),
        minute : systemDate.getUTCMinutes(),
        second : systemDate.getUTCSeconds(),
        millisecond : systemDate.getUTCMilliseconds()
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

// ~~

export function getTimestampText(
    timestamp,
    infix = ' ',
    suffix = ''
    )
{
    return (
        getLeftPaddedText( timestamp.year.toString(), 4, '0' )
        + '-'
        + getLeftPaddedText( timestamp.month.toString(), 2, '0' )
        + '-'
        + getLeftPaddedText( timestamp.day.toString(), 2, '0' )
        + infix
        + getLeftPaddedText( timestamp.hour.toString(), 2, '0' )
        + ':'
        + getLeftPaddedText( timestamp.minute.toString(), 2, '0' )
        + ':'
        + getLeftPaddedText( timestamp.second.toString(), 2, '0' )
        + '.'
        + getLeftPaddedText( timestamp.millisecond.toString(), 3, '0' )
        + suffix
        );
}

// ~~

export function getDateTimeSuffix(
    dateTime,
    infix = '',
    suffix = ''
    )
{
    return (
        getLeftPaddedText( dateTime.year.toString(), 4, '0' )
        + infix
        + getLeftPaddedText( dateTime.month.toString(), 2, '0' )
        + infix
        + getLeftPaddedText( dateTime.day.toString(), 2, '0' )
        + infix
        + getLeftPaddedText( dateTime.hour.toString(), 2, '0' )
        + infix
        + getLeftPaddedText( dateTime.minute.toString(), 2, '0' )
        + infix
        + getLeftPaddedText( dateTime.second.toString(), 2, '0' )
        + infix
        + getLeftPaddedText( dateTime.millisecond.toString(), 3, '0' )
        + suffix
        );
}

// ~~

export function getLogicalFilePath(
    filePath
    )
{
    return filePath.replaceAll( '\\', '/' );
}

// ~~

export function getFolderPath(
    filePath
    )
{
    return filePath.substring( 0, filePath.lastIndexOf( '/' ) + 1 );
}

// ~~

export function getFileName(
    filePath
    )
{
    return filePath.substring( filePath.lastIndexOf( '/' ) + 1 );
}

// ~~

export function getValidFileName(
    fileName
    )
{
    return replaceIteratively( fileName.replace( /[^\p{L}\p{N}\-_.]/gu, '_' ), '__', '_' );
}

// ~~

export function getCapitalLatitudeFromCountryCode(
    countryCode
    )
{
    switch ( countryCode )
    {
        case 'ad' : return 42.5;
        case 'ae' : return 24.46666667;
        case 'af' : return 34.51666667;
        case 'ag' : return 17.11666667;
        case 'ai' : return 18.21666667;
        case 'al' : return 41.31666667;
        case 'am' : return 40.16666667;
        case 'ao' : return -8.833333333;
        case 'aq' : return -80.0;
        case 'ar' : return -34.58333333;
        case 'as' : return -14.26666667;
        case 'at' : return 48.2;
        case 'au' : return -35.26666667;
        case 'aw' : return 12.51666667;
        case 'ax' : return 60.116667;
        case 'az' : return 40.38333333;
        case 'ba' : return 43.86666667;
        case 'bb' : return 13.1;
        case 'bd' : return 23.71666667;
        case 'be' : return 50.83333333;
        case 'bf' : return 12.36666667;
        case 'bg' : return 42.68333333;
        case 'bh' : return 26.23333333;
        case 'bi' : return -3.366666667;
        case 'bj' : return 6.483333333;
        case 'bl' : return 17.88333333;
        case 'bm' : return 32.28333333;
        case 'bn' : return 4.883333333;
        case 'bo' : return -16.5;
        case 'br' : return -15.78333333;
        case 'bs' : return 25.08333333;
        case 'bt' : return 27.46666667;
        case 'bw' : return -24.63333333;
        case 'by' : return 53.9;
        case 'bz' : return 17.25;
        case 'ca' : return 45.41666667;
        case 'cc' : return -12.16666667;
        case 'cd' : return -4.316666667;
        case 'cf' : return 4.366666667;
        case 'cg' : return -4.25;
        case 'ch' : return 46.91666667;
        case 'ci' : return 6.816666667;
        case 'ck' : return -21.2;
        case 'cl' : return -33.45;
        case 'cm' : return 3.866666667;
        case 'cn' : return 39.91666667;
        case 'co' : return 4.6;
        case 'cr' : return 9.933333333;
        case 'cu' : return 23.11666667;
        case 'cv' : return 14.91666667;
        case 'cw' : return 12.1;
        case 'cx' : return -10.41666667;
        case 'cy' : return 35.16666667;
        case 'cz' : return 50.08333333;
        case 'de' : return 52.51666667;
        case 'dj' : return 11.58333333;
        case 'dk' : return 55.66666667;
        case 'dm' : return 15.3;
        case 'do' : return 18.46666667;
        case 'dz' : return 36.75;
        case 'ec' : return -0.216666667;
        case 'ee' : return 59.43333333;
        case 'eg' : return 30.05;
        case 'eh' : return 27.153611;
        case 'er' : return 15.33333333;
        case 'es' : return 40.4;
        case 'et' : return 9.033333333;
        case 'fi' : return 60.16666667;
        case 'fj' : return -18.13333333;
        case 'fk' : return -51.7;
        case 'fm' : return 6.916666667;
        case 'fo' : return 62;
        case 'fr' : return 48.86666667;
        case 'ga' : return 0.383333333;
        case 'gb' : return 51.5;
        case 'gd' : return 12.05;
        case 'ge' : return 41.68333333;
        case 'gg' : return 49.45;
        case 'gh' : return 5.55;
        case 'gi' : return 36.13333333;
        case 'gl' : return 64.18333333;
        case 'gm' : return 13.45;
        case 'gn' : return 9.5;
        case 'gq' : return 3.75;
        case 'gr' : return 37.98333333;
        case 'gs' : return -54.283333;
        case 'gt' : return 14.61666667;
        case 'gu' : return 13.46666667;
        case 'gw' : return 11.85;
        case 'gy' : return 6.8;
        case 'hk' : return 0;
        case 'hm' : return 0;
        case 'hn' : return 14.1;
        case 'hr' : return 45.8;
        case 'ht' : return 18.53333333;
        case 'hu' : return 47.5;
        case 'id' : return -6.166666667;
        case 'ie' : return 53.31666667;
        case 'il' : return 31.76666667;
        case 'im' : return 54.15;
        case 'in' : return 28.6;
        case 'io' : return -7.3;
        case 'iq' : return 33.33333333;
        case 'ir' : return 35.7;
        case 'is' : return 64.15;
        case 'it' : return 41.9;
        case 'je' : return 49.18333333;
        case 'jm' : return 18;
        case 'jo' : return 31.95;
        case 'jp' : return 35.68333333;
        case 'ke' : return -1.283333333;
        case 'kg' : return 42.86666667;
        case 'kh' : return 11.55;
        case 'ki' : return -0.883333333;
        case 'km' : return -11.7;
        case 'kn' : return 17.3;
        case 'ko' : return 42.66666667;
        case 'kp' : return 39.01666667;
        case 'kr' : return 37.55;
        case 'kw' : return 29.36666667;
        case 'ky' : return 19.3;
        case 'kz' : return 51.16666667;
        case 'la' : return 17.96666667;
        case 'lb' : return 33.86666667;
        case 'lc' : return 14;
        case 'li' : return 47.13333333;
        case 'lk' : return 6.916666667;
        case 'lr' : return 6.3;
        case 'ls' : return -29.31666667;
        case 'lt' : return 54.68333333;
        case 'lu' : return 49.6;
        case 'lv' : return 56.95;
        case 'ly' : return 32.88333333;
        case 'ma' : return 34.01666667;
        case 'mc' : return 43.73333333;
        case 'md' : return 47;
        case 'me' : return 42.43333333;
        case 'mf' : return 18.0731;
        case 'mg' : return -18.91666667;
        case 'mh' : return 7.1;
        case 'mk' : return 42;
        case 'ml' : return 12.65;
        case 'mm' : return 16.8;
        case 'mn' : return 47.91666667;
        case 'mo' : return 0;
        case 'mp' : return 15.2;
        case 'mr' : return 18.06666667;
        case 'ms' : return 16.7;
        case 'mt' : return 35.88333333;
        case 'mu' : return -20.15;
        case 'mv' : return 4.166666667;
        case 'mw' : return -13.96666667;
        case 'mx' : return 19.43333333;
        case 'my' : return 3.166666667;
        case 'mz' : return -25.95;
        case 'na' : return -22.56666667;
        case 'nc' : return -22.26666667;
        case 'ne' : return 13.51666667;
        case 'nf' : return -29.05;
        case 'ng' : return 9.083333333;
        case 'ni' : return 12.13333333;
        case 'nl' : return 52.35;
        case 'no' : return 59.91666667;
        case 'np' : return 27.71666667;
        case 'nr' : return -0.5477;
        case 'nu' : return -19.01666667;
        case 'nz' : return -41.3;
        case 'om' : return 23.61666667;
        case 'pa' : return 8.966666667;
        case 'pe' : return -12.05;
        case 'pf' : return -17.53333333;
        case 'pg' : return -9.45;
        case 'ph' : return 14.6;
        case 'pk' : return 33.68333333;
        case 'pl' : return 52.25;
        case 'pm' : return 46.76666667;
        case 'pn' : return -25.06666667;
        case 'pr' : return 18.46666667;
        case 'ps' : return 31.76666667;
        case 'pt' : return 38.71666667;
        case 'pw' : return 7.483333333;
        case 'py' : return -25.26666667;
        case 'qa' : return 25.28333333;
        case 'ro' : return 44.43333333;
        case 'rs' : return 44.83333333;
        case 'ru' : return 55.75;
        case 'rw' : return -1.95;
        case 'sa' : return 24.65;
        case 'sb' : return -9.433333333;
        case 'sc' : return -4.616666667;
        case 'sd' : return 15.6;
        case 'se' : return 59.33333333;
        case 'sg' : return 1.283333333;
        case 'sh' : return -15.93333333;
        case 'si' : return 46.05;
        case 'sj' : return 78.21666667;
        case 'sk' : return 48.15;
        case 'sl' : return 8.483333333;
        case 'sm' : return 43.93333333;
        case 'sn' : return 14.73333333;
        case 'so' : return 2.066666667;
        case 'sr' : return 5.833333333;
        case 'ss' : return 4.85;
        case 'st' : return 0.333333333;
        case 'sv' : return 13.7;
        case 'sx' : return 18.01666667;
        case 'sy' : return 33.5;
        case 'sz' : return -26.31666667;
        case 'tc' : return 21.46666667;
        case 'td' : return 12.1;
        case 'tf' : return -49.35;
        case 'tg' : return 6.116666667;
        case 'th' : return 13.75;
        case 'tj' : return 38.55;
        case 'tk' : return -9.166667;
        case 'tl' : return -8.583333333;
        case 'tm' : return 37.95;
        case 'tn' : return 36.8;
        case 'to' : return -21.13333333;
        case 'tr' : return 39.93333333;
        case 'tt' : return 10.65;
        case 'tv' : return -8.516666667;
        case 'tw' : return 25.03333333;
        case 'tz' : return -6.8;
        case 'ua' : return 50.43333333;
        case 'ug' : return 0.316666667;
        case 'um' : return 38.883333;
        case 'us' : return 38.883333;
        case 'uy' : return -34.85;
        case 'uz' : return 41.31666667;
        case 'va' : return 41.9;
        case 'vc' : return 13.13333333;
        case 've' : return 10.48333333;
        case 'vg' : return 18.41666667;
        case 'vi' : return 18.35;
        case 'vn' : return 21.03333333;
        case 'vu' : return -17.73333333;
        case 'wf' : return -13.95;
        case 'ws' : return -13.81666667;
        case 'ye' : return 15.35;
        case 'za' : return -25.7;
        case 'zm' : return -15.41666667;
        case 'zw' : return -17.81666667;
    }

    return 0.0;
}

// ~~

export function getCapitalLongitudeFromCountryCode(
    countryCode
    )
{
    switch ( countryCode )
    {
        case 'ad' : return 1.516667;
        case 'ae' : return 54.366667;
        case 'af' : return 69.183333;
        case 'ag' : return -61.85;
        case 'ai' : return -63.05;
        case 'al' : return 19.816667;
        case 'am' : return 44.5;
        case 'ao' : return 13.216667;
        case 'aq' : return 0.0;
        case 'ar' : return -58.666667;
        case 'as' : return -170.7;
        case 'at' : return 16.366667;
        case 'au' : return 149.133333;
        case 'aw' : return -70.033333;
        case 'ax' : return 19.9;
        case 'az' : return 49.866667;
        case 'ba' : return 18.416667;
        case 'bb' : return -59.616667;
        case 'bd' : return 90.4;
        case 'be' : return 4.333333;
        case 'bf' : return -1.516667;
        case 'bg' : return 23.316667;
        case 'bh' : return 50.566667;
        case 'bi' : return 29.35;
        case 'bj' : return 2.616667;
        case 'bl' : return -62.85;
        case 'bm' : return -64.783333;
        case 'bn' : return 114.933333;
        case 'bo' : return -68.15;
        case 'br' : return -47.916667;
        case 'bs' : return -77.35;
        case 'bt' : return 89.633333;
        case 'bw' : return 25.9;
        case 'by' : return 27.566667;
        case 'bz' : return -88.766667;
        case 'ca' : return -75.7;
        case 'cc' : return 96.833333;
        case 'cd' : return 15.3;
        case 'cf' : return 18.583333;
        case 'cg' : return 15.283333;
        case 'ch' : return 7.466667;
        case 'ci' : return -5.266667;
        case 'ck' : return -159.766667;
        case 'cl' : return -70.666667;
        case 'cm' : return 11.516667;
        case 'cn' : return 116.383333;
        case 'co' : return -74.083333;
        case 'cr' : return -84.083333;
        case 'cu' : return -82.35;
        case 'cv' : return -23.516667;
        case 'cw' : return -68.916667;
        case 'cx' : return 105.716667;
        case 'cy' : return 33.366667;
        case 'cz' : return 14.466667;
        case 'de' : return 13.4;
        case 'dj' : return 43.15;
        case 'dk' : return 12.583333;
        case 'dm' : return -61.4;
        case 'do' : return -69.9;
        case 'dz' : return 3.05;
        case 'ec' : return -78.5;
        case 'ee' : return 24.716667;
        case 'eg' : return 31.25;
        case 'eh' : return -13.203333;
        case 'er' : return 38.933333;
        case 'es' : return -3.683333;
        case 'et' : return 38.7;
        case 'fi' : return 24.933333;
        case 'fj' : return 178.416667;
        case 'fk' : return -57.85;
        case 'fm' : return 158.15;
        case 'fo' : return -6.766667;
        case 'fr' : return 2.333333;
        case 'ga' : return 9.45;
        case 'gb' : return -0.083333;
        case 'gd' : return -61.75;
        case 'ge' : return 44.833333;
        case 'gg' : return -2.533333;
        case 'gh' : return -0.216667;
        case 'gi' : return -5.35;
        case 'gl' : return -51.75;
        case 'gm' : return -16.566667;
        case 'gn' : return -13.7;
        case 'gq' : return 8.783333;
        case 'gr' : return 23.733333;
        case 'gs' : return -36.5;
        case 'gt' : return -90.516667;
        case 'gu' : return 144.733333;
        case 'gw' : return -15.583333;
        case 'gy' : return -58.15;
        case 'hk' : return 0;
        case 'hm' : return 0;
        case 'hn' : return -87.216667;
        case 'hr' : return 16;
        case 'ht' : return -72.333333;
        case 'hu' : return 19.083333;
        case 'id' : return 106.816667;
        case 'ie' : return -6.233333;
        case 'il' : return 35.233333;
        case 'im' : return -4.483333;
        case 'in' : return 77.2;
        case 'io' : return 72.4;
        case 'iq' : return 44.4;
        case 'ir' : return 51.416667;
        case 'is' : return -21.95;
        case 'it' : return 12.483333;
        case 'je' : return -2.1;
        case 'jm' : return -76.8;
        case 'jo' : return 35.933333;
        case 'jp' : return 139.75;
        case 'ke' : return 36.816667;
        case 'kg' : return 74.6;
        case 'kh' : return 104.916667;
        case 'ki' : return 169.533333;
        case 'km' : return 43.233333;
        case 'kn' : return -62.716667;
        case 'ko' : return 21.166667;
        case 'kp' : return 125.75;
        case 'kr' : return 126.983333;
        case 'kw' : return 47.966667;
        case 'ky' : return -81.383333;
        case 'kz' : return 71.416667;
        case 'la' : return 102.6;
        case 'lb' : return 35.5;
        case 'lc' : return -61;
        case 'li' : return 9.516667;
        case 'lk' : return 79.833333;
        case 'lr' : return -10.8;
        case 'ls' : return 27.483333;
        case 'lt' : return 25.316667;
        case 'lu' : return 6.116667;
        case 'lv' : return 24.1;
        case 'ly' : return 13.166667;
        case 'ma' : return -6.816667;
        case 'mc' : return 7.416667;
        case 'md' : return 28.85;
        case 'me' : return 19.266667;
        case 'mf' : return -63.0822;
        case 'mg' : return 47.516667;
        case 'mh' : return 171.383333;
        case 'mk' : return 21.433333;
        case 'ml' : return -8;
        case 'mm' : return 96.15;
        case 'mn' : return 106.916667;
        case 'mo' : return 0;
        case 'mp' : return 145.75;
        case 'mr' : return -15.966667;
        case 'ms' : return -62.216667;
        case 'mt' : return 14.5;
        case 'mu' : return 57.483333;
        case 'mv' : return 73.5;
        case 'mw' : return 33.783333;
        case 'mx' : return -99.133333;
        case 'my' : return 101.7;
        case 'mz' : return 32.583333;
        case 'na' : return 17.083333;
        case 'nc' : return 166.45;
        case 'ne' : return 2.116667;
        case 'nf' : return 167.966667;
        case 'ng' : return 7.533333;
        case 'ni' : return -86.25;
        case 'nl' : return 4.916667;
        case 'no' : return 10.75;
        case 'np' : return 85.316667;
        case 'nr' : return 166.920867;
        case 'nu' : return -169.916667;
        case 'nz' : return 174.783333;
        case 'om' : return 58.583333;
        case 'pa' : return -79.533333;
        case 'pe' : return -77.05;
        case 'pf' : return -149.566667;
        case 'pg' : return 147.183333;
        case 'ph' : return 120.966667;
        case 'pk' : return 73.05;
        case 'pl' : return 21;
        case 'pm' : return -56.183333;
        case 'pn' : return -130.083333;
        case 'pr' : return -66.116667;
        case 'ps' : return 35.233333;
        case 'pt' : return -9.133333;
        case 'pw' : return 134.633333;
        case 'py' : return -57.666667;
        case 'qa' : return 51.533333;
        case 'ro' : return 26.1;
        case 'rs' : return 20.5;
        case 'ru' : return 37.6;
        case 'rw' : return 30.05;
        case 'sa' : return 46.7;
        case 'sb' : return 159.95;
        case 'sc' : return 55.45;
        case 'sd' : return 32.533333;
        case 'se' : return 18.05;
        case 'sg' : return 103.85;
        case 'sh' : return -5.716667;
        case 'si' : return 14.516667;
        case 'sj' : return 15.633333;
        case 'sk' : return 17.116667;
        case 'sl' : return -13.233333;
        case 'sm' : return 12.416667;
        case 'sn' : return -17.633333;
        case 'so' : return 45.333333;
        case 'sr' : return -55.166667;
        case 'ss' : return 31.616667;
        case 'st' : return 6.733333;
        case 'sv' : return -89.2;
        case 'sx' : return -63.033333;
        case 'sy' : return 36.3;
        case 'sz' : return 31.133333;
        case 'tc' : return -71.133333;
        case 'td' : return 15.033333;
        case 'tf' : return 70.216667;
        case 'tg' : return 1.216667;
        case 'th' : return 100.516667;
        case 'tj' : return 68.766667;
        case 'tk' : return -171.833333;
        case 'tl' : return 125.6;
        case 'tm' : return 58.383333;
        case 'tn' : return 10.183333;
        case 'to' : return -175.2;
        case 'tr' : return 32.866667;
        case 'tt' : return -61.516667;
        case 'tv' : return 179.216667;
        case 'tw' : return 121.516667;
        case 'tz' : return 39.283333;
        case 'ua' : return 30.516667;
        case 'ug' : return 32.55;
        case 'um' : return -77;
        case 'us' : return -77;
        case 'uy' : return -56.166667;
        case 'uz' : return 69.25;
        case 'va' : return 12.45;
        case 'vc' : return -61.216667;
        case 've' : return -66.866667;
        case 'vg' : return -64.616667;
        case 'vi' : return -64.933333;
        case 'vn' : return 105.85;
        case 'vu' : return 168.316667;
        case 'wf' : return -171.933333;
        case 'ws' : return -171.766667;
        case 'ye' : return 44.2;
        case 'za' : return 28.216667;
        case 'zm' : return 28.283333;
        case 'zw' : return 31.033333;
    }

    return 0.0;
}

// ~~

export function getContinentSlugFromCountryCode(
    countryCode
    )
{
    switch ( countryCode )
    {
        case 'af' : return 'asia';
        case 'ax' : return 'europe';
        case 'al' : return 'europe';
        case 'dz' : return 'africa';
        case 'as' : return 'australia';
        case 'ad' : return 'europe';
        case 'ao' : return 'africa';
        case 'ai' : return 'central-america';
        case 'aq' : return 'antarctica';
        case 'ag' : return 'central-america';
        case 'ar' : return 'south-america';
        case 'am' : return 'europe';
        case 'aw' : return 'central-america';
        case 'au' : return 'australia';
        case 'at' : return 'europe';
        case 'az' : return 'europe';
        case 'bs' : return 'central-america';
        case 'bh' : return 'asia';
        case 'bd' : return 'asia';
        case 'bb' : return 'central-america';
        case 'by' : return 'europe';
        case 'be' : return 'europe';
        case 'bz' : return 'central-america';
        case 'bj' : return 'africa';
        case 'bm' : return 'central-america';
        case 'bt' : return 'asia';
        case 'bo' : return 'south-america';
        case 'ba' : return 'europe';
        case 'bw' : return 'africa';
        case 'br' : return 'south-america';
        case 'io' : return 'africa';
        case 'vg' : return 'central-america';
        case 'bn' : return 'asia';
        case 'bg' : return 'europe';
        case 'bf' : return 'africa';
        case 'bi' : return 'africa';
        case 'kh' : return 'asia';
        case 'cm' : return 'africa';
        case 'ca' : return 'north-america';
        case 'cv' : return 'africa';
        case 'ky' : return 'central-america';
        case 'cf' : return 'africa';
        case 'td' : return 'africa';
        case 'cl' : return 'south-america';
        case 'cn' : return 'asia';
        case 'cx' : return 'australia';
        case 'cc' : return 'australia';
        case 'co' : return 'south-america';
        case 'km' : return 'africa';
        case 'ck' : return 'australia';
        case 'cr' : return 'central-america';
        case 'ci' : return 'africa';
        case 'hr' : return 'europe';
        case 'cu' : return 'central-america';
        case 'cw' : return 'central-america';
        case 'cy' : return 'europe';
        case 'cz' : return 'europe';
        case 'cd' : return 'africa';
        case 'dk' : return 'europe';
        case 'dj' : return 'africa';
        case 'dm' : return 'central-america';
        case 'do' : return 'central-america';
        case 'ec' : return 'south-america';
        case 'eg' : return 'africa';
        case 'sv' : return 'central-america';
        case 'gq' : return 'africa';
        case 'er' : return 'africa';
        case 'ee' : return 'europe';
        case 'et' : return 'africa';
        case 'fk' : return 'south-america';
        case 'fo' : return 'europe';
        case 'fm' : return 'australia';
        case 'fj' : return 'australia';
        case 'fi' : return 'europe';
        case 'fr' : return 'europe';
        case 'pf' : return 'australia';
        case 'tf' : return 'antarctica';
        case 'ga' : return 'africa';
        case 'ge' : return 'europe';
        case 'de' : return 'europe';
        case 'gh' : return 'africa';
        case 'gi' : return 'europe';
        case 'gr' : return 'europe';
        case 'gl' : return 'central-america';
        case 'gd' : return 'central-america';
        case 'gu' : return 'australia';
        case 'gt' : return 'central-america';
        case 'gg' : return 'europe';
        case 'gn' : return 'africa';
        case 'gw' : return 'africa';
        case 'gy' : return 'south-america';
        case 'ht' : return 'central-america';
        case 'hm' : return 'antarctica';
        case 'hn' : return 'central-america';
        case 'hk' : return 'asia';
        case 'hu' : return 'europe';
        case 'is' : return 'europe';
        case 'in' : return 'asia';
        case 'id' : return 'asia';
        case 'ir' : return 'asia';
        case 'iq' : return 'asia';
        case 'ie' : return 'europe';
        case 'im' : return 'europe';
        case 'il' : return 'asia';
        case 'it' : return 'europe';
        case 'jm' : return 'central-america';
        case 'jp' : return 'asia';
        case 'je' : return 'europe';
        case 'jo' : return 'asia';
        case 'kz' : return 'asia';
        case 'ke' : return 'africa';
        case 'ki' : return 'australia';
        case 'ko' : return 'europe';
        case 'kw' : return 'asia';
        case 'kg' : return 'asia';
        case 'la' : return 'asia';
        case 'lv' : return 'europe';
        case 'lb' : return 'asia';
        case 'ls' : return 'africa';
        case 'lr' : return 'africa';
        case 'ly' : return 'africa';
        case 'li' : return 'europe';
        case 'lt' : return 'europe';
        case 'lu' : return 'europe';
        case 'mo' : return 'asia';
        case 'mk' : return 'europe';
        case 'mg' : return 'africa';
        case 'mw' : return 'africa';
        case 'my' : return 'asia';
        case 'mv' : return 'asia';
        case 'ml' : return 'africa';
        case 'mt' : return 'europe';
        case 'mh' : return 'australia';
        case 'mr' : return 'africa';
        case 'mu' : return 'africa';
        case 'mx' : return 'central-america';
        case 'md' : return 'europe';
        case 'mc' : return 'europe';
        case 'mn' : return 'asia';
        case 'me' : return 'europe';
        case 'ms' : return 'central-america';
        case 'ma' : return 'africa';
        case 'mz' : return 'africa';
        case 'mm' : return 'asia';
        case 'na' : return 'africa';
        case 'nr' : return 'australia';
        case 'np' : return 'asia';
        case 'nl' : return 'europe';
        case 'nc' : return 'australia';
        case 'nz' : return 'australia';
        case 'ni' : return 'central-america';
        case 'ne' : return 'africa';
        case 'ng' : return 'africa';
        case 'nu' : return 'australia';
        case 'nf' : return 'australia';
        case 'kp' : return 'asia';
        case 'mp' : return 'australia';
        case 'no' : return 'europe';
        case 'om' : return 'asia';
        case 'pk' : return 'asia';
        case 'pw' : return 'australia';
        case 'ps' : return 'asia';
        case 'pa' : return 'central-america';
        case 'pg' : return 'australia';
        case 'py' : return 'south-america';
        case 'pe' : return 'south-america';
        case 'ph' : return 'asia';
        case 'pn' : return 'australia';
        case 'pl' : return 'europe';
        case 'pt' : return 'europe';
        case 'pr' : return 'central-america';
        case 'qa' : return 'asia';
        case 'cg' : return 'africa';
        case 'ro' : return 'europe';
        case 'ru' : return 'europe';
        case 'rw' : return 'africa';
        case 'bl' : return 'central-america';
        case 'sh' : return 'africa';
        case 'kn' : return 'central-america';
        case 'lc' : return 'central-america';
        case 'mf' : return 'central-america';
        case 'pm' : return 'central-america';
        case 'vc' : return 'central-america';
        case 'ws' : return 'australia';
        case 'sm' : return 'europe';
        case 'st' : return 'africa';
        case 'sa' : return 'asia';
        case 'sn' : return 'africa';
        case 'rs' : return 'europe';
        case 'sc' : return 'africa';
        case 'sl' : return 'africa';
        case 'sg' : return 'asia';
        case 'sx' : return 'central-america';
        case 'sk' : return 'europe';
        case 'si' : return 'europe';
        case 'sb' : return 'australia';
        case 'so' : return 'africa';
        case 'za' : return 'africa';
        case 'gs' : return 'antarctica';
        case 'kr' : return 'asia';
        case 'ss' : return 'africa';
        case 'es' : return 'europe';
        case 'lk' : return 'asia';
        case 'sd' : return 'africa';
        case 'sr' : return 'south-america';
        case 'sj' : return 'europe';
        case 'sz' : return 'africa';
        case 'se' : return 'europe';
        case 'ch' : return 'europe';
        case 'sy' : return 'asia';
        case 'tw' : return 'asia';
        case 'tj' : return 'asia';
        case 'tz' : return 'africa';
        case 'th' : return 'asia';
        case 'gm' : return 'africa';
        case 'tl' : return 'asia';
        case 'tg' : return 'africa';
        case 'tk' : return 'australia';
        case 'to' : return 'australia';
        case 'tt' : return 'central-america';
        case 'tn' : return 'africa';
        case 'tr' : return 'europe';
        case 'tm' : return 'asia';
        case 'tc' : return 'central-america';
        case 'tv' : return 'australia';
        case 'ug' : return 'africa';
        case 'ua' : return 'europe';
        case 'ae' : return 'asia';
        case 'gb' : return 'europe';
        case 'us' : return 'north-america';
        case 'uy' : return 'south-america';
        case 'um' : return 'australia';
        case 'vi' : return 'central-america';
        case 'uz' : return 'asia';
        case 'vu' : return 'australia';
        case 'va' : return 'europe';
        case 've' : return 'south-america';
        case 'vn' : return 'asia';
        case 'wf' : return 'australia';
        case 'eh' : return 'africa';
        case 'ye' : return 'asia';
        case 'zm' : return 'africa';
        case 'zw' : return 'africa';
    }

    return '';
}

// ~~

export async function getLocationFromIpAddress(
    ipAddress
    )
{
    if ( locationByIpAddressMap.has( ipAddress ) )
    {
        return locationByIpAddressMap.get( ipAddress );
    }
    else
    {
        let location = {
            service: '',
            latitude: 0.0,
            longitude: 0.0,
            countryCode: '',
            timeZone: '',
            isFound: false,
            continentSlug: '',
            isAntarctica: false,
            isSouthAmerica: false,
            isCentralAmerica: false,
            isNorthAmerica: false,
            isAmerica: false,
            isAfrica: false,
            isEurope: false,
            isAustralia: false,
            isAsia: false,
            isJapan: false
        };

        if ( !location.isFound )
        {
            try
            {
                let response = await fetch( 'http://ip-api.com/json/' + ipAddress );
                let geographicData = await response.json();

                if ( geographicData
                     && geographicData.status === 'success' )
                {
                    location.service = 'ip-api.com';
                    location.countryCode = geographicData.countryCode.toLowerCase();
                    location.latitude = geographicData.lat;
                    location.longitude = geographicData.lon;
                    location.timeZone = geographicData.timezone;
                    location.isFound = true;
                }
            }
            catch ( error )
            {
                printError( error );
            }
        }

        if ( !location.isFound )
        {
            try
            {
                const response = await fetch( 'http://ip-api.com/json/' + ipAddress );
                const geographicData = await response.json();

                if ( geographicData
                     && geographicData.hasOwnProperty( 'countryCode' )
                     && geographicData.hasOwnProperty( 'lat' )
                     && geographicData.hasOwnProperty( 'lon' )
                     && geographicData.hasOwnProperty( 'timezone' )
                     && geographicData.hasOwnProperty( 'status' )
                     && geographicData.status === 'success' )
                {
                     location.service = 'ip-api.com';
                     location.countryCode = geographicData.countryCode.toLowerCase();
                     location.latitude = Number( geographicData.lat );
                     location.longitude = Number( geographicData.lon );
                     location.timeZone = geographicData.timezone;
                     location.isFound = true;
                }
            }
            catch ( error )
            {
                printError( error );
            }
        }

        if ( !location.isFound )
        {
            try
            {
                const response = await fetch( 'http://www.geoplugin.net/json.gp?ip=' + ipAddress );
                const geographicData = await response.json();

                if ( geographicData
                     && geographicData.hasOwnProperty( 'geoplugin_countryCode' )
                     && geographicData.hasOwnProperty( 'geoplugin_latitude' )
                     && geographicData.hasOwnProperty( 'geoplugin_longitude' )
                     && geographicData.hasOwnProperty( 'geoplugin_timezone' )
                     && geographicData.hasOwnProperty( 'geoplugin_status' )
                     && geographicData.geoplugin_countryCode !== null
                     && geographicData.geoplugin_status !== 404 )
                {
                     location.service = 'geoplugin.net';
                     location.countryCode = geographicData.geoplugin_countryCode.toLowerCase();
                     location.latitude = Number( geographicData.geoplugin_latitude );
                     location.longitude = Number( geographicData.geoplugin_longitude );
                     location.timeZone = geographicData.geoplugin_timezone;
                     location.isFound = true;
                }
            }
            catch ( error )
            {
                printError( error );
            }
        }

        if ( !location.isFound )
        {
            try
            {
                const response = await fetch( 'https://www.iplocate.io/api/lookup/' + ipAddress );
                const geographicData = await response.json();

                if ( geographicData
                     && geographicData.hasOwnProperty( 'country_code' )
                     && geographicData.hasOwnProperty( 'latitude' )
                     && geographicData.hasOwnProperty( 'longitude' )
                     && geographicData.hasOwnProperty( 'time_zone' )
                     && geographicData.country_code !== null )
                {
                    location.service = 'iplocate.io';
                    location.countryCode = geographicData.country_code.toLowerCase();
                    location.latitude = Number( geographicData.latitude );
                    location.longitude = Number( geographicData.longitude );
                    location.timeZone = geographicData.time_zone;
                    location.isFound = true;
                }
            }
            catch ( error )
            {
                printError( error );
            }
        }

        if ( !location.isFound )
        {
            try
            {
                const response = await fetch( 'https://api.hostip.info/get_json.php?ip=' + ipAddress );
                const geographicData = await response.json();

                if ( geographicData
                     && geographicData.hasOwnProperty( 'country_code' )
                     && geographicData.country_code !== null
                     && geographicData.country_code !== 'XX' )
                {
                    location.service = 'hostip.info';
                    location.countryCode = geographicData.country_code;
                    location.latitude = getCapitalLatitudeFromCountryCode( location.countryCode.toLowerCase() );
                    location.longitude = getCapitalLongitudeFromCountryCode( location.countryCode );
                    location.timeZone = getTimeZoneFromLocation( location.latitude, location.longitude, location.countryCode );
                    location.isFound = true;
                }
            }
            catch ( error )
            {
                printError( error );
            }
        }

        location.continentSlug = getContinentSlugFromCountryCode( location.countryCode );
        location.isAntarctica = ( location.continentSlug === 'antarctica' );
        location.isSouthAmerica = ( location.continentSlug === 'south-america' );
        location.isCentralAmerica = ( location.continentSlug === 'central-america' );
        location.isNorthAmerica = ( location.continentSlug === 'north-america' );
        location.isAmerica = ( location.isSouthAmerica || location.isNorthAmerica );
        location.isAfrica = ( location.continentSlug === 'africa' );
        location.isEurope = ( location.continentSlug === 'europe' );
        location.isAustralia = ( location.continentSlug === 'australia' );
        location.isAsia = ( location.continentSlug === 'asia' );
        location.isJapan = ( location.countryCode === 'jp' );

        locationByIpAddressMap.set( ipAddress, location );

        return location;
    }
}

// ~~

export function setCountryCode(
    countryCode_
    )
{
    countryCode = countryCode_;
}

// ~~

export function getCountryCode(
    )
{
    return countryCode;
}

// ~~

export function setDefaultCountryCode(
    defaultCountryCode_
    )
{
    defaultCountryCode = defaultCountryCode_;
}

// ~~

export function getDefaultCountryCode(
    )
{
    return defaultCountryCode;
}

// ~~

export function getBrowserLanguageCode(
    browserLanguageText,
    validLanguageCodeArray,
    defaultLanguageCode = ''
    )
{
    let browserLanguageArray = browserLanguageText.toLowerCase().split( ',' );

    for ( let browserLanguage of browserLanguageArray )
    {
        let browserLanguageCode = browserLanguage.substring( 0, 2 );

        if ( validLanguageCodeArray.indexOf( browserLanguageCode ) >= 0 )
        {
            return browserLanguageCode;
        }
    }

    return defaultLanguageCode;
}

// ~~

export function setLanguageCode(
    languageCode_
    )
{
    languageCode = languageCode_;
}

// ~~

export function getLanguageCode(
    )
{
    return languageCode;
}

// ~~

export function setDefaultLanguageCode(
    defaultLanguageCode_
    )
{
    defaultLanguageCode = defaultLanguageCode_;
}

// ~~

export function getDefaultLanguageCode(
    )
{
    return defaultLanguageCode;
}

// ~~

export function setTextByLanguageTagsMapBySlug(
    textByLanguageTagsMap,
    textSlug
    )
{
    textByLanguageTagsMapBySlugMap.set( textSlug, textByLanguageTagsMap );
}

// ~~

export function getTextByLanguageTagsMapBySlug(
    textSlug
    )
{
    if ( textByLanguageTagsMapBySlugMap.has( textSlug ) )
    {
        return textByLanguageTagsMapBySlugMap.get( textSlug );
    }
    else
    {
        printWarning( 'Missing text slug : ' + textSlug );

        return '';
    }
}

// ~~

export function getLanguageTagsText(
    languageCode_ = undefined,
    countryCode = undefined
    )
{
}

// ~~

export function getTextByLanguageTagMap(
    textByLanguageTagsMap
    )
{
    let textByLanguageTagMap = {};

    for ( let languageTags in textByLanguageTagsMap )
    {
        if ( textByLanguageTagsMap.hasOwnProperty( languageTags ) )
        {
            let text = textByLanguageTagsMap[ languageTags ];

            for ( let languageTag of languageTags.split( ' ' ) )
            {
                textByLanguageTagMap[ languageTag ] = text;
            }
        }
    }

    return textByLanguageTagMap;
}

// ~~

export function getTextFromLanguageTag(
    textByLanguageTagMap,
    languageTag
    )
{
    if ( textByLanguageTagMap.hasOwnProperty( languageTag ) )
    {
        return textByLanguageTagMap[ languageTag ];
    }
    else
    {
        return undefined;
    }
}

// ~~

export function getLocalizedText(
    textByLanguageTagsMap,
    languageCode_ = undefined,
    countryCode_ = undefined
    )
{
    if ( isString( textByLanguageTagsMap ) )
    {
        return textByLanguageTagsMap;
    }
    else
    {
        let textByLanguageTagMap = getTextByLanguageTagMap( textByLanguageTagsMap );

        if ( languageCode_ === undefined )
        {
            languageCode_ = languageCode;
        }

        if ( countryCode_ === undefined )
        {
            countryCode_ = countryCode;
        }

        let text = getTextFromLanguageTag( textByLanguageTagMap, languageCode_ + '-' + countryCode_ );

        if ( text === undefined )
        {
            text = getTextFromLanguageTag( textByLanguageTagMap, languageCode_ );
        }

        if ( text === undefined )
        {
            text = getTextFromLanguageTag( textByLanguageTagMap, defaultLanguageCode + '-' + countryCode_ );
        }

        if ( text === undefined )
        {
            text = getTextFromLanguageTag( textByLanguageTagMap, defaultLanguageCode );
        }

        if ( text === undefined )
        {
            printWarning( 'Missing language tag ' + languageCode_ + '-' + countryCode_ + ' : ' + JSON.stringify( textByLanguageTagsMap ) );

            return '';
        }
        else
        {
            return text;
        }
    }
}

// ~~

export function getLocalizedTextBySlug(
    textSlug,
    languageCode = undefined,
    countryCode = undefined
    )
{
    if ( textByLanguageTagsMapBySlugMap.has( textSlug ) )
    {
        return getLocalizedText( textByLanguageTagsMapBySlugMap.get( textSlug ), languageCode, countryCode );
    }
    else
    {
        printWarning( 'Missing text slug : ' + textSlug );

        return textSlug;
    }
}

// ~~

export function defineLineTag(
    name,
    openingDefinition,
    closingDefinition
    )
{
    processedLineTagArray.push(
        {
            name,
            openingDefinition,
            closingDefinition
        }
        );
}

// ~~

export function defineDualTag(
    name,
    openingDefinition,
    closingDefinition
    )
{
    processedDualTagArray.push(
        {
            name,
            openingDefinition,
            closingDefinition
        }
        );
}

// ~~

export function defineTag(
    name,
    definition
    )
{
    processedTagArray.push(
        {
            name,
            definition
        }
        );
}

// ~~

export function defineColorTag(
    name,
    color = ''
    )
{
    if ( color === '' )
    {
        defineTag( '<' + name + '>', '<span class="color-' + name + '">' );
    }
    else
    {
        defineTag( '<' + name + '>', '<span style="color:' + color + '">' );
    }

    defineTag( '</' + name + '>', '</span>' );
}

// ~~

export function getProcessedText(
    text,
    languageCode = undefined,
    countryCode = undefined
    )
{
    if ( !isString( text ) )
    {
        text = getLocalizedText( text, languageCode, countryCode );
    }

    for ( let processedDualTag of processedDualTagArray )
    {
        let partArray = text.split( processedDualTag.name );
        let partCount = partArray.length;

        for ( let partIndex = 0;
              partIndex + 1 < partCount;
              partIndex += 2 )
        {
            partArray[ partIndex ] += processedDualTag.openingDefinition;
            partArray[ partIndex + 1 ] += processedDualTag.closingDefinition;
        }

        text = partArray.join( '' );
    }

    for ( let processedTag of processedTagArray )
    {
        text = text.replaceAll( processedTag.name, processedTag.definition );
    }

    return text;
}

// ~~

export function getProcessedMultilineText(
    text,
    languageCode = undefined,
    countryCode = undefined
    )
{
    if ( !isString( text ) )
    {
        text = getLocalizedText( text, languageCode, countryCode );
    }

    let processedLineTagCount = processedLineTagArray.length;

    if ( processedLineTagCount > 0 )
    {
        let lineArray = text.replaceAll( '\r', '' ).split( '\n' );
        let lineCount = lineArray.length;

        for ( let lineIndex = 0;
              lineIndex < lineCount;
              ++lineIndex )
        {
            let line = lineArray[ lineIndex ];

            while ( line.startsWith( '\n' ) )
            {
                line = line.substring( 1 );
            }

            for ( let processedLineTag of processedLineTagArray )
            {
                if ( line.startsWith( processedLineTag.name ) )
                {
                    lineArray[ lineIndex ]
                        = processedLineTag.openingDefinition
                          + line.substring( processedLineTag.name.length )
                          + processedLineTag.closingDefinition

                    break;
                }
            }
        }

        text = lineArray.join( '\n' );
    }

    return getProcessedText( text );
}

// ~~

export function getProcessedTextBySlug(
    textSlug,
    languageCode = undefined,
    countryCode = undefined
    )
{
    if ( textByLanguageTagsMapBySlugMap.has( textSlug ) )
    {
        return getProcessedText( textByLanguageTagsMapBySlugMap.get( textSlug ), languageCode, countryCode );
    }
    else
    {
        printWarning( 'Missing text slug : ' + textSlug );

        return textSlug;
    }
}

// ~~

export function getProcessedMultilineTextBySlug(
    textSlug,
    languageCode = undefined,
    countryCode = undefined
    )
{
    if ( textByLanguageTagsMapBySlugMap.has( textSlug ) )
    {
        return getProcessedMultilineText( textByLanguageTagsMapBySlugMap.get( textSlug ), languageCode, countryCode );
    }
    else
    {
        printWarning( 'Missing text slug : ' + textSlug );

        return textSlug;
    }
}

// ~~

export function toggleGoogleAnalytics(
    trackingIsEnabled,
    trackingId
    )
{
    if ( trackingIsEnabled )
    {
        if ( !googleAnalyticsTrackingIsEnabled )
        {
            googleAnalyticsTrackingIsEnabled = true;
            googleAnalyticsTrackingScript = document.createElement( 'script' );
            googleAnalyticsTrackingScript.async = true;
            googleAnalyticsTrackingScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + trackingId;

            document.head.appendChild( googleAnalyticsTrackingScript );

            window.dataLayer = window.dataLayer || [];
            window.gtag = ( ...argumentArray ) => window.dataLayer.push( ...argumentArray );

            gtag( 'js', new Date() );
            gtag( 'config', trackingId );
        }
    }
    else
    {
        if ( googleAnalyticsTrackingIsEnabled )
        {
            document.head.removeChild( googleAnalyticsTrackingScript );

            window.dataLayer = [];

            googleAnalyticsTrackingIsEnabled = false;
            googleAnalyticsTrackingScript = null;
        }
    }
}

// ~~

export function addClass(
    element,
    className
    )
{
    element.classList.add( className );

    return element;
}

// ~~

export function removeClass(
    element,
    className
    )
{
    element.classList.remove( className );

    return element;
}

// ~~

export function toggleClass(
    element,
    className,
    condition = undefined
    )
{
    if ( condition === undefined )
    {
        if ( element.classList.contains( className ) )
        {
            element.classList.remove( className );
        }
        else
        {
            element.classList.add( className );
        }
    }
    else if ( condition )
    {
        element.classList.add( className );
    }
    else
    {
        element.classList.remove( className );
    }

    return element;
}







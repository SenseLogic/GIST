// -- IMPORTS

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
        second : 0,
        millisecond : 0,
        microsecond : 0
        },
    nullDateTime = {
        year : 1000,
        month : 1,
        day : 1,
        hour : 0,
        minute : 0,
        second : 0,
        millisecond : 0,
        microsecond : 0
        },
    minimumInteger = -9007199254740991,
    maximumInteger = 9007199254740991,
    halfPi = Math.PI * 0.5,
    pi = Math.PI,
    twoPi = Math.PI * 2,
    degreesToRadians = Math.PI / 180,
    radiansToDegrees = 180 / Math.PI,
    naturalExpression = /^[0-9][0-9]*$/,
    integerExpression = /^-?[0-9][0-9]*$/,
    realExpression = /^-?[0-9][0-9]*\.[0-9]*$/,
    numericExpression = /^-?[0-9][0-9]*\.?[0-9]*$/,
    slugExpression = /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    valueExpression = /^(.*?)([<=>]+)(.*)$/,
    invalidCharacterExpression = /[^\p{L}\p{N}\-_.]/gu;

// -- VARIABLES

export let
    languageTag = 'en',
    continentCode = '',
    countryCode = '',
    languageCode = 'en',
    defaultLanguageCode = 'en',
    substitutionPrefix = '{',
    substitutionSuffix = '}',
    textBySlugMap = new Map(),
    processedLineTagArray = [],
    processedDualTagArray = [],
    processedTagArray = [],
    locationByIpAddressMap = new Map(),
    googleAnalyticsTrackingScript = null,
    googleAnalyticsTrackingIsEnabled = false;

// -- FUNCTIONS

export const
    raw = String.raw,
    log = console.log,
    logObject = console.dir,
    logTable = console.table,
    logStack = console.trace,
    isNaN = Number.isNaN,
    isInteger = Number.isInteger,
    getReal = parseFloat,
    getInteger = parseInt,
    getNumber = Number,
    getMinimumReal = Math.min,
    getMaximumReal = Math.max,
    getPositiveReal = Math.abs,
    getSign = Math.sign,
    getFloorInteger = Math.floor,
    getCeilInteger = Math.ceil,
    getRoundInteger = Math.round,
    getSquareRoot = Math.sqrt,
    getPower = Math.pow,
    getCosinus = Math.cos,
    getSinus = Math.sin,
    getTangent = Math.tan,
    getArcCosinus = Math.acos,
    getArcSinus = Math.asin,
    getArcTangent = Math.atan,
    getRandom = Math.random,
    getText = String,
    getEscapedText = escape,
    getUnescapedText = unescape,
    getEncodedUri = encodeURI,
    getDecodedUri = decodeURI,
    getJsonText = JSON.stringify,
    getJsonObject = JSON.parse;

// ~~

export function logValue(
    value
    )
{
    console.log( getJsonText( value ) );
}

// ~~

export function logWarning(
    warning
    )
{
    console.trace();
    console.warn( warning );
}

// ~~

export function logError(
    error
    )
{
    console.trace();
    console.error( error );
}

// ~~

export function getClampValue(
    value,
    minimumValue,
    maximumValue
    )
{
    if ( value < minimumValue )
    {
        return minimumValue;
    }
    else if ( value > maximumValue )
    {
        return maximumValue;
    }
    else
    {
        return value;
    }
}

// ~~

export function getRadianAngle(
    degreeAngle
    )
{
    return degreeAngle * degreesToRadians;
}

// ~~

export function getDegreeAngle(
    radianAngle
    )
{
    return radianAngle * radiansToDegrees;
}

// ~~

export function getRandomReal(
    firstReal,
    postReal
    )
{
    return firstReal + getRandom() * ( postReal - firstReal );
}

// ~~

export function getRandomInteger(
    firstInteger,
    lastInteger
    )
{
    return getFloorInteger( firstInteger + getRandom() * ( lastInteger - firstInteger + 1 ) );
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

export function getMapByCode(
    array,
    default_value = null
    )
{
    if ( array )
    {
        let map = {};

        for ( let element of array )
        {
            map[ element.code ] = element;
        }

        return map;
    }
    else
    {
        return default_value;
    }
}

// ~~

export function getMapById(
    array,
    default_value = null
    )
{
    if ( array )
    {
        let map = {};

        for ( let element of array )
        {
            map[ element.id ] = element;
        }

        return map;
    }
    else
    {
        return default_value;
    }
}

// ~~

export function getMap(
    array,
    keyName = 'id',
    default_value = null
    )
{
    if ( array )
    {
        let map = {};

        for ( let element of array )
        {
            map[ element[ keyName ] ] = element;
        }

        return map;
    }
    else
    {
        return default_value;
    }
}

// ~~

export function getIntegerComparison(
    firstInteger,
    secondInteger
    )
{
    return firstInteger - secondInteger;
}

// ~~

export function getRealComparison(
    firstReal,
    secondReal
    )
{
    return firstReal - secondReal;
}

// ~~

export function getTextComparison(
    firstText,
    secondText
    )
{
    if ( firstText < secondText )
    {
        return -1;
    }
    else if ( firstText > secondText )
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

// ~~

export function getNaturalTextComparison(
    firstText,
    secondText
    )
{
    return firstText.localeCompare( second_text, undefined, { numeric : true } );
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
        return text.slice( prefix.length );
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
        return text.slice( 0, text.length - suffix.length );
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
        return newPrefix + text.slice( oldPrefix.length );
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
        return text.slice( 0, text.length - oldSuffix.length ) + newSuffix;
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
        var oldReplacedText = replacedText;

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

export function getUnaccentedCharacter(
    character,
    languageCode = "",
    nextCharacterIsLowerCase = false
    )
{
    switch ( character )
    {
        case 'á':
        case 'à':
        case 'â':
        {
            return 'a';
        }
        case 'ä':
        {
            if ( languageCode == 'de' )
            {
                return 'ae';
            }
            else
            {
                return 'a';
            }
        }
        case 'é':
        case 'è':
        case 'ê':
        case 'ë':
        {
            return 'e';
        }
        case 'í':
        case 'ì':
        case 'î':
        case 'ï':
        {
            return 'i';
        }
        case 'ó':
        case 'ò':
        case 'ô':
        {
            return 'o';
        }
        case 'ö':
        {
            if ( languageCode == 'de' )
            {
                return 'oe';
            }
            else
            {
                return 'o';
            }
        }
        case 'œ' :
        {
            return 'oe';
        }
        case 'ú':
        case 'ù':
        case 'û':
        {
            return 'u';
        }
        case 'ü':
        {
            if ( languageCode == 'de' )
            {
                return 'ue';
            }
            else
            {
                return 'u';
            }
        }
        case 'ç':
        {
            return 'c';
        }
        case 'ñ':
        {
            return 'n';
        }
        case 'ß':
        {
            return 'ss';
        }
        case 'Á':
        case 'À':
        case 'Â':
        {
            return 'A';
        }
        case 'Ä':
        {
            if ( languageCode == 'de' )
            {
                if ( nextCharacterIsLowerCase )
                {
                    return 'Ae';
                }
                else
                {
                    return 'AE';
                }
            }
            else
            {
                return 'A';
            }
        }
        case 'É':
        case 'È':
        case 'Ê':
        case 'Ë':
        {
            return 'E';
        }
        case 'Í':
        case 'Ì':
        case 'Î':
        case 'Ï':
        {
            return 'I';
        }
        case 'Ó':
        case 'Ò':
        case 'Ô':
        {
            return 'O';
        }
        case 'Ö':
        {
            if ( languageCode == 'de' )
            {
                if ( nextCharacterIsLowerCase )
                {
                    return 'Oe';
                }
                else
                {
                    return 'OE';
                }
            }
            else
            {
                return 'O';
            }
        }
        case 'Œ' :
        {
            return 'Oe';
        }
        case 'Ú':
        case 'Ù':
        case 'Û':
        {
            return 'U';
        }
        case 'Ü':
        {
            if ( languageCode == 'de' )
            {
                if ( nextCharacterIsLowerCase )
                {
                    return 'Ue';
                }
                else
                {
                    return 'UE';
                }
            }
            else
            {
                return 'U';
            }
        }
        case 'Ç':
        {
            return 'C';
        }
        case 'Ñ':
        {
            return 'N';
        }
        case 'ẞ' :
        {
            if ( nextCharacterIsLowerCase )
            {
                return 'Ss';
            }
            else
            {
                return 'SS';
            }
        }
        default:
        {
            return character;
        }
    }
}

// ~~

export function getUnaccentedText(
    text,
    languageCode = ''
    )
{
    let unaccentedTextArray = [];

    for ( let characterIndex = 0;
          characterIndex < text.length;
          ++characterIndex )
    {
        unaccentedTextArray.push( getUnaccentedCharacter( text.charAt( characterIndex ), languageCode ) );
    }

    return unaccentedTextArray.join( '' );
}

// ~~

export function getRealText(
    real,
    minimumDecimalCount,
    maximumDecimalCount
    )
{
    let multiplier = Math.pow( 10, maximumDecimalCount );
    real = Math.round( real * multiplier ) / multiplier;

    let realText = real.toFixed( maximumDecimalCount );

    while ( realText.includes( '.' )
            && ( realText.endsWith( '0' )
                 || realText.endsWith( '.' ) ) )
    {
        realText = realText.slice( 0, -1 );
    }

    return realText;
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
        hexadecimalText.slice( 0, 8 )
        + '-'
        + hexadecimalText.slice( 8, 12 )
        + '-'
        + hexadecimalText.slice( 12, 16 )
        + '-'
        + hexadecimalText.slice( 16, 20 )
        + '-'
        + hexadecimalText.slice( 20, 32 )
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
    let byteArray = new Uint8Array( byteCount );

    for ( let byteIndex = 0;
          byteIndex < byteCount;
          ++byteIndex )
    {
        byteArray[ byteIndex ] = Math.floor( Math.random() * 256 );
    }

    return byteArray;
}

// ~~

export function getRandomHexadecimalText(
    byteCount
    )
{
    let byteArray = getRandomByteArray( byteCount );
    let hexadecimalText = '';

    for ( let byteIndex = 0;
          byteIndex < byteArray.length;
          ++byteIndex )
    {
        hexadecimalText += ( '0' + byteArray[ byteIndex ].toString( 16 ) ).slice( -2 );
    }

    return hexadecimalText;
}

// ~~

export function getTimeUuid(
    )
{
    return getUuidFromHexadecimalText(
        getHexadecimalTextFromInteger( ( getCurrentMillisecondCount() + 12219292800000 ) * 10000 )
        + getRandomHexadecimalText( 16 )
        );
}

// ~~

export function getRandomUuid(
    )
{
    return getUuidFromHexadecimalText(
        getRandomHexadecimalText( 16 )
        );
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

export function getCurrentMillisecondCount(
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

export function getCurrentLocalDateTime(
    )
{
    return new Date();
}

// ~~

export function getCurrentUniversalDateTime(
    )
{
    let currentLocalDateTime = new Date();

    return new Date(
        Date.UTC(
            currentLocalDateTime.getUTCFullYear(),
            currentLocalDateTime.getUTCMonth(),
            currentLocalDateTime.getUTCDate(),
            currentLocalDateTime.getUTCHours(),
            currentLocalDateTime.getUTCMinutes(),
            currentLocalDateTime.getUTCSeconds(),
            currentLocalDateTime.getUTCMilliseconds()
            )
        );
}

// ~~

export function getSystemDate(
    systemDate
    )
{
    if ( systemDate === undefined )
    {
        return new Date();
    }
    else if ( isString( systemDate ) )
    {
        return new Date( systemDate );
    }
    else
    {
        return systemDate;
    }
}

// ~~

export function getLocalDate(
    systemDate
    )
{
    systemDate = getSystemDate( systemDate );

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
    systemDate = getSystemDate( systemDate );

    return {
        hour : systemDate.getHours(),
        minute : systemDate.getMinutes(),
        second : systemDate.getSeconds(),
        millisecond : systemDate.getMilliseconds(),
        microsecond : 0
        };
}

// ~~

export function getLocalDateTime(
    systemDate
    )
{
    systemDate = getSystemDate( systemDate );

    return {
        year : systemDate.getFullYear(),
        month : systemDate.getMonth() + 1,
        day : systemDate.getDate(),
        hour : systemDate.getHours(),
        minute : systemDate.getMinutes(),
        second : systemDate.getSeconds(),
        millisecond : systemDate.getMilliseconds(),
        microsecond : 0
        };
}

// ~~

export function getUniversalDate(
    systemDate
    )
{
    systemDate = getSystemDate( systemDate );

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
    systemDate = getSystemDate( systemDate );

    return {
        hour : systemDate.getUTCHours(),
        minute : systemDate.getUTCMinutes(),
        second : systemDate.getUTCSeconds(),
        millisecond : systemDate.getUTCMilliseconds(),
        microsecond : 0
        };
}

// ~~

export function getUniversalDateTime(
    systemDate
    )
{
    systemDate = getSystemDate( systemDate );

    return {
        year : systemDate.getUTCFullYear(),
        month : systemDate.getUTCMonth() + 1,
        day : systemDate.getUTCDate(),
        hour : systemDate.getUTCHours(),
        minute : systemDate.getUTCMinutes(),
        second : systemDate.getUTCSeconds(),
        millisecond : systemDate.getUTCMilliseconds(),
        microsecond : 0
        };
}

// ~~

export function getSubsecondTimeText(
    dateTime
    )
{
    if ( dateTime.millisecond !== 0
         || dateTime.microsecond !== 0 )
    {
        if ( dateTime.microsecond !== 0 )
        {
            return (
                '.'
                + getLeftPaddedText( dateTime.millisecond.toString(), 3, '0' )
                + getLeftPaddedText( dateTime.microsecond.toString(), 3, '0' )
                );
        }
        else
        {
            return (
                '.'
                + getLeftPaddedText( dateTime.millisecond.toString(), 3, '0' )
                );
        }
    }
    else
    {
        return '';
    }
}

// ~~

export function getDateText(
    date,
    infix = ':',
    suffix = ''
    )
{
    return (
        getLeftPaddedText( date.year.toString(), 4, '0' )
        + infix
        + getLeftPaddedText( date.month.toString(), 2, '0' )
        + infix
        + getLeftPaddedText( date.day.toString(), 2, '0' )
        + suffix
        );
}

// ~~

export function getTimeText(
    time,
    infix = '-',
    suffix = ''
    )
{
    return (
        getLeftPaddedText( time.hour.toString(), 2, '0' )
        + infix
        + getLeftPaddedText( time.minute.toString(), 2, '0' )
        + infix
        + getLeftPaddedText( time.second.toString(), 2, '0' )
        + suffix
        );
}

// ~~

export function getDateTimeText(
    dateTime,
    dateInfix = '-',
    infix = ' ',
    timeInfix = ':',
    suffix = ''
    )
{
    return (
        getLeftPaddedText( dateTime.year.toString(), 4, '0' )
        + dateInfix
        + getLeftPaddedText( dateTime.month.toString(), 2, '0' )
        + dateInfix
        + getLeftPaddedText( dateTime.day.toString(), 2, '0' )
        + infix
        + getLeftPaddedText( dateTime.hour.toString(), 2, '0' )
        + timeInfix
        + getLeftPaddedText( dateTime.minute.toString(), 2, '0' )
        + timeInfix
        + getLeftPaddedText( dateTime.second.toString(), 2, '0' )
        + getSubsecondTimeText( dateTime )
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
        + getLeftPaddedText( dateTime.millisecond.toString(), 3, '0' )
        + getLeftPaddedText( dateTime.microsecond.toString(), 3, '0' )
        + suffix
        );
}

// ~~

export function getFormattedNumberText(
    number,
    style = undefined
    )
{
    let numberFormat
        = new Intl.NumberFormat(
              languageTag,
              {
                  style
              }
              );

    return numberFormat.format( number );
}

// ~~

export function getFormattedDateText(
    date,
    style = undefined,
    yearFormat = undefined,
    monthFormat = undefined,
    dayFormat = undefined,
    weekdayFormat = undefined
    )
{
    let dateTimeFormat
        = new Intl.DateTimeFormat(
              languageTag,
              {
                  dateStyle : style,
                  year: yearFormat,
                  month: monthFormat,
                  day: dayFormat,
                  weekday: weekdayFormat
              }
              );

    return dateTimeFormat.format( date );
}

// ~~

export function getFormattedTimeText(
    time,
    style = undefined,
    hourFormat = undefined,
    minuteFormat = undefined,
    secondFormat = undefined,
    timeZone = undefined
    )
{
    let dateTimeFormat
        = new Intl.DateTimeFormat(
              languageTag,
              {
                  timeStyle : style,
                  hour: hourFormat,
                  minute: minuteFormat,
                  second: secondFormat,
                  timeZone
              }
              );

    return dateTimeFormat.format( time );
}

// ~~

export function getFormattedCountryName(
    countryCode
    )
{
    let displayNames
        = new Intl.DisplayNames(
              [
                  languageTag
              ],
              {
                  type: 'region'
              }
              );

    return displayNames.of( countryCode );
}

// ~~

export function getFormattedLanguageName(
    languageCode
    )
{
    let displayNames
        = new Intl.DisplayNames(
              [
                  languageTag
              ],
              {
                  type: 'language'
              }
              );

    return displayNames.of( languageCode );
}

// ~~

export function getFormattedCurrencyName(
    currencyCode
    )
{
    let displayNames
        = new Intl.DisplayNames(
              [
                  languageTag
              ],
              {
                  type: 'currency'
              }
              );

    return displayNames.of( currencyCode );
}

// ~~

export function getFormattedArrayText(
    array,
    style = undefined,
    type = undefined
    )
{
    let listFormat
        = new Intl.ListFormat(
              languageTag,
              {
                  style,
                  type
              }
              );

    return listFormat.format( array );
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
    return filePath.slice( 0, filePath.lastIndexOf( '/' ) + 1 );
}

// ~~

export function getFileName(
    filePath
    )
{
    return filePath.slice( filePath.lastIndexOf( '/' ) + 1 );
}

// ~~

export function getValidFileName(
    fileName
    )
{
    return replaceIteratively( fileName.replace( invalidCharacterExpression, '_' ), '__', '_' );
}

// ~~

export function getFileLabel(
    filePath
    )
{
    let fileName = getFileName( filePath );
    let lastDotCharacterIndex = fileName.lastIndexOf( '.' );

    if ( lastDotCharacterIndex >= 0 )
    {
        return fileName.slice( 0, lastDotCharacterIndex );
    }
    else
    {
        return fileName;
    }
}

// ~~

export function getFileExtension(
    filePath
    )
{
    let fileName = getFileName( filePath );
    let lastDotCharacterIndex = fileName.lastIndexOf( '.' );

    if ( lastDotCharacterIndex >= 0 )
    {
        return fileName.slice( lastDotCharacterIndex );
    }
    else
    {
        return '';
    }
}

// ~~

export function addFileExtensionPrefix(
    filePath,
    fileExtensionPrefix
    )
{
    let lastSlashCharacterIndex = filePath.lastIndexOf( '/' );
    let lastDotCharacterIndex = filePath.lastIndexOf( '.' );

    if ( lastDotCharacterIndex >= 0
         && lastDotCharacterIndex > lastSlashCharacterIndex )
    {
        return filePath.slice( 0, lastDotCharacterIndex ) + fileExtensionPrefix + filePath.slice( lastDotCharacterIndex );
    }
    else
    {
        return filePath + fileExtensionPrefix;
    }
}

// ~~

export function isSearchBot(
    userAgentText
    )
{
    let searchBotNameArray =
        [
            'googlebot',
            'bingbot',
            'slurp',
            'duckduckbot',
            'baiduspider',
            'yandexbot',
            'facebookexternalhit',
            'twitterbot',
            'rogerbot',
            'linkedinbot',
            'embedly',
            'quora link preview',
            'showyoubot',
            'outbrain',
            'pinterest',
            'slackbot'
        ];

    userAgentText = userAgentText.toLowerCase();

    for ( let searchBotName of searchBotNameArray )
    {
        if ( userAgentText.indexOf( searchBotName ) >= 0 )
        {
            return true;
        }
    }

    return false;
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
        let browserLanguageCode = browserLanguage.slice( 0, 2 );

        if ( validLanguageCodeArray.indexOf( browserLanguageCode ) >= 0 )
        {
            return browserLanguageCode;
        }
    }

    return defaultLanguageCode;
}

// ~~

export function getTrimmedLanguageTag(
    languageTag
    )
{
    if ( languageTag.endsWith( '--' ) )
    {
        return languageTag.slice( 0, -2 );
    }
    else if ( languageTag.endsWith( '-' ) )
    {
        return languageTag.slice( 0, -1 );
    }
    else
    {
        return languageTag;
    }
}

// ~~

export function setLanguageTag(
    languageTag_
    )
{
    languageTag = languageTag_;
}

// ~~

export function getLanguageTag(
    )
{
    return languageTag;
}

// ~~

export function updateLanguageTag(
    )
{
    languageTag = getTrimmedLanguageTag( languageCode + '-' + countryCode + '-' + continentCode );
}

// ~~

export function setContinentCode(
    continentCode_
    )
{
    continentCode = continentCode_;

    updateLanguageTag();
}

// ~~

export function getContinentCode(
    )
{
    return continentCode;
}

// ~~

export function setCountryCode(
    countryCode_
    )
{
    countryCode = countryCode_;

    setContinentCode( getContinentCodeFromCountryCode( countryCode_ ) );
}

// ~~

export function getCountryCode(
    )
{
    return countryCode;
}

// ~~

export function setLanguageCode(
    languageCode_
    )
{
    languageCode = languageCode_;

    updateLanguageTag();
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

export function setSubstitutionPrefix(
    substitutionPrefix_
    )
{
    substitutionPrefix = substitutionPrefix_;
}

// ~~

export function getSubstitutionPrefix(
    )
{
    return substitutionPrefix;
}

// ~~

export function setSubstitutionSuffix(
    substitutionSuffix_
    )
{
    substitutionSuffix = substitutionSuffix_;
}

// ~~

export function getSubstitutionSuffix(
    )
{
    return substitutionSuffix;
}

// ~~

export function setTextBySlug(
    text,
    textSlug
    )
{
    textBySlugMap.set( textSlug, text );
}

// ~~

export function getTextBySlug(
    textSlug
    )
{
    if ( textBySlugMap.has( textSlug ) )
    {
        return textBySlugMap.get( textSlug );
    }
    else
    {
        logWarning( 'Missing text slug : ' + textSlug );

        return '';
    }
}

// ~~

export function getUntranslatedText(
    multilingualText
    )
{
    return multilingualText.split( '¨' )[ 0 ];
}

// ~~

export function matchesLanguageSpecifier(
    languageSpecifier,
    languageTag
    )
{
    let languageTagPartArray = ( languageTag + '--' ).split( '-' );

    for ( let languageSpecifierTag of languageSpecifier.split( ',' ) )
    {
        let languageSpecifierTagPartArray = ( languageSpecifierTag + '--' ).split( '-' );

        if ( ( languageTagPartArray[ 0 ] === ''
               || languageSpecifierTagPartArray[ 0 ] === ''
               || languageTagPartArray[ 0 ] === languageSpecifierTagPartArray[ 0 ] )
             && ( languageTagPartArray[ 1 ] === ''
                  || languageSpecifierTagPartArray[ 1 ] === ''
                  || languageTagPartArray[ 1 ] === languageSpecifierTagPartArray[ 1 ] )
             && ( languageTagPartArray[ 2 ] === ''
                  || languageSpecifierTagPartArray[ 2 ] === ''
                  || languageTagPartArray[ 2 ] === languageSpecifierTagPartArray[ 2 ] ) )
        {
            return true;
        }
    }

    return false;
}

// ~~

export function matchesValueSpecifier(
    valueSpecifier,
    valueByNameMap
    )
{
    if ( valueByNameMap !== undefined )
    {
        let match = valueSpecifier.match( valueExpression );

        if ( match )
        {
            let valueName = match[ 1 ];
            let operator = match[ 2 ];
            let otherValue = match[ 3 ];

            if ( valueByNameMap !== undefined
                 && valueName in valueByNameMap )
            {
                let value = valueByNameMap[ valueName ];

                if ( typeof value === 'number' )
                {
                    otherValue = Number( otherValue );
                }

                if ( ( operator === '='
                       && value === otherValue )
                     || ( operator === '<'
                          && value < otherValue )
                     || ( operator === '<='
                          && value <= otherValue )
                     || ( operator === '>='
                          && value >= otherValue )
                     || ( operator === '>'
                          && value > otherValue )
                     || ( operator === '<>'
                          && value != otherValue ) )
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
    }

    logWarning( 'Bad value specifier : ' + valueSpecifier );

    return false;
}

// ~~

export function matchesConditionSpecifier(
    specifier,
    valueByNameMap
    )
{
    for ( let valueSpecifier of specifier.split( ',' ) )
    {
        if ( matchesValueSpecifier( valueSpecifier, valueByNameMap ) )
        {
            return true;
        }
    }

    return false;
}

// ~~

export function matchesTranslationSpecifier(
    translationSpecifier,
    valueByNameMap,
    languageTag
    )
{
    let conditionSpecifierArray = translationSpecifier.split( '?' );

    if ( matchesLanguageSpecifier( conditionSpecifierArray[ 0 ], languageTag ) )
    {
        for ( let conditionSpecifierIndex = 1;
              conditionSpecifierIndex < conditionSpecifierArray.length;
              ++conditionSpecifierIndex )
        {
            if ( !matchesConditionSpecifier( conditionSpecifierArray[ conditionSpecifierIndex ], valueByNameMap ) )
            {
                return false;
            }
        }

        return true;
    }

    return false;
}

// ~~

export function getSubstitutedText(
    text,
    valueByNameMap
    )
{
    if ( valueByNameMap !== undefined )
    {
        for ( let [ name, value ] of Object.entries( valueByNameMap ) )
        {
            text = text.replaceAll( substitutionPrefix + name + substitutionSuffix, value );
        }
    }

    return text;
}

// ~~

export function getTranslatedText(
    multilingualText,
    valueByNameMap,
    languageTag_,
    defaultLanguageTag = 'en'
    )
{
    if ( languageTag_ !== undefined
         && isString( valueByNameMap ) )
    {
        languageTag_ = valueByNameMap;
        valueByNameMap = undefined;
    }

    let translatedTextArray = multilingualText.split( '¨' );

    if ( languageTag_ === undefined )
    {
        languageTag_ = languageTag;
    }

    if ( languageTag_ !== defaultLanguageTag )
    {
        for ( let translatedTextIndex = translatedTextArray.length - 1;
              translatedTextIndex >= 1;
              --translatedTextIndex )
        {
            let translatedText = translatedTextArray[ translatedTextIndex ];
            let colonCharacterIndex = translatedText.indexOf( ':' );

            if ( colonCharacterIndex >= 0 )
            {
                if ( matchesTranslationSpecifier( translatedText.slice( 0, colonCharacterIndex ), valueByNameMap, languageTag_ ) )
                {
                    return getSubstitutedText( translatedText.slice( colonCharacterIndex + 1 ), valueByNameMap );
                }
            }
        }
    }

    return getSubstitutedText( translatedTextArray[ 0 ], valueByNameMap );
}

// ~~

export function getTranslatedNumber(
    number,
    decimalSeparator
    )
{
    if ( decimalSeparator === ',' )
    {
        return number.toString().replace( '.', ',' );
    }
    else
    {
        return number.toString();
    }
}

// ~~

export function getLanguageDecimalSeparator(
    languageCode
    )
{
    if ( languageCode === 'en'
         || languageCode === 'ja'
         || languageCode === 'ko'
         || languageCode === 'zh' )
    {
        return '.';
    }
    else
    {
        return ',';
    }
}

// ~~

export function isMultilingualText(
    multilingualText
    )
{
    return multilingualText.indexOf( '¨' ) >= 0;
}

// ~~

export function getTranslationArray(
    multilingualText
    )
{
    let translatedTextArray = multilingualText.split( '¨' );
    let translationArray = [];

    translationArray.push(
        {
            specifier : '',
            data : translatedTextArray[ 0 ]
        }
        );

    for ( let translatedTextIndex = 1;
          translatedTextIndex < translatedTextArray.length;
          ++translatedTextIndex )
    {
        let translatedText = translatedTextArray[ translatedTextIndex ];
        let colonCharacterIndex = translatedText.indexOf( ':' );

        if ( colonCharacterIndex >= 0 )
        {
            translationArray.push(
                {
                    specifier : translatedText.slice( 0, colonCharacterIndex ),
                    data : translatedText.slice( colonCharacterIndex + 1 )
                }
                );
        }
    }

    return translationArray;
}

// ~~

export function getNextLanguageTag(
    languageTagArray,
    translationArray
    )
{
    for ( let languageTagIndex = 1;
          languageTagIndex < languageTagArray.length;
          ++languageTagIndex )
    {
        let languageTag = languageTagArray[ languageTagIndex ];

        for ( let translationIndex = 0;
              translationIndex < translationArray.length;
              ++translationIndex )
        {
            let translation = translationArray[ translationIndex ];

            if ( translation.specifier.indexOf( languageTag ) >= 0 )
            {
                languageTag = '';

                break;
            }
        }

        if ( languageTag !== '' )
        {
            return languageTag;
        }
    }

    return '';
}

// ~~

export function getMultilingualText(
    translationArray
    )
{
    let multilingualText = '';

    if ( translationArray.length > 0 )
    {
        multilingualText = translationArray[ 0 ].data;

        for ( let translationIndex = 1;
              translationIndex < translationArray.length;
              ++translationIndex )
        {
            let translation = translationArray[ translationIndex ];

            multilingualText += '¨' + translation.specifier + ':' + translation.data;
        }
    }

    return multilingualText;
}

// ~~

export function getLocalizedText(
    text,
    valueByNameMap,
    languageTag
    )
{
    if ( isMultilingualText( text ) )
    {
        return getTranslatedText( text, valueByNameMap, languageTag );
    }
    else
    {
        return text;
    }
}

// ~~

export function getLocalizedTextBySlug(
    textSlug,
    valueByNameMap,
    languageTag
    )
{
    if ( textBySlugMap.has( textSlug ) )
    {
        return getLocalizedText( textBySlugMap.get( textSlug ), valueByNameMap, languageTag );
    }
    else
    {
        logWarning( 'Missing text slug : ' + textSlug );

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
    text
    )
{
    if ( !isString( text ) )
    {
        text = getLocalizedText( text );
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
    text
    )
{
    if ( !isString( text ) )
    {
        text = getLocalizedText( text );
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
                line = line.slice( 1 );
            }

            for ( let processedLineTag of processedLineTagArray )
            {
                if ( line.startsWith( processedLineTag.name ) )
                {
                    lineArray[ lineIndex ]
                        = processedLineTag.openingDefinition
                          + line.slice( processedLineTag.name.length )
                          + processedLineTag.closingDefinition;

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
    textSlug
    )
{
    if ( textBySlugMap.has( textSlug ) )
    {
        return getProcessedText( textBySlugMap.get( textSlug ) );
    }
    else
    {
        logWarning( 'Missing text slug : ' + textSlug );

        return textSlug;
    }
}

// ~~

export function getProcessedMultilineTextBySlug(
    textSlug
    )
{
    if ( textBySlugMap.has( textSlug ) )
    {
        return getProcessedMultilineText( textBySlugMap.get( textSlug ) );
    }
    else
    {
        logWarning( 'Missing text slug : ' + textSlug );

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

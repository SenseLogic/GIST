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
    getHypotenuse = Math.hypot,
    getPower = Math.pow,
    getExponential = Math.exp,
    getLogarithm = Math.log,
    getLogarithm10 = Math.log10,
    getCosinus = Math.cos,
    getSinus = Math.sin,
    getTangent = Math.tan,
    getArcCosinus = Math.acos,
    getArcSinus = Math.asin,
    getArcTangent = Math.atan,
    getArcTangent2 = Math.atan2,
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

export function getLocationDistance(
    firstLatitude,
    firstLongitude,
    secondLatitude,
    secondLongitude
    )
{
    firstLatitude *= degreesToRadians;
    firstLongitude *= degreesToRadians;
    secondLatitude *= degreesToRadians;
    secondLongitude *= degreesToRadians;

    let latitudeOffset = secondLatitude - firstLatitude;
    let longitudeOffset = secondLongitude - firstLongitude;

    let halfChordLengthSquare
        = getSinus( latitudeOffset * 0.5 ) * getSinus( latitudeOffset * 0.5 )
          + getCosinus( firstLatitude ) * getCosinus( secondLatitude ) * getSinus( longitudeOffset * 0.5 ) * getSinus( longitudeOffset * 0.5 );

    let angularDistance
        = 2 * Math.atan2( getSquareRoot( halfChordLengthSquare ), getSquareRoot( 1 - halfChordLengthSquare ) );

    return angularDistance * 6371000;
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

export function getCapitalLatitudeFromCountryCode(
    countryCode
    )
{
    switch ( countryCode )
    {
        case 'AD' : return 42.5;
        case 'AE' : return 24.46666667;
        case 'AF' : return 34.51666667;
        case 'AG' : return 17.11666667;
        case 'AI' : return 18.21666667;
        case 'AL' : return 41.31666667;
        case 'AM' : return 40.16666667;
        case 'AO' : return -8.833333333;
        case 'AQ' : return -80.0;
        case 'AR' : return -34.58333333;
        case 'AS' : return -14.26666667;
        case 'AT' : return 48.2;
        case 'AU' : return -35.26666667;
        case 'AW' : return 12.51666667;
        case 'AX' : return 60.116667;
        case 'AZ' : return 40.38333333;
        case 'BA' : return 43.86666667;
        case 'BB' : return 13.1;
        case 'BD' : return 23.71666667;
        case 'BE' : return 50.83333333;
        case 'BF' : return 12.36666667;
        case 'BG' : return 42.68333333;
        case 'BH' : return 26.23333333;
        case 'BI' : return -3.366666667;
        case 'BJ' : return 6.483333333;
        case 'BL' : return 17.88333333;
        case 'BM' : return 32.28333333;
        case 'BN' : return 4.883333333;
        case 'BO' : return -16.5;
        case 'BR' : return -15.78333333;
        case 'BS' : return 25.08333333;
        case 'BT' : return 27.46666667;
        case 'BW' : return -24.63333333;
        case 'BY' : return 53.9;
        case 'BZ' : return 17.25;
        case 'CA' : return 45.41666667;
        case 'CC' : return -12.16666667;
        case 'CD' : return -4.316666667;
        case 'CF' : return 4.366666667;
        case 'CG' : return -4.25;
        case 'CH' : return 46.91666667;
        case 'CI' : return 6.816666667;
        case 'CK' : return -21.2;
        case 'CL' : return -33.45;
        case 'CM' : return 3.866666667;
        case 'CN' : return 39.91666667;
        case 'CO' : return 4.6;
        case 'CR' : return 9.933333333;
        case 'CU' : return 23.11666667;
        case 'CV' : return 14.91666667;
        case 'CW' : return 12.1;
        case 'CX' : return -10.41666667;
        case 'CY' : return 35.16666667;
        case 'CZ' : return 50.08333333;
        case 'DE' : return 52.51666667;
        case 'DJ' : return 11.58333333;
        case 'DK' : return 55.66666667;
        case 'DM' : return 15.3;
        case 'DO' : return 18.46666667;
        case 'DZ' : return 36.75;
        case 'EC' : return -0.216666667;
        case 'EE' : return 59.43333333;
        case 'EG' : return 30.05;
        case 'EH' : return 27.153611;
        case 'ER' : return 15.33333333;
        case 'ES' : return 40.4;
        case 'ET' : return 9.033333333;
        case 'FI' : return 60.16666667;
        case 'FJ' : return -18.13333333;
        case 'FK' : return -51.7;
        case 'FM' : return 6.916666667;
        case 'FO' : return 62;
        case 'FR' : return 48.86666667;
        case 'GA' : return 0.383333333;
        case 'GB' : return 51.5;
        case 'GD' : return 12.05;
        case 'GE' : return 41.68333333;
        case 'GG' : return 49.45;
        case 'GH' : return 5.55;
        case 'GI' : return 36.13333333;
        case 'GL' : return 64.18333333;
        case 'GM' : return 13.45;
        case 'GN' : return 9.5;
        case 'GQ' : return 3.75;
        case 'GR' : return 37.98333333;
        case 'GS' : return -54.283333;
        case 'GT' : return 14.61666667;
        case 'GU' : return 13.46666667;
        case 'GW' : return 11.85;
        case 'GY' : return 6.8;
        case 'HK' : return 0;
        case 'HM' : return 0;
        case 'HN' : return 14.1;
        case 'HR' : return 45.8;
        case 'HT' : return 18.53333333;
        case 'HU' : return 47.5;
        case 'ID' : return -6.166666667;
        case 'IE' : return 53.31666667;
        case 'IL' : return 31.76666667;
        case 'IM' : return 54.15;
        case 'IN' : return 28.6;
        case 'IO' : return -7.3;
        case 'IQ' : return 33.33333333;
        case 'IR' : return 35.7;
        case 'IS' : return 64.15;
        case 'IT' : return 41.9;
        case 'JE' : return 49.18333333;
        case 'JM' : return 18;
        case 'JO' : return 31.95;
        case 'JP' : return 35.68333333;
        case 'KE' : return -1.283333333;
        case 'KG' : return 42.86666667;
        case 'KH' : return 11.55;
        case 'KI' : return -0.883333333;
        case 'KM' : return -11.7;
        case 'KN' : return 17.3;
        case 'KO' : return 42.66666667;
        case 'KP' : return 39.01666667;
        case 'KR' : return 37.55;
        case 'KW' : return 29.36666667;
        case 'KY' : return 19.3;
        case 'KZ' : return 51.16666667;
        case 'LA' : return 17.96666667;
        case 'LB' : return 33.86666667;
        case 'LC' : return 14;
        case 'LI' : return 47.13333333;
        case 'LK' : return 6.916666667;
        case 'LR' : return 6.3;
        case 'LS' : return -29.31666667;
        case 'LT' : return 54.68333333;
        case 'LU' : return 49.6;
        case 'LV' : return 56.95;
        case 'LY' : return 32.88333333;
        case 'MA' : return 34.01666667;
        case 'MC' : return 43.73333333;
        case 'MD' : return 47;
        case 'ME' : return 42.43333333;
        case 'MF' : return 18.0731;
        case 'MG' : return -18.91666667;
        case 'MH' : return 7.1;
        case 'MK' : return 42;
        case 'ML' : return 12.65;
        case 'MM' : return 16.8;
        case 'MN' : return 47.91666667;
        case 'MO' : return 0;
        case 'MP' : return 15.2;
        case 'MR' : return 18.06666667;
        case 'MS' : return 16.7;
        case 'MT' : return 35.88333333;
        case 'MU' : return -20.15;
        case 'MV' : return 4.166666667;
        case 'MW' : return -13.96666667;
        case 'MX' : return 19.43333333;
        case 'MY' : return 3.166666667;
        case 'MZ' : return -25.95;
        case 'NA' : return -22.56666667;
        case 'NC' : return -22.26666667;
        case 'NE' : return 13.51666667;
        case 'NF' : return -29.05;
        case 'NG' : return 9.083333333;
        case 'NI' : return 12.13333333;
        case 'NL' : return 52.35;
        case 'NO' : return 59.91666667;
        case 'NP' : return 27.71666667;
        case 'NR' : return -0.5477;
        case 'NU' : return -19.01666667;
        case 'NZ' : return -41.3;
        case 'OM' : return 23.61666667;
        case 'PA' : return 8.966666667;
        case 'PE' : return -12.05;
        case 'PF' : return -17.53333333;
        case 'PG' : return -9.45;
        case 'PH' : return 14.6;
        case 'PK' : return 33.68333333;
        case 'PL' : return 52.25;
        case 'PM' : return 46.76666667;
        case 'PN' : return -25.06666667;
        case 'PR' : return 18.46666667;
        case 'PS' : return 31.76666667;
        case 'PT' : return 38.71666667;
        case 'PW' : return 7.483333333;
        case 'PY' : return -25.26666667;
        case 'QA' : return 25.28333333;
        case 'RO' : return 44.43333333;
        case 'RS' : return 44.83333333;
        case 'RU' : return 55.75;
        case 'RW' : return -1.95;
        case 'SA' : return 24.65;
        case 'SB' : return -9.433333333;
        case 'SC' : return -4.616666667;
        case 'SD' : return 15.6;
        case 'SE' : return 59.33333333;
        case 'SG' : return 1.283333333;
        case 'SH' : return -15.93333333;
        case 'SI' : return 46.05;
        case 'SJ' : return 78.21666667;
        case 'SK' : return 48.15;
        case 'SL' : return 8.483333333;
        case 'SM' : return 43.93333333;
        case 'SN' : return 14.73333333;
        case 'SO' : return 2.066666667;
        case 'SR' : return 5.833333333;
        case 'SS' : return 4.85;
        case 'ST' : return 0.333333333;
        case 'SV' : return 13.7;
        case 'SX' : return 18.01666667;
        case 'SY' : return 33.5;
        case 'SZ' : return -26.31666667;
        case 'TC' : return 21.46666667;
        case 'TD' : return 12.1;
        case 'TF' : return -49.35;
        case 'TG' : return 6.116666667;
        case 'TH' : return 13.75;
        case 'TJ' : return 38.55;
        case 'TK' : return -9.166667;
        case 'TL' : return -8.583333333;
        case 'TM' : return 37.95;
        case 'TN' : return 36.8;
        case 'TO' : return -21.13333333;
        case 'TR' : return 39.93333333;
        case 'TT' : return 10.65;
        case 'TV' : return -8.516666667;
        case 'TW' : return 25.03333333;
        case 'TZ' : return -6.8;
        case 'UA' : return 50.43333333;
        case 'UG' : return 0.316666667;
        case 'UM' : return 38.883333;
        case 'US' : return 38.883333;
        case 'UY' : return -34.85;
        case 'UZ' : return 41.31666667;
        case 'VA' : return 41.9;
        case 'VC' : return 13.13333333;
        case 'VE' : return 10.48333333;
        case 'VG' : return 18.41666667;
        case 'VI' : return 18.35;
        case 'VN' : return 21.03333333;
        case 'VU' : return -17.73333333;
        case 'WF' : return -13.95;
        case 'WS' : return -13.81666667;
        case 'YE' : return 15.35;
        case 'ZA' : return -25.7;
        case 'ZM' : return -15.41666667;
        case 'ZW' : return -17.81666667;
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
        case 'AD' : return 1.516667;
        case 'AE' : return 54.366667;
        case 'AF' : return 69.183333;
        case 'AG' : return -61.85;
        case 'AI' : return -63.05;
        case 'AL' : return 19.816667;
        case 'AM' : return 44.5;
        case 'AO' : return 13.216667;
        case 'AQ' : return 0.0;
        case 'AR' : return -58.666667;
        case 'AS' : return -170.7;
        case 'AT' : return 16.366667;
        case 'AU' : return 149.133333;
        case 'AW' : return -70.033333;
        case 'AX' : return 19.9;
        case 'AZ' : return 49.866667;
        case 'BA' : return 18.416667;
        case 'BB' : return -59.616667;
        case 'BD' : return 90.4;
        case 'BE' : return 4.333333;
        case 'BF' : return -1.516667;
        case 'BG' : return 23.316667;
        case 'BH' : return 50.566667;
        case 'BI' : return 29.35;
        case 'BJ' : return 2.616667;
        case 'BL' : return -62.85;
        case 'BM' : return -64.783333;
        case 'BN' : return 114.933333;
        case 'BO' : return -68.15;
        case 'BR' : return -47.916667;
        case 'BS' : return -77.35;
        case 'BT' : return 89.633333;
        case 'BW' : return 25.9;
        case 'BY' : return 27.566667;
        case 'BZ' : return -88.766667;
        case 'CA' : return -75.7;
        case 'CC' : return 96.833333;
        case 'CD' : return 15.3;
        case 'CF' : return 18.583333;
        case 'CG' : return 15.283333;
        case 'CH' : return 7.466667;
        case 'CI' : return -5.266667;
        case 'CK' : return -159.766667;
        case 'CL' : return -70.666667;
        case 'CM' : return 11.516667;
        case 'CN' : return 116.383333;
        case 'CO' : return -74.083333;
        case 'CR' : return -84.083333;
        case 'CU' : return -82.35;
        case 'CV' : return -23.516667;
        case 'CW' : return -68.916667;
        case 'CX' : return 105.716667;
        case 'CY' : return 33.366667;
        case 'CZ' : return 14.466667;
        case 'DE' : return 13.4;
        case 'DJ' : return 43.15;
        case 'DK' : return 12.583333;
        case 'DM' : return -61.4;
        case 'DO' : return -69.9;
        case 'DZ' : return 3.05;
        case 'EC' : return -78.5;
        case 'EE' : return 24.716667;
        case 'EG' : return 31.25;
        case 'EH' : return -13.203333;
        case 'ER' : return 38.933333;
        case 'ES' : return -3.683333;
        case 'ET' : return 38.7;
        case 'FI' : return 24.933333;
        case 'FJ' : return 178.416667;
        case 'FK' : return -57.85;
        case 'FM' : return 158.15;
        case 'FO' : return -6.766667;
        case 'FR' : return 2.333333;
        case 'GA' : return 9.45;
        case 'GB' : return -0.083333;
        case 'GD' : return -61.75;
        case 'GE' : return 44.833333;
        case 'GG' : return -2.533333;
        case 'GH' : return -0.216667;
        case 'GI' : return -5.35;
        case 'GL' : return -51.75;
        case 'GM' : return -16.566667;
        case 'GN' : return -13.7;
        case 'GQ' : return 8.783333;
        case 'GR' : return 23.733333;
        case 'GS' : return -36.5;
        case 'GT' : return -90.516667;
        case 'GU' : return 144.733333;
        case 'GW' : return -15.583333;
        case 'GY' : return -58.15;
        case 'HK' : return 0;
        case 'HM' : return 0;
        case 'HN' : return -87.216667;
        case 'HR' : return 16;
        case 'HT' : return -72.333333;
        case 'HU' : return 19.083333;
        case 'ID' : return 106.816667;
        case 'IE' : return -6.233333;
        case 'IL' : return 35.233333;
        case 'IM' : return -4.483333;
        case 'IN' : return 77.2;
        case 'IO' : return 72.4;
        case 'IQ' : return 44.4;
        case 'IR' : return 51.416667;
        case 'IS' : return -21.95;
        case 'IT' : return 12.483333;
        case 'JE' : return -2.1;
        case 'JM' : return -76.8;
        case 'JO' : return 35.933333;
        case 'JP' : return 139.75;
        case 'KE' : return 36.816667;
        case 'KG' : return 74.6;
        case 'KH' : return 104.916667;
        case 'KI' : return 169.533333;
        case 'KM' : return 43.233333;
        case 'KN' : return -62.716667;
        case 'KO' : return 21.166667;
        case 'KP' : return 125.75;
        case 'KR' : return 126.983333;
        case 'KW' : return 47.966667;
        case 'KY' : return -81.383333;
        case 'KZ' : return 71.416667;
        case 'LA' : return 102.6;
        case 'LB' : return 35.5;
        case 'LC' : return -61;
        case 'LI' : return 9.516667;
        case 'LK' : return 79.833333;
        case 'LR' : return -10.8;
        case 'LS' : return 27.483333;
        case 'LT' : return 25.316667;
        case 'LU' : return 6.116667;
        case 'LV' : return 24.1;
        case 'LY' : return 13.166667;
        case 'MA' : return -6.816667;
        case 'MC' : return 7.416667;
        case 'MD' : return 28.85;
        case 'ME' : return 19.266667;
        case 'MF' : return -63.0822;
        case 'MG' : return 47.516667;
        case 'MH' : return 171.383333;
        case 'MK' : return 21.433333;
        case 'ML' : return -8;
        case 'MM' : return 96.15;
        case 'MN' : return 106.916667;
        case 'MO' : return 0;
        case 'MP' : return 145.75;
        case 'MR' : return -15.966667;
        case 'MS' : return -62.216667;
        case 'MT' : return 14.5;
        case 'MU' : return 57.483333;
        case 'MV' : return 73.5;
        case 'MW' : return 33.783333;
        case 'MX' : return -99.133333;
        case 'MY' : return 101.7;
        case 'MZ' : return 32.583333;
        case 'NA' : return 17.083333;
        case 'NC' : return 166.45;
        case 'NE' : return 2.116667;
        case 'NF' : return 167.966667;
        case 'NG' : return 7.533333;
        case 'NI' : return -86.25;
        case 'NL' : return 4.916667;
        case 'NO' : return 10.75;
        case 'NP' : return 85.316667;
        case 'NR' : return 166.920867;
        case 'NU' : return -169.916667;
        case 'NZ' : return 174.783333;
        case 'OM' : return 58.583333;
        case 'PA' : return -79.533333;
        case 'PE' : return -77.05;
        case 'PF' : return -149.566667;
        case 'PG' : return 147.183333;
        case 'PH' : return 120.966667;
        case 'PK' : return 73.05;
        case 'PL' : return 21;
        case 'PM' : return -56.183333;
        case 'PN' : return -130.083333;
        case 'PR' : return -66.116667;
        case 'PS' : return 35.233333;
        case 'PT' : return -9.133333;
        case 'PW' : return 134.633333;
        case 'PY' : return -57.666667;
        case 'QA' : return 51.533333;
        case 'RO' : return 26.1;
        case 'RS' : return 20.5;
        case 'RU' : return 37.6;
        case 'RW' : return 30.05;
        case 'SA' : return 46.7;
        case 'SB' : return 159.95;
        case 'SC' : return 55.45;
        case 'SD' : return 32.533333;
        case 'SE' : return 18.05;
        case 'SG' : return 103.85;
        case 'SH' : return -5.716667;
        case 'SI' : return 14.516667;
        case 'SJ' : return 15.633333;
        case 'SK' : return 17.116667;
        case 'SL' : return -13.233333;
        case 'SM' : return 12.416667;
        case 'SN' : return -17.633333;
        case 'SO' : return 45.333333;
        case 'SR' : return -55.166667;
        case 'SS' : return 31.616667;
        case 'ST' : return 6.733333;
        case 'SV' : return -89.2;
        case 'SX' : return -63.033333;
        case 'SY' : return 36.3;
        case 'SZ' : return 31.133333;
        case 'TC' : return -71.133333;
        case 'TD' : return 15.033333;
        case 'TF' : return 70.216667;
        case 'TG' : return 1.216667;
        case 'TH' : return 100.516667;
        case 'TJ' : return 68.766667;
        case 'TK' : return -171.833333;
        case 'TL' : return 125.6;
        case 'TM' : return 58.383333;
        case 'TN' : return 10.183333;
        case 'TO' : return -175.2;
        case 'TR' : return 32.866667;
        case 'TT' : return -61.516667;
        case 'TV' : return 179.216667;
        case 'TW' : return 121.516667;
        case 'TZ' : return 39.283333;
        case 'UA' : return 30.516667;
        case 'UG' : return 32.55;
        case 'UM' : return -77;
        case 'US' : return -77;
        case 'UY' : return -56.166667;
        case 'UZ' : return 69.25;
        case 'VA' : return 12.45;
        case 'VC' : return -61.216667;
        case 'VE' : return -66.866667;
        case 'VG' : return -64.616667;
        case 'VI' : return -64.933333;
        case 'VN' : return 105.85;
        case 'VU' : return 168.316667;
        case 'WF' : return -171.933333;
        case 'WS' : return -171.766667;
        case 'YE' : return 44.2;
        case 'ZA' : return 28.216667;
        case 'ZM' : return 28.283333;
        case 'ZW' : return 31.033333;
    }

    return 0.0;
}

// ~~

export function getContinentCodeFromCountryCode(
    countryCode
    )
{
    switch ( countryCode )
    {
        case 'AF' : return 'AS';
        case 'AX' : return 'EU';
        case 'AL' : return 'EU';
        case 'DZ' : return 'AF';
        case 'AS' : return 'OC';
        case 'AD' : return 'EU';
        case 'AO' : return 'AF';
        case 'AI' : return 'CA';
        case 'AQ' : return 'AN';
        case 'AG' : return 'CA';
        case 'AR' : return 'SA';
        case 'AM' : return 'EU';
        case 'AW' : return 'CA';
        case 'AU' : return 'OC';
        case 'AT' : return 'EU';
        case 'AZ' : return 'EU';
        case 'BS' : return 'CA';
        case 'BH' : return 'AS';
        case 'BD' : return 'AS';
        case 'BB' : return 'CA';
        case 'BY' : return 'EU';
        case 'BE' : return 'EU';
        case 'BZ' : return 'CA';
        case 'BJ' : return 'AF';
        case 'BM' : return 'CA';
        case 'BT' : return 'AS';
        case 'BO' : return 'SA';
        case 'BA' : return 'EU';
        case 'BW' : return 'AF';
        case 'BR' : return 'SA';
        case 'IO' : return 'AF';
        case 'VG' : return 'CA';
        case 'BN' : return 'AS';
        case 'BG' : return 'EU';
        case 'BF' : return 'AF';
        case 'BI' : return 'AF';
        case 'KH' : return 'AS';
        case 'CM' : return 'AF';
        case 'CA' : return 'NA';
        case 'CV' : return 'AF';
        case 'KY' : return 'CA';
        case 'CF' : return 'AF';
        case 'TD' : return 'AF';
        case 'CL' : return 'SA';
        case 'CN' : return 'AS';
        case 'CX' : return 'OC';
        case 'CC' : return 'OC';
        case 'CO' : return 'SA';
        case 'KM' : return 'AF';
        case 'CK' : return 'OC';
        case 'CR' : return 'CA';
        case 'CI' : return 'AF';
        case 'HR' : return 'EU';
        case 'CU' : return 'CA';
        case 'CW' : return 'CA';
        case 'CY' : return 'EU';
        case 'CZ' : return 'EU';
        case 'CD' : return 'AF';
        case 'DK' : return 'EU';
        case 'DJ' : return 'AF';
        case 'DM' : return 'CA';
        case 'DO' : return 'CA';
        case 'EC' : return 'SA';
        case 'EG' : return 'AF';
        case 'SV' : return 'CA';
        case 'GQ' : return 'AF';
        case 'ER' : return 'AF';
        case 'EE' : return 'EU';
        case 'ET' : return 'AF';
        case 'FK' : return 'SA';
        case 'FO' : return 'EU';
        case 'FM' : return 'OC';
        case 'FJ' : return 'OC';
        case 'FI' : return 'EU';
        case 'FR' : return 'EU';
        case 'PF' : return 'OC';
        case 'TF' : return 'AN';
        case 'GA' : return 'AF';
        case 'GE' : return 'EU';
        case 'DE' : return 'EU';
        case 'GH' : return 'AF';
        case 'GI' : return 'EU';
        case 'GR' : return 'EU';
        case 'GL' : return 'CA';
        case 'GD' : return 'CA';
        case 'GU' : return 'OC';
        case 'GT' : return 'CA';
        case 'GG' : return 'EU';
        case 'GN' : return 'AF';
        case 'GW' : return 'AF';
        case 'GY' : return 'SA';
        case 'HT' : return 'CA';
        case 'HM' : return 'AN';
        case 'HN' : return 'CA';
        case 'HK' : return 'AS';
        case 'HU' : return 'EU';
        case 'IS' : return 'EU';
        case 'IN' : return 'AS';
        case 'ID' : return 'AS';
        case 'IR' : return 'AS';
        case 'IQ' : return 'AS';
        case 'IE' : return 'EU';
        case 'IM' : return 'EU';
        case 'IL' : return 'AS';
        case 'IT' : return 'EU';
        case 'JM' : return 'CA';
        case 'JP' : return 'AS';
        case 'JE' : return 'EU';
        case 'JO' : return 'AS';
        case 'KZ' : return 'AS';
        case 'KE' : return 'AF';
        case 'KI' : return 'OC';
        case 'KO' : return 'EU';
        case 'KW' : return 'AS';
        case 'KG' : return 'AS';
        case 'LA' : return 'AS';
        case 'LV' : return 'EU';
        case 'LB' : return 'AS';
        case 'LS' : return 'AF';
        case 'LR' : return 'AF';
        case 'LY' : return 'AF';
        case 'LI' : return 'EU';
        case 'LT' : return 'EU';
        case 'LU' : return 'EU';
        case 'MO' : return 'AS';
        case 'MK' : return 'EU';
        case 'MG' : return 'AF';
        case 'MW' : return 'AF';
        case 'MY' : return 'AS';
        case 'MV' : return 'AS';
        case 'ML' : return 'AF';
        case 'MT' : return 'EU';
        case 'MH' : return 'OC';
        case 'MR' : return 'AF';
        case 'MU' : return 'AF';
        case 'MX' : return 'CA';
        case 'MD' : return 'EU';
        case 'MC' : return 'EU';
        case 'MN' : return 'AS';
        case 'ME' : return 'EU';
        case 'MS' : return 'CA';
        case 'MA' : return 'AF';
        case 'MZ' : return 'AF';
        case 'MM' : return 'AS';
        case 'NA' : return 'AF';
        case 'NR' : return 'OC';
        case 'NP' : return 'AS';
        case 'NL' : return 'EU';
        case 'NC' : return 'OC';
        case 'NZ' : return 'OC';
        case 'NI' : return 'CA';
        case 'NE' : return 'AF';
        case 'NG' : return 'AF';
        case 'NU' : return 'OC';
        case 'NF' : return 'OC';
        case 'KP' : return 'AS';
        case 'MP' : return 'OC';
        case 'NO' : return 'EU';
        case 'OM' : return 'AS';
        case 'PK' : return 'AS';
        case 'PW' : return 'OC';
        case 'PS' : return 'AS';
        case 'PA' : return 'CA';
        case 'PG' : return 'OC';
        case 'PY' : return 'SA';
        case 'PE' : return 'SA';
        case 'PH' : return 'AS';
        case 'PN' : return 'OC';
        case 'PL' : return 'EU';
        case 'PT' : return 'EU';
        case 'PR' : return 'CA';
        case 'QA' : return 'AS';
        case 'CG' : return 'AF';
        case 'RO' : return 'EU';
        case 'RU' : return 'EU';
        case 'RW' : return 'AF';
        case 'BL' : return 'CA';
        case 'SH' : return 'AF';
        case 'KN' : return 'CA';
        case 'LC' : return 'CA';
        case 'MF' : return 'CA';
        case 'PM' : return 'CA';
        case 'VC' : return 'CA';
        case 'WS' : return 'OC';
        case 'SM' : return 'EU';
        case 'ST' : return 'AF';
        case 'SA' : return 'AS';
        case 'SN' : return 'AF';
        case 'RS' : return 'EU';
        case 'SC' : return 'AF';
        case 'SL' : return 'AF';
        case 'SG' : return 'AS';
        case 'SX' : return 'CA';
        case 'SK' : return 'EU';
        case 'SI' : return 'EU';
        case 'SB' : return 'OC';
        case 'SO' : return 'AF';
        case 'ZA' : return 'AF';
        case 'GS' : return 'AN';
        case 'KR' : return 'AS';
        case 'SS' : return 'AF';
        case 'ES' : return 'EU';
        case 'LK' : return 'AS';
        case 'SD' : return 'AF';
        case 'SR' : return 'SA';
        case 'SJ' : return 'EU';
        case 'SZ' : return 'AF';
        case 'SE' : return 'EU';
        case 'CH' : return 'EU';
        case 'SY' : return 'AS';
        case 'TW' : return 'AS';
        case 'TJ' : return 'AS';
        case 'TZ' : return 'AF';
        case 'TH' : return 'AS';
        case 'GM' : return 'AF';
        case 'TL' : return 'AS';
        case 'TG' : return 'AF';
        case 'TK' : return 'OC';
        case 'TO' : return 'OC';
        case 'TT' : return 'CA';
        case 'TN' : return 'AF';
        case 'TR' : return 'EU';
        case 'TM' : return 'AS';
        case 'TC' : return 'CA';
        case 'TV' : return 'OC';
        case 'UG' : return 'AF';
        case 'UA' : return 'EU';
        case 'AE' : return 'AS';
        case 'GB' : return 'EU';
        case 'US' : return 'NA';
        case 'UY' : return 'SA';
        case 'UM' : return 'OC';
        case 'VI' : return 'CA';
        case 'UZ' : return 'AS';
        case 'VU' : return 'OC';
        case 'VA' : return 'EU';
        case 'VE' : return 'SA';
        case 'VN' : return 'AS';
        case 'WF' : return 'OC';
        case 'EH' : return 'AF';
        case 'YE' : return 'AS';
        case 'ZM' : return 'AF';
        case 'ZW' : return 'AF';
    }

    return '';
}

// ~~

export function getContinentSlugFromContinentCode(
    continentCode
    )
{
    switch ( continentCode )
    {
        case 'AF' : return 'africa';
        case 'AN' : return 'antarctica';
        case 'AS' : return 'asia';
        case 'OC' : return 'oceania';
        case 'CA' : return 'central-america';
        case 'EU' : return 'europe';
        case 'NA' : return 'north-america';
        case 'SA' : return 'south-america';
    }

    return '';
}

// ~~

export function getTimeZoneFromLocation(
    latitude,
    longitude,
    countryCode
    )
{
    let timeShift = Math.max( Math.min( Math.round( longitude / 15.0 ), 12 ), -12 );

    if ( timeShift >= 12 )
    {
        timeShift = -12;
    }

    switch ( countryCode )
    {
        case 'AD' : return 'Europe/Andorra';
        case 'AE' : return 'Asia/Dubai';
        case 'AF' : return 'Asia/Kabul';
        case 'AG' : return 'America/Antigua';
        case 'AI' : return 'America/Anguilla';
        case 'AL' : return 'Europe/Tirane';
        case 'AM' : return 'Asia/Yerevan';
        case 'AO' : return 'Africa/Luanda';
        case 'AQ' :
        {
            switch ( timeShift )
            {
                case -11 : return 'Antarctica/McMurdo';
                case -3 : return 'Antarctica/Palmer';
                case 0 : return 'Antarctica/Troll';
                case 3 : return 'Antarctica/Syowa';
                case 5 : return 'Antarctica/Mawson';
                case 6 : return 'Antarctica/Vostok';
                case 7 : return 'Antarctica/Davis';
                case 10 : return 'Antarctica/DumontDUrville';
                case 11 : return 'Antarctica/Casey';
            }

            break;
        }
        case 'AR' : return 'America/Argentina/Buenos_Aires';
        case 'AS' : return 'Pacific/Pago_Pago';
        case 'AT' : return 'Europe/Vienna';
        case 'AU' :
        {
            switch ( timeShift )
            {
                case 8 : return 'Australia/Perth';
                case 9 : return 'Australia/Darwin';
                case 10 :
                {
                    if ( latitude < -29.0 )
                    {
                        return 'Australia/Sydney';
                    }
                    else
                    {
                        return 'Australia/Brisbane';
                    }
                }
            }

            break;
        }
        case 'AW' : return 'America/Aruba';
        case 'AX' : return 'Europe/Mariehamn';
        case 'AZ' : return 'Asia/Baku';
        case 'BA' : return 'Europe/Sarajevo';
        case 'BB' : return 'America/Barbados';
        case 'BD' : return 'Asia/Dhaka';
        case 'BE' : return 'Europe/Brussels';
        case 'BF' : return 'Africa/Ouagadougou';
        case 'BG' : return 'Europe/Sofia';
        case 'BH' : return 'Asia/Bahrain';
        case 'BI' : return 'Africa/Bujumbura';
        case 'BJ' : return 'Africa/Porto-Novo';
        case 'BL' : return 'America/St_Barthelemy';
        case 'BM' : return 'Atlantic/Bermuda';
        case 'BN' : return 'Asia/Brunei';
        case 'BO' : return 'America/La_Paz';
        case 'BQ' : return 'America/Kralendijk';
        case 'BR' :
        {
            switch ( timeShift )
            {
                case -5 : return 'America/Rio_Branco';
                case -4 : return 'America/Manaus';
                case -3 : return 'America/Sao_Paulo';
                case -2 : return 'America/Recife';
            }

            break;
        }
        case 'BS' : return 'America/Nassau';
        case 'BT' : return 'Asia/Thimphu';
        case 'BW' : return 'Africa/Gaborone';
        case 'BY' : return 'Europe/Minsk';
        case 'BZ' : return 'America/Belize';
        case 'CA' :
        {
            switch ( timeShift )
            {
                case -9 : return 'America/Whitehorse';
                case -8 : return 'America/Vancouver';
                case -7 : return 'America/Edmonton';
                case -6 : return 'America/Winnipeg';
                case -5 : return 'America/Toronto';
                case -4 : return 'America/Halifax';
                case -3 : return 'America/St_Johns';
            }

            break;
        }
        case 'CC' : return 'Indian/Cocos';
        case 'CD' :
        {
            switch ( timeShift )
            {
                case 1 : return 'Africa/Kinshasa';
                case 2 : return 'Africa/Lubumbashi';
            }

            break;
        }
        case 'CF' : return 'Africa/Bangui';
        case 'CG' : return 'Africa/Brazzaville';
        case 'CH' : return 'Europe/Zurich';
        case 'CI' : return 'Africa/Abidjan';
        case 'CK' : return 'Pacific/Rarotonga';
        case 'CL' :
        {
            switch ( timeShift )
            {
                case -7 : return 'Pacific/Easter';
                case -5 :
                case -4 : return 'America/Santiago';
            }

            break;
        }
        case 'CM' : return 'Africa/Douala';
        case 'CN' :
        {
            switch ( timeShift )
            {
                case 5 :
                case 6 : return 'Asia/Urumqi';
                case 7 :
                case 8 :
                case 9 : return 'Asia/Shanghai';
            }

            break;
        }
        case 'CO' : return 'America/Bogota';
        case 'CR' : return 'America/Costa_Rica';
        case 'CU' : return 'America/Havana';
        case 'CV' : return 'Atlantic/Cape_Verde';
        case 'CW' : return 'America/Curacao';
        case 'CX' : return 'Indian/Christmas';
        case 'CY' :
        {
            if ( latitude < 35 )
            {
                return 'Asia/Nicosia';
            }
            else
            {
                return 'Asia/Famagusta';
            }
        }
        case 'CZ' : return 'Europe/Prague';
        case 'DE' : return 'Europe/Berlin';
        case 'DJ' : return 'Africa/Djibouti';
        case 'DK' : return 'Europe/Copenhagen';
        case 'DM' : return 'America/Dominica';
        case 'DO' : return 'America/Santo_Domingo';
        case 'DZ' : return 'Africa/Algiers';
        case 'EC' :
        {
            switch ( timeShift )
            {
                case -6 : return 'Pacific/Galapagos';
                case -5 : return 'America/Guayaquil';
            }

            break;
        }
        case 'EE' : return 'Europe/Tallinn';
        case 'EG' : return 'Africa/Cairo';
        case 'EH' : return 'Africa/El_Aaiun';
        case 'ER' : return 'Africa/Asmara';
        case 'ES' :
        {
            if ( longitude < -12.0 )
            {
                return 'Atlantic/Canary';
            }
            else
            {
                return 'Europe/Madrid';
            }
        }
        case 'ET' : return 'Africa/Addis_Ababa';
        case 'FI' : return 'Europe/Helsinki';
        case 'FJ' : return 'Pacific/Fiji';
        case 'FK' : return 'Atlantic/Stanley';
        case 'FM' :
        {
            switch ( timeShift )
            {
                case 10 : return 'Pacific/Chuuk';
                case 11 : return 'Pacific/Pohnpei';
            }

            break;
        }
        case 'FO' : return 'Atlantic/Faroe';
        case 'FR' : return 'Europe/Paris';
        case 'GA' : return 'Africa/Libreville';
        case 'GB' : return 'Europe/London';
        case 'GD' : return 'America/Grenada';
        case 'GE' : return 'Asia/Tbilisi';
        case 'GF' : return 'America/Cayenne';
        case 'GG' : return 'Europe/Guernsey';
        case 'GH' : return 'Africa/Accra';
        case 'GI' : return 'Europe/Gibraltar';
        case 'GL' :
        {
            switch ( timeShift )
            {
                case -4 : return 'America/Thule';
                case -3 : return 'America/Nuuk';
                case -1 : return 'America/Scoresbysund';
                case 0 : return 'America/Danmarkshavn';
            }

            break;
        }
        case 'GM' : return 'Africa/Banjul';
        case 'GN' : return 'Africa/Conakry';
        case 'GP' : return 'America/Guadeloupe';
        case 'GQ' : return 'Africa/Malabo';
        case 'GR' : return 'Europe/Athens';
        case 'GS' : return 'Atlantic/South_Georgia';
        case 'GT' : return 'America/Guatemala';
        case 'GU' : return 'Pacific/Guam';
        case 'GW' : return 'Africa/Bissau';
        case 'GY' : return 'America/Guyana';
        case 'HK' : return 'Asia/Hong_Kong';
        case 'HN' : return 'America/Tegucigalpa';
        case 'HR' : return 'Europe/Zagreb';
        case 'HT' : return 'America/Port-au-Prince';
        case 'HU' : return 'Europe/Budapest';
        case 'ID' :
        {
            switch ( timeShift )
            {
                case 6 :
                case 7 : return 'Asia/Jakarta';
                case 8 : return 'Asia/Makassar';
                case 9 : return 'Asia/Jayapura';
            }

            break;
        }
        case 'IE' : return 'Europe/Dublin';
        case 'IL' : return 'Asia/Jerusalem';
        case 'IM' : return 'Europe/Isle_of_Man';
        case 'IN' : return 'Asia/Kolkata';
        case 'IO' : return 'Indian/Chagos';
        case 'IQ' : return 'Asia/Baghdad';
        case 'IR' : return 'Asia/Tehran';
        case 'IS' : return 'Atlantic/Reykjavik';
        case 'IT' : return 'Europe/Rome';
        case 'JE' : return 'Europe/Jersey';
        case 'JM' : return 'America/Jamaica';
        case 'JO' : return 'Asia/Amman';
        case 'JP' : return 'Asia/Tokyo';
        case 'KE' : return 'Africa/Nairobi';
        case 'KG' : return 'Asia/Bishkek';
        case 'KH' : return 'Asia/Phnom_Penh';
        case 'KI' :
        {
            switch ( timeShift )
            {
                case -12 : return 'Pacific/Tarawa';
                case -11 : return 'Pacific/Enderbury';
                case -10 : return 'Pacific/Kiritimati';
            }

            break;
        }
        case 'KM' : return 'Indian/Comoro';
        case 'KN' : return 'America/St_Kitts';
        case 'KP' : return 'Asia/Pyongyang';
        case 'KR' : return 'Asia/Seoul';
        case 'KW' : return 'Asia/Kuwait';
        case 'KY' : return 'America/Cayman';
        case 'KZ' :
        {
            switch ( timeShift )
            {
                case 4 : return 'Asia/Aqtau';
                case 5 :
                case 6 : return 'Asia/Almaty';
            }

            break;
        }
        case 'LA' : return 'Asia/Vientiane';
        case 'LB' : return 'Asia/Beirut';
        case 'LC' : return 'America/St_Lucia';
        case 'LI' : return 'Europe/Vaduz';
        case 'LK' : return 'Asia/Colombo';
        case 'LR' : return 'Africa/Monrovia';
        case 'LS' : return 'Africa/Maseru';
        case 'LT' : return 'Europe/Vilnius';
        case 'LU' : return 'Europe/Luxembourg';
        case 'LV' : return 'Europe/Riga';
        case 'LY' : return 'Africa/Tripoli';
        case 'MA' : return 'Africa/Casablanca';
        case 'MC' : return 'Europe/Monaco';
        case 'MD' : return 'Europe/Chisinau';
        case 'ME' : return 'Europe/Podgorica';
        case 'MF' : return 'America/Marigot';
        case 'MG' : return 'Indian/Antananarivo';
        case 'MH' : return 'Pacific/Majuro';
        case 'MK' : return 'Europe/Skopje';
        case 'ML' : return 'Africa/Bamako';
        case 'MM' : return 'Asia/Yangon';
        case 'MN' : return 'Europe/Chisinau';
        case 'MO' : return 'Asia/Macau';
        case 'MP' : return 'Pacific/Saipan';
        case 'MQ' : return 'America/Martinique';
        case 'MR' : return 'Africa/Nouakchott';
        case 'MS' : return 'America/Montserrat';
        case 'MT' : return 'Europe/Malta';
        case 'MU' : return 'Indian/Mauritius';
        case 'MV' : return 'Indian/Maldives';
        case 'MW' : return 'Africa/Blantyre';
        case 'MX' :
        {
            switch ( timeShift )
            {
                case -9 :
                case -8 : return 'America/Tijuana';
                case -7 : return 'America/Chihuahua';
                case -6 : return 'America/Mexico_City';
                case -5 : return 'America/Cancun';
            }

            break;
        }
        case 'MY' : return 'Asia/Kuala_Lumpur';
        case 'MZ' : return 'Africa/Maputo';
        case 'NA' : return 'Africa/Windhoek';
        case 'NC' : return 'Pacific/Noumea';
        case 'NE' : return 'Africa/Niamey';
        case 'NF' : return 'Pacific/Norfolk';
        case 'NG' : return 'Africa/Lagos';
        case 'NI' : return 'America/Managua';
        case 'NL' : return 'Europe/Amsterdam';
        case 'NO' : return 'Europe/Oslo';
        case 'NP' : return 'Asia/Kathmandu';
        case 'NR' : return 'Pacific/Nauru';
        case 'NU' : return 'Pacific/Niue';
        case 'NZ' : return 'Pacific/Auckland';
        case 'OM' : return 'Asia/Muscat';
        case 'PA' : return 'America/Panama';
        case 'PE' : return 'America/Lima';
        case 'PF' :
        {
            switch ( timeShift )
            {
                case -10 : return 'Pacific/Tahiti';
                case -9 : return 'Pacific/Marquesas';
            }

            break;
        }
        case 'PG' :
        {
            switch ( timeShift )
            {
                case 10 : return 'Pacific/Port_Moresby';
                case 11 : return 'Pacific/Bougainville';
            }

            break;
        }
        case 'PH' : return 'Asia/Manila';
        case 'PK' : return 'Asia/Karachi';
        case 'PL' : return 'Europe/Warsaw';
        case 'PM' : return 'America/Miquelon';
        case 'PN' : return 'Pacific/Pitcairn';
        case 'PR' : return 'America/Puerto_Rico';
        case 'PS' : return 'Asia/Hebron';
        case 'PT' :
        {
            if ( longitude < -12.0 )
            {
                return 'Atlantic/Azores';
            }
            else
            {
                return 'Europe/Lisbon';
            }
        }
        case 'PW' : return 'Pacific/Palau';
        case 'PY' : return 'America/Asuncion';
        case 'QA' : return 'Asia/Qatar';
        case 'RE' : return 'Indian/Reunion';
        case 'RO' : return 'Europe/Bucharest';
        case 'RS' : return 'Europe/Belgrade';
        case 'RU' :
        {
            switch ( timeShift )
            {
                case 1 :
                case 2 : return 'Europe/Kaliningrad';
                case 3 : return 'Europe/Moscow';
                case 4 : return 'Europe/Volgograd';
                case 5 : return 'Asia/Yekaterinburg';
                case 6 : return 'Asia/Omsk';
                case 7 : return 'Asia/Tomsk';
                case 8 : return 'Asia/Irkutsk';
                case 9 : return 'Asia/Yakutsk';
                case 10 : return 'Asia/Vladivostok';
                case 11 : return 'Asia/Sakhalin';
                case -12 : return 'Asia/Anadyr';
            }

            break;
        }
        case 'RW' : return 'Africa/Kigali';
        case 'SA' : return 'Asia/Riyadh';
        case 'SB' : return 'Pacific/Guadalcanal';
        case 'SC' : return 'Indian/Mahe';
        case 'SD' : return 'Africa/Khartoum';
        case 'SE' : return 'Europe/Stockholm';
        case 'SG' : return 'Asia/Singapore';
        case 'SH' : return 'Atlantic/St_Helena';
        case 'SI' : return 'Europe/Ljubljana';
        case 'SJ' : return 'Arctic/Longyearbyen';
        case 'SK' : return 'Europe/Bratislava';
        case 'SL' : return 'Africa/Freetown';
        case 'SM' : return 'Europe/San_Marino';
        case 'SN' : return 'Africa/Dakar';
        case 'SO' : return 'Africa/Mogadishu';
        case 'SR' : return 'America/Paramaribo';
        case 'SS' : return 'Africa/Juba';
        case 'ST' : return 'Africa/Sao_Tome';
        case 'SV' : return 'America/El_Salvador';
        case 'SX' : return 'America/Lower_Princes';
        case 'SY' : return 'Asia/Damascus';
        case 'SZ' : return 'Africa/Mbabane';
        case 'TC' : return 'America/Grand_Turk';
        case 'TD' : return 'Africa/Ndjamena';
        case 'TF' : return 'Indian/Kerguelen';
        case 'TG' : return 'Africa/Lome';
        case 'TH' : return 'Asia/Bangkok';
        case 'TJ' : return 'Asia/Dushanbe';
        case 'TK' : return 'Pacific/Fakaofo';
        case 'TL' : return 'Asia/Dili';
        case 'TM' : return 'Asia/Ashgabat';
        case 'TN' : return 'Africa/Tunis';
        case 'TO' : return 'Pacific/Tongatapu';
        case 'TR' : return 'Europe/Istanbul';
        case 'TT' : return 'America/Port_of_Spain';
        case 'TV' : return 'Pacific/Funafuti';
        case 'TW' : return 'Asia/Taipei';
        case 'TZ' : return 'Africa/Dar_es_Salaam';
        case 'UA' :
        {
            switch ( timeShift )
            {
                case 1 :
                case 2 : return 'Europe/Kiev';
                case 3 : return 'Europe/Simferopol';
            }

            break;
        }
        case 'UG' : return 'Africa/Kampala';
        case 'UM' :
        {
            switch ( timeShift )
            {
                case -12 : return 'Pacific/Wake';
                case -11 : return 'Pacific/Midway';
            }

            break;
        }
        case 'US' :
        {
            switch ( timeShift )
            {
                case -11 :
                case -10 : return 'Pacific/Honolulu';
                case -9 : return 'America/Juneau';
                case -8 : return 'America/Los_Angeles';
                case -7 : return 'America/Denver';
                case -6 : return 'America/Chicago';
                case -5 :
                case -4 : return 'America/New_York';
            }

            break;
        }
        case 'UY' : return 'America/Montevideo';
        case 'UZ' :
        {
            if ( longitude < 68 )
            {
                return 'Asia/Samarkand';
            }
            else
            {
                return 'Asia/Tashkent';
            }
        }
        case 'VA' : return 'Europe/Vatican';
        case 'VC' : return 'America/St_Vincent';
        case 'VE' : return 'America/Caracas';
        case 'VG' : return 'America/Tortola';
        case 'VI' : return 'America/St_Thomas';
        case 'VN' : return 'Asia/Ho_Chi_Minh';
        case 'VU' : return 'Pacific/Efate';
        case 'WF' : return 'Pacific/Wallis';
        case 'WS' : return 'Pacific/Apia';
        case 'YE' : return 'Asia/Aden';
        case 'YT' : return 'Indian/Mayotte';
        case 'ZA' : return 'Africa/Johannesburg';
        case 'ZM' : return 'Africa/Lusaka';
        case 'ZW' : return 'Africa/Harare';
    }

    switch ( timeShift )
    {
        case -12 : return 'Pacific/Funafuti';
        case -11 : return 'Pacific/Pago_Pago';
        case -10 : return 'Pacific/Honolulu';
        case -9 : return 'America/Juneau';
        case -8 : return 'America/Vancouver';
        case -7 : return 'America/Denver';
        case -6 : return 'America/Chicago';
        case -5 : return 'America/New_York';
        case -4 : return 'America/Puerto_Rico';
        case -3 : return 'America/Sao_Paulo';
        case -2 : return 'Atlantic/South_Georgia';
        case -1 : return 'Atlantic/Azores';
        case 0 : return 'Europe/London';
        case 1 : return 'Europe/Vienna';
        case 2 : return 'Europe/Bucharest';
        case 3 : return 'Europe/Moscow';
        case 4 : return 'Asia/Dubai';
        case 5 : return 'Asia/Dushanbe';
        case 6 : return 'Asia/Thimphu';
        case 7 : return 'Asia/Jakarta';
        case 8 : return 'Asia/Shanghai';
        case 9 : return 'Asia/Tokyo';
        case 10 : return 'Australia/Brisbane';
        case 11 : return 'Pacific/Noumea';
    }

    return '';
}

// ~~

export function getLogicalFilePath(
    filePath
    )
{
    return filePath.replaceAll( '\\', '/' );
}

// ~~

export function getFilePath(
    folderPath,
    filePath
    )
{
    if ( folderPath === '' )
    {
        return filePath;
    }
    else if ( folderPath.endsWith( '/' ) )
    {
        return folderPath + filePath;
    }
    else
    {
        return folderPath + '/' + filePath;
    }
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

// -- IMPORTS

import crypto from 'crypto';

// -- CONSTANTS

export const isBrowser = ( typeof window !== "undefined" && typeof window.document !== "undefined" );
export const nullTuid = 'AAAAAAAAAAAAAAAAAAAAAA';
export const nullUuid = '00000000-0000-0000-0000-000000000000';
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

// -- VARIABLES

export let languageCode = 'en';
export let defaultLanguageCode = 'en';
export let textByLanguageCodeMapByCodeMap = new Map();

// -- FUNCTIONS

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
    return '"' + value.toString().replaceAll( '"', '\\"' ) + '"';
}

// ~~

export function getHexadecimalTextFromInteger(
    integer
    )
{
    return parseInt( integer ).toString( 'hex' );
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
    return getBase64TextFromHexadecimalText( hexadecimalText ).replaceAll( "+", "-" ).replaceAll( "/", "_" ).replaceAll( "=", "" );
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
    return getHexadecimalTextFromBase64Text( tuid.replaceAll( "-", "+" ).replaceAll( "_", "/" ) + "==" );
}

// ~~

export function getUuidFromHexadecimalText(
    hexadecimalText
    )
{
    return (
        hexadecimalText.substring( 0, 8 )
        + "-"
        + hexadecimalText.substring( 8, 12 )
        + "-"
        + hexadecimalText.substring( 12, 16 )
        + "-"
        + hexadecimalText.substring( 16, 20 )
        + "-"
        + hexadecimalText.substring( 20, 32 )
        );
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

export function setTextByLanguageCodeMapByCode(
    textByLanguageCodeMap,
    textCode
    )
{
    textByLanguageCodeMapByCodeMap.set( textCode, textByLanguageCodeMap );
}

// ~~

export function getTextByLanguageCodeMapByCode(
    textCode
    )
{
    if ( textByLanguageCodeMapByCodeMap.has( textCode ) )
    {
        return textByLanguageCodeMapByCodeMap.get( textCode );
    }
    else
    {
        console.warn( 'Missing text code ' + textCode );

        return '';
    }
}

// ~~

export function getTranslatedText(
    textByLanguageCodeMap,
    languageCode_
    )
{
    if ( languageCode_ !== undefined
         && textByLanguageCodeMap.hasOwnProperty( languageCode_ ) )
    {
        return textByLanguageCodeMap[ languageCode_ ];
    }
    else if ( textByLanguageCodeMap.hasOwnProperty( languageCode ) )
    {
        return textByLanguageCodeMap[ languageCode ];
    }
    else if ( textByLanguageCodeMap.hasOwnProperty( defaultLanguageCode ) )
    {
        return textByLanguageCodeMap[ defaultLanguageCode ];
    }
    else
    {
        console.warn( 'Missing language code ' + languageCode_ + ' : ' + JSON.stringigy( textByLanguageCodeMap ) );

        return '';
    }
}

// ~~

export function getTranslatedTextByCode(
    textCode,
    languageCode
    )
{
    if ( textByLanguageCodeMapByCodeMap.has( textCode ) )
    {
        return getTranslatedText( textByLanguageCodeMapByCodeMap.get( textCode ), languageCode );
    }
    else
    {
        console.warn( 'Missing language code ' + languageCode + ' : ' + textCode );

        return textCode;
    }
}

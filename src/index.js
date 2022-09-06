// -- CONSTANTS

export const isBrowser = ( typeof window !== "undefined" && typeof window.document !== "undefined" );
export const crypto = ( isBrowser && window.crypto ) || require( 'crypto' );
export const nullTuid = 'AAAAAAAAAAAAAAAAAAAAAA';
export const nullUuid = '00000000-0000-0000-0000-000000000000';
export const NullDate = {
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
    try
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
    catch ( error )
    {
        return Buffer.from( hexadecimalText, 'hex' ).toString( 'base64' );
    }
}

// ~~

export function getHexadecimalTextFromBase64Text(
    base64Text
    )
{
    try
    {
        let text = atob( base64Text );
        let hexadecimalText = '';

        for ( let characterIndex = 0;
              characterIndex < text.length;
              ++characterIndex )
        {
            hexadecimalText += ( '000' + this.charCodeAt( characterIndex ).toString( 16 ) ).slice( -4 );
        }

        return hexadecimalText;
    }
    catch ( error )
    {
        return Buffer.from( base64Text , 'base64' ).toString( 'hex' );
    }
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
    return getUuidFromHexadecimalText( getHexadecimalTextFromBase64Text( tuid ) );
}

// ~~

export function getRandomTuid(
    uuid
    )
{
    return getBase64TextFromHexadecimalText( getRandomUuid() );
}

// ~~

export function getTuidFromUuid(
    uuid
    )
{
    return getBase64TextFromHexadecimalText( uuid.replaceAll( '-', '' ) ).replaceAll( '=', '' );
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

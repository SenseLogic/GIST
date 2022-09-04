// -- CONSTANTS

export const nullTuid = "AAAAAAAAAAAAAAAAAAAAAA";
export const nullUuid = "00000000-0000-0000-0000-000000000000";
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
    if ( prefix !== ""
         && text.HasPrefix( prefix ) )
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
    if ( suffix !== ""
         && text.HasSuffix( suffix ) )
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
    paddingCharacter = " "
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
    paddingCharacter = " "
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
    return "`" + name + "`";
}

// ~~

export function getQuotedText(
    value
    )
{
    return "\"" + value.toString().replaceAll( "\"", "\\\"" ) + "\"";
}

// ~~

export function getBase64FromHexadecimal(
    hexadecimalBuffer
    )
{
    try
    {
        let buffer = "";

        for ( let byte_index = 0;
              byte_index < hexadecimalBuffer.length;
              byte_index += 2 )
        {
            buffer += String.fromCharCode( parseInt( hexadecimalBuffer.slice( byte_index, byte_index + 2 ), 16 ) );
        }

        return btoa( buffer );
    }
    catch ( error )
    {
        return Buffer.from( hexadecimalBuffer, "hex" ).toString( "base64" );
    }
}

// ~~

export function getHexadecimalFromBase64(
    base64Buffer
    )
{
    try
    {
        let buffer = atob( base64Buffer );
        let hexadecimalBuffer = "";

        for ( let characterIndex = 0;
              characterIndex < buffer.length;
              ++characterIndex )
        {
            hexadecimalBuffer += ( "000" + this.charCodeAt( characterIndex ).toString( 16 ) ).slice( -4 );
        }

        return hexadecimalBuffer;
    }
    catch ( error )
    {
        return Buffer.from( base64Buffer , 'base64' ).toString( "hex" );
    }
}

// ~~

export function getTuid(
    uuid
    )
{
    if ( uuid === undefined )
    {
        uuid = crypto.randomUUID();
    }

    return getBase64FromHexadecimal( uuid.replaceAll( "-", "" ) ).replaceAll( "=", "" );
}

// ~~

export function getUuid(
    )
{
    return crypto.randomUUID();
}

// ~~

export function getMillisecondTimestamp(
    )
{
    return window.performance.timing.navigationStart + window.performance.now();
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
    suffix = ""
    )
{
    return (
        getLeftPaddedText( date.year.toString(), 4, "0" )
        + ":"
        + getLeftPaddedText( date.month.toString(), 2, "0" )
        + ":"
        + getLeftPaddedText( date.day.toString(), 2, "0" )
        + suffix
        );
}

// ~~

export function getTimeText(
    time,
    suffix = ""
    )
{
    return (
        getLeftPaddedText( time.hour.toString(), 2, "0" )
        + "-"
        + getLeftPaddedText( time.minute.toString(), 2, "0" )
        + "-"
        + getLeftPaddedText( time.second.toString(), 2, "0" )
        + suffix
        );
}

// ~~

export function getDateTimeText(
    dateTime,
    infix = " ",
    suffix = ""
    )
{
    return (
        getLeftPaddedText( dateTime.year.toString(), 4, "0" )
        + "-"
        + getLeftPaddedText( dateTime.month.toString(), 2, "0" )
        + "-"
        + getLeftPaddedText( dateTime.day.toString(), 2, "0" )
        + infix
        + getLeftPaddedText( dateTime.hour.toString(), 2, "0" )
        + ":"
        + getLeftPaddedText( dateTime.minute.toString(), 2, "0" )
        + ":"
        + getLeftPaddedText( dateTime.second.toString(), 2, "0" )
        + suffix
        );
}

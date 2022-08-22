// -- CONSTANTS

export const NullTuid = "AAAAAAAAAAAAAAAAAAAAAA";
export const NullUuid = "00000000-0000-0000-0000-000000000000";
export const NullDate = {
    Year : 1000,
    Month : 1,
    Day : 1
    };
export const NullTime = {
    Hour : 0,
    Minute : 0,
    Second : 0.0
    };
export const NullDateTime = {
    Year : 1000,
    Month : 1,
    Day : 1,
    Hour : 0,
    Minute : 0,
    Second : 0.0
    };

// -- FUNCTIONS

export function RemovePrefix(
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

export function RemoveSuffix(
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

export function GetLeftPaddedText(
    text,
    minimum_character_count,
    padding_character = " "
    )
{
    if ( text.length < minimum_character_count )
    {
        return padding_character.repeat( minimum_character_count - text.length ) + text;
    }
    else
    {
        return text;
    }
}

// ~~

export function GetRightPaddedText(
    text,
    minimum_character_count,
    padding_character = " "
    )
{
    if ( text.length < minimum_character_count )
    {
        return text + padding_character.repeat( minimum_character_count - text.length );
    }
    else
    {
        return text;
    }
}


export function GetEncodedName(
    name
    )
{
    return "`" + name + "`";
}

// ~~

export function GetEncodedText(
    value
    )
{
    return "\"" + value.toString().replaceAll( "\"", "\\\"" ) + "\"";
}

// ~~

export function GetBase64FromHexadecimal(
    hexadecimal_buffer
    )
{
    try
    {
        let buffer = "";

        for ( let byte_index = 0;
              byte_index < hexadecimal_buffer.length;
              byte_index += 2 )
        {
            buffer += String.fromCharCode( parseInt( hexadecimal_buffer.slice( byte_index, byte_index + 2 ), 16 ) );
        }

        return btoa( buffer );
    }
    catch ( error )
    {
        return Buffer.from( hexadecimal_buffer, "hex" ).toString( "base64" );
    }
}

// ~~

export function GetHexadecimalFromBase64(
    base_64_buffer
    )
{
    try
    {
        let buffer = atob( base_64_buffer );
        let hexadecimal_buffer = "";

        for ( let character_index = 0;
              character_index < buffer.length;
              ++character_index )
        {
            hexadecimal_buffer += ( "000" + this.charCodeAt( character_index ).toString( 16 ) ).slice( -4 );
        }

        return hexadecimal_buffer;
    }
    catch ( error )
    {
        return Buffer.from( base_64_buffer , 'base64' ).toString( "hex" );
    }
}

// ~~

export function GetTuid(
    uuid
    )
{
    return GetEncodedBase64( uuid.replaceAll( "-", "" ) ).replaceAll( "=", "" );
}

// ~~

export function MakeTuid(
    )
{
    return GetTuid( crypto.randomUUID() );
}

// ~~

export function MakeUuid(
    )
{
    return crypto.randomUUID();
}

// ~~

export function GetMillisecondTimestamp(
    )
{
    return window.performance.timing.navigationStart + window.performance.now();
}

// ~~

export function GetLocalDate(
    system_date
    )
{
    if ( system_date === undefined )
    {
        system_date = new Date();
    }

    return {
        Year : system_date.getFullYear(),
        Month : system_date.getMonth(),
        Day : system_date.getDay()
        };
}

// ~~

export function GetLocalTime(
    system_date
    )
{
    if ( system_date === undefined )
    {
        system_date = new Date();
    }

    return {
        Hour : system_date.getHours(),
        Minute : system_date.getMinutes(),
        Second : system_date.getSeconds()
        };
}

// ~~

export function GetLocalDateTime(
    system_date
    )
{
    if ( system_date === undefined )
    {
        system_date = new Date();
    }

    return {
        Year : system_date.getFullYear(),
        Month : system_date.getMonth(),
        Day : system_date.getDay(),
        Hour : system_date.getHours(),
        Minute : system_date.getMinutes(),
        Second : system_date.getSeconds()
        };
}

// ~~

export function GetUniversalDate(
    system_date
    )
{
    if ( system_date === undefined )
    {
        system_date = new Date();
    }

    return {
        Year : system_date.getUTCFullYear(),
        Month : system_date.getUTCMonth(),
        Day : system_date.getUTCDay()
        };
}

// ~~

export function GetUniversalTime(
    system_date
    )
{
    if ( system_date === undefined )
    {
        system_date = new Date();
    }

    return {
        Hour : system_date.getUTCHours(),
        Minute : system_date.getUTCMinutes(),
        Second : system_date.getUTCSeconds()
        };
}

// ~~

export function GetUniversalDateTime(
    system_date
    )
{
    if ( system_date === undefined )
    {
        system_date = new Date();
    }

    return {
        Year : system_date.getUTCFullYear(),
        Month : system_date.getUTCMonth(),
        Day : system_date.getUTCDay(),
        Hour : system_date.getUTCHours(),
        Minute : system_date.getUTCMinutes(),
        Second : system_date.getUTCSeconds()
        };
}

// ~~

export function GetEncodedDate(
    date,
    suffix = ""
    )
{
    return (
        GetLeftPaddedText( date.Year.toString(), 4, "0" )
        + ":"
        + GetLeftPaddedText( date.Month.toString(), 2, "0" )
        + ":"
        + GetLeftPaddedText( date.Day.toString(), 2, "0" )
        + suffix
        );
}

// ~~

export function GetEncodedTime(
    time,
    suffix = ""
    )
{
    return (
        GetLeftPaddedText( time.Hour.toString(), 2, "0" )
        + "-"
        + GetLeftPaddedText( time.Minute.toString(), 2, "0" )
        + "-"
        + GetLeftPaddedText( time.Second.toString(), 2, "0" )
        + suffix
        );
}

// ~~

export function GetEncodedDateTime(
    date_time,
    infix = " ",
    suffix = ""
    )
{
    return (
        GetLeftPaddedText( date_time.Year.toString(), 4, "0" )
        + "-"
        + GetLeftPaddedText( date_time.Month.toString(), 2, "0" )
        + "-"
        + GetLeftPaddedText( date_time.Day.toString(), 2, "0" )
        + infix
        + GetLeftPaddedText( date_time.Hour.toString(), 2, "0" )
        + ":"
        + GetLeftPaddedText( date_time.Minute.toString(), 2, "0" )
        + ":"
        + GetLeftPaddedText( date_time.Second.toString(), 2, "0" )
        + suffix
        );
}

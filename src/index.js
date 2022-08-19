// -- CONSTANTS

export const NullTuid = "AAAAAAAAAAAAAAAAAAAAAA";
export const NullUuid = "00000000-0000-0000-0000-000000000000";
export const NullDate = {
    Year : 1000,
    Month : 1,
    Day : 1
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

export function GetQuotedName(
    name
    )
{
    return "`" + name + "`";
}

// ~~

export function GetQuotedValue(
    value
    )
{
    return "\"" + value.toString().replaceAll( "\"", "\\\"" ) + "\"";
}

// ~~

export function GetEncodedBase64(
    text
    )
{
    try
    {
        return btoa( text );
    }
    catch ( error )
    {
        return Buffer.from( text, "binary" ).toString( "base64" );
    }
}

// ~~

export function GetDecodedBase64(
    text
    )
{
    try
    {
        return atob( text );
    }
    catch ( error )
    {
        return Buffer.from( text , 'base64').toString( "binary" );
    }
}

// ~~

export function GetTuid(
    uuid
    )
{
    return GetEncodedBase64( uuid.split( "-" ).join( "" ) ).split( "=" ).join( "" );
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
    )
{
    var
        date;

    date = new Date();

    return {
        Year : date.getFullYear(),
        Month : date.getMonth(),
        Day : date.getDay()
        };
}

// ~~

export function GetLocalDateTime(
    )
{
    var
        date;

    date = new Date();

    return {
        Year : date.getFullYear(),
        Month : date.getMonth(),
        Day : date.getDay(),
        Hour : date.getHours(),
        Minute : date.getMinutes(),
        Second : date.getSeconds()
        };
}

// ~~

export function GetUniversalDate(
    )
{
    var
        date;

    date = new Date();

    return {
        Year : date.getUTCFullYear(),
        Month : date.getUTCMonth(),
        Day : date.getUTCDay()
        };
}

// ~~

export function GetUniversalDateTime(
    )
{
    var
        date;

    date = new Date();

    return {
        Year : date.getUTCFullYear(),
        Month : date.getUTCMonth(),
        Day : date.getUTCDay(),
        Hour : date.getUTCHours(),
        Minute : date.getUTCMinutes(),
        Second : date.getUTCSeconds()
        };
}

// ~~

export function GetEncodedDate(
    date
    )
{
    return (
        GetLeftPaddedText( date.Year.toString(), 4, "0" )
        + ":"
        + GetLeftPaddedText( date.Month.toString(), 2, "0" )
        + ":"
        + GetLeftPaddedText( date.Day.toString(), 2, "0" )
        );
}

// ~~

export function GetEncodedDateTime(
    date
    )
{
    return (
        GetLeftPaddedText( date.Year.toString(), 4, "0" )
        + ":"
        + GetLeftPaddedText( date.Month.toString(), 2, "0" )
        + ":"
        + GetLeftPaddedText( date.Day.toString(), 2, "0" )
        + " "
        + GetLeftPaddedText( date.Hour.toString(), 2, "0" )
        + "-"
        + GetLeftPaddedText( date.Minute.toString(), 2, "0" )
        + "-"
        + GetLeftPaddedText( date.Second.toString(), 2, "0" )
        );
}

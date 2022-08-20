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
    )
{
    let date = new Date();

    return {
        Year : date.getFullYear(),
        Month : date.getMonth(),
        Day : date.getDay()
        };
}

// ~~

export function GetLocalTime(
    )
{
    let date = new Date();

    return {
        Hour : date.getHours(),
        Minute : date.getMinutes(),
        Second : date.getSeconds()
        };
}

// ~~

export function GetLocalDateTime(
    )
{
    let date = new Date();

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
    let date = new Date();

    return {
        Year : date.getUTCFullYear(),
        Month : date.getUTCMonth(),
        Day : date.getUTCDay()
        };
}

// ~~

export function GetUniversalTime(
    )
{
    let date = new Date();

    return {
        Hour : date.getUTCHours(),
        Minute : date.getUTCMinutes(),
        Second : date.getUTCSeconds()
        };
}

// ~~

export function GetUniversalDateTime(
    )
{
    let date = new Date();

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

export function GetEncodedTime(
    time
    )
{
    return (
        GetLeftPaddedText( time.Hour.toString(), 2, "0" )
        + "-"
        + GetLeftPaddedText( time.Minute.toString(), 2, "0" )
        + "-"
        + GetLeftPaddedText( time.Second.toString(), 2, "0" )
        );
}

// ~~

export function GetEncodedDateTime(
    date_time
    )
{
    return (
        GetLeftPaddedText( date_time.Year.toString(), 4, "0" )
        + ":"
        + GetLeftPaddedText( date_time.Month.toString(), 2, "0" )
        + ":"
        + GetLeftPaddedText( date_time.Day.toString(), 2, "0" )
        + " "
        + GetLeftPaddedText( date_time.Hour.toString(), 2, "0" )
        + "-"
        + GetLeftPaddedText( date_time.Minute.toString(), 2, "0" )
        + "-"
        + GetLeftPaddedText( date_time.Second.toString(), 2, "0" )
        );
}

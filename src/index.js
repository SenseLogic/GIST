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
export let textByLanguageCodeMapBySlugMap = new Map();
export let processedLineTagArray = [];
export let processedDualTagArray = [];
export let processedTagArray = [];
export let locationByIpAddressMap = new Map();
export let googleAnalyticsTrackingScript = null;
export let googleAnalyticsTrackingIsEnabled = false;

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
    return (
        '"'
        + value.toString()
              .replaceAll( "\\", "\\\\" )
              .replaceAll( "\n", "\\n" )
              .replaceAll( "\r", "\\r" )
              .replaceAll( "\t", "\\t" )
              .replaceAll( "\"", "\\\"" )
              .replaceAll( "'", "\\'" )
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

export function getSanitizedFileName(
    fileName
    )
{
    return fileName.replace( /[^\p{L}\p{N}\-_]/gu, '_' );
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

export function setTextByLanguageCodeMapBySlug(
    textByLanguageCodeMap,
    textSlug
    )
{
    textByLanguageCodeMapBySlugMap.set( textSlug, textByLanguageCodeMap );
}

// ~~

export function getTextByLanguageCodeMapBySlug(
    textSlug
    )
{
    if ( textByLanguageCodeMapBySlugMap.has( textSlug ) )
    {
        return textByLanguageCodeMapBySlugMap.get( textSlug );
    }
    else
    {
        console.warn( 'Missing text code ' + textSlug );

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

export function getTranslatedTextBySlug(
    textSlug,
    languageCode
    )
{
    if ( textByLanguageCodeMapBySlugMap.has( textSlug ) )
    {
        return getTranslatedText( textByLanguageCodeMapBySlugMap.get( textSlug ), languageCode );
    }
    else
    {
        console.warn( 'Missing translated text  : ' + textSlug );

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

export function getContinentSlugFromCountryCode(
    countryCode
    )
{
    switch ( countryCode )
    {
        case 'AF' : return 'asia';
        case 'AX' : return 'europe';
        case 'AL' : return 'europe';
        case 'DZ' : return 'africa';
        case 'AS' : return 'australia';
        case 'AD' : return 'europe';
        case 'AO' : return 'africa';
        case 'AI' : return 'central-america';
        case 'AQ' : return 'antarctica';
        case 'AG' : return 'central-america';
        case 'AR' : return 'south-america';
        case 'AM' : return 'europe';
        case 'AW' : return 'central-america';
        case 'AU' : return 'australia';
        case 'AT' : return 'europe';
        case 'AZ' : return 'europe';
        case 'BS' : return 'central-america';
        case 'BH' : return 'asia';
        case 'BD' : return 'asia';
        case 'BB' : return 'central-america';
        case 'BY' : return 'europe';
        case 'BE' : return 'europe';
        case 'BZ' : return 'central-america';
        case 'BJ' : return 'africa';
        case 'BM' : return 'central-america';
        case 'BT' : return 'asia';
        case 'BO' : return 'south-america';
        case 'BA' : return 'europe';
        case 'BW' : return 'africa';
        case 'BR' : return 'south-america';
        case 'IO' : return 'africa';
        case 'VG' : return 'central-america';
        case 'BN' : return 'asia';
        case 'BG' : return 'europe';
        case 'BF' : return 'africa';
        case 'BI' : return 'africa';
        case 'KH' : return 'asia';
        case 'CM' : return 'africa';
        case 'CA' : return 'north-america';
        case 'CV' : return 'africa';
        case 'KY' : return 'central-america';
        case 'CF' : return 'africa';
        case 'TD' : return 'africa';
        case 'CL' : return 'south-america';
        case 'CN' : return 'asia';
        case 'CX' : return 'australia';
        case 'CC' : return 'australia';
        case 'CO' : return 'south-america';
        case 'KM' : return 'africa';
        case 'CK' : return 'australia';
        case 'CR' : return 'central-america';
        case 'CI' : return 'africa';
        case 'HR' : return 'europe';
        case 'CU' : return 'central-america';
        case 'CW' : return 'central-america';
        case 'CY' : return 'europe';
        case 'CZ' : return 'europe';
        case 'CD' : return 'africa';
        case 'DK' : return 'europe';
        case 'DJ' : return 'africa';
        case 'DM' : return 'central-america';
        case 'DO' : return 'central-america';
        case 'EC' : return 'south-america';
        case 'EG' : return 'africa';
        case 'SV' : return 'central-america';
        case 'GQ' : return 'africa';
        case 'ER' : return 'africa';
        case 'EE' : return 'europe';
        case 'ET' : return 'africa';
        case 'FK' : return 'south-america';
        case 'FO' : return 'europe';
        case 'FM' : return 'australia';
        case 'FJ' : return 'australia';
        case 'FI' : return 'europe';
        case 'FR' : return 'europe';
        case 'PF' : return 'australia';
        case 'TF' : return 'antarctica';
        case 'GA' : return 'africa';
        case 'GE' : return 'europe';
        case 'DE' : return 'europe';
        case 'GH' : return 'africa';
        case 'GI' : return 'europe';
        case 'GR' : return 'europe';
        case 'GL' : return 'central-america';
        case 'GD' : return 'central-america';
        case 'GU' : return 'australia';
        case 'GT' : return 'central-america';
        case 'GG' : return 'europe';
        case 'GN' : return 'africa';
        case 'GW' : return 'africa';
        case 'GY' : return 'south-america';
        case 'HT' : return 'central-america';
        case 'HM' : return 'antarctica';
        case 'HN' : return 'central-america';
        case 'HK' : return 'asia';
        case 'HU' : return 'europe';
        case 'IS' : return 'europe';
        case 'IN' : return 'asia';
        case 'ID' : return 'asia';
        case 'IR' : return 'asia';
        case 'IQ' : return 'asia';
        case 'IE' : return 'europe';
        case 'IM' : return 'europe';
        case 'IL' : return 'asia';
        case 'IT' : return 'europe';
        case 'JM' : return 'central-america';
        case 'JP' : return 'asia';
        case 'JE' : return 'europe';
        case 'JO' : return 'asia';
        case 'KZ' : return 'asia';
        case 'KE' : return 'africa';
        case 'KI' : return 'australia';
        case 'KO' : return 'europe';
        case 'KW' : return 'asia';
        case 'KG' : return 'asia';
        case 'LA' : return 'asia';
        case 'LV' : return 'europe';
        case 'LB' : return 'asia';
        case 'LS' : return 'africa';
        case 'LR' : return 'africa';
        case 'LY' : return 'africa';
        case 'LI' : return 'europe';
        case 'LT' : return 'europe';
        case 'LU' : return 'europe';
        case 'MO' : return 'asia';
        case 'MK' : return 'europe';
        case 'MG' : return 'africa';
        case 'MW' : return 'africa';
        case 'MY' : return 'asia';
        case 'MV' : return 'asia';
        case 'ML' : return 'africa';
        case 'MT' : return 'europe';
        case 'MH' : return 'australia';
        case 'MR' : return 'africa';
        case 'MU' : return 'africa';
        case 'MX' : return 'central-america';
        case 'MD' : return 'europe';
        case 'MC' : return 'europe';
        case 'MN' : return 'asia';
        case 'ME' : return 'europe';
        case 'MS' : return 'central-america';
        case 'MA' : return 'africa';
        case 'MZ' : return 'africa';
        case 'MM' : return 'asia';
        case 'NA' : return 'africa';
        case 'NR' : return 'australia';
        case 'NP' : return 'asia';
        case 'NL' : return 'europe';
        case 'NC' : return 'australia';
        case 'NZ' : return 'australia';
        case 'NI' : return 'central-america';
        case 'NE' : return 'africa';
        case 'NG' : return 'africa';
        case 'NU' : return 'australia';
        case 'NF' : return 'australia';
        case 'KP' : return 'asia';
        case 'MP' : return 'australia';
        case 'NO' : return 'europe';
        case 'OM' : return 'asia';
        case 'PK' : return 'asia';
        case 'PW' : return 'australia';
        case 'PS' : return 'asia';
        case 'PA' : return 'central-america';
        case 'PG' : return 'australia';
        case 'PY' : return 'south-america';
        case 'PE' : return 'south-america';
        case 'PH' : return 'asia';
        case 'PN' : return 'australia';
        case 'PL' : return 'europe';
        case 'PT' : return 'europe';
        case 'PR' : return 'central-america';
        case 'QA' : return 'asia';
        case 'CG' : return 'africa';
        case 'RO' : return 'europe';
        case 'RU' : return 'europe';
        case 'RW' : return 'africa';
        case 'BL' : return 'central-america';
        case 'SH' : return 'africa';
        case 'KN' : return 'central-america';
        case 'LC' : return 'central-america';
        case 'MF' : return 'central-america';
        case 'PM' : return 'central-america';
        case 'VC' : return 'central-america';
        case 'WS' : return 'australia';
        case 'SM' : return 'europe';
        case 'ST' : return 'africa';
        case 'SA' : return 'asia';
        case 'SN' : return 'africa';
        case 'RS' : return 'europe';
        case 'SC' : return 'africa';
        case 'SL' : return 'africa';
        case 'SG' : return 'asia';
        case 'SX' : return 'central-america';
        case 'SK' : return 'europe';
        case 'SI' : return 'europe';
        case 'SB' : return 'australia';
        case 'SO' : return 'africa';
        case 'ZA' : return 'africa';
        case 'GS' : return 'antarctica';
        case 'KR' : return 'asia';
        case 'SS' : return 'africa';
        case 'ES' : return 'europe';
        case 'LK' : return 'asia';
        case 'SD' : return 'africa';
        case 'SR' : return 'south-america';
        case 'SJ' : return 'europe';
        case 'SZ' : return 'africa';
        case 'SE' : return 'europe';
        case 'CH' : return 'europe';
        case 'SY' : return 'asia';
        case 'TW' : return 'asia';
        case 'TJ' : return 'asia';
        case 'TZ' : return 'africa';
        case 'TH' : return 'asia';
        case 'GM' : return 'africa';
        case 'TL' : return 'asia';
        case 'TG' : return 'africa';
        case 'TK' : return 'australia';
        case 'TO' : return 'australia';
        case 'TT' : return 'central-america';
        case 'TN' : return 'africa';
        case 'TR' : return 'europe';
        case 'TM' : return 'asia';
        case 'TC' : return 'central-america';
        case 'TV' : return 'australia';
        case 'UG' : return 'africa';
        case 'UA' : return 'europe';
        case 'AE' : return 'asia';
        case 'GB' : return 'europe';
        case 'US' : return 'north-america';
        case 'UY' : return 'south-america';
        case 'UM' : return 'australia';
        case 'VI' : return 'central-america';
        case 'UZ' : return 'asia';
        case 'VU' : return 'australia';
        case 'VA' : return 'europe';
        case 'VE' : return 'south-america';
        case 'VN' : return 'asia';
        case 'WF' : return 'australia';
        case 'EH' : return 'africa';
        case 'YE' : return 'asia';
        case 'ZM' : return 'africa';
        case 'ZW' : return 'africa';
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
            Service: '',
            Latitude: 0.0,
            Longitude: 0.0,
            CountryCode: '',
            TimeZone: '',
            IsFound: false,
            ContinentSlug: '',
            IsAntarctica: false,
            IsSouthAmerica: false,
            IsCentralAmerica: false,
            IsNorthAmerica: false,
            IsAmerica: false,
            IsAfrica: false,
            IsEurope: false,
            IsAustralia: false,
            IsAsia: false,
            IsJapan: false
        };

        if ( !location.IsFound )
        {
            try
            {
                let response = await fetch( 'http://ip-api.com/json/' + ipAddress );
                let geographicData = await response.json();

                if ( geographicData
                     && geographicData.status === 'success' )
                {
                    location.Service = 'ip-api.com';
                    location.CountryCode = geographicData.countryCode;
                    location.Latitude = geographicData.lat;
                    location.Longitude = geographicData.lon;
                    location.TimeZone = geographicData.timezone;
                    location.IsFound = true;
                }
            }
            catch ( error )
            {
                console.error( error );
            }
        }

        if ( !location.IsFound )
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
                     location.Service = 'ip-api.com';
                     location.CountryCode = geographicData.countryCode;
                     location.Latitude = Number( geographicData.lat );
                     location.Longitude = Number( geographicData.lon );
                     location.TimeZone = geographicData.timezone;
                     location.IsFound = true;
                }
            }
            catch ( error )
            {
                console.error( error );
            }
        }

        if ( !location.IsFound )
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
                     location.Service = 'geoplugin.net';
                     location.CountryCode = geographicData.geoplugin_countryCode;
                     location.Latitude = Number( geographicData.geoplugin_latitude );
                     location.Longitude = Number( geoplugin_longitude );
                     location.TimeZone = geographicData.geoplugin_timezone;
                     location.IsFound = true;
                }
            }
            catch ( error )
            {
                console.error( error );
            }
        }

        if ( !location.IsFound )
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
                    location.Service = 'iplocate.io';
                    location.CountryCode = geographicData.country_code;
                    location.Latitude = Number( geographicData.latitude );
                    location.Longitude = Number( geographicData.longitude );
                    location.TimeZone = geographicData.time_zone;
                    location.IsFound = true;
                }
            }
            catch ( error )
            {
                console.error( error );
            }
        }

        if ( !location.IsFound )
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
                    location.Service = 'hostip.info';
                    location.CountryCode = geographicData.country_code;
                    location.Latitude = getCapitalLatitudeFromCountryCode( location.CountryCode );
                    location.Longitude = getCapitalLongitudeFromCountryCode( location.CountryCode );
                    location.TimeZone = getTimeZoneFromLocation( location.Latitude, location.Longitude, location.CountryCode );
                    location.IsFound = true;
                }
            }
            catch ( error )
            {
                console.error( error );
            }
        }

        location.ContinentSlug = getContinentSlugFromCountryCode( location.CountryCode );
        location.IsAntarctica = ( location.ContinentSlug === 'antarctica' );
        location.IsSouthAmerica = ( location.ContinentSlug === 'south-america' );
        location.IsCentralAmerica = ( location.ContinentSlug === 'central-america' );
        location.IsNorthAmerica = ( location.ContinentSlug === 'north-america' );
        location.IsAmerica = ( location.IsSouthAmerica || location.IsNorthAmerica );
        location.IsAfrica = ( location.ContinentSlug === 'africa' );
        location.IsEurope = ( location.ContinentSlug === 'europe' );
        location.IsAustralia = ( location.ContinentSlug === 'australia' );
        location.IsAsia = ( location.ContinentSlug === 'asia' );
        location.IsJapan = ( location.CountryCode === 'JP' );

        locationByIpAddressMap.set( ipAddress, location )

        return location;
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







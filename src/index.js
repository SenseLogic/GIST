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

export function getContinentSlugFromCountryCode(
    country_code
    )
{
    switch ( country_code )
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

export function getLocationFromCountryCode(
    countryCode
    )
{
    var location = {};

    location.countryCode = countryCode;
    location.continentSlug = GetContinentSlugFromCountryCode( location.countryCode );
    location.isAntarctica = ( location.continentSlug === 'antarctica' );
    location.isSouthAmerica = ( location.continentSlug === 'south-america' );
    location.isCentralAmerica = ( location.continentSlug === 'central-america' );
    location.isNorthAmerica = ( location.continentSlug === 'north-america' );
    location.isAmerica = ( location.isSouthAmerica || location.isNorthAmerica );
    location.isAfrica = ( location.continentSlug === 'africa' );
    location.isEurope = ( location.continentSlug === 'europe' );
    location.isAustralia = ( location.continentSlug === 'australia' );
    location.isAsia = ( location.continentSlug === 'asia' );
    location.isJapan = ( location.countryCode === 'JP' );

    return location;
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

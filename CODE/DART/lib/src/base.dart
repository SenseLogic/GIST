// -- IMPORTS

import 'dart:core';
import 'dart:convert';
import 'dart:math';
import 'dart:typed_data';
import 'package:crypto/crypto.dart';
import 'package:uuid/uuid.dart';

import 'package:logger/logger.dart';

// -- TYPES

class Date_
{
    // -- ATTRIBUTES

    final int
        year,
        month,
        day;

    // -- CONSTRUCTORS

    Date_(
        {
            required this.year,
            required this.month,
            required this.day
        }
        );
}

// ~~

class Time_
{
    // -- ATTRIBUTES

    final int
        hour,
        minute,
        second;

    // -- CONSTRUCTORS

    Time_(
        {
            required this.hour,
            required this.minute,
            required this.second
        }
        );
}

// ~~

class DateTime_
{
    // -- ATTRIBUTES

    final int
        year,
        month,
        day,
        hour,
        minute,
        second;

    // -- CONSTRUCTORS

    DateTime_(
        {
            required this.year,
            required this.month,
            required this.day,
            required this.hour,
            required this.minute,
            required this.second
        }
        );
}

// ~~

class Timestamp_
{
    // -- ATTRIBUTES

    final int
        year,
        month,
        day,
        hour,
        minute,
        second,
        millisecond;

    // -- CONSTRUCTORS

    Timestamp_(
        {
            required this.year,
            required this.month,
            required this.day,
            required this.hour,
            required this.minute,
            required this.second,
            required this.millisecond
        }
        );
}

// -- VARIABLES

Logger
    logger = Logger();
Uuid
    uuidGenerator = Uuid();
String
    continentCode = '',
    countryCode = '',
    languageCode = 'en',
    defaultLanguageCode = 'en';
Map<String, String>
    textBySlugMap = {};
List<Map<String, String>>
    processedLineTagArray = [],
    processedDualTagArray = [],
    processedTagArray = [];


// -- FUNCTIONS

bool isBrowser(
    )
{
    return identical( 1, 1.0 );
}

// ~~

void showTrace(
    )
{
    Logger.level = Level.trace;
}

// ~~

void showDebug(
    )
{
    Logger.level = Level.debug;
}

// ~~

void showInfo(
    )
{
    Logger.level = Level.info;
}

// ~~

void showWarning(
    )
{
    Logger.level = Level.warning;
}

// ~~

void showError(
    )
{
    Logger.level = Level.error;
}

// ~~

void showFatal(
    )
{
    Logger.level = Level.fatal;
}

// ~~

void printTrace(
    String message
    )
{
    logger.t( message );
}

// ~~

void printDebug(
    String message
    )
{
    logger.d( message );
}

// ~~

void printInfo(
    String message
    )
{
    logger.i( message );
}

// ~~

void printWarning(
    String message
    )
{
    logger.w( message );
}

// ~~

void printError(
    String message
    )
{
    logger.e( message );
}

// ~~

void printFatal(
    String message
    )
{
    logger.f( message );
}

// ~~

bool isString(
    Object? object
    )
{
    return object is String;
}

// ~~

String removePrefix(
    String text,
    String prefix
    )
{
    if ( prefix.isNotEmpty
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

String removeSuffix(
    String text,
    String suffix
    )
{
    if ( suffix.isNotEmpty
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

String replacePrefix(
    String text,
    String oldPrefix,
    String newPrefix
    )
{
    if ( text.startsWith( oldPrefix ) )
    {
        return newPrefix + text.substring( oldPrefix.length );
    }
    else
    {
        return text;
    }
}

// ~~

String replaceSuffix(
    String text,
    String oldSuffix,
    String newSuffix
    )
{
    if ( text.endsWith( oldSuffix ) )
    {
        return text.substring( 0, text.length - oldSuffix.length ) + newSuffix;
    }
    else
    {
        return text;
    }
}

// ~~

String replaceIteratively(
    String text,
    String oldText,
    String newText
    )
{
    String replacedText = text;
    String oldReplacedText;

    do
    {
        oldReplacedText = replacedText;
        replacedText = replacedText.replaceAll( oldText, newText );
    }
    while ( replacedText != oldReplacedText );

    return oldReplacedText;
}


// ~~

String getLeftPaddedText(
    String text,
    int minimumCharacterCount,
    [
        String paddingCharacter = ' '
    ]
    )
{
    return text.padLeft( minimumCharacterCount, paddingCharacter );
}

// ~~

String getRightPaddedText(
    String text,
    int minimumCharacterCount,
    [
        String paddingCharacter = ' '
    ]
    )
{
    return text.padRight( minimumCharacterCount, paddingCharacter );
}

// ~~

String getEncodedName(
    String name
    )
{
    return '`$name`';
}

// ~~

String getQuotedText(
    String text
    )
{
    final quotedText =
        text
            .replaceAll( '\\', '\\\\' )
            .replaceAll( '\n', '\\n' )
            .replaceAll( '\r', '\\r' )
            .replaceAll( '\t', '\\t' )
            .replaceAll( '"', '\\"' )
            .replaceAll( '\'', '\\\'' );

    return '"$quotedText"';
}

// ~~

String getHexadecimalTextFromInteger(
    int integer
    )
{
    return integer.toRadixString( 16 );
}

// ~~

String getBase64TextFromHexadecimalText(
    String hexadecimalText
    )
{
    return
        base64Encode(
            Uint8List.fromList(
                List<int>.generate(
                    ( hexadecimalText.length / 2 ).floor(),
                    ( index ) => int.parse( hexadecimalText.substring( index * 2, index * 2 + 2 ), radix: 16 )
                    )
                )
            );
}

// ~~

String getTuidFromHexadecimalText(
    String hexadecimalText
    )
{
    return getBase64TextFromHexadecimalText( hexadecimalText )
            .replaceAll( '+', '-' )
            .replaceAll( '/', '_' )
            .replaceAll( '=', '' );
}

// ~~

String getTuidFromText(
    String text
    )
{
    if ( text.isEmpty )
    {
        return '';
    }
    else
    {
        return getTuidFromHexadecimalText( md5.convert( utf8.encode( text ) ).toString() );
    }
}

// ~~

String getHexadecimalTextFromBase64Text(
    String base64Text
    )
{
    final bytes = base64Decode( base64Text );
    return bytes.map( ( byte ) => byte.toRadixString( 16 ).padLeft( 2, '0' ) ).join();
}

// ~~

String getHexadecimalTextFromTuid(
    String tuid
    )
{
    return
        getHexadecimalTextFromBase64Text(
            '${ tuid.replaceAll( '-', '+' ).replaceAll( '_', '/' ) }=='
            );
}

// ~~

String getUuidFromHexadecimalText(
    String hexadecimalText
    )
{
    return
        '${ hexadecimalText.substring( 0, 8 ) }-'
        '${ hexadecimalText.substring( 8, 12 ) }-'
        '${ hexadecimalText.substring( 12, 16 ) }-'
        '${ hexadecimalText.substring( 16, 20 ) }-'
        '${ hexadecimalText.substring( 20, 32 ) }';
}

// ~~

String getUuidFromText(
    String text
    )
{
    if ( text.isEmpty )
    {
        return '00000000-0000-0000-0000-000000000000';
    }
    else
    {
        return getUuidFromHexadecimalText( md5.convert( utf8.encode( text ) ).toString() );
    }
}

// ~~

Uint8List getRandomByteArray(
    int byteCount
    )
{
    final random = Random.secure();

    return
        Uint8List.fromList(
            List<int>.generate( byteCount, ( byteIndex ) => random.nextInt( 256 ) )
            );
}


// ~~

String getRandomHexadecimalText(
    int byteCount
    )
{
    return
        getRandomByteArray( byteCount )
            .map( ( byte ) => byte.toRadixString( 16 ).padLeft( 2, '0' ) )
            .join();
}

// ~~

String getTimeUuid(
    )
{
    return
        getUuidFromHexadecimalText(
            getHexadecimalTextFromInteger(
                ( getMillisecondTimestamp() + 12219292800000 ) * 10000
                )
            + getRandomHexadecimalText( 16 )
            );
}

// ~~

String getRandomUuid(
    )
{
    return Uuid().v4();
}

// ~~

String getUuidFromTuid(
    String tuid
    )
{
    return getUuidFromHexadecimalText( getHexadecimalTextFromTuid( tuid ) );
}

// ~~

String getRandomTuid()
{
    return getTuidFromUuid( getRandomUuid() );
}

// ~~

String getTuidFromUuid(
    String uuid
    )
{
    return getTuidFromHexadecimalText( uuid.replaceAll( '-', '' ) );
}

// ~~

int getMillisecondTimestamp(
    )
{
    return DateTime.now().millisecondsSinceEpoch;
}

// ~~

Date_ getLocalDate(
    [
        DateTime? systemDate
    ]
    )
{
    systemDate ??= DateTime.now();

    return
        Date_(
            year: systemDate.year,
            month: systemDate.month,
            day: systemDate.day
            );
}

// ~~

Time_ getLocalTime(
    [
        DateTime? systemDate
    ]
    )
{
    systemDate ??= DateTime.now();

    return
        Time_(
            hour: systemDate.hour,
            minute: systemDate.minute,
            second: systemDate.second
            );
}

// ~~

DateTime_ getLocalDateTime(
    [
        DateTime? systemDate
    ]
    )
{
    systemDate ??= DateTime.now();

    return
        DateTime_(
            year: systemDate.year,
            month: systemDate.month,
            day: systemDate.day,
            hour: systemDate.hour,
            minute: systemDate.minute,
            second: systemDate.second
            );
}

// ~~

Date_ getUniversalDate(
    [
        DateTime? systemDate
    ]
    )
{
    systemDate ??= DateTime.now().toUtc();

    return Date_( year: systemDate.year, month: systemDate.month, day: systemDate.day );
}

// ~~

Time_ getUniversalTime(
    [
        DateTime? systemDate
    ]
    )
{
    systemDate ??= DateTime.now().toUtc();

    return
        Time_(
            hour: systemDate.hour,
            minute: systemDate.minute,
            second: systemDate.second
            );
}

// ~~

Timestamp_ getUniversalDateTime(
    [
        DateTime? systemDate
    ]
    )
{
    systemDate ??= DateTime.now().toUtc();

    return
        Timestamp_(
            year: systemDate.year,
            month: systemDate.month,
            day: systemDate.day,
            hour: systemDate.hour,
            minute: systemDate.minute,
            second: systemDate.second,
            millisecond: systemDate.millisecond
            );
}

// ~~

String getDateText(
    Date_ date,
    [
        String suffix = ''
    ]
    )
{
    return
        '${ getLeftPaddedText( date.year.toString(), 4, '0' ) }:${ getLeftPaddedText( date.month.toString(), 2, '0' ) }:${ getLeftPaddedText( date.day.toString(), 2, '0' ) }'
        '$suffix';
}

// ~~

String getTimeText(
    Time_ time,
    [
        String suffix = ''
    ]
    )
{
    return
        '${ getLeftPaddedText( time.hour.toString(), 2, '0' ) }-${ getLeftPaddedText( time.minute.toString(), 2, '0' ) }-${ getLeftPaddedText( time.second.toString(), 2, '0' ) }'
        '$suffix';
}

// ~~

String getDateTimeText(
    DateTime_ dateTime,
    [
        String infix = ' ',
        String suffix = ''
    ]
    )
{
    return
        '${ getLeftPaddedText( dateTime.year.toString(), 4, '0' ) }:${ getLeftPaddedText( dateTime.month.toString(), 2, '0' ) }:${ getLeftPaddedText( dateTime.day.toString(), 2, '0' ) }'
        '$infix'
        '${ getLeftPaddedText( dateTime.hour.toString(), 2, '0' ) }-${ getLeftPaddedText( dateTime.minute.toString(), 2, '0' ) }-${ getLeftPaddedText( dateTime.second.toString(), 2, '0' ) }'
        '$suffix';
}

// ~~

String getTimestampText(
    Timestamp_ timestamp,
    [
        String infix = ' ',
        String suffix = ''
    ]
    )
{
    return
        '${ getLeftPaddedText( timestamp.year.toString(), 4, '0' ) }:${ getLeftPaddedText( timestamp.month.toString(), 2, '0' ) }:${ getLeftPaddedText( timestamp.day.toString(), 2, '0' ) }'
        '$infix'
        '${ getLeftPaddedText( timestamp.hour.toString(), 2, '0' ) }-${ getLeftPaddedText( timestamp.minute.toString(), 2, '0' ) }-${ getLeftPaddedText( timestamp.second.toString(), 2, '0' ) }'
        '$infix'
        '${ getLeftPaddedText( timestamp.millisecond.toString(), 3, '0' ) }'
        '$suffix';
}

// ~~

String getDateTimeSuffix(
    Timestamp_ dateTime,
    [
        String infix = '',
        String suffix = ''
    ]
    )
{
    return
        '${ getLeftPaddedText( dateTime.year.toString(), 4, '0' ) }'
        '$infix'
        '${ getLeftPaddedText( dateTime.month.toString(), 2, '0' ) }'
        '$infix'
        '${ getLeftPaddedText( dateTime.day.toString(), 2, '0' ) }'
        '$infix'
        '${ getLeftPaddedText( dateTime.hour.toString(), 2, '0' ) }'
        '$infix'
        '${ getLeftPaddedText( dateTime.minute.toString(), 2, '0' ) }'
        '$infix'
        '${ getLeftPaddedText( dateTime.second.toString(), 2, '0' ) }'
        '$infix'
        '${ getLeftPaddedText( dateTime.millisecond.toString(), 3, '0' ) }'
        '$suffix';
}

// ~~

String getTimeZoneFromLocation(
    double latitude,
    double longitude,
    String countryCode
    )
{
    int timeShift = ( longitude / 15.0 ).round().clamp( -12, 12 );

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

String getLogicalFilePath(
    String filePath
    )
{
    return filePath.replaceAll( '\\', '/' );
}

// ~~

String getFolderPath(
    String filePath
    )
{
    int index = filePath.lastIndexOf( '/' );
    return filePath.substring( 0, index + 1 );
}

// ~~

String getFileName(
    String filePath
    )
{
    int index = filePath.lastIndexOf( '/' );
    return filePath.substring( index + 1 );
}

// ~~

String getValidFileName(
    String fileName
    )
{
    fileName = fileName.replaceAll( RegExp( r'[^\p{L}\p{N}\-_.]', unicode: true ), '_' );
    return replaceIteratively( fileName, '__', '_' );
}

// ~~

double getCapitalLatitudeFromCountryCode(
    String countryCode
    )
{
    switch ( countryCode )
    {
        case 'ad' : return 42.5;
        case 'ae' : return 24.46666667;
        case 'af' : return 34.51666667;
        case 'ag' : return 17.11666667;
        case 'ai' : return 18.21666667;
        case 'al' : return 41.31666667;
        case 'am' : return 40.16666667;
        case 'ao' : return -8.833333333;
        case 'aq' : return -80.0;
        case 'ar' : return -34.58333333;
        case 'as' : return -14.26666667;
        case 'at' : return 48.2;
        case 'au' : return -35.26666667;
        case 'aw' : return 12.51666667;
        case 'ax' : return 60.116667;
        case 'az' : return 40.38333333;
        case 'ba' : return 43.86666667;
        case 'bb' : return 13.1;
        case 'bd' : return 23.71666667;
        case 'be' : return 50.83333333;
        case 'bf' : return 12.36666667;
        case 'bg' : return 42.68333333;
        case 'bh' : return 26.23333333;
        case 'bi' : return -3.366666667;
        case 'bj' : return 6.483333333;
        case 'bl' : return 17.88333333;
        case 'bm' : return 32.28333333;
        case 'bn' : return 4.883333333;
        case 'bo' : return -16.5;
        case 'br' : return -15.78333333;
        case 'bs' : return 25.08333333;
        case 'bt' : return 27.46666667;
        case 'bw' : return -24.63333333;
        case 'by' : return 53.9;
        case 'bz' : return 17.25;
        case 'ca' : return 45.41666667;
        case 'cc' : return -12.16666667;
        case 'cd' : return -4.316666667;
        case 'cf' : return 4.366666667;
        case 'cg' : return -4.25;
        case 'ch' : return 46.91666667;
        case 'ci' : return 6.816666667;
        case 'ck' : return -21.2;
        case 'cl' : return -33.45;
        case 'cm' : return 3.866666667;
        case 'cn' : return 39.91666667;
        case 'co' : return 4.6;
        case 'cr' : return 9.933333333;
        case 'cu' : return 23.11666667;
        case 'cv' : return 14.91666667;
        case 'cw' : return 12.1;
        case 'cx' : return -10.41666667;
        case 'cy' : return 35.16666667;
        case 'cz' : return 50.08333333;
        case 'de' : return 52.51666667;
        case 'dj' : return 11.58333333;
        case 'dk' : return 55.66666667;
        case 'dm' : return 15.3;
        case 'do' : return 18.46666667;
        case 'dz' : return 36.75;
        case 'ec' : return -0.216666667;
        case 'ee' : return 59.43333333;
        case 'eg' : return 30.05;
        case 'eh' : return 27.153611;
        case 'er' : return 15.33333333;
        case 'es' : return 40.4;
        case 'et' : return 9.033333333;
        case 'fi' : return 60.16666667;
        case 'fj' : return -18.13333333;
        case 'fk' : return -51.7;
        case 'fm' : return 6.916666667;
        case 'fo' : return 62;
        case 'fr' : return 48.86666667;
        case 'ga' : return 0.383333333;
        case 'gb' : return 51.5;
        case 'gd' : return 12.05;
        case 'ge' : return 41.68333333;
        case 'gg' : return 49.45;
        case 'gh' : return 5.55;
        case 'gi' : return 36.13333333;
        case 'gl' : return 64.18333333;
        case 'gm' : return 13.45;
        case 'gn' : return 9.5;
        case 'gq' : return 3.75;
        case 'gr' : return 37.98333333;
        case 'gs' : return -54.283333;
        case 'gt' : return 14.61666667;
        case 'gu' : return 13.46666667;
        case 'gw' : return 11.85;
        case 'gy' : return 6.8;
        case 'hk' : return 0;
        case 'hm' : return 0;
        case 'hn' : return 14.1;
        case 'hr' : return 45.8;
        case 'ht' : return 18.53333333;
        case 'hu' : return 47.5;
        case 'id' : return -6.166666667;
        case 'ie' : return 53.31666667;
        case 'il' : return 31.76666667;
        case 'im' : return 54.15;
        case 'in' : return 28.6;
        case 'io' : return -7.3;
        case 'iq' : return 33.33333333;
        case 'ir' : return 35.7;
        case 'is' : return 64.15;
        case 'it' : return 41.9;
        case 'je' : return 49.18333333;
        case 'jm' : return 18;
        case 'jo' : return 31.95;
        case 'jp' : return 35.68333333;
        case 'ke' : return -1.283333333;
        case 'kg' : return 42.86666667;
        case 'kh' : return 11.55;
        case 'ki' : return -0.883333333;
        case 'km' : return -11.7;
        case 'kn' : return 17.3;
        case 'ko' : return 42.66666667;
        case 'kp' : return 39.01666667;
        case 'kr' : return 37.55;
        case 'kw' : return 29.36666667;
        case 'ky' : return 19.3;
        case 'kz' : return 51.16666667;
        case 'la' : return 17.96666667;
        case 'lb' : return 33.86666667;
        case 'lc' : return 14;
        case 'li' : return 47.13333333;
        case 'lk' : return 6.916666667;
        case 'lr' : return 6.3;
        case 'ls' : return -29.31666667;
        case 'lt' : return 54.68333333;
        case 'lu' : return 49.6;
        case 'lv' : return 56.95;
        case 'ly' : return 32.88333333;
        case 'ma' : return 34.01666667;
        case 'mc' : return 43.73333333;
        case 'md' : return 47;
        case 'me' : return 42.43333333;
        case 'mf' : return 18.0731;
        case 'mg' : return -18.91666667;
        case 'mh' : return 7.1;
        case 'mk' : return 42;
        case 'ml' : return 12.65;
        case 'mm' : return 16.8;
        case 'mn' : return 47.91666667;
        case 'mo' : return 0;
        case 'mp' : return 15.2;
        case 'mr' : return 18.06666667;
        case 'ms' : return 16.7;
        case 'mt' : return 35.88333333;
        case 'mu' : return -20.15;
        case 'mv' : return 4.166666667;
        case 'mw' : return -13.96666667;
        case 'mx' : return 19.43333333;
        case 'my' : return 3.166666667;
        case 'mz' : return -25.95;
        case 'na' : return -22.56666667;
        case 'nc' : return -22.26666667;
        case 'ne' : return 13.51666667;
        case 'nf' : return -29.05;
        case 'ng' : return 9.083333333;
        case 'ni' : return 12.13333333;
        case 'nl' : return 52.35;
        case 'no' : return 59.91666667;
        case 'np' : return 27.71666667;
        case 'nr' : return -0.5477;
        case 'nu' : return -19.01666667;
        case 'nz' : return -41.3;
        case 'om' : return 23.61666667;
        case 'pa' : return 8.966666667;
        case 'pe' : return -12.05;
        case 'pf' : return -17.53333333;
        case 'pg' : return -9.45;
        case 'ph' : return 14.6;
        case 'pk' : return 33.68333333;
        case 'pl' : return 52.25;
        case 'pm' : return 46.76666667;
        case 'pn' : return -25.06666667;
        case 'pr' : return 18.46666667;
        case 'ps' : return 31.76666667;
        case 'pt' : return 38.71666667;
        case 'pw' : return 7.483333333;
        case 'py' : return -25.26666667;
        case 'qa' : return 25.28333333;
        case 'ro' : return 44.43333333;
        case 'rs' : return 44.83333333;
        case 'ru' : return 55.75;
        case 'rw' : return -1.95;
        case 'sa' : return 24.65;
        case 'sb' : return -9.433333333;
        case 'sc' : return -4.616666667;
        case 'sd' : return 15.6;
        case 'se' : return 59.33333333;
        case 'sg' : return 1.283333333;
        case 'sh' : return -15.93333333;
        case 'si' : return 46.05;
        case 'sj' : return 78.21666667;
        case 'sk' : return 48.15;
        case 'sl' : return 8.483333333;
        case 'sm' : return 43.93333333;
        case 'sn' : return 14.73333333;
        case 'so' : return 2.066666667;
        case 'sr' : return 5.833333333;
        case 'ss' : return 4.85;
        case 'st' : return 0.333333333;
        case 'sv' : return 13.7;
        case 'sx' : return 18.01666667;
        case 'sy' : return 33.5;
        case 'sz' : return -26.31666667;
        case 'tc' : return 21.46666667;
        case 'td' : return 12.1;
        case 'tf' : return -49.35;
        case 'tg' : return 6.116666667;
        case 'th' : return 13.75;
        case 'tj' : return 38.55;
        case 'tk' : return -9.166667;
        case 'tl' : return -8.583333333;
        case 'tm' : return 37.95;
        case 'tn' : return 36.8;
        case 'to' : return -21.13333333;
        case 'tr' : return 39.93333333;
        case 'tt' : return 10.65;
        case 'tv' : return -8.516666667;
        case 'tw' : return 25.03333333;
        case 'tz' : return -6.8;
        case 'ua' : return 50.43333333;
        case 'ug' : return 0.316666667;
        case 'um' : return 38.883333;
        case 'us' : return 38.883333;
        case 'uy' : return -34.85;
        case 'uz' : return 41.31666667;
        case 'va' : return 41.9;
        case 'vc' : return 13.13333333;
        case 've' : return 10.48333333;
        case 'vg' : return 18.41666667;
        case 'vi' : return 18.35;
        case 'vn' : return 21.03333333;
        case 'vu' : return -17.73333333;
        case 'wf' : return -13.95;
        case 'ws' : return -13.81666667;
        case 'ye' : return 15.35;
        case 'za' : return -25.7;
        case 'zm' : return -15.41666667;
        case 'zw' : return -17.81666667;
    }

    return 0.0;
}

// ~~

double getCapitalLongitudeFromCountryCode(
    String countryCode
    )
{
    switch ( countryCode )
    {
        case 'ad' : return 1.516667;
        case 'ae' : return 54.366667;
        case 'af' : return 69.183333;
        case 'ag' : return -61.85;
        case 'ai' : return -63.05;
        case 'al' : return 19.816667;
        case 'am' : return 44.5;
        case 'ao' : return 13.216667;
        case 'aq' : return 0.0;
        case 'ar' : return -58.666667;
        case 'as' : return -170.7;
        case 'at' : return 16.366667;
        case 'au' : return 149.133333;
        case 'aw' : return -70.033333;
        case 'ax' : return 19.9;
        case 'az' : return 49.866667;
        case 'ba' : return 18.416667;
        case 'bb' : return -59.616667;
        case 'bd' : return 90.4;
        case 'be' : return 4.333333;
        case 'bf' : return -1.516667;
        case 'bg' : return 23.316667;
        case 'bh' : return 50.566667;
        case 'bi' : return 29.35;
        case 'bj' : return 2.616667;
        case 'bl' : return -62.85;
        case 'bm' : return -64.783333;
        case 'bn' : return 114.933333;
        case 'bo' : return -68.15;
        case 'br' : return -47.916667;
        case 'bs' : return -77.35;
        case 'bt' : return 89.633333;
        case 'bw' : return 25.9;
        case 'by' : return 27.566667;
        case 'bz' : return -88.766667;
        case 'ca' : return -75.7;
        case 'cc' : return 96.833333;
        case 'cd' : return 15.3;
        case 'cf' : return 18.583333;
        case 'cg' : return 15.283333;
        case 'ch' : return 7.466667;
        case 'ci' : return -5.266667;
        case 'ck' : return -159.766667;
        case 'cl' : return -70.666667;
        case 'cm' : return 11.516667;
        case 'cn' : return 116.383333;
        case 'co' : return -74.083333;
        case 'cr' : return -84.083333;
        case 'cu' : return -82.35;
        case 'cv' : return -23.516667;
        case 'cw' : return -68.916667;
        case 'cx' : return 105.716667;
        case 'cy' : return 33.366667;
        case 'cz' : return 14.466667;
        case 'de' : return 13.4;
        case 'dj' : return 43.15;
        case 'dk' : return 12.583333;
        case 'dm' : return -61.4;
        case 'do' : return -69.9;
        case 'dz' : return 3.05;
        case 'ec' : return -78.5;
        case 'ee' : return 24.716667;
        case 'eg' : return 31.25;
        case 'eh' : return -13.203333;
        case 'er' : return 38.933333;
        case 'es' : return -3.683333;
        case 'et' : return 38.7;
        case 'fi' : return 24.933333;
        case 'fj' : return 178.416667;
        case 'fk' : return -57.85;
        case 'fm' : return 158.15;
        case 'fo' : return -6.766667;
        case 'fr' : return 2.333333;
        case 'ga' : return 9.45;
        case 'gb' : return -0.083333;
        case 'gd' : return -61.75;
        case 'ge' : return 44.833333;
        case 'gg' : return -2.533333;
        case 'gh' : return -0.216667;
        case 'gi' : return -5.35;
        case 'gl' : return -51.75;
        case 'gm' : return -16.566667;
        case 'gn' : return -13.7;
        case 'gq' : return 8.783333;
        case 'gr' : return 23.733333;
        case 'gs' : return -36.5;
        case 'gt' : return -90.516667;
        case 'gu' : return 144.733333;
        case 'gw' : return -15.583333;
        case 'gy' : return -58.15;
        case 'hk' : return 0;
        case 'hm' : return 0;
        case 'hn' : return -87.216667;
        case 'hr' : return 16;
        case 'ht' : return -72.333333;
        case 'hu' : return 19.083333;
        case 'id' : return 106.816667;
        case 'ie' : return -6.233333;
        case 'il' : return 35.233333;
        case 'im' : return -4.483333;
        case 'in' : return 77.2;
        case 'io' : return 72.4;
        case 'iq' : return 44.4;
        case 'ir' : return 51.416667;
        case 'is' : return -21.95;
        case 'it' : return 12.483333;
        case 'je' : return -2.1;
        case 'jm' : return -76.8;
        case 'jo' : return 35.933333;
        case 'jp' : return 139.75;
        case 'ke' : return 36.816667;
        case 'kg' : return 74.6;
        case 'kh' : return 104.916667;
        case 'ki' : return 169.533333;
        case 'km' : return 43.233333;
        case 'kn' : return -62.716667;
        case 'ko' : return 21.166667;
        case 'kp' : return 125.75;
        case 'kr' : return 126.983333;
        case 'kw' : return 47.966667;
        case 'ky' : return -81.383333;
        case 'kz' : return 71.416667;
        case 'la' : return 102.6;
        case 'lb' : return 35.5;
        case 'lc' : return -61;
        case 'li' : return 9.516667;
        case 'lk' : return 79.833333;
        case 'lr' : return -10.8;
        case 'ls' : return 27.483333;
        case 'lt' : return 25.316667;
        case 'lu' : return 6.116667;
        case 'lv' : return 24.1;
        case 'ly' : return 13.166667;
        case 'ma' : return -6.816667;
        case 'mc' : return 7.416667;
        case 'md' : return 28.85;
        case 'me' : return 19.266667;
        case 'mf' : return -63.0822;
        case 'mg' : return 47.516667;
        case 'mh' : return 171.383333;
        case 'mk' : return 21.433333;
        case 'ml' : return -8;
        case 'mm' : return 96.15;
        case 'mn' : return 106.916667;
        case 'mo' : return 0;
        case 'mp' : return 145.75;
        case 'mr' : return -15.966667;
        case 'ms' : return -62.216667;
        case 'mt' : return 14.5;
        case 'mu' : return 57.483333;
        case 'mv' : return 73.5;
        case 'mw' : return 33.783333;
        case 'mx' : return -99.133333;
        case 'my' : return 101.7;
        case 'mz' : return 32.583333;
        case 'na' : return 17.083333;
        case 'nc' : return 166.45;
        case 'ne' : return 2.116667;
        case 'nf' : return 167.966667;
        case 'ng' : return 7.533333;
        case 'ni' : return -86.25;
        case 'nl' : return 4.916667;
        case 'no' : return 10.75;
        case 'np' : return 85.316667;
        case 'nr' : return 166.920867;
        case 'nu' : return -169.916667;
        case 'nz' : return 174.783333;
        case 'om' : return 58.583333;
        case 'pa' : return -79.533333;
        case 'pe' : return -77.05;
        case 'pf' : return -149.566667;
        case 'pg' : return 147.183333;
        case 'ph' : return 120.966667;
        case 'pk' : return 73.05;
        case 'pl' : return 21;
        case 'pm' : return -56.183333;
        case 'pn' : return -130.083333;
        case 'pr' : return -66.116667;
        case 'ps' : return 35.233333;
        case 'pt' : return -9.133333;
        case 'pw' : return 134.633333;
        case 'py' : return -57.666667;
        case 'qa' : return 51.533333;
        case 'ro' : return 26.1;
        case 'rs' : return 20.5;
        case 'ru' : return 37.6;
        case 'rw' : return 30.05;
        case 'sa' : return 46.7;
        case 'sb' : return 159.95;
        case 'sc' : return 55.45;
        case 'sd' : return 32.533333;
        case 'se' : return 18.05;
        case 'sg' : return 103.85;
        case 'sh' : return -5.716667;
        case 'si' : return 14.516667;
        case 'sj' : return 15.633333;
        case 'sk' : return 17.116667;
        case 'sl' : return -13.233333;
        case 'sm' : return 12.416667;
        case 'sn' : return -17.633333;
        case 'so' : return 45.333333;
        case 'sr' : return -55.166667;
        case 'ss' : return 31.616667;
        case 'st' : return 6.733333;
        case 'sv' : return -89.2;
        case 'sx' : return -63.033333;
        case 'sy' : return 36.3;
        case 'sz' : return 31.133333;
        case 'tc' : return -71.133333;
        case 'td' : return 15.033333;
        case 'tf' : return 70.216667;
        case 'tg' : return 1.216667;
        case 'th' : return 100.516667;
        case 'tj' : return 68.766667;
        case 'tk' : return -171.833333;
        case 'tl' : return 125.6;
        case 'tm' : return 58.383333;
        case 'tn' : return 10.183333;
        case 'to' : return -175.2;
        case 'tr' : return 32.866667;
        case 'tt' : return -61.516667;
        case 'tv' : return 179.216667;
        case 'tw' : return 121.516667;
        case 'tz' : return 39.283333;
        case 'ua' : return 30.516667;
        case 'ug' : return 32.55;
        case 'um' : return -77;
        case 'us' : return -77;
        case 'uy' : return -56.166667;
        case 'uz' : return 69.25;
        case 'va' : return 12.45;
        case 'vc' : return -61.216667;
        case 've' : return -66.866667;
        case 'vg' : return -64.616667;
        case 'vi' : return -64.933333;
        case 'vn' : return 105.85;
        case 'vu' : return 168.316667;
        case 'wf' : return -171.933333;
        case 'ws' : return -171.766667;
        case 'ye' : return 44.2;
        case 'za' : return 28.216667;
        case 'zm' : return 28.283333;
        case 'zw' : return 31.033333;
    }

    return 0.0;
}

// ~~

String getContinentCodeFromCountryCode(
    String countryCode
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

String getContinentSlugFromContinentCode(
    String continentCode
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

void setContinentCode(
    String continentCode_
    )
{
    continentCode = continentCode_;
}

// ~~

String getContinentCode()
{
    return continentCode;
}

// ~~

void setCountryCode(
    String countryCode_
    )
{
    countryCode = countryCode_;
    setContinentCode( getContinentCodeFromCountryCode( countryCode_ ) );
}

// ~~

String getCountryCode()
{
    return countryCode;
}

// ~~

void setLanguageCode(
    String languageCode_
    )
{
    languageCode = languageCode_;
}

// ~~

String getLanguageCode()
{
    return languageCode;
}

// ~~

void setDefaultLanguageCode(
    String defaultLanguageCode_
    )
{
    defaultLanguageCode = defaultLanguageCode_;
}

// ~~

String getDefaultLanguageCode()
{
    return defaultLanguageCode;
}

// ~~

void setTextBySlug(
    String text,
    String textSlug
    )
{
    textBySlugMap[ textSlug ] = text;
}

// ~~

String getTextBySlug(
    String textSlug
    )
{
    if ( textBySlugMap.containsKey( textSlug ) )
    {
        return textBySlugMap[ textSlug ]!;
    }
    else
    {
        printWarning( 'Missing text slug: $textSlug' );
        return '';
    }
}

// ~~

String getUntranslatedText(
    String multilingualText
    )
{
    return multilingualText.split( '¨' ).first;
}

// ~~

bool matchesLanguages(
    String multilingualText,
    String languageSpecifier
    )
{
    List<String> languageTagPartArray = ( '$multilingualText--' ).split( '-' );

    for ( var languageSpecifierTag in languageSpecifier.split( ',' ) )
    {
        List<String> languageSpecifierTagPartArray = ( '$languageSpecifierTag--' ).split( '-' );

        if ( ( languageTagPartArray[ 0 ] == ''
               || languageSpecifierTagPartArray[ 0 ] == ''
               || languageTagPartArray[ 0 ] == languageSpecifierTagPartArray[ 0 ] )
             && ( languageTagPartArray[ 1 ] == ''
                  || languageSpecifierTagPartArray[ 1 ] == ''
                  || languageTagPartArray[ 1 ] == languageSpecifierTagPartArray[ 1 ] )
             && ( languageTagPartArray[ 2 ] == ''
                  || languageSpecifierTagPartArray[ 2 ] == ''
                  || languageTagPartArray[ 2 ] == languageSpecifierTagPartArray[ 2 ] ) )
        {
            return true;
        }
    }

    return false;
}

// ~~

String getTranslatedText(
    String multilingualText,
    String languageTag, [
    String defaultLanguageTag = 'en' ]
    )
{
    List<String> translatedTextArray = multilingualText.split( '¨' );

    if ( languageTag != defaultLanguageTag )
    {
        for ( int translatedTextIndex = translatedTextArray.length - 1; translatedTextIndex >= 1; --translatedTextIndex )
        {
            String translatedText = translatedTextArray[ translatedTextIndex ];
            int colonCharacterIndex = translatedText.indexOf( ':' );

            if ( colonCharacterIndex >= 0 )
            {
                if ( matchesLanguages( languageTag, translatedText.substring( 0, colonCharacterIndex ) ) )
                {
                    return translatedText.substring( colonCharacterIndex + 1 );
                }
            }
        }
    }

    return translatedTextArray.first;
}

// ~~

String getTranslatedNumber(
    double number,
    String decimalSeparator
    )
{
    if ( decimalSeparator == ',' )
    {
        return number.toString().replaceAll( '.', ',' );
    }
    else
    {
        return number.toString();
    }
}

// ~~

String getLanguageDecimalSeparator(
    String languageCode
    )
{
    if ( languageCode == 'en'
         || languageCode == 'ja'
         || languageCode == 'ko'
         || languageCode == 'zh' )
    {
        return '.';
    }
    else
    {
        return ',';
    }
}

// ~~

bool isMultilingualText(
    String multilingualText
    )
{
    return multilingualText.contains( '¨' );
}

// ~~

List<Map<String, String>> getTranslationArray(
    String multilingualText
    )
{
    List<String> translatedTextArray = multilingualText.split( '¨' );
    List<Map<String, String>> translationArray = [];

    translationArray.add(
    {
        'specifier': '',
        'data': translatedTextArray[ 0 ],
    }
    );

    for ( int translatedTextIndex = 1; translatedTextIndex < translatedTextArray.length; ++translatedTextIndex )
    {
        String translatedText = translatedTextArray[ translatedTextIndex ];
        int colonCharacterIndex = translatedText.indexOf( ':' );

        if ( colonCharacterIndex >= 0 )
        {
            translationArray.add(
            {
                'specifier': translatedText.substring( 0, colonCharacterIndex ),
                'data': translatedText.substring( colonCharacterIndex + 1 ),
            }
            );
        }
    }

    return translationArray;
}

// ~~

String getMultilingualText(
    List<Map<String, String>> translationArray
    )
{
    String multilingualText = '';

    if ( translationArray.isNotEmpty )
    {
        multilingualText = translationArray[ 0 ][ 'data' ]!;

        for ( int translationIndex = 1; translationIndex < translationArray.length; ++translationIndex )
        {
            var translation = translationArray[ translationIndex ];
            multilingualText += '¨${ translation[ 'specifier' ]! }:${ translation[ 'data' ]! }';
        }
    }

    return multilingualText;
}

// ~~

String getLocalizedText(
    String text
    )
{
    if ( isMultilingualText( text ) )
    {
        return getTranslatedText( text, '$languageCode-$countryCode-$continentCode' );
    }
    else
    {
        return text;
    }
}

// ~~

String getLocalizedTextBySlug(
    String textSlug
    )
{
    if ( textBySlugMap.containsKey( textSlug ) )
    {
        return getLocalizedText( textBySlugMap[ textSlug ]! );
    }
    else
    {
        printWarning( 'Missing text slug: $textSlug' );
        return textSlug;
    }
}

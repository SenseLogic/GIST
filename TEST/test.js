// -- IMPORTS

import {
    getBrowserLanguageCode,
    getDateTimeSuffix,
    getUniversalDateTime,
    getRandomHexadecimalText,
    getBase64TextFromHexadecimalText,
    getHexadecimalTextFromBase64Text,
    getRandomUuid,
    getTuidFromUuid,
    getUuidFromTuid,
    getTimeUuid,
    getRandomTuid
    } from '../src/index.js';

// -- FUNCTIONS

function print(
    ...argumentArray
    )
{
    console.log( ...argumentArray );
}

// ~~

function check(
    value,
    wishedValue
    )
{
    if ( JSON.stringify( value ) !== JSON.stringify( wishedValue ) )
    {
        console.error( 'Invalid value :', value, "<>", wishedValue );
    }
    else
    {
        print( value );
    }
}

// -- STATEMENTS

print( "-- UniversalDateTime --" );

let universalDateTime = getUniversalDateTime();
print( universalDateTime );

print( "-- DateTimeSuffix --" );

print( getDateTimeSuffix( universalDateTime ) );

print( "-- BrowserLanguageCode --" );

let browserLanguageText = 'fr-FR,de;q=0.8,en-US;q=0.5,en-GB;q=0.3,es;q=0.2,pt-BR;q=0.1,ru;q=0.1,ja;q=0.1,it;q=0.1,nl-NL;q=0.1';
check( getBrowserLanguageCode( browserLanguageText, [ 'en', 'fr', 'de' ], '-' ), 'fr' );
check( getBrowserLanguageCode( browserLanguageText, [ 'de', 'fr' ], '-' ), 'fr' );
check( getBrowserLanguageCode( browserLanguageText, [ 'da' ] ), '' );

print( "-- HexadecimalText --" );

let hexadecimalText = getRandomHexadecimalText( 16 );
let hexadecimalTextBase64Text = getBase64TextFromHexadecimalText( hexadecimalText );
let hexadecimalTextBase64TextHexadecimalText = getHexadecimalTextFromBase64Text( hexadecimalTextBase64Text );
print( hexadecimalText, hexadecimalTextBase64Text, hexadecimalTextBase64TextHexadecimalText );
check( hexadecimalTextBase64TextHexadecimalText, hexadecimalText );

print( "-- RandomUuid --" );

let randomUuid = getRandomUuid();
let randomUuidTuid = getTuidFromUuid( randomUuid );
let randomUuidTuidUuid = getUuidFromTuid( randomUuidTuid );
print( randomUuid, randomUuidTuid, randomUuidTuidUuid );
check( randomUuidTuidUuid, randomUuid );

print( "-- TimeUuid --" );

let timeUuid = getTimeUuid();
let timeUuidTuid = getTuidFromUuid( timeUuid );
let timeUuidTuidUuid = getUuidFromTuid( timeUuidTuid );
print( timeUuid, timeUuidTuid, timeUuidTuidUuid );
check( timeUuidTuidUuid, timeUuid );

print( "-- RandomTuid --" );

let randomTuid = getRandomTuid();
let randomTuidUuid = getUuidFromTuid( randomTuid );
let randomTuidUuidTuid = getTuidFromUuid( randomTuidUuid );
print( randomTuid, randomTuidUuid, randomTuidUuidTuid );
check( randomTuidUuidTuid, randomTuid );

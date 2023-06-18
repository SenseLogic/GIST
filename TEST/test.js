// -- IMPORTS

import {
    defineColorTag,
    defineDualTag,
    defineLineTag,
    defineTag,
    getBase64TextFromHexadecimalText,
    getBrowserLanguageCode,
    getDateTimeSuffix,
    getHexadecimalTextFromBase64Text,
    getLocationFromIpAddress,
    getProcessedMultilineText,
    getProcessedText,
    getQuotedText,
    getRandomUuid,
    getTimeUuid,
    getTuidFromUuid,
    getRandomHexadecimalText,
    getRandomTuid,
    getUniversalDateTime,
    getUuidFromTuid
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
        console.error( 'Invalid value :', value, '<>', wishedValue );
        process.exit();
    }
    else
    {
        print( value );
    }
}

// -- STATEMENTS

print( "-- GetQuotedText --" );

check( getQuotedText( JSON.stringify( { text : '\n\r\t' } ) ), '"{\\"text\\":\\"\\\\n\\\\r\\\\t\\"}"' );

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

print( "-- ProcessedText --" );

defineLineTag( '! ', '<div class="paragraph title-1">', '</div>' );
defineLineTag( '!! ', '<div class="paragraph title-2">', '</div>' );
defineLineTag( '!!! ', '<div class="paragraph title-3">', '</div>' );
defineLineTag( '!!!! ', '<div class="paragraph title-4">', '</div>' );
defineLineTag( '- ', '<div class="paragraph dash-1">', '</div>' );
defineLineTag( '  - ', '<div class="paragraph dash-2">', '</div>' );
defineLineTag( '    - ', '<div class="paragraph dash-3">', '</div>' );
defineLineTag( '      - ', '<div class="paragraph dash-4">', '</div>' );
defineLineTag( '* ', '<div class="paragraph bullet-1">', '</div>' );
defineLineTag( '  * ', '<div class="paragraph bullet-2">', '</div>' );
defineLineTag( '    * ', '<div class="paragraph bullet-3">', '</div>' );
defineLineTag( '      * ', '<div class="paragraph bullet-4">', '</div>' );
defineLineTag( '', '<div class="paragraph">', '</div>' );

defineDualTag( '**', '<b>', '</b>' );
defineDualTag( '%%', '<i>', '</i>' );
defineDualTag( '__', '<u>', '</u>' );
defineDualTag( ',,', '<sub>', '</sub>' );
defineDualTag( '^^', '<sup>', '</sup>' );

defineTag( '~', '&nbsp;' );
defineTag( '¦', '<wbr/>' );
defineTag( '§', '<br/>' );
defineTag( '¶', '<br class="linebreak"/>' );
defineTag( '((', '<a class="link" href="' );
defineTag( ')(', '" target="_blank">' );
defineTag( '))', '</a>' );

defineColorTag( 'red' );
defineColorTag( 'green', '#0F0' );

check(
    getProcessedText( '**bold** %%italics%% __underlined__ ~¦§¶ ((https://dailykitten.com)(Daily Kitten))' ),
    '<b>bold</b> <i>italics</i> <u>underlined</u> &nbsp;<wbr/><br/><br class="linebreak"/> <a class="link" href="https://dailykitten.com" target="_blank">Daily Kitten</a>'
    );

check(
    getProcessedMultilineText( '! **bold**\n!! %%italics%%\n__underlined__' ),
    '<div class="paragraph title-1"><b>bold</b></div>\n<div class="paragraph title-2"><i>italics</i></div>\n<div class="paragraph"><u>underlined</u></div>'
    );

print( "-- Location --" );

//print( await getLocationFromIpAddress( '157.164.136.250' ) );
//print( await getLocationFromIpAddress( '2a01:690:35:100::f5:79' ) );

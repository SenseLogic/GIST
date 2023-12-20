<script>
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
        getLocalizedText,
        getProcessedMultilineText,
        getProcessedText,
        getQuotedText,
        getRandomUuid,
        getTimeUuid,
        getTuidFromUuid,
        getRandomHexadecimalText,
        getRandomTuid,
        getUniversalDateTime,
        getUuidFromTuid,
        setDefaultLanguageCode,
        setCountryCode,
        setLanguageCode
        } from '../CODE/JAVASCRIPT/index.js';

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

    // ~~

    async function test(
        )
    {
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

        print( "-- GetLocalizedText --" );

        let multilingualText = 'US¨en-UK,en-AU:UKAU¨fr:FR¨fr-BE,fr-CA:BECA¨pt:PT¨pt-BR:BR';

        setDefaultLanguageCode( 'en' );

        setLanguageCode( 'en' );
        setCountryCode( 'US' );
        check( getLocalizedText( multilingualText ), 'US' );

        setLanguageCode( 'en' );
        setCountryCode( 'UK' );
        check( getLocalizedText( multilingualText ), 'UKAU' );

        setLanguageCode( 'en' );
        setCountryCode( 'AU' );
        check( getLocalizedText( multilingualText ), 'UKAU' );

        setLanguageCode( 'en' );
        setCountryCode( 'CA' );
        check( getLocalizedText( multilingualText ), 'US' );

        setLanguageCode( 'fr' );
        setCountryCode( 'FR' );
        check( getLocalizedText( multilingualText ), 'FR' );

        setLanguageCode( 'fr' );
        setCountryCode( 'BE' );
        check( getLocalizedText( multilingualText ), 'BECA' );

        setLanguageCode( 'fr' );
        setCountryCode( 'CA' );
        check( getLocalizedText( multilingualText ), 'BECA' );

        setLanguageCode( 'fr' );
        setCountryCode( 'CH' );
        check( getLocalizedText( multilingualText ), 'FR' );

        setLanguageCode( 'de' );
        setCountryCode( 'CH' );
        check( getLocalizedText( multilingualText ), 'US' );

        setLanguageCode( 'en' );
        setCountryCode( 'FR' );
        check( getLocalizedText( multilingualText ), 'US' );

        multilingualText = 'Bathrooms¨en&n=1:Bathroom¨fr:Salles de bain¨fr&n<2:Salle de bain';

        setLanguageCode( 'en' );
        setCountryCode( 'US' );
        check( getLocalizedText( multilingualText, { n: 0 } ), 'Bathrooms' );
        check( getLocalizedText( multilingualText, { n: 1 } ), 'Bathroom' );
        check( getLocalizedText( multilingualText, { n: 2 } ), 'Bathrooms' );

        setLanguageCode( 'fr' );
        setCountryCode( 'FR' );
        check( getLocalizedText( multilingualText, { n: 0 } ), 'Salle de bain' );
        check( getLocalizedText( multilingualText, { n: 1 } ), 'Salle de bain' );
        check( getLocalizedText( multilingualText, { n: 2 } ), 'Salles de bain' );

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

        let location = await getLocationFromIpAddress( '157.164.136.250' );
        print( location );
        check( location.countryCode, 'be' );

        location = await getLocationFromIpAddress( '2a01:690:35:100::f5:79' );
        print( location );
        check( location.countryCode, 'be' );

        location = await getLocationFromIpAddress( '195.244.180.40' );
        print( location );
        check( location.countryCode, 'be' );
    }

    // -- STATEMENTS

    test();
</script>

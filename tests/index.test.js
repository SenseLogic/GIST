// -- IMPORTS

import
    {
        defineColorTag,
        defineDualTag,
        defineLineTag,
        defineTag,
        getBase64TextFromHexadecimalText,
        getBrowserLanguageCode,
        getDateTimeSuffix,
        getFileExtension,
        getFileLabel,
        getFileName,
        getFilePath,
        getFolderPath,
        getFormattedArrayText,
        getFormattedCountryName,
        getFormattedCurrencyName,
        getFormattedDateText,
        getFormattedNumberText,
        getFormattedLanguageName,
        getFormattedTimeText,
        getHexadecimalTextFromBase64Text,
        getLocalizedText,
        getProcessedMultilineText,
        getProcessedText,
        getQuotedText,
        getRandomUuid,
        getTimeUuid,
        getTuidFromUuid,
        getRandomHexadecimalText,
        getRandomTuid,
        getUnaccentedText,
        getUniversalDateTime,
        getUuidFromTuid,
        setDefaultLanguageCode,
        setCountryCode,
        setLanguageCode,
        CappedMap
    }
    from '../index';

// -- STATEMENTS

describe(
    'base',
    () =>
    {
        test(
            'CappedMap',
            () =>
            {
                let cappedMap = new CappedMap( 3 );

                cappedMap.set( 'key1', 'Element 1' );
                cappedMap.set( 'key2', 'Element 2' );
                cappedMap.set( 'key3', 'Element 3' );

                expect( cappedMap.has( 'key1' ) ).toBe( true );
                expect( cappedMap.has( 'key4' ) ).toBe( false );

                expect( cappedMap.get( 'key1' ) ).toBe( 'Element 1' );
                expect( cappedMap.get( 'key2' ) ).toBe( 'Element 2' );
                expect( cappedMap.get( 'key3' ) ).toBe( 'Element 3' );

                cappedMap.set( 'key4', 'Element 4' );

                expect( cappedMap.has( 'key1' ) ).toBe( false );
                expect( cappedMap.has( 'key4' ) ).toBe( true );

                expect( cappedMap.get( 'key1', 'not found' ) ).toBe( 'not found' );
                expect( cappedMap.get( 'key2' ) ).toBe( 'Element 2' );
                expect( cappedMap.get( 'key3' ) ).toBe( 'Element 3' );
                expect( cappedMap.get( 'key4' ) ).toBe( 'Element 4' );

                cappedMap.clear();
                expect( cappedMap.has( 'key2' ) ).toBe( false );
                expect( cappedMap.has( 'key3' ) ).toBe( false );
                expect( cappedMap.has( 'key4' ) ).toBe( false );

                cappedMap = new CappedMap( 2 );

                cappedMap.set( 'key1', 'Element 1' );
                cappedMap.set( 'key2', 'Element 2' );

                expect( cappedMap.get( 'key1' ) ).toBe( 'Element 1' );

                cappedMap.set( 'key3', 'Element 3' );

                expect( cappedMap.get( 'key2', 'not found' ) ).toBe( 'not found' );
                expect( cappedMap.get( 'key1' ) ).toBe( 'Element 1' );
                expect( cappedMap.get( 'key3' ) ).toBe( 'Element 3' );

                expect( cappedMap.has( 'key1' ) ).toBe( true );
                expect( cappedMap.has( 'key2' ) ).toBe( false );
                expect( cappedMap.has( 'key3' ) ).toBe( true );
            }
            );

        test(
            'getQuotedText',
            () =>
            {
                let quotedText = getQuotedText( JSON.stringify( { text: '\n\r\t' } ) );
                console.log( quotedText );
                expect( quotedText ).toBe( '"{\\"text\\":\\"\\\\n\\\\r\\\\t\\"}"' );
            }
            );

        test(
            'getUnaccentedText',
            () =>
            {
                let unaccentedText = getUnaccentedText( 'Björk' );
                console.log( unaccentedText );
                expect( unaccentedText ).toBe( 'Bjork' );

                unaccentedText = getUnaccentedText( 'Résumé' );
                console.log( unaccentedText );
                expect( unaccentedText ).toBe( 'Resume' );

                unaccentedText = getUnaccentedText( 'Müller', 'de' );
                console.log( unaccentedText );
                expect( unaccentedText ).toBe( 'Mueller' );
            }
            );

        test(
            'getDateTimeSuffix',
            () =>
            {
                let universalDateTime = getUniversalDateTime();
                console.log( universalDateTime );
                let dateTimeSuffix = getDateTimeSuffix( universalDateTime );
                console.log( dateTimeSuffix );
                expect( dateTimeSuffix ).toMatch( /^\d{20}$/ );
            }
            );

        test(
            'getFormattedNumberText',
            () =>
            {
                setLanguageCode( 'en' );
                expect( getFormattedNumberText( 1234567.89 ) ).toBe( '1,234,567.89' );
                expect( getFormattedNumberText( 1234567.89, 'currency', 'USD' ) ).toBe( '$1,234,567.89' );
                expect( getFormattedNumberText( 1234567.89, 'percent' ) ).toBe( '123,456,789%' );

                setLanguageCode( 'fr' );
                expect( getFormattedNumberText( 1234567.89 ) ).toBe( '1 234 567,89' );
                expect( getFormattedNumberText( 1234567.89, 'currency', 'EUR' ) ).toBe( '1 234 567,89 €' );
                expect( getFormattedNumberText( 0.89, 'percent' ) ).toBe( '89 %' );
            }
            );

        test(
            'getFormattedDateText',
            () =>
            {
                let date = new Date( '2024-08-08' );

                setLanguageCode( 'en' );
                expect( getFormattedDateText( date, undefined, 'GMT' ) ).toBe( '8/8/2024' );
                expect( getFormattedDateText( date, undefined, 'UTC' ) ).toBe( '8/8/2024' );
                expect( getFormattedDateText( date, 'full', 'GMT' ) ).toBe( 'Thursday, August 8, 2024' );
                expect( getFormattedDateText( date, 'full', 'UTC' ) ).toBe( 'Thursday, August 8, 2024' );
                expect( getFormattedDateText( date, undefined, 'GMT', 'numeric', 'long', 'numeric', 'long' ) ).toBe( 'Thursday, August 8, 2024' );
                expect( getFormattedDateText( date, undefined, 'UTC', 'numeric', 'long', 'numeric', 'long' ) ).toBe( 'Thursday, August 8, 2024' );

                setLanguageCode( 'fr' );
                expect( getFormattedDateText( date, undefined, 'GMT' ) ).toBe( '08/08/2024' );
                expect( getFormattedDateText( date, undefined, 'UTC' ) ).toBe( '08/08/2024' );
                expect( getFormattedDateText( date, 'full', 'GMT' ) ).toBe( 'jeudi 8 août 2024' );
                expect( getFormattedDateText( date, 'full', 'UTC' ) ).toBe( 'jeudi 8 août 2024' );
                expect( getFormattedDateText( date, undefined, 'GMT', 'numeric', 'long', 'numeric', 'long' ) ).toBe( 'jeudi 8 août 2024' );
                expect( getFormattedDateText( date, undefined, 'UTC', 'numeric', 'long', 'numeric', 'long' ) ).toBe( 'jeudi 8 août 2024' );
            }
            );

        test(
            'getFormattedTimeText',
            () =>
            {
                let time = new Date( '2024-08-08T14:30:00Z' );

                setLanguageCode( 'en' );
                expect( getFormattedTimeText( time, 'short', 'GMT' ) ).toBe( '2:30 PM' );
                expect( getFormattedTimeText( time, 'short', 'UTC' ) ).toBe( '2:30 PM' );
                expect( getFormattedTimeText( time, 'medium', 'GMT' ) ).toBe( '2:30:00 PM' );
                expect( getFormattedTimeText( time, 'medium', 'UTC' ) ).toBe( '2:30:00 PM' );
                expect( getFormattedTimeText( time, 'long', 'GMT' ) ).toBe( '2:30:00 PM UTC' );
                expect( getFormattedTimeText( time, 'long', 'UTC' ) ).toBe( '2:30:00 PM UTC' );
                expect( getFormattedTimeText( time, 'full', 'GMT' ) ).toBe( '2:30:00 PM Coordinated Universal Time' );
                expect( getFormattedTimeText( time, 'full', 'UTC' ) ).toBe( '2:30:00 PM Coordinated Universal Time' );
                expect( getFormattedTimeText( time, undefined, 'UTC', '2-digit', '2-digit', '2-digit' ) ).toBe( '02:30:00 PM' );

                setLanguageCode( 'fr' );
                expect( getFormattedTimeText( time, 'short', 'GMT' ) ).toBe( '14:30' );
                expect( getFormattedTimeText( time, 'short', 'UTC' ) ).toBe( '14:30' );
                expect( getFormattedTimeText( time, 'medium', 'GMT' ) ).toBe( '14:30:00' );
                expect( getFormattedTimeText( time, 'medium', 'UTC' ) ).toBe( '14:30:00' );
                expect( getFormattedTimeText( time, 'long', 'GMT' ) ).toBe( '14:30:00 UTC' );
                expect( getFormattedTimeText( time, 'long', 'UTC' ) ).toBe( '14:30:00 UTC' );
                expect( getFormattedTimeText( time, 'full', 'GMT' ) ).toBe( '14:30:00 temps universel coordonné' );
                expect( getFormattedTimeText( time, 'full', 'UTC' ) ).toBe( '14:30:00 temps universel coordonné' );
                expect( getFormattedTimeText( time, undefined, 'GMT', '2-digit', '2-digit', '2-digit' ) ).toBe( '14:30:00' );
                expect( getFormattedTimeText( time, undefined, 'UTC', '2-digit', '2-digit', '2-digit' ) ).toBe( '14:30:00' );
            }
            );


        test(
            'getFormattedCountryName',
            () =>
            {
                setLanguageCode( 'en' );
                expect( getFormattedCountryName( 'US' ) ).toBe( 'United States' );
                expect( getFormattedCountryName( 'FR' ) ).toBe( 'France' );

                setLanguageCode( 'fr' );
                expect( getFormattedCountryName( 'US' ) ).toBe( 'États-Unis' );
                expect( getFormattedCountryName( 'FR' ) ).toBe( 'France' );
            }
            );

        test(
            'getFormattedLanguageName',
            () =>
            {
                setLanguageCode( 'en' );
                expect( getFormattedLanguageName( 'en' ) ).toBe( 'English' );
                expect( getFormattedLanguageName( 'fr' ) ).toBe( 'French' );

                setLanguageCode( 'fr' );
                expect( getFormattedLanguageName( 'en' ) ).toBe( 'anglais' );
                expect( getFormattedLanguageName( 'fr' ) ).toBe( 'français' );
            }
            );

        test(
            'getFormattedCurrencyName',
            () =>
            {
                setLanguageCode( 'en' );
                expect( getFormattedCurrencyName( 'USD' ) ).toBe( 'US Dollar' );
                expect( getFormattedCurrencyName( 'EUR' ) ).toBe( 'Euro' );

                setLanguageCode( 'fr' );
                expect( getFormattedCurrencyName( 'USD' ) ).toBe( 'dollar des États-Unis' );
                expect( getFormattedCurrencyName( 'EUR' ) ).toBe( 'euro' );
            }
            );

        test(
            'getFormattedArrayText',
            () =>
            {
                let array = [ 'apple', 'banana', 'cherry' ];

                setLanguageCode( 'en' );
                expect( getFormattedArrayText( array ) ).toBe( 'apple, banana, and cherry' );
                expect( getFormattedArrayText( array, 'narrow' ) ).toBe( 'apple, banana, cherry' );
                expect( getFormattedArrayText( array, 'long', 'disjunction' ) ).toBe( 'apple, banana, or cherry' );

                setLanguageCode( 'fr' );
                expect( getFormattedArrayText( array ) ).toBe( 'apple, banana et cherry' );
                expect( getFormattedArrayText( array, 'narrow' ) ).toBe( 'apple, banana, cherry' );
                expect( getFormattedArrayText( array, 'long', 'disjunction' ) ).toBe( 'apple, banana ou cherry' );
            }
            );

        test(
            'getFilePath',
            () =>
            {
                expect( getFilePath( '/folder/subfolder', 'file.txt' ) ).toBe( '/folder/subfolder/file.txt' );
                expect( getFilePath( '/folder/subfolder/', 'file.txt' ) ).toBe( '/folder/subfolder/file.txt' );
                expect( getFilePath( '/folder/subfolder', '.hiddenfile' ) ).toBe( '/folder/subfolder/.hiddenfile' );
                expect( getFilePath( '/folder/subfolder/', '' ) ).toBe( '/folder/subfolder/' );
                expect( getFilePath( '', 'file.txt' ) ).toBe( 'file.txt' );
                expect( getFilePath( '', '' ) ).toBe( '' );
            }
            );

        test(
            'getFolderPath',
            () =>
            {
                expect( getFolderPath( '/folder/subfolder/file.txt' ) ).toBe( '/folder/subfolder/' );
                expect( getFolderPath( '/folder/subfolder/' ) ).toBe( '/folder/subfolder/' );
                expect( getFolderPath( 'file.txt' ) ).toBe( '' );
                expect( getFolderPath( '' ) ).toBe( '' );
            }
            );

        test(
            'getFileName',
            () =>
            {
                expect( getFileName( '/folder/subfolder/file.txt' ) ).toBe( 'file.txt' );
                expect( getFileName( '/folder/subfolder/.hiddenfile' ) ).toBe( '.hiddenfile' );
                expect( getFileName( 'file.txt' ) ).toBe( 'file.txt' );
                expect( getFileName( '/folder/subfolder/' ) ).toBe( '' );
                expect( getFileName( '.hiddenfile' ) ).toBe( '.hiddenfile' );
                expect( getFileName( '' ) ).toBe( '' );
            }
            );

        test(
            'getFileLabel',
            () =>
            {
                expect( getFileLabel( 'file.txt' ) ).toBe( 'file' );
                expect( getFileLabel( 'archive.tar.gz' ) ).toBe( 'archive.tar' );
                expect( getFileLabel( 'noextensionfile' ) ).toBe( 'noextensionfile' );
                expect( getFileLabel( 'filewithdot.' ) ).toBe( 'filewithdot' );
                expect( getFileLabel( '.hiddenfile' ) ).toBe( '' );
                expect( getFileLabel( '' ) ).toBe( '' );
            }
            );

        test(
            'getFileExtension',
            () =>
            {
                expect( getFileExtension( 'file.txt' ) ).toBe( '.txt' );
                expect( getFileExtension( 'archive.tar.gz' ) ).toBe( '.gz' );
                expect( getFileExtension( 'noextensionfile' ) ).toBe( '' );
                expect( getFileExtension( 'filewithdot.' ) ).toBe( '.' );
                expect( getFileExtension( '.hiddenfile' ) ).toBe( '.hiddenfile' );
                expect( getFileExtension( '' ) ).toBe( '' );
            }
            );

        test(
            'getBrowserLanguageCode',
            () =>
            {
                let browserLanguageText = 'fr-FR,de;q=0.8,en-US;q=0.5,en-GB;q=0.3,es;q=0.2,pt-BR;q=0.1,ru;q=0.1,ja;q=0.1,it;q=0.1,nl-NL;q=0.1';
                console.log( browserLanguageText );
                let browserLanguageCode = getBrowserLanguageCode( browserLanguageText, [ 'en', 'fr', 'de' ], '-' );
                console.log( browserLanguageCode );
                expect( browserLanguageCode ).toBe( 'fr' );

                browserLanguageCode = getBrowserLanguageCode( browserLanguageText, [ 'de', 'fr' ], '-' );
                console.log( browserLanguageCode );
                expect( browserLanguageCode ).toBe( 'fr' );

                browserLanguageCode = getBrowserLanguageCode( browserLanguageText, [ 'da' ] );
                console.log( browserLanguageCode );
                expect( browserLanguageCode ).toBe( '' );
            }
            );

        test(
            'getHexadecimalTextFromBase64Text',
            () =>
            {
                let hexadecimalText = getRandomHexadecimalText( 16 );
                console.log( hexadecimalText );
                expect( hexadecimalText ).toMatch( /^[0-9a-fA-F]{32}$/ );

                let hexadecimalTextBase64Text = getBase64TextFromHexadecimalText( hexadecimalText );
                let hexadecimalTextBase64TextHexadecimalText = getHexadecimalTextFromBase64Text( hexadecimalTextBase64Text );
                console.log( hexadecimalTextBase64TextHexadecimalText );
                expect( hexadecimalTextBase64TextHexadecimalText ).toBe( hexadecimalText );
            }
            );

        test(
            'getUuidFromTuid, getTuidFromUuid',
            () =>
            {
                let randomUuid = getRandomUuid();
                let randomUuidTuid = getTuidFromUuid( randomUuid );
                let randomUuidTuidUuid = getUuidFromTuid( randomUuidTuid );
                console.log( randomUuid );
                console.log( randomUuidTuidUuid );
                expect( randomUuidTuidUuid ).toBe( randomUuid );

                let timeUuid = getTimeUuid();
                let tuid = getTuidFromUuid( timeUuid );
                let uuidFromTuid = getUuidFromTuid( tuid );
                console.log( timeUuid );
                console.log( uuidFromTuid );
                expect( uuidFromTuid ).toBe( timeUuid );

                let randomTuid = getRandomTuid();
                let randomTuidUuid = getUuidFromTuid( randomTuid );
                let randomTuidUuidTuid = getTuidFromUuid( randomTuidUuid );
                console.log( randomTuid );
                console.log( randomTuidUuidTuid );
                expect( randomTuidUuidTuid ).toBe( randomTuid );
            }
            );

        test(
            'getLocalizedText',
            () =>
            {
                setDefaultLanguageCode( 'en' );

                let multilingualText = 'trunk¨en-UK,en--OC:boot¨fr:coffre¨pt:mala¨pt-BR:porta-malas';

                setLanguageCode( 'en' );
                setCountryCode( 'US' );
                let localizedText = getLocalizedText( multilingualText );
                console.log( localizedText );
                expect( localizedText ).toBe( 'trunk' );

                setLanguageCode( 'en' );
                setCountryCode( 'UK' );
                localizedText = getLocalizedText( multilingualText );
                console.log( localizedText );
                expect( localizedText ).toBe( 'boot' );

                setLanguageCode( 'en' );
                setCountryCode( 'AU' );
                localizedText = getLocalizedText( multilingualText );
                console.log( localizedText );
                expect( localizedText ).toBe( 'boot' );

                setLanguageCode( 'fr' );
                setCountryCode( 'FR' );
                localizedText = getLocalizedText( multilingualText );
                console.log( localizedText );
                expect( localizedText ).toBe( 'coffre' );

                setLanguageCode( 'pt' );
                setCountryCode( 'PT' );
                localizedText = getLocalizedText( multilingualText );
                console.log( localizedText );
                expect( localizedText ).toBe( 'mala' );

                setLanguageCode( 'pt' );
                setCountryCode( 'BR' );
                localizedText = getLocalizedText( multilingualText );
                console.log( localizedText );
                expect( localizedText ).toBe( 'porta-malas' );

                multilingualText = 'US¨en-UK,en-AU:UKAU¨fr:FR¨fr-BE,fr-CA:BECA¨pt:PT¨pt-BR:BR';

                setLanguageCode( 'en' );
                setCountryCode( 'US' );
                localizedText = getLocalizedText( multilingualText );
                console.log( localizedText );
                expect( localizedText ).toBe( 'US' );

                setLanguageCode( 'en' );
                setCountryCode( 'UK' );
                localizedText = getLocalizedText( multilingualText );
                console.log( localizedText );
                expect( localizedText ).toBe( 'UKAU' );

                setLanguageCode( 'en' );
                setCountryCode( 'AU' );
                localizedText = getLocalizedText( multilingualText );
                console.log( localizedText );
                expect( localizedText ).toBe( 'UKAU' );

                setLanguageCode( 'en' );
                setCountryCode( 'CA' );
                localizedText = getLocalizedText( multilingualText );
                console.log( localizedText );
                expect( localizedText ).toBe( 'US' );

                setLanguageCode( 'fr' );
                setCountryCode( 'FR' );
                localizedText = getLocalizedText( multilingualText );
                console.log( localizedText );
                expect( localizedText ).toBe( 'FR' );

                setLanguageCode( 'fr' );
                setCountryCode( 'BE' );
                localizedText = getLocalizedText( multilingualText );
                console.log( localizedText );
                expect( localizedText ).toBe( 'BECA' );

                setLanguageCode( 'fr' );
                setCountryCode( 'CA' );
                localizedText = getLocalizedText( multilingualText );
                console.log( localizedText );
                expect( localizedText ).toBe( 'BECA' );

                setLanguageCode( 'fr' );
                setCountryCode( 'CH' );
                localizedText = getLocalizedText( multilingualText );
                console.log( localizedText );
                expect( localizedText ).toBe( 'FR' );

                setLanguageCode( 'de' );
                setCountryCode( 'CH' );
                localizedText = getLocalizedText( multilingualText );
                console.log( localizedText );
                expect( localizedText ).toBe( 'US' );

                setLanguageCode( 'en' );
                setCountryCode( 'FR' );
                localizedText = getLocalizedText( multilingualText );
                console.log( localizedText );
                expect( localizedText ).toBe( 'US' );

                multilingualText = '{count} bathrooms¨en?count=1:{count} bathroom¨fr:{count} salles de bain¨fr?count<2:{count} salle de bain';

                setLanguageCode( 'en' );
                setCountryCode( 'US' );

                localizedText = getLocalizedText( multilingualText, { count: 0 } );
                console.log( localizedText );
                expect( localizedText ).toBe( '0 bathrooms' );

                localizedText = getLocalizedText( multilingualText, { count: 1 } );
                console.log( localizedText );
                expect( localizedText ).toBe( '1 bathroom' );

                localizedText = getLocalizedText( multilingualText, { count: 2 } );
                console.log( localizedText );
                expect( localizedText ).toBe( '2 bathrooms' );

                setLanguageCode( 'fr' );
                setCountryCode( 'FR' );

                localizedText = getLocalizedText( multilingualText, { count: 0 } );
                console.log( localizedText );
                expect( localizedText ).toBe( '0 salle de bain' );

                localizedText = getLocalizedText( multilingualText, { count: 1 } );
                console.log( localizedText );
                expect( localizedText ).toBe( '1 salle de bain' );

                localizedText = getLocalizedText( multilingualText, { count: 2 } );
                console.log( localizedText );
                expect( localizedText ).toBe( '2 salles de bain' );

                multilingualText = '¨en?count=0,count>=2:{count} bathrooms¨en?count=1:{count} bathroom¨fr:{count} salles de bain¨fr?count=0,count=1:{count} salle de bain';

                setLanguageCode( 'en' );
                setCountryCode( 'US' );

                localizedText = getLocalizedText( multilingualText, { count: 0 } );
                console.log( localizedText );
                expect( localizedText ).toBe( '0 bathrooms' );

                localizedText = getLocalizedText( multilingualText, { count: 1 } );
                console.log( localizedText );
                expect( localizedText ).toBe( '1 bathroom' );

                localizedText = getLocalizedText( multilingualText, { count: 2 } );
                console.log( localizedText );
                expect( localizedText ).toBe( '2 bathrooms' );

                setLanguageCode( 'fr' );
                setCountryCode( 'FR' );

                localizedText = getLocalizedText( multilingualText, { count: 0 } );
                console.log( localizedText );
                expect( localizedText ).toBe( '0 salle de bain' );

                localizedText = getLocalizedText( multilingualText, { count: 1 } );
                console.log( localizedText );
                expect( localizedText ).toBe( '1 salle de bain' );

                localizedText = getLocalizedText( multilingualText, { count: 2 } );
                console.log( localizedText );
                expect( localizedText ).toBe( '2 salles de bain' );
            }
            );

        test(
            'getProcessedText',
            () =>
            {
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
                defineLineTag( '# ', '<div class="paragraph numbered-bullet-1"><div>', '</div></div>', '</div><div>' );
                defineLineTag( '  # ', '<div class="paragraph numbered-bullet-2"><div>', '</div></div>', '</div><div>' );
                defineLineTag( '    # ', '<div class="paragraph numbered-bullet-3"><div>', '</div></div>', '</div><div>' );
                defineLineTag( '      # ', '<div class="paragraph numbered-bullet-4"><div>', '</div></div>', '</div><div>' );
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

                let processedText = getProcessedText( '**bold** %%italics%% __underlined__ ~¦§¶ ((https://dailykitten.com)(Daily Kitten))' );
                console.log( processedText );
                expect( processedText ).toBe( '<b>bold</b> <i>italics</i> <u>underlined</u> &nbsp;<wbr/><br/><br class="linebreak"/> <a class="link" href="https://dailykitten.com" target="_blank">Daily Kitten</a>' );

                processedText = getProcessedMultilineText( '! **bold**\n!! %%italics%%\n__underlined__' );
                console.log( processedText );
                expect( processedText ).toBe( '<div class="paragraph title-1"><b>bold</b></div>\n<div class="paragraph title-2"><i>italics</i></div>\n<div class="paragraph"><u>underlined</u></div>' );

                processedText = getProcessedMultilineText( '- dash\n  - dash\n* bullet\n  * bullet\n# 1. numbered bullet\n  # a. numbered bullet' );
                console.log( processedText );
                expect( processedText ).toBe( '<div class="paragraph dash-1">dash</div>\n<div class="paragraph dash-2">dash</div>\n<div class="paragraph bullet-1">bullet</div>\n<div class="paragraph bullet-2">bullet</div>\n<div class="paragraph numbered-bullet-1"><div>1.</div><div>numbered bullet</div></div>\n<div class="paragraph numbered-bullet-2"><div>a.</div><div>numbered bullet</div></div>' );
            }
            );
        }
        );

// -- IMPORTS

import 'package:test/test.dart';
import '../lib/senselogic_gist.dart';

// -- FUNCTIONS

void main(
    )
{

    group(
        'base',
        ()
        {
            test(
                'getUnaccentedText',
                ()
                {
                    var unaccentedText = getUnaccentedText( 'Björk' );
                    print( unaccentedText );
                    expect( unaccentedText, equals( 'Bjork' ) );

                    unaccentedText = getUnaccentedText( 'Résumé' );
                    print( unaccentedText );
                    expect( unaccentedText, equals( 'Resume' ) );

                    unaccentedText = getUnaccentedText( 'Müller', 'de' );
                    print( unaccentedText );
                    expect( unaccentedText, equals( 'Mueller' ) );
                }
                );

            test(
                'getDateTimeSuffix',
                ()
                {
                    var universalDateTime = getCurrentUniversalDateTime();
                    print( universalDateTime );
                    var dateTimeSuffix = getDateTimeSuffix( universalDateTime );
                    print( dateTimeSuffix );
                    expect( dateTimeSuffix, matches( RegExp( r'^\d{20}$' ) ) );
                }
                );

            test(
                'getHexadecimalTextFromBase64Text',
                ()
                {
                    var hexadecimalText = getRandomHexadecimalText( 16 );
                    print( hexadecimalText );
                    expect( hexadecimalText, matches( RegExp( r'^[0-9a-fA-F]{32}$' ) ) );

                    var hexadecimalTextBase64Text = getBase64TextFromHexadecimalText( hexadecimalText );
                    var hexadecimalTextBase64TextHexadecimalText = getHexadecimalTextFromBase64Text( hexadecimalTextBase64Text );
                    print( hexadecimalTextBase64TextHexadecimalText );
                    expect( hexadecimalTextBase64TextHexadecimalText, equals( hexadecimalText ) );
                }
                );

            test(
                'getUuidFromTuid, getTuidFromUuid',
                ()
                {
                    var randomUuid = getRandomUuid();
                    var randomUuidTuid = getTuidFromUuid( randomUuid );
                    var randomUuidTuidUuid = getUuidFromTuid( randomUuidTuid );
                    print( randomUuidTuidUuid );
                    expect( randomUuidTuidUuid, equals( randomUuid ) );

                    var timeUuid = getTimeUuid();
                    var tuid = getTuidFromUuid( timeUuid );
                    var uuidFromTuid = getUuidFromTuid( tuid );
                    print( uuidFromTuid );
                    expect( uuidFromTuid, equals( timeUuid ) );

                    var randomTuid = getRandomTuid();
                    var randomTuidUuid = getUuidFromTuid( randomTuid );
                    var randomTuidUuidTuid = getTuidFromUuid( randomTuidUuid );
                    print( randomTuidUuidTuid );
                    expect( randomTuidUuidTuid, equals( randomTuid ) );
                }
                );

            test(
                'getLocalizedText',
                ()
                {
                    setDefaultLanguageCode( 'en' );

                    var multilingualText = 'trunk¨en-UK,en--OC:boot¨fr:coffre¨pt:mala¨pt-BR:porta-malas';

                    setLanguageCode( 'en' );
                    setCountryCode( 'US' );
                    var localizedText = getLocalizedText( multilingualText );
                    print( localizedText );
                    expect( localizedText, equals( 'trunk' ) );

                    setLanguageCode( 'en' );
                    setCountryCode( 'UK' );
                    localizedText = getLocalizedText( multilingualText );
                    print( localizedText );
                    expect( localizedText, equals( 'boot' ) );

                    setLanguageCode( 'en' );
                    setCountryCode( 'AU' );
                    localizedText = getLocalizedText( multilingualText );
                    print( localizedText );
                    expect( localizedText, equals( 'boot' ) );

                    setLanguageCode( 'fr' );
                    setCountryCode( 'FR' );
                    localizedText = getLocalizedText( multilingualText );
                    print( localizedText );
                    expect( localizedText, equals( 'coffre' ) );

                    setLanguageCode( 'pt' );
                    setCountryCode( 'PT' );
                    localizedText = getLocalizedText( multilingualText );
                    print( localizedText );
                    expect( localizedText, equals( 'mala' ) );

                    setLanguageCode( 'pt' );
                    setCountryCode( 'BR' );
                    localizedText = getLocalizedText( multilingualText );
                    print( localizedText );
                    expect( localizedText, equals( 'porta-malas' ) );

                    multilingualText = 'US¨en-UK,en-AU:UKAU¨fr:FR¨fr-BE,fr-CA:BECA¨pt:PT¨pt-BR:BR';

                    setLanguageCode( 'en' );
                    setCountryCode( 'US' );
                    localizedText = getLocalizedText( multilingualText );
                    print( localizedText );
                    expect( localizedText, equals( 'US' ) );

                    setLanguageCode( 'en' );
                    setCountryCode( 'UK' );
                    localizedText = getLocalizedText( multilingualText );
                    print( localizedText );
                    expect( localizedText, equals( 'UKAU' ) );

                    setLanguageCode( 'en' );
                    setCountryCode( 'AU' );
                    localizedText = getLocalizedText( multilingualText );
                    print( localizedText );
                    expect( localizedText, equals( 'UKAU' ) );

                    setLanguageCode( 'en' );
                    setCountryCode( 'CA' );
                    localizedText = getLocalizedText( multilingualText );
                    print( localizedText );
                    expect( localizedText, equals( 'US' ) );

                    setLanguageCode( 'fr' );
                    setCountryCode( 'FR' );
                    localizedText = getLocalizedText( multilingualText );
                    print( localizedText );
                    expect( localizedText, equals( 'FR' ) );

                    setLanguageCode( 'fr' );
                    setCountryCode( 'BE' );
                    localizedText = getLocalizedText( multilingualText );
                    print( localizedText );
                    expect( localizedText, equals( 'BECA' ) );

                    setLanguageCode( 'fr' );
                    setCountryCode( 'CA' );
                    localizedText = getLocalizedText( multilingualText );
                    print( localizedText );
                    expect( localizedText, equals( 'BECA' ) );

                    setLanguageCode( 'fr' );
                    setCountryCode( 'CH' );
                    localizedText = getLocalizedText( multilingualText );
                    print( localizedText );
                    expect( localizedText, equals( 'FR' ) );

                    setLanguageCode( 'de' );
                    setCountryCode( 'CH' );
                    localizedText = getLocalizedText( multilingualText );
                    print( localizedText );
                    expect( localizedText, equals( 'US' ) );

                    setLanguageCode( 'en' );
                    setCountryCode( 'FR' );
                    localizedText = getLocalizedText( multilingualText );
                    print( localizedText );
                    expect( localizedText, equals( 'US' ) );

                    multilingualText = '{count} bathrooms¨en?count=1:{count} bathroom¨fr:{count} salles de bain¨fr?count<2:{count} salle de bain';

                    setLanguageCode( 'en' );
                    setCountryCode( 'US' );

                    localizedText = getLocalizedText( multilingualText, { 'count': 0 } );
                    print( localizedText );
                    expect( localizedText, equals( '0 bathrooms' ) );

                    localizedText = getLocalizedText( multilingualText, { 'count': 1 } );
                    print( localizedText );
                    expect( localizedText, equals( '1 bathroom' ) );

                    localizedText = getLocalizedText( multilingualText, { 'count': 2 } );
                    print( localizedText );
                    expect( localizedText, equals( '2 bathrooms' ) );

                    setLanguageCode( 'fr' );
                    setCountryCode( 'FR' );

                    localizedText = getLocalizedText( multilingualText, { 'count': 0 } );
                    print( localizedText );
                    expect( localizedText, equals( '0 salle de bain' ) );

                    localizedText = getLocalizedText( multilingualText, { 'count': 1 } );
                    print( localizedText );
                    expect( localizedText, equals( '1 salle de bain' ) );

                    localizedText = getLocalizedText( multilingualText, { 'count': 2 } );
                    print( localizedText );
                    expect( localizedText, equals( '2 salles de bain' ) );

                    multilingualText = '¨en?count=0,count>=2:{count} bathrooms¨en?count=1:{count} bathroom¨fr:{count} salles de bain¨fr?count=0,count=1:{count} salle de bain';

                    setLanguageCode( 'en' );
                    setCountryCode( 'US' );

                    localizedText = getLocalizedText( multilingualText, { 'count': 0 } );
                    print( localizedText );
                    expect( localizedText, equals( '0 bathrooms' ) );

                    localizedText = getLocalizedText( multilingualText, { 'count': 1 } );
                    print( localizedText );
                    expect( localizedText, equals( '1 bathroom' ) );

                    localizedText = getLocalizedText( multilingualText, { 'count': 2 } );
                    print( localizedText );
                    expect( localizedText, equals( '2 bathrooms' ) );

                    setLanguageCode( 'fr' );
                    setCountryCode( 'FR' );

                    localizedText = getLocalizedText( multilingualText, { 'count': 0 } );
                    print( localizedText );
                    expect( localizedText, equals( '0 salle de bain' ) );

                    localizedText = getLocalizedText( multilingualText, { 'count': 1 } );
                    print( localizedText );
                    expect( localizedText, equals( '1 salle de bain' ) );

                    localizedText = getLocalizedText( multilingualText, { 'count': 2 } );
                    print( localizedText );
                    expect( localizedText, equals( '2 salles de bain' ) );
                }
                );
        }
        );
}

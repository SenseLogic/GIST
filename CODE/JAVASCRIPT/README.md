![](https://github.com/senselogic/GIST/blob/master/LOGO/gist.png)

# Gist

Reusable base functions.

## Features

*   logging
*   math
*   string
*   base64
*   UUID
*   random
*   time
*   date
*   path
*   continent
*   country
*   location
*   localization
*   processing
*   tracking

## Internationalization

Any string can be internationalized by providing additional translations after an umlaut character followed by a **language specifier**.

Translations are tested from **right to left**, the first translation being used by **default**.

A language specifier can contain one or several **language tags** separated by commas.

A language tag can define a **language code**, a **country code** and a **continent code**, separated by dashes.

```
multilingualText = 'trunk¨en-UK,en--OC:boot¨fr:coffre¨pt:mala¨pt-BR:porta-malas';

setLanguageCode( 'en' );
setCountryCode( 'US' );
assert( getLocalizedText( multilingualText ) === 'trunk' );

setLanguageCode( 'en' );
setCountryCode( 'UK' );
assert( getLocalizedText( multilingualText ) === 'boot' );

setLanguageCode( 'en' );
setCountryCode( 'AU' );
assert( getLocalizedText( multilingualText ) === 'boot' );

setLanguageCode( 'fr' );
setCountryCode( 'FR' );
assert( getLocalizedText( multilingualText ) === 'coffre' );

setLanguageCode( 'pt' );
setCountryCode( 'PT' );
assert( getLocalizedText( multilingualText ) === 'mala' );

setLanguageCode( 'pt' );
setCountryCode( 'BR' );
assert( getLocalizedText( multilingualText ) === 'porta-malas' );
```

Translations can also contain **variables** provided as arguments.

Language specifiers can use those variables to define more specific **conditions**.

```
multilingualText = '{count} bathrooms¨en?count=1:{count} bathroom¨fr:{count} salles de bain¨fr?count<2:{count} salle de bain';

setLanguageCode( 'en' );
setCountryCode( 'US' );
assert( getLocalizedText( multilingualText, { count: 0 } ) === '0 bathrooms' );
assert( getLocalizedText( multilingualText, { count: 1 } ) === '1 bathroom' );
assert( getLocalizedText( multilingualText, { count: 2 } ) === '2 bathrooms' );

setLanguageCode( 'fr' );
setCountryCode( 'FR' );
assert( getLocalizedText( multilingualText, { count: 0 } ) === '0 salle de bain' );
assert( getLocalizedText( multilingualText, { count: 1 } ) === '1 salle de bain' );
assert( getLocalizedText( multilingualText, { count: 2 } ) === '2 salles de bain' );
```

Translations can contain tags and entities :

```
A text<br>on two lines.¨fr:Un texte<br>sur deux lignes.
```

They can also contain custom tags :

```
A **bold** text§on two lines.¨fr:Un texte en **gras**§sur deux lignes.
```

Custom tags can be freely defined :

```javascript
defineTag( '§', '<br/>' );
defineDualTag( '**', '<b>', '</b>' );
```

## Version

2.0

## Author

Eric Pelzer (ecstatic.coder@gmail.com).

## License

This project is licensed under the GNU Lesser General Public License version 3.

See the [LICENSE.md](LICENSE.md) file for details.

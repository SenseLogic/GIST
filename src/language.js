// -- VARIABLES

export let languageCode = 'en';
export let defaultLanguageCode = 'en';
export let textByLanguageCodeMapByCodeMap = new Map();

// -- FUNCTIONS

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

export function setTextByLanguageCodeMapByCode(
    textByLanguageCodeMap,
    textCode
    )
{
    textByLanguageCodeMapByCodeMap.set( textCode, textByLanguageCodeMap );
}

// ~~

export function getTextByLanguageCodeMapByCode(
    textCode
    )
{
    if ( textByLanguageCodeMapByCodeMap.has( textCode ) )
    {
        return textByLanguageCodeMapByCodeMap.get( textCode );
    }
    else
    {
        console.warn( 'Missing text code ' + textCode );

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

export function getTranslatedTextByCode(
    textCode,
    languageCode
    )
{
    if ( textByLanguageCodeMapByCodeMap.has( textCode ) )
    {
        return getTranslatedText( textByLanguageCodeMapByCodeMap.get( textCode ), languageCode );
    }
    else
    {
        console.warn( 'Missing language code ' + languageCode + ' : ' + textCode );

        return textCode;
    }
}

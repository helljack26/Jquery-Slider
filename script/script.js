// Dom element
$( document ).ready( () => {
    $( "form" ).submit( function ( e ) {
        e.preventDefault()
        let patternString = '';
        let result = '';
        const number = '0123456789'
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const lower = 'abcdefghijklmnopqrstuvwxyz'
        const length = $( '#main-input' ).val();

        if ( $( '#digitCb' ).is( ':checked' ) ) {
            patternString += number;
        }
        if ( $( '#upperCb' ).is( ':checked' ) ) {
            patternString += upper;
        }
        if ( $( '#lowerCb' ).is( ':checked' ) ) {
            patternString += lower;
        }
        const generate = ( set ) => {
            return set.charAt( Math.floor( Math.random() * set.length ) );
        };

        for ( let i = 0; i < length; i++ ) {
            result += generate( patternString );
        }
        $('#result-block_input').removeAttr('disabled');
        $('#result-block_input').val(result)
        return 
    } );

} );
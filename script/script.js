// Image for slider
const imageArray = [ '../img/for slider/DSC_4537.png',
    '../img/for slider/DSC_4549.png',
    '../img/for slider/DSC_4659.png',
    '../img/for slider/DSC_4706.png',
    '../img/for slider/DSC_5373.png'
];

// Find current position when pogination item have class active
const paginationArr = document.getElementById( 'pagination' ).children;
let initial;
// Init slider
class Gallery {
    constructor( imgArr, paginationArr ) {
        this.arr = imgArr;
        this.paginationArr = paginationArr;
        this.currentPosition = 0;
        this.Interval
    }
    // Find current position of pagination 
    findCurrentPosition() {
        for ( let i = 0; i < this.paginationArr.length; i++ ) {
            let str = Array.from( this.paginationArr[ i ].classList );
            if ( str.includes( 'active' ) ) {
                return this.currentPosition = i;
            }
        }
    }
    // Controll button disabler
    disableControllButton() {
        if ( this.currentPosition == 0 ) {
            $( '#toBegin' ).addClass( 'disable' );
            $( '#backward' ).addClass( 'disable' );
            $( '#forward' ).removeClass( 'disable' );
            $( '#toEnd' ).removeClass( 'disable' );
        } else if ( this.currentPosition > 0 && this.currentPosition < this.arr.length - 1 ) {
            $( '#toBegin' ).removeClass( 'disable' );
            $( '#backward' ).removeClass( 'disable' );
            $( '#forward' ).removeClass( 'disable' );
            $( '#toEnd' ).removeClass( 'disable' );
        } else if ( this.currentPosition > 0 && this.currentPosition != this.arr.length - 1 ) {
            $( '#toBegin' ).removeClass( 'disable' );
            $( '#backward' ).removeClass( 'disable' );
        } else if ( this.currentPosition == this.arr.length - 1 ) {
            $( '#toBegin' ).removeClass( 'disable' );
            $( '#backward' ).removeClass( 'disable' );
            $( '#forward' ).addClass( 'disable' );
            $( '#toEnd' ).addClass( 'disable' );
            $( '#play' ).addClass( 'startBtn' ).removeClass( 'pauseBtn' );
            $( '.pause' ).addClass( 'start' ).removeClass( 'pause' );
            $( '#play' ).val( 'true' );
        } else {
            console.log( 'Some erroe in disable control button method' );
        }
    }
    // Show first image and if click on step backward
    init( index, paginationClick = false ) {
        if ( paginationClick == true ) {
            this.currentPosition = index;
            this.disableControllButton()
        }
        $( '.slider-image' ).html( '' )
        // Image src
        let url = this.arr[ index ];
        if ( index == 0 ) {
            // Create img
            const img = document.createElement( 'img' );
            $( '.slider-image' ).append( img )
            $( '.slider-image img' ).attr( 'class', `slider-image_item ${0}` );
            $( '.slider-image_item' ).attr( 'src', `${url}` );
        } else {
            // Create img
            const img = document.createElement( 'img' );
            $( '.slider-image' ).append( img )
            $( '.slider-image img' ).attr( 'class', `slider-image_item ${index}` );
            $( '.slider-image_item' ).attr( 'src', `${url}` );
        }
        // Create pagination item
        for ( let i = 0; i < this.arr.length; i++ ) {
            const item = document.createElement( 'div' );
            item.id = `pagination-item${i}`;
            item.setAttribute( 'value', `${i}` );
            // Ternary operator
            i == this.currentPosition ? (
                $( '#pagination' ).append( item ),
                $( `#pagination-item${i}` ).attr( 'class', 'slider-pagination_item active' )
            ) : (
                $( '#pagination' ).append( item ),
                $( `#pagination-item${i}` ).attr( 'class', 'slider-pagination_item' )
            );
        }
        // Remove old pagination item
        $( '#pagination div' ).not( '.slider-pagination_item' ).remove()
        this.disableControllButton()
    }
    // Change slide
    changeSlide() {
        if ( this.currentPosition == this.arr.length - 1 ) {
            this.disableControllButton()
            this.currentPosition = 0;
            return false;
        }
        // Change currentPosition
        this.currentPosition++;

        // Slide current image
        $( '.slider-image_item' ).animate( {
            right: '100%'
        }, "slow" );
        this.init( this.currentPosition )
    }

    // Button play
    playStop( play, stopInterval, init ) {
        this.disableControllButton()
        if ( stopInterval == true ) {
            clearInterval( this.Interval )
        }
        // Condition for render btn icon
        if ( init == true && this.currentPosition == 0 ) {
            this.init( 0 )
        }
        if ( play == 'true' ) {
            $( '#play' ).addClass( 'pauseBtn' ).removeClass( 'startBtn' );
            $( '.start' ).addClass( 'pause' ).removeClass( 'start' );
            // Start slider 
            this.Interval = setInterval( () => {
                if ( this.changeSlide() == false ) {
                    this.currentPosition = 0;
                    initial = true;
                    clearInterval( this.Interval )
                }
            }, 1000 );
        } else if ( play == 'false' ) {
            $( '#play' ).addClass( 'startBtn' ).removeClass( 'pauseBtn' );
            $( '.pause' ).addClass( 'start' ).removeClass( 'pause' );

            // Stop slider
            clearInterval( this.Interval )
        } else {
            console.log( 'Error' );
        }
    }
}

// Gallery init
const gallery1 = new Gallery( imageArray, paginationArr );
gallery1.findCurrentPosition();
gallery1.init( 0 );

// Click event
// Pagination click 
$( '.slider-pagination_item' ).click( function ( e ) {
    let targetValue = Number.parseInt( e.currentTarget.attributes[ 1 ].value )
    gallery1.init( targetValue, true )

    gallery1.playStop( 'false', false )
    $( '#play' ).val( 'true' )
} );
// To start 
$('#toBegin').click(function(){
    if(gallery1.findCurrentPosition()!= 0){
    gallery1.init( 0, true );
    gallery1.playStop( 'false', false )
    $( '#play' ).val( 'true' )
    }
})
// Backward
$('#backward').click(function(){
if(gallery1.findCurrentPosition()!= 0){
    gallery1.init( gallery1.findCurrentPosition()-1, true );
    gallery1.playStop( 'false', false )
    $( '#play' ).val( 'true' )
}
})

// Start, pause
$( '#play' ).click( function () {
    if ( gallery1.findCurrentPosition() == imageArray.length - 1 ) {
        gallery1.init( 0, true );
    }

    $( '#play' ).val() == 'true' ? (
        $( '#play' ).val( 'false' ),
        gallery1.playStop( 'true', true, initial )

    ) : (
        $( '#play' ).val( 'true' ),
        gallery1.playStop( 'false', '' )
    )
} );
// Forward
$('#forward').click(function(){
    if(gallery1.findCurrentPosition()!= imageArray.length-1){
        gallery1.init( gallery1.findCurrentPosition()+1, true );
        gallery1.playStop( 'false', false )
        $( '#play' ).val( 'true' )
    }
    })
// To End
$('#toEnd').click(function(){
    if(gallery1.findCurrentPosition()!= imageArray.length-1){
    gallery1.init( imageArray.length-1, true );
    gallery1.playStop( 'false', false )
    $( '#play' ).val( 'true' )
    }
})



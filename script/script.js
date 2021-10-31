// Image for slider
const imageArray = [ '../img/for slider/DSC_4537.png',
    '../img/for slider/DSC_4549.png',
    '../img/for slider/DSC_4659.png',
    '../img/for slider/DSC_4706.png',
    '../img/for slider/DSC_5373.png'
];
// Find current position when pogination item have class active
const paginationArr = document.getElementById( 'pagination' ).children;

// Init slider
class Gallery {
    constructor( imgArr, paginationArr ) {
        this.arr = imgArr;
        this.paginationArr = paginationArr;
        this.currentPosition = 0;
        this.Interval
    }
    findCurrentPosition() {
        // Find current position of pagination 
        for ( let i = 0; i < this.paginationArr.length; i++ ) {
            let str = Array.from( this.paginationArr[ i ].classList );
            if ( str.includes( 'active' ) ) {
                this.currentPosition = i;
            }
        }
    }
    // Show first image and if click on step backward
    init( index ) {
        // Image src
        let url = this.arr[ index ];
        if ( index == 0 ) {
            // Create img
            const img = document.createElement( 'img' );
            $( '.slider-image' ).append( img )
            $( '.slider-image img' ).attr( 'class', `slider-image_item ${0}` );
            $( '.slider-image_item' ).attr( 'src', `${url}` );
        } else {

        }
        // Create pagination item
        for ( let i = 0; i < this.arr.length; i++ ) {
            const item = document.createElement( 'div' );
            item.id = `pagination-item${i}`;
            // Ternary operator
            i == this.currentPosition ? (
                $( '#pagination' ).append( item ),
                $( `#pagination-item${i}` ).attr( 'class', 'slider-pagination_item active' )
            ) : (
                $( '#pagination' ).append( item ),
                $( `#pagination-item${i}` ).attr( 'class', 'slider-pagination_item' )
            );
        }
    }
    // Change slide
    changeSlide() {
        if ( this.currentPosition == this.arr.length ) {
            return false
        }
        // Change currentPosition
        this.currentPosition++;

        // Add

        // Slide current image
        $( '.slider-image_item' ).animate( {
            right: '100%'
        }, "slow" );

    }

    // Button play
    playStop( play ) {
        // Condition for render btn icon
        if ( play == 'true' ) {
            $( '#play' ).addClass( 'pauseBtn' ).removeClass( 'startBtn' );
            $( '.start' ).addClass( 'pause' ).removeClass( 'start' );
            // Start slider
            this.Interval = setInterval( () => {
                if ( this.changeSlide() == false ) {
                    clearInterval( this.Interval )
                    this.currentPosition = 0;
                    console.log( this.currentPosition );
                }
                this.changeSlide()
            }, 1000 );

        } else if ( play == 'false' ) {
            $( '#play' ).addClass( 'startBtn' ).removeClass( 'pauseBtn' );
            $( '.pause' ).addClass( 'start' ).removeClass( 'pause' );
            // Stop slider
            clearInterval( this.Interval )
        } else {
            console.log( 'Error' );
        }
        // Condition for disable button
        this.currentPosition > 0 ? $( '#toBegin #backwrd' ).removeClass( 'disable' ) : $( '#toBegin #backwrd' ).addClass( 'disable' );
    }
}

// Gallery init
const gallery1 = new Gallery( imageArray, paginationArr );
gallery1.findCurrentPosition();
gallery1.init( 0 );

// Click event

// Start, pause
$( '#play' ).click( function () {
    $( '#play' ).val() == 'true' ? (
        $( '#play' ).val( 'false' ),
        gallery1.playStop( 'true' )
    ) : (
        $( '#play' ).val( 'true' ),
        gallery1.playStop( 'false' )
    )
} )
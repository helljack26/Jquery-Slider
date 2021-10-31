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
        this.currentPosition
    }
    findCurrentPosition(){
        // Find current position of pagination 
        for ( let i = 0; i < this.paginationArr.length; i++ ) {
            let str = Array.from(this.paginationArr[i].classList);
            if(str.includes('active')){
                this.currentPosition = i;
            }
        }
    }
    firstShowImage() {
        // Image src
        let url = this.arr[0];
        // Create img
        const img = document.createElement('img');
        $('.slider-image').append(img)
        $('.slider-image img').attr('class', 'slider-image_item');
        $('.slider-image_item').attr('src', `${url}`);
        // Create pagination item
        // console.log( this.currentPosition);
        for(let i = 0; i < this.arr.length; i++){
            const item = document.createElement('div');
            item.id = `pagination-item${i}`
            if(i == 0){
                console.log('wo');
                 $('#pagination').append(item)
                $(`#pagination-item${i}`).attr('class', 'slider-pagination_item active');
            }else{
                $('#pagination').append(item)
                $(`#pagination-item${i}`).attr('class', 'slider-pagination_item');
            }
        }

        
    }
}

// Gallery init
const gallery1 = new Gallery( imageArray, paginationArr );
gallery1.findCurrentPosition();
gallery1.firstShowImage();
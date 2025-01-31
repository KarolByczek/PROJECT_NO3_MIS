import React from 'react'

const ProductStrip = () => {
    return (
        <div className='product_strip'>
            <div className='product_substrip product_substrip_left'>
                <a href="">&#x2630;</a>
                <a href="">Hot Deals</a>
                <a href="">New</a>
                <a href="">Top-Seller</a>
                <a href="">Bargains</a>
            </div>
            <div className='product_substrip product_substrip_middle'>
                <input type="text" placeholder='Search' />
            </div>
            <div className='product_substrip product_substrip_right'>
                <a title='ADJUST NATIONALITY/CURRENCY' className='nationality-currency' href="" role='button'>EN - &#163; <img src="/src/assets/country_flags/union-jack.jpg" alt="Flag of UK" /></a>
                <a className='shopper-account' href="https://www.thomann.co.uk/mythomann.html" aria-label="Customer Centre" aria-owns="fx-flyin-customer" aria-expanded="false" role="button">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                        <title>SHOPPER ACCOUNT</title>
                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M1140 5113 c-190 -21 -408 -101 -565 -206 -83 -56 -108 -77 -203 -170 -172 -169 -293 -394 -348 -647 -18 -81 -19 -156 -19 -1530 0 -1374 1 -1449 19 -1530 113 -515 491 -893 1006 -1006 81 -18 156 -19 1530 -19 1374 0 1449 1 1530 19 515 113 893 491 1006 1006 18 81 19 156 19 1530 0 1374 -1 1449 -19 1530 -100 458 -422 823 -851 963 -198 65 -78 61 -1645 62 -784 1 -1441 0 -1460 -2z m2870 -437 c94 -20 215 -69 289 -118 194 -127 339 -342 380 -563 8 -40 11 -490 11 -1439 0 -1137 -3 -1393 -14 -1446 -47 -222 -176 -411 -367 -539 -70 -47 -233 -121 -267 -121 -4 0 -19 51 -34 113 -68 281 -199 511 -409 718 -395 391 -980 525 -1513 347 -495 -165 -872 -587 -982 -1097 -10 -45 -22 -81 -28 -81 -36 1 -196 75 -268 123 -187 124 -317 316 -364 537 -20 97 -20 2803 0 2900 71 333 328 592 661 665 91 20 2811 21 2905 1z m-1188 -3430 c216 -55 419 -182 554 -348 104 -126 196 -308 219 -431 l7 -37 -1042 0 -1042 0 7 37 c24 128 120 313 232 447 148 177 404 317 649 356 103 16 307 4 416 -24z" />
                            <path d="M2389 4041 c-274 -51 -517 -197 -676 -409 -205 -272 -270 -618 -177 -938 105 -363 392 -643 762 -741 86 -23 116 -26 262 -26 146 0 176 3 262 26 370 99 657 378 763 744 146 503 -112 1052 -595 1264 -144 64 -224 81 -400 84 -85 2 -176 0 -201 -4z m339 -437 c31 -8 85 -30 121 -49 208 -109 333 -302 348 -535 18 -299 -195 -586 -487 -654 -83 -20 -217 -20 -298 -1 -177 42 -341 173 -421 335 -134 275 -69 588 164 779 52 43 156 101 215 120 100 32 247 34 358 5z" />
                        </g>
                    </svg>
                </a>
                <a className='wish-list' href="">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="418.000000pt" viewBox="0 0 512.000000 418.000000" preserveAspectRatio="xMidYMid meet">
                        <title>WISH LIST</title>
                        <g transform="translate(0.000000,418.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                            <path d="M1110 4174 c-121 -21 -155 -29 -225 -51 -473 -149 -822 -591 -876 -1111 -64 -623 214 -1273 801 -1876 407 -418 865 -750 1395 -1012 328 -162 377 -163 683 -14 534 259 1012 605 1422 1026 517 532 782 1069 807 1634 10 228 -20 419 -94 604 -238 598 -861 927 -1441 760 -299 -86 -633 -330 -888 -648 -82 -104 -108 -121 -161 -107 -19 5 -54 40 -108 107 -277 346 -615 583 -949 665 -78 19 -307 34 -366 23z m-62 -2673 c209 -252 554 -546 860 -733 160 -98 167 -102 170 -125 2 -14 -4 -26 -18 -33 -23 -12 -55 3 -230 114 -306 193 -668 509 -864 754 -53 66 -58 75 -48 97 20 44 45 30 130 -74z" />
                        </g>
                    </svg>
                </a>
                <a className='shopping-cart' href="">
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M24,3H4.242L4.2,2.649A3,3,0,0,0,1.222,0H0V2H1.222a1,1,0,0,1,.993.883L3.8,16.351A3,3,0,0,0,6.778,19H20V17H6.778a1,1,0,0,1-.993-.884L5.654,15H21.836Z" /><circle cx="7" cy="22" r="2" /><circle cx="17" cy="22" r="2" />
                        <title>SHOPPING CART</title>
                    </svg>
                </a>
            </div >
        </div>
    )
}

export default ProductStrip

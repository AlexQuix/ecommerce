import { Link } from "react-router-dom";

export default function PageNotFound(){
    return (
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center" 
            style={{maxWidth: "1400px", minHeight: "80vh"}}>
            <h1 className="display-1 fw-600">Oops!</h1>
            <h1 className="fs-2 fw-400 mb-5">The page has not been found</h1>
            <div className="container-fluid" style={{maxWidth: "600px"}}>
                <svg width="708" height="442" viewBox="0 0 708 442" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M267.048 435.571C384.697 468.656 441.942 341.693 542.745 351.352C597.925 356.64 707.91 383.44 707.67 188.219C707.05 62.1839 590.883 30.625 471.089 95.259C435.839 109.045 408.008 104.773 377.791 91.076C347.574 77.379 308.712 16.23 235.468 3.64996C15.0521 -34.206 -173.542 311.671 267.048 435.571Z" 
                            fill="#7576FF"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M546.627 118.49C548.835 117.417 552.795 119.498 550.497 122.847C545.411 130.264 565.084 145.078 558.769 132.023C558.094 130.627 554.63 120.974 559.53 125.959C564.43 130.942 571.261 152.964 566.843 160.552C562.965 167.211 552.704 170.379 538.698 170.754L538.067 170.768L537.769 170.786C529.512 171.17 523.251 166.06 519.209 156.108L519.016 155.623C514.925 145.206 516.047 136.856 522.663 131.226C522.783 131.124 522.911 131.032 523.047 130.951L523.254 130.839L546.627 118.49Z" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M547.813 122.023L524.481 133.365C518.889 138.123 517.938 145.201 521.628 154.597C522.923 157.894 526.162 165.747 526.162 162.663C526.162 161.699 547.813 147.547 551.966 148.932C555.807 150.212 548.908 138.671 546.973 133.365L547.813 121.733L548.455 120.574" fill="#E7EAEE"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M516.684 130.534C518.234 130.534 509.448 134.667 509.901 142.288C510.354 149.909 516.309 163.955 514.861 164.509C513.413 165.062 510.667 160.968 510.113 159.519C506.669 150.506 506.016 146.829 506.14 141.572C506.302 134.691 509.92 130.534 516.684 130.534Z" fill="#E7EAEE"/>
                    <path d="M555.785 151.784C559.134 151.784 561.849 145.65 561.849 138.084C561.849 130.517 559.134 124.383 555.785 124.383C552.435 124.383 549.72 130.517 549.72 138.084C549.72 145.65 552.435 151.784 555.785 151.784Z" fill="#E7EAEE"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M132.16 282.538C132.16 258.766 134.801 248.43 163.165 235.456C221.296 211.96 221.296 211.054 332.661 167.998C362.113 156.669 424.203 183.805 451.203 172.433C469.203 164.852 486.035 159.222 500.906 151.703C502.346 161.107 511.655 177.028 514.935 179.765C497.52 183.419 480.675 189.07 464.398 196.72C429.213 213.254 450.063 208.748 394.332 261.304C389.609 265.758 372.253 275.913 347.158 286.492C347.158 286.492 296.619 279.705 276.349 271.274C255.721 262.693 224.464 235.456 224.464 235.456C224.464 235.456 188.007 259.24 167.049 269.93C157.24 274.934 132.16 282.538 132.16 282.538Z" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M132.159 270.185C132.159 264.605 131.569 260.71 132.159 256.403C134.081 242.36 141.613 235.176 163.319 225.247C221.45 201.751 221.295 198.7 332.66 155.644C362.111 144.316 424.202 171.452 451.202 160.08C469.201 152.499 486.034 146.869 500.905 139.35C500.948 139.619 499.4 152.47 499.4 152.47C499.4 152.47 462.688 171.856 438.403 175.967C412.601 180.334 377.161 160.08 341.773 170.041C287.882 185.212 163.695 232.894 149.003 244.843C137.46 254.232 132.159 270.185 132.159 270.185Z" fill="#E7EAEE"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M546.627 118.49C548.835 117.417 552.795 119.498 550.497 122.848C547.02 127.919 550.883 139.693 553.237 146.864V146.866C554.326 150.183 555.092 152.514 554.657 152.742C553.282 153.46 551.586 152.929 550.868 151.554C546.978 144.112 544.745 138.203 544.188 133.71C543.911 131.475 543.85 129.313 544.006 127.227L544.027 126.986L526.046 135.726L525.818 135.935C521.76 139.742 519.974 144.163 522.944 151.993L523.12 152.448C526.344 160.658 531.802 166.546 537.482 166.301L537.925 166.279C550.545 166.025 558.088 162.228 560.78 157.603C564.165 151.789 565.084 145.079 558.769 132.023C558.094 130.629 554.63 120.976 559.53 125.959C564.43 130.942 571.261 152.965 566.843 160.552C563.154 166.886 553.69 170.062 540.719 170.679C540.795 171.009 540.812 171.36 540.76 171.715C539.531 180.052 535.725 185.297 529.362 186.814C524.495 187.975 519.265 186.438 514.474 182.734C497.642 186.348 481.35 191.857 465.594 199.262L463.26 200.367C455.221 204.207 450.612 206.781 447.246 209.283C445.272 210.75 443.641 212.253 441.888 214.187L441.605 214.51C440.754 215.496 438.9 217.759 436.792 220.335L436.788 220.34L436.786 220.343L436.785 220.344L436.783 220.346L436.777 220.354L436.773 220.359C433.967 223.785 430.714 227.759 428.771 230.008L427.832 231.09C419.925 240.15 409.958 250.429 396.26 263.348L395.876 263.7C390.74 268.289 377.092 276.048 360.073 283.873C407.042 282.204 440.911 264.277 462.002 230.061C462.93 228.555 465.002 228.272 466.3 229.474C502.568 263.063 544.591 278.608 592.531 276.181C640.6 273.746 675.87 261.253 698.46 238.823C699.56 237.731 701.34 237.737 702.43 238.838C703.52 239.938 703.52 241.715 702.42 242.808C678.72 266.338 628.412 283.994 579.076 286.492C531.097 288.921 502.468 269.152 465.863 236.659L464.97 235.86L464.649 236.352C441.466 271.485 391.098 297.111 340.835 297.473L339.259 297.479C287.847 297.479 258.197 272.585 223.511 238.56L223.241 238.293L223.117 238.399L222.211 239.161L220.894 240.269L220.087 240.948C187.586 268.299 163.335 288.708 126.855 293.921L125.692 294.084C84.561 302.405 22.18 280.238 12.593 269.373C3.81 259.417 14.055 265.606 16.868 267.305C17.125 267.46 17.32 267.578 17.432 267.642C44.655 283.228 76.043 289.164 113.703 284.028C118.899 283.318 124.064 282.38 129.196 281.212L129.136 280.658C127.492 265.042 127.482 258.216 129.852 250.381C133.074 239.725 140.898 231.628 154.973 225.19L158.849 223.476C176.234 215.815 190.041 210.062 204.363 204.473L205.412 204.064C207.018 203.439 208.645 202.811 210.306 202.174L211.934 201.553C212.521 201.345 220.175 198.31 231.812 193.697L231.817 193.696L231.847 193.683L231.853 193.681L231.855 193.68C258.756 183.015 306.888 163.934 338.288 151.793C345.08 149.181 353.304 148.313 363.392 148.834L364.261 148.882C371.818 149.327 379.251 150.352 391.435 152.46L402.142 154.336C414.096 156.405 419.889 157.221 426.652 157.703C428.778 157.854 430.798 158.042 432.718 158.221C439.829 158.881 445.554 159.413 450.114 157.493C454.171 155.785 458.147 154.135 462.043 152.519C474.787 147.232 486.674 142.302 497.705 136.818C498.462 131.912 500.395 128.29 503.424 125.905C508.096 122.226 514.71 122.164 520.447 124.394C521.892 124.957 522.607 126.584 522.046 128.029C521.864 128.497 520.696 128.281 519.043 127.977C515.586 127.339 510.01 126.31 506.898 130.316C503.436 134.774 502.286 141.601 505.352 155.045C507.574 164.787 521.976 181.353 528.059 181.353C534.841 181.353 536.427 174.768 537.327 171.034L537.383 170.8C529.317 171.009 523.188 165.905 519.21 156.109L519.016 155.624C514.924 145.206 516.046 136.856 522.662 131.226C522.783 131.124 522.912 131.032 523.047 130.952L523.255 130.84L546.627 118.49ZM509.293 177.658C509.009 177.314 508.728 176.962 508.451 176.601C508.344 176.489 508.244 176.375 508.157 176.27C507.901 175.959 507.639 175.643 507.371 175.322C505.195 172.708 502.674 169.679 500.699 165.313L500.413 164.676C497.246 157.582 496.869 149.612 497.063 143.041L497.092 142.278L496.925 142.363C483.84 148.838 469.606 155.335 454.223 161.853L452.294 162.668C445.707 165.442 437.482 167.402 427.059 166.728L426.253 166.673C419.132 166.165 413.142 165.314 400.583 163.134L391.206 161.49C364.772 156.913 351.544 156.199 340.645 160.275C340.645 160.275 178.097 221.421 157.279 230.309C144.618 236.101 140.322 241.551 135.086 250.381C132.377 254.949 132.651 267.549 132.842 276.3V276.302C132.874 277.769 132.903 279.128 132.917 280.323C163.651 272.636 193.195 256.656 221.567 232.349C222.686 231.391 224.355 231.459 225.39 232.506C227.686 234.828 230.02 237.069 232.392 239.232L349.444 190.33C349.766 190.195 350.097 190.125 350.425 190.113C351.306 189.697 352.258 189.354 353.277 189.082C363.484 186.369 371.635 190.783 377.267 201.65L387.47 194.208C388.975 193.11 391.112 193.755 391.758 195.501C401.068 220.664 398.356 237.906 383.025 246.226C367.563 254.615 354.117 247.697 343.635 226.728C343.103 225.664 343.312 224.434 344.048 223.606C341.549 213.454 341.085 205.366 342.786 199.509L240.232 245.984C255.567 258.434 272.405 267.824 290.76 274.157C291.18 273.755 291.635 273.409 292.082 273.165C307.542 264.696 345.633 254.804 355.042 252.36C355.856 252.149 356.455 251.993 356.806 251.898C361.221 250.716 356.698 254.841 355.365 255.456L355.196 255.528L299.601 276.937C316.139 281.648 333.848 284.002 352.736 284.002C353.811 284.002 354.878 283.994 355.939 283.977L357.182 283.169H357.184L357.185 283.167L357.187 283.166C369.076 275.438 388.956 262.517 392.407 259.263L394.017 257.74C405.464 246.632 413.982 235.978 421.42 226.676C429.578 216.471 436.433 207.897 444.422 202.145C450.632 197.672 452.883 196.65 458.174 194.249C459.589 193.607 461.221 192.866 463.205 191.933C477.237 185.339 493.172 181.521 508.131 177.936L509.293 177.658ZM354.721 194.509C362.808 192.359 368.866 196.157 373.483 206.763L361.553 216.22L361.541 216.225L349.215 221.089L348.907 219.735C345.531 204.435 347.73 196.367 354.721 194.509ZM373.483 206.763L361.564 216.217C361.803 216.122 362.049 216.063 362.295 216.036C362.52 216.012 362.746 216.016 362.966 216.046C363.49 216.116 363.987 216.334 364.396 216.675C364.664 216.9 364.893 217.176 365.066 217.498C367.88 222.565 370.055 223.771 372.263 222.532C374.601 221.221 375.336 216.292 373.628 207.486L373.483 206.763ZM218.832 322.049C220.137 321.209 229.137 316.817 221.122 325.072C213.106 333.326 150.68 368.344 116.983 370.283C84.505 372.152 55.668 358.588 30.579 340.836L29.748 340.243L29.582 340.456C28.471 341.864 27.33 343.143 26.157 344.289L25.653 344.773C23.528 346.768 19.85 349.026 14.536 351.651C13.145 352.337 8.23301 352.97 10.775 350.376C13.317 347.784 18.881 344.052 22.121 341.912C24.238 340.513 24.907 338.878 25.571 337.255C25.922 336.395 26.273 335.538 26.837 334.722C27.742 333.412 29.556 333.117 30.83 334.071C55.564 352.609 84.456 362.491 116.983 360.619C149.644 358.739 183.376 344.862 218.832 322.049ZM410.934 339.95C412.073 338.898 412.073 331.396 410.934 332.447C398.319 344.088 371.907 354.327 339.316 356.203C306.684 358.081 281.028 352.95 262.298 340.906C260.994 340.067 254.538 337.849 258.418 341.75C262.298 345.649 305.912 365.996 339.639 364.054L340.648 363.995C373.88 361.967 397.309 352.523 410.934 339.95ZM387.898 201.472L387.729 200.968L379.276 207.136L379.431 208.007C381.131 217.95 379.971 224.448 375.257 227.287L375.01 227.431C370.096 230.186 365.47 228.239 361.602 222.577L361.432 222.325L350.065 226.917L350.328 227.394C359.016 243.072 368.647 247.433 379.98 241.485L380.346 241.29C391.727 235.114 394.532 222.51 388.292 202.694L387.898 201.472Z" fill="#00160A"/>
                </svg>
            </div>
            <Link to="/" className="fs-5 mt-4 text-decoration-none text-prim-500">Back to home</Link>
        </div>
    )
}
document.addEventListener('DOMContentLoaded', () => {    //ensures script doesnt run until all html has been written
    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')
    let doodlerLeftSpace = 50
    let startPoint = 150
    let doodlerBottomSpace = startPoint               // change to >200 to see platforms move
    let isGameOver = false
    let platformCount = 5
    let platforms = []                      //empty array to add new platforms
    let upTimerId                           // made global so can cancel outside of the jump function
    let downTimerId
    let isJumping = true
    let isGoingLeft = false
    let isGoingRight = false
    let leftTimerId
    let rightTimerId

    function createDoodler(){
        grid.appendChild(doodler)       //puts the doodler into the grid
        doodler.classList.add('doodler')                 //styles the doodler
        doodlerLeftSpace = platforms[0].left        //makes the doodler start at the left position of the first platform
        doodler.style.left =  doodlerLeftSpace + 'px'       //allows the doodler to move left
        doodler.style.bottom = doodlerBottomSpace + 'px'
    }

    class Platform {
        constructor(newPlatBottom) {                           //pass into constructor to create platform
            this.bottom = newPlatBottom
            this.left = Math.random() * 315             //left spacing for platform, basd on grid width to make sure left spacing is 400(width of grid) -85
            this.visual = document.createElement('div')         //create a new div for each platform
        
            const visual = this.visual                  // save this.visual to var so can to following styling
            visual.classList.add('platform')                //adds stye platform
            visual.style.left = this.left + 'px'            // adds left spacing
            visual.style.bottom = this.bottom + 'px'        //adds style bottom
            grid.appendChild(visual)                        // put this into grid

        }
        }

    function createPlatforms() {
        for (let i = 0; i < platformCount; i++) {
            let platGap = 600 / platformCount                    // gap between platforms
            let newPlatBottom = 100 + i * platGap               //use for loop to increment the gap space
            let newPlatform = new Platform(newPlatBottom)                       // make new platform (create class)
            platforms.push(newPlatform)                 //push platforms into array
            console.log(platforms)
        }
    }

    function movePlatforms(){
        if (doodlerBottomSpace > 200) {              //we only want platforms to move if doodler is a certain height
            platforms.forEach(platform => {
                platform.bottom -= 4                // -4 from the bottom of each platform
                let visual = platform.visual
                visual.style.bottom = platform.bottom + 'px'
            })
        }
    }

    function jump(){                    // makes doodler jump
        clearInterval(downTimerId)
        isJumping = true                    //stops the double jump
        upTimerId = setInterval(function() {            // stops clearinterval
            doodlerBottomSpace += 5
            doodler.style.bottom = doodlerBottomSpace + 'px'  //makes doodler go upwards
            if (doodlerBottomSpace > startPoint + 200) {                //alllaws it to jumop relative to new startpoint
                fall()                          //call the fall funtion
           }
        },30)
    }

   function fall(){
        clearInterval(upTimerId)            //stops him going up
        isJumping = false                       //cant jump when falling
        downTimerId = setInterval(function(){       
            doodlerBottomSpace -= 5
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if (doodlerBottomSpace <= 0) {          //stops him going down
                gameOver()
            }
            platforms.forEach(platform => {              //stops him falling through a platform
                if (
                    (doodlerBottomSpace >= platform.bottom) &&
                    (doodlerBottomSpace <= (platform.bottom + 15)) &&         //these two check to see if it is within the platforms (platform height is 15px)
                    ((doodlerLeftSpace + 60) >= platform.left) &&           //left space+ width of doodler, if smaller than platform he wont be on it
                    (doodlerLeftSpace <= (platform.left + 85)) &&               // same but plus platform width, makes sure hes not on the right side
                    !isJumping
                ) {
                    console.log('landed')
                    startPoint = doodlerBottomSpace     //overides the initial 150 set on the global variable
                    jump()
                }
            })
        },30)
    }

    function gameOver() {
        console.log('game over :(')
        isGameOver = true
        clearInterval(upTimerId)
        clearInterval(downTimerId)
    }

    function control(e) {
        if (e.key === 'ArrowLeft') {
            moveLeft()
        } else if (e.key === 'ArrowRight') {
            moveRight()
        } else if (e.key === "ArrowUp") {
            moveStraight()
        }
    }

    function moveLeft() {
        if (isGoingRight) {
            clearInterval(rightTimerId)
            isGoingRight = false
        }
        isGoingLeft = true
        leftTimerId = setInterval(function() {
            if (doodlerLeftSpace >=0 ) {            //stops it moving left off the page
            doodlerLeftSpace -= 5
            doodler.style.left = doodlerLeftSpace + 'px'
        } else moveRight()
        },30);
    }

    function moveRight() {
        if (isGoingLeft) {
            clearInterval(leftTimerId)
            isGoingLeft = false
        }
        isGoingRight = true
        rightTimerID = setInterval(function () {
            if (doodlerLeftSpace <= 340) {               // 400 - doodler width
                doodlerLeftSpace += 5
                doodler.style.left = doodlerLeftSpace + 'px'
            } else moveLeft()
        }, 30)
    }

    function start() {              //to make doodler appear if gameover is false
        if(!isGameOver) {
            createPlatforms()       //creats platforms when game starts
            createDoodler()
            setInterval(movePlatforms, 30)   //moves platform every 30 ms
            jump()
            document.addEventListener('keyup',control)          //listen for key presses
        }
    }

    function moveStraight(){
        isGoingRight = false
        isGoingLeft = false
        clearInterval(rightTimerId)
        clearInterval(leftTimerId)
    }
    //attach to button
    start()
})
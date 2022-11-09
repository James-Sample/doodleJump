document.addEventListener('DOMContentLoaded', () => {    //ensures script doesnt run until all html has been written
    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')
    let doodlerLeftSpace = 50
    let doodlerBottomSpace = 150                // change to >200 to see platforms move
    let isGameOver = false
    let platformCount = 5
    let platforms = []                      //empty array to add new platforms
    let upTimerId                           // made global so can cancel outside of the jump function
    let downTimerId

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
        upTimerId = setInterval(function() {            // stops clearinterval
            doodlerBottomSpace += 5
            doodler.style.bottom = doodlerBottomSpace + 'px'  //makes doodler go upwards
            if (doodlerBottomSpace > 350) {
                fall()                          //call the fall funtion
           }
        },30)
    }

   function fall(){
        clearInterval(upTimerId)            //stops him going up
        downTimerId = setInterval(function(){       
            doodlerBottomSpace -= 5
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if (doodlerBottomSpace <= 0) {          //stops him going down
                gameOver()
            }
        },30)
    }

    function gameOver() {
        console.log('game over :(')
        isGameOver = true
        clearInterval(upTimerId)
        clearInterval(downTimerId)
    }

    function start() {              //to make doodler appear if gameover is false
        if(!isGameOver) {
            createPlatforms()       //creats platforms when game starts
            createDoodler()
            setInterval(movePlatforms, 30)   //moves platform every 30 ms
            jump()
        }
    }
    //attach to button
    start()
})
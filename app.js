document.addEventListener('DOMContentLoaded', () => {    //ensures script doesnt run until all html has been written
    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')
    let doodlerLeftSpace = 50
    let doodlerBottomSpace = 150
    let isGameOver = false

    function createDoodler(){
        grid.appendChild(doodler)       //puts the doodler into the grid
        doodler.classList.add('doodler')                 //styles the doodler
        doodler.style.left =  doodlerLeftSpace + 'px'       //allows the doodler to move left
        doodler.style.bottom = doodlerBottomSpace + 'px'
    }

    function start() {              //to make doodler appear if gameover is false
        if(!isGameOver) {
            createDoodler()
        }
    }
    //attach to button
    start()
})
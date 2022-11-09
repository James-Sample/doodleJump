document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')

    function createDoodler(){
        grid.appendChild(doodler)       //puts the doodler into the grid
        doodler.classList.add('doodler')                 //styles the doodler
        
    }
    createDoodler()
})
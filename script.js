const container = document.querySelector('.player-container')
const audio = container.querySelector('.js-audio')

const cover = container.querySelector('.js-cover')
const artist = container.querySelector('.js-artist')
const songTitle = container.querySelector('.js-song-title')

const seekBar = container.querySelector('.js-seek-bar')
const fillBar = seekBar.querySelector('.js-seek-bar-fill')

const restartButton = container.querySelector('.js-restart-button')
const playButton = container.querySelector('.js-play-button')
const play = container.querySelector('.play')
const previousButton = container.querySelector('.js-previous-button')
const nextButton = container.querySelector('.js-next-button')
let isDraggingSeekBar
let indexMusic = [
    {
        "src": "music/nightcall.mp3",
        "artist": "Kavinsky",
        "song": "Nightcall",
        "cover": "images/kavinsky.png"
    },
    {
        "src": "music/hotelcalifornia.mp3",
        "artist": "Eagles",
        "song": "Hotel California",
        "cover": "images/eagles.jpg"
    },
    {
        "src": "music/feelitstill.mp3",
        "artist": "Portugal. The man",
        "song": "Feel it still",
        "cover": "images/portugal.jpg"
    }
]
let i = 0
let volumeContainer = document.querySelector('.volume-slider-container')
let volumeSeekBar = document.querySelector('.volume-slider')
let drag = false

const muteElement = container.querySelector('.js-volume-on-off')
const muteButton = container.querySelector('.js-muted')
const unmuteButton = container.querySelector('.js-volume-on')
let lastVolume = audio.volume
let percentage


/**
 * Seek bar
 */
audio.addEventListener('timeupdate', () =>
{
    const ratio = audio.currentTime / audio.duration
    fillBar.style.transform = `scaleX(${ratio})`

    seekBar.addEventListener('click', (_event) =>
    {
        const bounding = seekBar.getBoundingClientRect()
        const ratio = (_event.clientX - bounding.left) / bounding.width
        const time = ratio * audio.duration
            
        audio.currentTime = time
    })
})

seekBar.addEventListener('mousedown', (_e) =>
{
    isDraggingSeekBar = true
})

seekBar.addEventListener('mousemove', (_e) =>
{
    if (isDraggingSeekBar) {
        
    }
})

seekBar.addEventListener('click', (_e) =>
{
    isDraggingSeekBar = false
})

/**
 * Making the playlist
 */
function nextMusic()
{
    audio.currentTime = 0
    audio.pause()
    i = (i + 1) % indexMusic.length
    audio.src = indexMusic[i].src
    artist.innerText = indexMusic[i].artist
    songTitle.innerText = indexMusic[i].song
    cover.style.backgroundImage = `url(${indexMusic[i].cover})`
    audio.play()
}
// Next button
nextButton.addEventListener('click', () =>
{
    nextMusic()
})

/**
 * Previous music
 */
function previousMusic()
{
    audio.currentTime = 0
    audio.pause()
    i = (i - 1) % indexMusic.length
    audio.src = indexMusic[i].src
    artist.innerText = indexMusic[i].artist
    songTitle.innerText = indexMusic[i].song
    cover.style.backgroundImage = `url(${indexMusic[i].cover})`
    audio.play()

}
// Previous button
previousButton.addEventListener('click', () =>
{
    previousMusic()
})

/**
 * Autoplay
 */
audio.addEventListener('ended', () =>
{
    nextMusic()
})

/**
 * Restart button
 */
restartButton.addEventListener('click', () =>
{
    audio.currentTime = 0
})

/**
 * Play-Pause button
 */
function togglePlay()
{
    if(audio.paused)
    {
        audio.play()}
    else
    {
        audio.pause()
    }
}

playButton.addEventListener('click', () =>
{
    togglePlay()
    play.classList.toggle('play')
    play.classList.toggle('pause')
})

/**
 * Volume bar
 */
volumeContainer.addEventListener('mousedown',function(ev)
{
   drag = true
   updateBar(ev.clientX)
})

document.addEventListener('mousemove',function(ev)
{
   if(drag){
      updateBar(ev.clientX);
   }
})

document.addEventListener('mouseup',function(ev)
{
    drag = false
})

function updateBar(x, vol)
{
   let volume = volumeContainer
    if (vol) {
        percentage = vol * 100
    } else {
        let position = x - volume.offsetLeft
        percentage = 100 * position / volume.clientWidth
    }
    if (percentage > 100) {
        percentage = 100
    }
    if (percentage < 0) {
        percentage = 0
    }

    volumeSeekBar.style.width = percentage +'%'
    audio.volume = percentage / 100
}

/**
 * Mute button
 */
function setMute()
{   
    if(audio.volume == 0)
        {
            audio.volume = lastVolume
            muteButton.classList.add('hidden')
            unmuteButton.classList.remove('hidden')

        }
        else
        {
            lastVolume = audio.volume
            audio.volume = 0
            muteButton.classList.remove('hidden')
            unmuteButton.classList.add('hidden')
        }
}

muteElement.addEventListener('click', () =>
{
    setMute()
})
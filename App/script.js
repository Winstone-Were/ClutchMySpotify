
let QUEUE_AREA = document.querySelector('.current-user-queue');
let RELOAD_BUTTON = document.querySelector('.reload-button');

RELOAD_BUTTON.addEventListener('click', () => {
    fetch('http://localhost:8080/myRecentTracks').then(data=> data.json().then(result=> result.forEach(res=> MusicItemElement(res.track)))).catch(err=> console.log(err));
});

function MusicItemElement(track) {
    
    let TrackElement = document.createElement('div');
    TrackElement.className = 'track-element';

    let TrackName = document.createElement('h1');
    TrackName.textContent = track.name;
    let TrackArtist = document.createElement('h4');
    TrackArtist.textContent = track.artists[0].name;

    TrackElement.appendChild(TrackName);
    TrackElement.appendChild(TrackArtist);

    QUEUE_AREA.appendChild(TrackElement);

}
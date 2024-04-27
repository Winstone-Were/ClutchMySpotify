
let QUEUE_AREA = document.querySelector('.current-user-queue');
let RELOAD_BUTTON = document.querySelector('.reload-button');

RELOAD_BUTTON.addEventListener('click', () => {
    fetch('http://localhost:8080/myRecentTracks').then(data=> data.json().then(result=> result.forEach(res=> MusicItemElement(res.track)))).catch(err=> console.log(err));
});


fetch('https://p.scdn.co/mp3-preview/6a06f19d61464c9450cb44825c2ab63097f9e691?cid=0c50b00e4e6f43119040df0817ee3a04')
    .then(data=> console.log(data))
    .catch(err=> console.error(err));

    

function MusicItemElement(track) {
    
    console.log(track);

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
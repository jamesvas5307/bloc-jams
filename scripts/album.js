var albumPicasso = {
  title: 'The Colors',
  artist: 'Pablo Picasso',
  label: "Cubism",
  year: '1881',
  albumArtUrl: 'assets/images/album_covers/01.png',
  songs: [
  {title: 'Blue', duration: '4:26'},
  {title: 'Green', duration: '3:14'},
  {title: 'Red', duration: '5:01'},
  {title: 'Pink', duration: '3:21'},
  {title: 'Magenta', duration: '2:15'}
  ]
};

var albumMacroni = {
  title: 'The Telephone',
  artist: 'Guglielmo Marconi',
  label: "EM",
  year: '1909',
  albumArtUrl: 'assets/images/album_covers/20.png',
  songs: [
  {title: 'Hello, Operator?', duration: '1:01'},
  {title: 'Ring, ring, ring', duration: '5:01'},
  {title: 'Fits in your pocket', duration: '3:21'},
  {title: 'Can you hear me now?', duration: '3:14'},
  {title: 'Wrong phone number', duration: '2:15'}
  ]
};

var albumGaga = {
  title: 'Fame Monster',
  artist: 'Lady Gaga',
  label: "Haus of Gaga",
  year: '2010',
  albumArtUrl: 'assets/images/album_covers/21.png',
  songs: [
  {title: 'Bad Romance', duration: '1:01'},
  {title: 'Telephone', duration: '5:01'},
  {title: 'Pokerface', duration: '3:21'},
  {title: 'Judas', duration: '3:14'},
  {title: 'Born This Way', duration: '2:15'}
  ]
};

function createSongRow(songNumber, songName, songLength){
 var template = '<tr class="album-view-song-item">' +
 '<td class="song-item-number" data-song-number ="'+ songNumber +'">' + songNumber + '</td>'
 + '<td class="song-item-title">' + songName + '</td>'
 + '<td class="song-item-duration">' + songLength + '</td></tr>';

 return $(template);
}

function setCurrentAlbum(album){

  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');

  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src',album.albumArtUrl);

  $albumSongList.empty();

  for (var i=0; i < album.songs.length; i++){
    var $newRow = createSongRow(i+1, album.songs[i].title, album.songs[i].duration);
    $albumSongList.append($newRow);
  }
}

function findParentByClassName(element, targetClass){
  if(element){
    var currentParent = element.parentElement;
    console.log(currentParent);
    while(currentParent.className !== targetClass && currentParent.className !== null){
      currentParent = currentParent.parentElement;
    }
    if(currentParent === undefined){
      console.log("No parent found");
    } else if(currentParrent.className !== targetClass){
      console.log("No parent found with that class name");
    } else {
    return currentParent;
  }
  }
}

function getSongItem(element){
  switch(element.className){
    case 'album-song-button' :
    case 'ion-play' :
    case 'ion-pause' :
      return findParentByClassName(element, 'song-item-number');
    case 'album-view-song-item':
      return element.querySelector('.song-item-number');
    case 'song-item-title':
    case 'song-item-duration' :
    return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
    case 'song-item-number':
      return element;
    default:
      return;
  }
};

function clickHandler(targetElement){
  var songItem = getSongItem(targetElement);
  if(currentlyPlayingSong === null){
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number');
  } else if(currentlyPlayingSong === songItem.getAttribute('data-song-number')){
    songItem.innerHTML = playButtonTemplate;
    currentlyPlayingSong = null;
  } else if(currentlyPlayingSong !== songItem.getAttribute('data-song-number')){
    var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '" ]');
    currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number');
  }
}

var songListContainer = document.getElementsByClassName("album-view-song-list")[0];
var playButtonTemplate= "<a class='album-song-button'><span class='ion-play'></span></a>";
var pauseButtonTemplate= "<a class='album-song-button'><span class='ion-pause'></span></a>";
var songRows = document.getElementsByClassName("album-view-song-item");
var currentlyPlayingSong = null;

window.onload = function(){
  setCurrentAlbum(albumPicasso);
  var totalAlbums = [albumPicasso, albumMacroni, albumGaga];
  var b = 0;
  var albumImage= document.getElementsByClassName('album-cover-art')[0];
  albumImage.addEventListener("click", function(event){
    if(b == totalAlbums.length - 1){
      b = 0;
    } else {
    b++;
  }
    setCurrentAlbum(totalAlbums[b]);
  });

  songListContainer.addEventListener("mouseover", function(event){

    var songItem = getSongItem(event.target);
    if(songItem.getAttribute('data-song-number') !== currentlyPlayingSong){
      songItem.innerHTML = playButtonTemplate;
    };
  });
  for ( var i = 0; i < songRows.length; i++){
    songRows[i].addEventListener("mouseleave", function(event){
      var songItem = getSongItem(event.target);
      var songItemNumber = songItem.getAttribute('data-song-number');
      if(songItemNumber !== currentlyPlayingSong){
        songItem.innerHTML = songItemNumber;
      }
    });
    songRows[i].addEventListener("click", function(event){
      clickHandler(event.target);
    });
  }
};

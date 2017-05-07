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

 var $row = $(template);

 function clickHandler() {
   var songItem = $(this).attr('data-song-number');
   if(currentlyPlayingSong !== null){
     var currentPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
     currentPlayingCell.html(currentlyPlayingSong);
   }
   if(currentlyPlayingSong !== songNumber) {
     $(this).html(pauseButtonTemplate);
     currentlyPlayingSong = songNumber;
   } else if(currentlyPlayingSong == songNumber){
     $(this).html(playButtonTemplate);
     currentPlayingSong = null;
   }
 };

 function onHover(event){
   var songItem = $(this).find('.song-item-number');
   var songNumber = songItem.attr('data-song-number');
   if(songNumber !== songItem){
     songItem.html(playButtonTemplate);
   };
 }

 function offHover(event){
   var songItem = $(this).find('.song-item-number');
   var songNumber = songItem.attr('data-song-number');
   if(songNumber == currentlyPlayingSong){
     songItem.html(pauseButtonTemplate);
   } else{
     songItem.html(songNumber);
   }
 }

 $row.find('.song-item-number').click(clickHandler);
 $row.hover(onHover, offHover);
 return $row;


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


var playButtonTemplate= "<a class='album-song-button'><span class='ion-play'></span></a>";
var pauseButtonTemplate= "<a class='album-song-button'><span class='ion-pause'></span></a>";

var currentlyPlayingSong = null;

$(document).ready(function(){
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


});

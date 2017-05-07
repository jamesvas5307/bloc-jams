

function createSongRow(songNumber, songName, songLength){
 var template = '<tr class="album-view-song-item">' +
 '<td class="song-item-number" data-song-number ="'+ songNumber +'">' + songNumber + '</td>'
 + '<td class="song-item-title">' + songName + '</td>'
 + '<td class="song-item-duration">' + songLength + '</td></tr>';

 var $row = $(template);

function setSong(songNumber){
  currentlyPlayingSongNumber = parseInt(songNumber);
  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
}



 function clickHandler() {
   var songItem = $(this).attr('data-song-number');
   if(currentlyPlayingSongNumber !== null){
     var currentPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
     currentPlayingCell.html(currentlyPlayingSongNumber);
   }
   if(currentlyPlayingSongNumber !== songNumber) {
     $(this).html(pauseButtonTemplate);
     setSong(songNumber);
     updatePlayerBarSong();
   } else if(currentlyPlayingSongNumber == songNumber){
     $(this).html(playButtonTemplate);
     $('.main-controls .play-pause').html(playerBarPlayButton);
     currentlyPlayingSongNumber = null;
     currentSongFromAlbum = null;
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
   if(songNumber == currentlyPlayingSongNumber){
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
  currentAlbum = album;
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

function trackIndex(album,song){
  return album.songs.indexOf(song);
}

function playerClickHandler(){
  var action = this.dataset.playerControl;
  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  currentSongIndex += action == "next" ? 1 : -1;
  if(currentSongIndex >= currentAlbum.songs.length){
    currentSongIndex = 0;
  }  else if(currentSongIndex < 0){
      currentSongIndex = currentAlbum.songs.length -1;
    }

  var lastSongNumber = currentlyPlayingSongNumber;
  currentlyPlayingSongNumber = currentSongIndex + 1;
  currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

  updatePlayerBarSong();
  var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
  var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

  $nextSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);
}

function updatePlayerBarSong(element){
  $('.currently-playing .song-name').text(currentSongFromAlbum.title);
  $('.currently-playing .artist-name').text(currentAlbum.artist);
  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + "-" + currentAlbum.artist);

  $('.main-controls .play-pause').html(playerBarPauseButton);
}

function getSongNumberCell(number){
  return $('.song-item-number[data-song-number="' + number + '"');
}


var playButtonTemplate= "<a class='album-song-button'><span class='ion-play'></span></a>";
var pauseButtonTemplate= "<a class='album-song-button'><span class='ion-pause'></span></a>";
var playerBarPlayButton = '<span class="ion-play"</span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentAlbum = null;

$(document).ready(function(){
  setCurrentAlbum(albumPicasso);
  $previousButton.click(playerClickHandler);
  $nextButton.click(playerClickHandler);
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

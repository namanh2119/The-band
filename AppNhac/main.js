const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.songApp')
const cd = $('.cd');
const heading = $('.header h2');
const thumb = $('.cd .cd__thum');
const audio = $('#audio');
const playBtn = $('.play');
const timeline = $('#timeline');
const next = $('.next');
const back = $('.back');
const random = $('.random');
const repeat = $('.repeat');

const app = {
  currentIndex:0, 
  isPlaying: false,
  isRandom: false,
  songs: [
    {
      name: "Quả Phụ Tướng",
      singer: "Raftaar x Salim Merchant x Karma",
      path: "/AppNhac/song/QuaPhuTuong-DungHoangPham-8474634.mp3",
      image:
        "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
    },
    {
      name: "Có hẹn với thanh xuân",
      singer: "Raftaar x Fortnite",
      path: "/AppNhac/song/cohenvoithanhxuan-MONSTAR-7050201.mp3",
      image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
    },
    {
      name: "Cưới thôi",
      singer: "Raftaar x Brobha V",
      path: "/AppNhac/song/CuoiThoi-MasewMasiuBRayTAPVietNam-7085648.mp3",
      image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
    },
    {
      name: "Waiting for you",
      singer: "Raftaar x Nawazuddin Siddiqui",
      path: "/AppNhac/song/WaitingForYou-MONOOnionn-7733882.mp3",
      image: "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
    },
    {
      name: "Aage Chal",
      singer: "Raftaar",
      path: "/AppNhac/song/QuaPhuTuong-DungHoangPham-8474634.mp3",
      image: "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
    },
    {
      name: "Damn",
      singer: "Raftaar x kr$na",
      path: "/AppNhac/song/cohenvoithanhxuan-MONSTAR-7050201.mp3",
      image: "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
    },
    {
      name: "Feeling You",
      singer: "Raftaar x Harjas",
      path: "/AppNhac/song/WaitingForYou-MONOOnionn-7733882.mp3",
      image: "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
    }
  ],
  
  render: function() {
    const htmls = this.songs.map(song => {
        return`
            <div class="song">
                <div class="info">
                    <div class="thum" style="background-image: url('${song.image}');"></div>
                    <div class="info_text">
                        <h3>${song.name}</h3>
                        <h5>${song.singer}</h5>
                    </div>
                </div>
                <i class="fa-solid fa-ellipsis"></i>
            </div>
        `
    })

    $('.songs').innerHTML = htmls.join('')
  },

  defineProperties: function() {
    Object.defineProperty(this, 'currentSong', {
      get: function() {
        return this.songs[this.currentIndex];
      }
    })
  },

  handle: function() {
    const cdWidth = cd.offsetWidth;

    // Xử lý hình ảnh thumbnail
    document.onscroll = function() {
      const scrollTop = document.documentElement.scrollTop || window.scrollY
      const newcsWidth = cdWidth - scrollTop;

      cd.style.width = newcsWidth > 0 ? newcsWidth + 'px': 0;
      cd.style.opacity = newcsWidth / cdWidth;
    }

    const thumbAnimate = thumb.animate([
      { transform: 'rotate(360deg)'}
    ], {
      duration: 20000,
      interations: Infinity,
    })
    thumbAnimate.pause();

    // Xử lý click play
    playBtn.onclick = function() {
      if(app.isPlaying) {
        audio.pause();
      }
      else {
        audio.play();
    }}

    audio.onplay = function() {
      app.isPlaying = true;
      player.classList.add('songApp_play');
      thumbAnimate.play();
    }

    audio.onpause = function() {
      app.isPlaying = false;
      player.classList.remove('songApp_play');
      thumbAnimate.pause();
    }

    audio.ontimeupdate = function() {
      if(audio.duration) {
        const timePercents = Math.floor(audio.currentTime / audio.duration * 100)
        timeline.value = timePercents;
      }
    }

    audio.onended = function() {
      if(app.isRandom) {
        app.playRandomSong();
      }
      else {
        app.nextSong();
      }
      audio.play();
    }

    timeline.onchange = function(e) {
      const time = audio.duration * e.target.value / 100;
      audio.currentTime = time;
    }

    next.onclick = function() {
      if(app.isRandom) {
        app.playRandomSong();
      }
      else {
        app.nextSong();
      }
      audio.play();
    }

    back.onclick = function() {
      if(app.isRandom) {
        app.playRandomSong();
      }
      else {
        app.backSong();
      }
      audio.play();
    }

    random.onclick = function() {
      app.isRandom = !app.isRandom
      random.classList.toggle('active', app.isRandom);
    }
  },

  loadCurrentSong: function() {
    heading.textContent = this.currentSong.name;
    thumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },

  nextSong: function() {
    this.currentIndex++;
    if(this.currentIndex >= this.songs.length) {
      app.currentIndex = 0;
    }
    this.loadCurrentSong();
  },

  backSong: function() {
    this.currentIndex--;
    if(this.currentIndex < 0) {
      app.currentIndex = app.songs.length - 1;
    }
    this.loadCurrentSong();
  },

  playRandomSong: function() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * app.songs.length);
    } while(newIndex === app.currentIndex)
    app.currentIndex = newIndex;
    this.loadCurrentSong();
  },

  start: function() {
  // Định nghĩa object
    this.defineProperties();
  // Lắng nghe các sự kiện (DOM events)
    this.handle();

    this.loadCurrentSong();
    this.render();
  }
}

app.start()




import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { Playlist, Song } from 'components/models';
import { AxiosResponse } from 'axios';
export const usePlayerStore = defineStore('player', {
  state: () => ({
    counter: 0,
    playlist: {} as Playlist,
    currentSong: {} as Song,
    audio: new Audio(),
    barWidth: '' as string,
    circleLeft: '' as string,
    duration: '' as string,
    currentTime: '' as string,
    isTimerPlaying: false as boolean,
    progress: {} as HTMLElement,
  }),

  getters: {
    doubleCount(state) {
      return state.counter * 2;
    },
    playerBg(state) {
      return state.currentSong?.bg_colors?.[0] ?? '#be3214';
    },
  },

  actions: {
    setProgressElem(elem: HTMLElement) {
      this.progress = elem;
    },
    fetchPlayList() {
      api.get('').then((response) => {
        this.playlist = response.data;
      });
    },
    setCurrentSong(song: Song) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      self.currentSong = Object.assign({}, song);
      self.audio.src = self.currentSong.link;
      self.audio.ontimeupdate = function () {
        self.generateTime();
      };
      self.audio.onloadedmetadata = function () {
        self.generateTime();
      };
    },
    async getFileSizeInMB(url: string) {
      const response: AxiosResponse = await api.head(url);
      const bytes: string | undefined = response.headers['content-length'];
      if (bytes) {
        const megabytes: number = parseInt(bytes) / (1024 * 1024); // Convert bytes to MB
        return megabytes;
      }
      return '';
    },
    togglePlay() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    clickProgress(event: any) {
      const maxduration = this.audio.duration;
      if (isNaN(maxduration)) {
        return false;
      }
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(event.layerX);
    },
    updateBar(x: number) {
      const maxduration = this.audio.duration;
      const progress = this.progress;
      const position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + '%';
      this.circleLeft = percentage + '%';
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    generateTime() {
      const width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + '%';
      this.circleLeft = width + '%';
      let durmin: string | number = Math.floor(this.audio.duration / 60);
      let dursec: string | number = Math.floor(
        this.audio.duration - durmin * 60
      );
      let curmin: string | number = Math.floor(this.audio.currentTime / 60);
      let cursec: string | number = Math.floor(
        this.audio.currentTime - curmin * 60
      );
      durmin = isNaN(durmin) ? 0 : durmin;
      dursec = isNaN(dursec) ? 0 : dursec;
      if (durmin < 10) {
        durmin = '0' + durmin;
      }
      if (dursec < 10) {
        dursec = '0' + dursec;
      }
      if (curmin < 10) {
        curmin = '0' + curmin;
      }
      if (cursec < 10) {
        cursec = '0' + cursec;
      }
      this.duration = durmin + ':' + dursec;
      this.currentTime = curmin + ':' + cursec;
    },
  },
});

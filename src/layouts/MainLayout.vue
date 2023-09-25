<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container style="max-width: 1280px;" class="q-mx-auto">
      <router-view />
    </q-page-container>
    <q-footer style="max-width: 1280px;" class="bg-transparent q-mx-auto">
      <q-toolbar class="player-bar" :style="`background-color: ${playerBg};height: 85px;`">
        <div class="player-bar__inner full-width row items-center">
          <q-avatar size="48px">
            <img :src="song.photo_240">
          </q-avatar>
          <div class="q-ml-md">
            <div v-text="song.song" class="text-weight-bold text-h5"></div>
            <div v-text="song.artist"></div>
          </div>
          <q-space></q-space>
          <div class="player-bar__progress desktop-only" @click="clickProgress" ref="progress">
            <div class="progress">
              <div class="progress__current" :style="`width:${barWidth}`"></div>
            </div>
            <div class="row">
              <div v-text="currentTime"></div>
              <q-space></q-space>
              <div v-text="duration"></div>
            </div>
          </div>
          <q-btn round flat :icon="isTimerPlaying ? 'pause' : 'play_arrow'" @click="togglePlay">
          </q-btn>
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia';
import { usePlayerStore } from 'stores/player';
const progress = ref({} as HTMLElement)
const player = usePlayerStore();
const { currentSong: song, playerBg, isTimerPlaying, barWidth, duration, currentTime } = storeToRefs(player)
const { setProgressElem, togglePlay, clickProgress } = player
onMounted(() => {
  setProgressElem(progress.value)
})
</script>

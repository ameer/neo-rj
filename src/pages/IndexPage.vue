<template>
  <q-page class="q-pa-lg">
    <div class="row items-center q-col-gutter-md">
      <div class="col-12 col-sm-4 col-lg-3" v-for="song in playlist.items" :key="song.id">
        <q-card class="my-card bg-secondary text-white" @click="setCurrentSong(song)">
          <q-img :src="song.photo_240" style="height: 180px;" :position="'0% 0%'">
            <div class="absolute-bottom row no-wrap items-center">
              <div class="ellipsis">
                <div class="text-h6 ellipsis" v-text="song.song"></div>
                <div class="text-subtitle2 ellipsis">by {{ song.artist }}</div>
              </div>
              <q-space></q-space>
              <q-btn :href="song.link" round flat :icon="'download'"></q-btn>
            </div>
          </q-img>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { usePlayerStore } from 'stores/player';
import { storeToRefs } from 'pinia';
const player = usePlayerStore();
const { playlist } = storeToRefs(player)
const { fetchPlayList, setCurrentSong } = player
fetchPlayList()
</script>

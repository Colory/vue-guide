<template>
  <intro-config>
    <div class="wrapper">
      <div v-intro:1="`content number one`" class="content">
        content number one
      </div>
      <div v-intro:2="`content number two`" class="content">
        content number two
      </div>
      <div v-intro:3="`content number three`" class="content">
        content number three
      </div>
      <div v-intro:4="`content number four`" class="content">
        content number four
      </div>
      <!-- start button -->
      <button @click="start" class="bt" v-intro:5="`last one. click outside.`">
        Start Intro
      </button>
      <div v-if="current">click outside to next intro.</div>
    </div>
  </intro-config>
</template>
<script setup lang="ts">
import { useIntro } from "./components/config";
import IntroConfig from "./components/IntroConfig.vue";
const content = "hello world!";

const { start, current } = useIntro();
</script>
<style scoped>
.wrapper {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;

  flex-wrap: wrap;
}
.bt {
  border: 0;
  padding: 20px 40px;

  border-radius: 5px;

  font-size: 24px;
}
.bt:hover {
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.content {
  border-radius: 5px;
  border: 1px solid black;

  width: 400px;
  height: 400px;
  margin: 40px;

  padding: 90px;
  font-size: 24px;
}
.content:nth-child(3n + 1) {
  background: #ffc23ec7;
}

.content:nth-child(3n + 0) {
  background: #df3effc7;
}
</style>
<style>
body,
html,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;

  background: #a5bfff;
}
</style>

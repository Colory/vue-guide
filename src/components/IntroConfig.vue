<template>
  <slot></slot>

  <teleport to="body" v-if="current">
    <div class="intro-plugin">
      <div
        class="intro-hl"
        ref="highlight"
        :style="{
          top: `${pos.top}px`,
          left: `${pos.left}px`,
          width: `${pos.width}px`,
          height: `${pos.height}px`,
        }"
      >
        <div class="tip">
          {{ current.content }}
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { useIntro } from "./config";
import { onClickOutside } from "@vueuse/core";
import { onMounted, ref } from "vue";

const { current, forward } = useIntro();

// computed the pos
const pos = computed(() => current.value.positionProvider());

const highlight = ref<HTMLElement>();

// maybe you need click outside to cancel or to move forward.
onMounted(() => onClickOutside(highlight, () => forward()));
</script>

<style scoped>
.intro-plugin {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
}

.intro-plugin > .intro-hl {
  /* use 100vw */
  /* to set the shadow to 9000px or to set it to 100vw, because most screens is wide screens. */
  /* shadow to cover the whole screen */
  box-shadow: rgba(0, 0, 0, 0.3) 0 0 0 100vw, rgba(255, 255, 255, 0.3) 0 0 0 1px;
  position: absolute;
}

.tip {
  position: absolute;

  padding: 10px 20px;
  background: #ff3e3ec7;

  color: white;

  bottom: 0;
  right: 0;
}
</style>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'
const isFullscreen = ref(false)

// 切换事件
const onToggle = () => {
  screenfull.toggle()
}

// 监听变化
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}

// 设置侦听器
onMounted(() => {
  screenfull.on('change', change)
})
// 删除侦听器
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>

<template>
  <div>
    <svg-icon
      id="guide-full"
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="onToggle"
    ></svg-icon>
  </div>
</template>

<style lang="scss" scoped></style>

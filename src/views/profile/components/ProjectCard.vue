<script setup>
import {} from 'vue'
import PanThumb from '@/components/PanThumb'
</script>

<template>
  <div>
    <PanThumb
      :image="$store.getters.userInfo.avatar"
      :height="'100px'"
      :width="'100px'"
      :hoverable="true"
    >
      <div>Hello</div>
      {{ $store.getters.userInfo.title }}
    </PanThumb>
  </div>
</template>

<style lang="scss" scoped></style>

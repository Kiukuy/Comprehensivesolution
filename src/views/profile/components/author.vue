<script setup>
import PanThumb from '@/components/PanThumb'
import InTp from '@/icons/images/InTp.jpg'
</script>

<template>
  <div class="author-container">
    <div class="header">
      <PanThumb :image="InTp" height="60px" width="60px" :hoverable="false">
        <!-- {{ $t('msg.profile.name') }} -->
        <div>Kuy</div>
      </PanThumb>
      <div class="header-desc">
        <h3>KiuKuy</h3>
        <!-- <h3>{{ $t('msg.profile.name') }}</h3> -->
        <!-- <span>{{ $t('msg.profile.job') }}</span> -->
        <span>Nothing</span>
      </div>
    </div>
    <div class="info">
      <!-- {{ $t('msg.profile.Introduction') }} -->
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    </div>
  </div>
</template>

<style lang="scss" scoped>
.author-container {
  .header {
    display: flex;
    .header-desc {
      margin-left: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      span {
        font-size: 14px;
      }
    }
  }
  .info {
    margin-top: 16px;
    line-height: 22px;
    font-size: 14px;
    text-indent: 26px;
  }
}
</style>

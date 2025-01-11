<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <ProjectCard :features="featureData" class="user-card"></ProjectCard>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature"
              ><feature
            /></el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter"
              ><chapter
            /></el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author"
              ><author
            /></el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import ProjectCard from './components/ProjectCard.vue'
import feature from './components/feature.vue'
import chapter from './components/chapter.vue'
import author from './components/author.vue'
import { ref } from 'vue'
import { features } from '@/api/user'

const activeName = ref('feature')

const featureData = ref([])
const getFeatureData = async () => {
  featureData.value = await features()
}
getFeatureData()
</script>

<style lang="scss" scoped></style>

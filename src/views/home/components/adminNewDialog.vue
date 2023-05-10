<template>
  <el-dialog v-model="dialogShow" title="New bom" :before-close="dialogClose" top="5vh">
    <el-form ref="formRef" :model="formData">
      <el-form-item label="Bom number">
        <el-input v-model="formData.bomNo" />
      </el-form-item>
      <el-form-item label="Owner">
        <el-input v-model="formData.owner" />
      </el-form-item>
      <el-form-item label="Customer">
        <el-input v-model="formData.customer" />
      </el-form-item>
      <el-form-item label="Production_Line">
        <el-input v-model="formData.productionline" />
      </el-form-item>
      <el-form-item label="Plant">
        <el-input v-model="formData.plant" />
      </el-form-item>
      <el-form-item label="Lot type">
        <el-input v-model="formData.lotType" />
      </el-form-item>
      <el-form-item label="Target device">
        <el-input v-model="formData.targetDevice" />
      </el-form-item>
      <el-form-item label="Source device">
        <el-input v-model="formData.source" />
      </el-form-item>
      <el-form-item label="Device family">
        <el-input v-model="formData.family" />
      </el-form-item>
      <el-form-item label="Stage">
        <el-input v-model="formData.stage" />
      </el-form-item>
      <el-form-item label="Device name">
        <el-input v-model="formData.device" />
      </el-form-item>
      <el-form-item label="Step">
        <el-input v-model="formData.step" />
      </el-form-item>
      <el-form-item label="Test program">
        <el-input v-model="formData.program" />
      </el-form-item>
      <el-form-item label="Program version">
        <el-input v-model="formData.version" />
      </el-form-item>
      <el-form-item label="SiteMap">
        <el-input v-model="formData.sitemap" />
      </el-form-item>
      <el-form-item label="Platfrorm">
        <el-input v-model="formData.platform" />
      </el-form-item>
      <el-form-item label="IGXLVersion">
        <el-input v-model="formData.igxlVer" />
      </el-form-item>
      <el-form-item label="SmarTestVersion">
        <el-input v-model="formData.smartestVer" />
      </el-form-item>
    </el-form>
    <div class="rowEC">
      <el-button type="primary" @click="confirmDebounce">Confirm</el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import _ from 'lodash'
import type { FormInstance } from 'element-plus'
import type { NewBomData } from '~/home'
import { createBomReq } from '@/api/bom'

const { t } = useI18n()
const emit = defineEmits(['close', 'refresh'])

const dialogShow = ref(true)

// Form表單相關
const formRef = ref<FormInstance | null>(null)
/* eslint camelcase: off */
const formData = reactive<NewBomData>({
  bomNo: '',
  owner: '',
  platform: '',
  customer: '',
  program: '',
  version: '',
  device: '',
  targetDevice: '',
  family: '',
  source: '',
  plant: '',
  lotType: '',
  stage: '',
  step: '',
  sitemap: '',
  correlation: false,
  igxlVer: '',
  smartestVer: '',
  productionline: ''
})

//Dialog button
const dialogConfirm = async () => {
  ElMessageBox.confirm(`新增？`, 'Warning', {
    dangerouslyUseHTMLString: true,
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(async () => {
    try {
      const { data } = await createBomReq(formData)
      console.log(data)
      tableRefresh()
      dialogClose()
    } catch (err: any) {
      // ElMessage.error(err)
      console.log(err)
    }
  })
}
const tableRefresh = () => {
  emit('refresh')
}
const dialogClose = () => {
  emit('close')
}
const _debounce = _.debounce(dialogConfirm, 1000)
const confirmDebounce = () => _debounce()
</script>

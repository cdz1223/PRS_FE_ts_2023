<template>
  <el-dialog v-model="dialogShow" :title="bomNo" :before-close="dialogClose" top="5vh">
    <el-switch
      v-model="modifyMode"
      style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
      :active-text="t('admin-dialog.automaticModification')"
      :inactive-text="t('admin-dialog.manualModification')"
    />
    <el-divider />
    <el-form-item v-if="modifyMode" :label="t('admin-dialog.quickEditTo')">
      <el-radio-group v-model="modifyTo">
        <el-radio-button label="new" :disabled="status === 'new'" />
        <el-radio-button label="waiting" :disabled="status === 'waiting'" />
        <el-radio-button label="cancel" :disabled="status === 'cancel'" />
        <el-radio-button label="pass" :disabled="status === 'pass'" />
      </el-radio-group>
    </el-form-item>
    <el-form v-else ref="formRef" :model="formData">
      <el-form-item label="Bom number">
        <el-input v-model="formData.bomNo" />
      </el-form-item>
      <el-form-item label="status">
        <el-input v-model="formData.status" />
      </el-form-item>

      <el-form-item label="correlation">
        <el-switch
          v-model="formData.correlation"
          inline-prompt
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          active-text="True"
          inactive-text="False"
        />
      </el-form-item>
      <el-form-item label="customer">
        <el-input v-model="formData.customer" />
      </el-form-item>
      <el-form-item label="productionline">
        <el-input v-model="formData.productionline" />
      </el-form-item>
      <el-form-item label="plant">
        <el-input v-model="formData.plant" />
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
      <el-form-item label="stage">
        <el-input v-model="formData.stage" />
      </el-form-item>
      <el-form-item label="Device name">
        <el-input v-model="formData.device" />
      </el-form-item>
      <el-form-item label="step">
        <el-input v-model="formData.step" />
      </el-form-item>
      <el-form-item label="Device name">
        <el-input v-model="formData.device" />
      </el-form-item>
      <el-form-item label="Test program">
        <el-input v-model="formData.program" />
      </el-form-item>
      <el-form-item label="Program version">
        <el-input v-model="formData.version" />
      </el-form-item>
      <el-form-item label="sitemap">
        <el-input v-model="formData.sitemap" />
      </el-form-item>
      <el-form-item label="platform">
        <el-input v-model="formData.platform" />
      </el-form-item>
      <el-form-item label="igxlVer">
        <el-input v-model="formData.igxlVer" />
      </el-form-item>
      <el-form-item label="smartestVer">
        <el-input v-model="formData.smartestVer" />
      </el-form-item>
      <el-form-item label="Pgm zip">
        <el-input v-model="formData.userProgram" />
      </el-form-item>
      <el-form-item label="MP folder">
        <el-input v-model="formData.msPath" />
      </el-form-item>
      <!-- <el-form-item label="code">
        <el-input v-model="formData.code" />
      </el-form-item>
      <el-form-item label="bomMd5">
        <el-input v-model="formData.bomMd5" />
      </el-form-item>
      <el-form-item label="Pgm zip MD5">
        <el-input v-model="formData.userProgramMd5" />
      </el-form-item> -->
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
import type { RowData } from '~/home'
import { useBasicStore } from '@/store/basic'
import setUserEmail from '@/utils/setUserEmail'
import { updateBomBySet } from '@/api/bom'

const props = defineProps<{ editRow: RowData }>()
const { editRow } = toRefs(props)
const { t } = useI18n()
const {
  _id,
  status,
  correlation,
  // bomchange,
  bomNo,
  customer,
  productionline,
  plant,
  targetDevice,
  source,
  family,
  stage,
  step,
  device,
  program,
  version,
  sitemap,
  platform,
  igxlVer,
  smartestVer,
  userProgram,
  msPath,
  // code,
  // bomMd5,
  // userProgramMd5,
  // createdAt,
  // updatedAt
} = editRow.value
const emit = defineEmits(['close', 'refresh'])

onMounted(() => {
  console.log(editRow)
})
const { userInfo } = storeToRefs(useBasicStore())

const dialogShow = ref(true)
const modifyMode = ref(true)
const modifyTo = ref('')

// Form表單相關
const formRef = ref<FormInstance | null>(null)
/* eslint camelcase: off */
const formData = reactive<Partial<RowData>>({
  _id,
  status,
  correlation,
  bomNo,
  customer,
  productionline,
  plant,
  targetDevice,
  source,
  family,
  stage,
  step,
  device,
  program,
  version,
  sitemap,
  platform,
  igxlVer,
  smartestVer,
  userProgram,
  msPath,
})
/**
 * @descriptions 自動更改status
 */
watch(modifyTo, (val) => {
  formData.status = val
})

//Dialog button
const dialogConfirm = async () => {
  ElMessageBox.confirm(`更新？`, 'Warning', {
    dangerouslyUseHTMLString: true,
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(async () => {
    try {
      const { data } = await updateBomBySet(formData._id, formData)
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

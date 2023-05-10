<template>
  <div class="mt-10px">
    <div class="mb-20px text-20px font-bold">notice: setting the permissionMode of settings file before you test</div>

    <div class="mb-20px">roles 頁面權限控制</div>
    <div>{{ roles }}</div>
    <el-button @click="freshRoles(['editor'])">roles切換為editor</el-button>
    <el-button @click="freshRoles(['admin'])">roles切換為admin</el-button>

    <div class="mb-10px">codes 頁面權限控制</div>
    <div>{{ codes }}</div>
    <el-button @click="freshCodes([5])">Codes切換為[5]</el-button>
    <el-button @click="freshCodes([16, 15, 14, 13, 12, 11, 10])">Codes切換為[16]</el-button>
  </div>
</template>

<script setup lang="ts">
const { codes, roles } = storeToRefs(useBasicStore())
const freshRoles = (rolesArr) => {
  roles.value = rolesArr
  freshRouter({ roles: rolesArr })
}
const freshCodes = (codesArr) => {
  codes.value = codesArr
  freshRouter({ codes: codesArr })
}
</script>

<style scoped lang="scss"></style>

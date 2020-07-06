<template>
  <div>
    <menucustom></menucustom>
    <img id="fotoinformativauno" src="../assets/images/error.png" alt="foto informativa" />
  </div>
</template>

<script>

import menucustom from "@/components/MenuCustom.vue"

export default {
    name: "error",
    components:{menucustom},

}
</script>

<style scoped>
#fotoinformativauno {
  width: 1200px;
}
</style>

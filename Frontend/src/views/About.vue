<template>
  <div class="about">
    <menucustom></menucustom>
    <h1>This is an about page</h1>
  </div>
</template>

<script>

// Importaciones locales
import menucustom from "@/components/MenuCustom.vue";

export default {

name: 'About',
components:{
    menucustom,
},


};

</script>

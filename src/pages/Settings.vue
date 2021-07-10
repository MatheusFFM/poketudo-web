<template>
  <div><ChangeLocation /></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChangeLocation from "@/components/Settings/ChangeLocation.vue";

@Component({
  components: { ChangeLocation },
})
export default class Settings extends Vue {}
</script>

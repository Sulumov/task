<template>
  <div>
    <simple-modal />
    <banner />
  </div>
</template>

<script >
import modal from "@/components/modal";
import simpleModal from "@/components/simple-modal";
import banner from "@/components/banner";

export default {
  name: "HomePage",
  components: {
    modal,
    simpleModal,
    banner,
  }
};
</script>
<style lang="scss">
.btn {
  display: block;
  width: 100%;
  margin-bottom: 2px;
}
</style>

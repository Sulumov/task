<template>
  <div>
    <simple-modal />
    <banner />
    <todo />
  </div>
</template>

<script >
import modal from "@/components/modal";
import simpleModal from "@/components/simple-modal";
import banner from "@/components/banner";
import todo from "@/components/todo"

export default {
  name: "HomePage",
  components: {
    modal,
    simpleModal,
    banner,
    todo
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

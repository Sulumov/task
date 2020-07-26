<template>
  <div>
    <b-button
      class="btn"
      type="is-primary"
      @click="toggleModal({name: 'ad', state: true})"
    >Open ad modal</b-button>
    <modal name="ad" :active="adModal" :closeTimeOut="4000" :fullScreen="true">
      <div class="ad">
        <img
          src="https://media-assets-04.thedrum.com/cache/images/thedrum-prod/s3-project_298288_image_1--default--1280.jpg"
          alt
        />
      </div>
    </modal>
  </div>
</template>

<script >
import { mapState, mapMutations } from "vuex";
import modal from "@/components/modal";

export default {
  components: {
    modal,
  },
  computed: mapState({
    adModal: (state) => state.modals.ad,
  }),
  methods: mapMutations(["toggleModal"]),
};
</script>
<style lang="scss">
.ad {
  height: 100vh;
  margin: -20px;
  background: #df0b1c;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    object-fit: contain;
    height: 100%;
  }
}
</style>

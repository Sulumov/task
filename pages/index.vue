<template>
  <div>
    <!-- First task -->
    <b-button
      class="btn"
      type="is-primary"
      @click="toggleModal({name: 'simple', state: true})"
    >Open simple modal</b-button>
    <modal
      name="simple"
      :active="simpleModal"
    >The simple text for modal window just for testing. You can close this modal if you push the back button in your browser or push the close button in the left top corner.</modal>
    <!-- /First task -->
    <!-- Second task -->
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
    <!-- /Second task -->
  </div>
</template>

<script >
import { mapState, mapMutations } from "vuex";
import modal from "@/components/modal";

export default {
  name: "HomePage",
  components: {
    modal,
  },
  computed: mapState({
    adModal: (state) => state.modals.ad,
    simpleModal: (state) => state.modals.simple,
  }),
  methods: mapMutations(["toggleModal"]),
};
</script>
<style lang="scss">
.btn {
  display: block;
  width: 100%;
  margin-bottom: 2px;
}

.ad {
  height: 100vh;
  margin: -20px;
  background: #df0b1c;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    object-fit: cover;
  }
}
</style>

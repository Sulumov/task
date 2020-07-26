<template>
  <div>
    <b-button class="btn" type="is-primary" @click="openAndFetch">Open simple modal</b-button>
    <modal name="simple" :active="simpleModal">
      <div class="modal-title">{{modalData.title}}</div>
      <p>{{modalData.body}}</p>
    </modal>

    <b-loading :is-full-page="true" :active.sync="loading" :can-cancel="true"></b-loading>
  </div>
</template>

<script >
import { mapState, mapMutations } from "vuex";
import modal from "@/components/modal";

export default {
  data: () => ({
    modalData: {},
    loading: false,
  }),
  components: {
    modal,
  },
  computed: mapState({
    simpleModal: (state) => state.modals.simple,
  }),
  methods: {
    ...mapMutations(["toggleModal"]),
    openAndFetch() {
      if (Object.keys(this.modalData).length) {
        this.toggleModal({ name: "simple", state: true });
      } else {
        this.loading = true;
        this.$axios
          .get("https://jsonplaceholder.typicode.com/posts/1")
          .then(({ data }) => {
            this.loading = false;
            this.modalData = data;
            this.toggleModal({ name: "simple", state: true });
          }).catch(() => {
            this.loading = false;
            this.$buefy.toast.open({
                  duration: 5000,
                  message: 'Something error',
                  position: 'is-bottom',
                  type: 'is-danger'
              })
          })
      }
    },
  },
  mounted() {
    if (this.simpleModal) {
      this.openAndFetch();
    }
  },
};
</script>
<style lang="scss">
.modal-title {
  font-weight: bold;
  margin-bottom: 10px;
}
</style>

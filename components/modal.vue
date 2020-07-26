<template>
  <div>
    <b-modal
      :active="visible"
      :full-screen="fullScreen"
      :can-cancel="canCancel"
      :on-cancel="hide"
      has-modal-card
    >
      <div class="modal-inner">
        <slot />
      </div>
    </b-modal>
    <div v-if="closeTimeOut" class="loading" :class="{ active : visible}" ref="loading"></div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
let timeOut;

export default {
  data: () => ({
    visible: false,
  }),
  props: {
    name: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
      required: true,
    },
    canCancel: {
      type: Boolean,
      default: true,
    },
    fullScreen: {
      type: Boolean,
      default: false,
    },
    closeTimeOut: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    if (this.$route.hash === `#${this.name}`) {
      this.toggleModal({ name: this.name, state: true });
    }
    if (this.closeTimeOut > 0) {
      this.$refs.loading.style.animationDuration = `${this.closeTimeOut/1000}s`
    }
  },
  watch: {
    active(propActive) {
      window.onhashchange = () => this.hide();
      if (propActive && !this.visible) this.show();
      else if (!propActive && this.visible) this.hide();
    },
  },
  methods: {
    ...mapMutations(["toggleModal"]),
    show() {
      this.visible = true;
      this.$router.push({ hash: `#${this.name}` });
      if (this.closeTimeOut > 0) {
        timeOut = setTimeout(() => this.hide(), this.closeTimeOut);
      }
    },
    hide() {
      clearTimeout(timeOut);
      this.visible = false;
      this.$router.push({ hash: "" });
      this.toggleModal({ name: this.name, state: false });
    },
  },
};
</script>
<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background: #7958d5;
  width: 0%;
  height: 10px;

  &.active {
    width: 100%;
    animation-name: loading;
  }

  @keyframes loading {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }
}
.modal-inner {
  position: relative;
  background: #fff;
  padding: 20px;
  text-align: center;
}
</style>
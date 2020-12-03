<template>
  <web-view v-if="url" :src="url"></web-view>
</template>

<script>
import share from "@/mixins/share.mixin";

export default {
  mixins: [share],
  data() {
    return {
      url: ""
    };
  },
  mounted() {},
  onLoad(op) {
    this.url = decodeURIComponent(op.url);
  },
  onShow() {},
  onHide() {},
  methods: {}
};
</script>

<style scoped></style>

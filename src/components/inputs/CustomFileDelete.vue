<template>
  <b-modal id="CustomFileDelete" scrollable centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/alert.svg" class="icon-lg" />
        {{ $t("alert") }}
      </h3>
    </template>
    <h4 class="text-center">
      {{ $t("areYouSureToDeleteThisFile") }}
    </h4>
    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="deleteFile"
      >
        {{ $t("yes") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('CustomFileDelete')"
      >
        {{ $t("no") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    deleteFile() {
      this.$bvModal.hide("CustomFileDelete");
      this.$emit("deleteFile");
    },
  },
};
</script>

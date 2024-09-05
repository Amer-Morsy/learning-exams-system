<template>
  <div
    class="customFileInput"
    :class="className"
    :style="{ '--custom-file-input-img-url': 'url(' + theImage + ')' }"
  >
    <!-- :accept="'image/*,video/*,.zip'" -->
    <span
      v-if="deleteFileStatus"
      class="delete-file"
      v-b-modal.CustomFileDelete
    >
      X
    </span>

    <VueFileAgent
      :accept="'*/*'"
      ref="vueFileAgent"
      :theme="'grid'"
      :multiple="false"
      :deletable="true"
      :editable="false"
      :meta="true"
      :linkable="false"
      :maxSize="maxSize"
      :maxFiles="20"
      :helpText="title ? title : $t('fileInput.title')"
      :errorText="{
        type: `${$t('fileInput.invalidType')}`,
        size: `${$t('fileInput.filesSizeShouldNotExceed')} (${maxSize})`,
      }"
      :sortable="false"
      @select="filesSelected($event)"
      @beforedelete="onBeforeDelete($event)"
      @delete="fileDeleted($event)"
      v-model="fileRecords"
    ></VueFileAgent>

    <CustomFileDelete v-on:deleteFile="$emit('deleteFile')" />
  </div>
</template>

<script>
import { checkIfImageExists } from "@/utils/functions";
import TheDefaultImg from "@/assets/images/upload-icon.svg";
import { MEDIA_TYPE_TOKENS, MEDIA_EXTENSIONS } from "@/utils/constants";
import CustomFile from "@/models/general/CustomFile";
import CustomFileDelete from "./CustomFileDelete.vue";

export default {
  data: function() {
    return {
      fileRecords: [],
      fileRecordsForUpload: [], // maintain an upload queue
      theImage: "",
      customFile: new CustomFile(),
    };
  },
  components: {
    CustomFileDelete,
  },
  props: {
    className: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    maxSize: {
      type: String,
      default: "100 MB",
    },
    defaultImg: {
      type: String,
      default: "",
    },
    acceptImg: {
      type: Boolean,
      default: false,
    },
    acceptVideo: {
      type: Boolean,
      default: false,
    },
    acceptAudio: {
      type: Boolean,
      default: false,
    },
    acceptPdf: {
      type: Boolean,
      default: false,
    },
    acceptExcel: {
      type: Boolean,
      default: false,
    },
    acceptWord: {
      type: Boolean,
      default: false,
    },
    acceptPowerPoint: {
      type: Boolean,
      default: false,
    },
    acceptExtentions: {
      type: String,
      default: "",
    },
    deleteFileStatus: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    filesSelected: function(fileRecordsNewlySelected) {
      var validFileRecords = fileRecordsNewlySelected.filter(
        (fileRecord) => !fileRecord.error
      );
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(
        validFileRecords
      );
    },
    onBeforeDelete: function(fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        // queued file, not yet uploaded. Just remove from the arrays
        this.fileRecordsForUpload.splice(i, 1);
        var k = this.fileRecords.indexOf(fileRecord);
        if (k !== -1) this.fileRecords.splice(k, 1);
      }
      this.$emit("changeValue", this.customFile);
    },
    fileDeleted: function(fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      }
      this.$emit("changeValue", this.customFile);
    },
    setAcceptExtenions() {},
  },
  watch: {
    fileRecords: function(val) {
      if (val[0]) {
        let value = val[0];
        let extension = value.ext;

        if (MEDIA_EXTENSIONS.image.indexOf(extension) > -1) {
          value.mediaTypeToken = MEDIA_TYPE_TOKENS.image;
        } else if (MEDIA_EXTENSIONS.video.indexOf(extension) > -1) {
          value.mediaTypeToken = MEDIA_TYPE_TOKENS.video;
        } else if (MEDIA_EXTENSIONS.audio.indexOf(extension) > -1) {
          value.mediaTypeToken = MEDIA_TYPE_TOKENS.audio;
        } else if (MEDIA_EXTENSIONS.pdf.indexOf(extension) > -1) {
          value.mediaTypeToken = MEDIA_TYPE_TOKENS.pdf;
        } else if (MEDIA_EXTENSIONS.excel.indexOf(extension) > -1) {
          value.mediaTypeToken = MEDIA_TYPE_TOKENS.excel;
        } else if (MEDIA_EXTENSIONS.word.indexOf(extension) > -1) {
          value.mediaTypeToken = MEDIA_TYPE_TOKENS.word;
        } else if (MEDIA_EXTENSIONS.powerPoint.indexOf(extension) > -1) {
          value.mediaTypeToken = MEDIA_TYPE_TOKENS.powerPoint;
        } else {
          value.mediaTypeToken = MEDIA_TYPE_TOKENS.other;
        }
        this.$emit("changeValue", value);
      } else {
        this.$emit("changeValue", this.customFile);
      }
    },
    defaultImg(v) {
      if (v) {
        checkIfImageExists(this.defaultImg, (exists) => {
          this.theImage = exists ? this.defaultImg : TheDefaultImg;
        });
      }
    },
  },
  created() {
    checkIfImageExists(this.defaultImg, (exists) => {
      this.theImage = exists ? this.defaultImg : TheDefaultImg;
    });
    // this.setAcceptExtenions();
  },
};
</script>

<style lang="scss">
.customFileInput {
  --custom-file-input-img-url: url(../../assets/images/upload-icon.svg);
  .delete-file {
    width: 25px;
    height: 25px;
    background-color: red;
    color: #fff;
    border-radius: 50%;
    position: absolute;
    z-index: 11;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-block-start: 7px;
    margin-inline-start: 7px;
    cursor: pointer;
  }
  .grid-block-wrapper .file-preview-new .file-preview > span {
    background-image: var(--custom-file-input-img-url) !important;
    background-size: contain !important;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    svg {
      display: none;
    }
    span.help-text {
      width: 100%;
      background-color: #fffc;
      color: #000c;
    }
  }
  .grid-block-wrapper .grid-block:not(.file-preview-new) .file-preview {
    direction: ltr;
    font-family: sans-serif;
  }
}
</style>

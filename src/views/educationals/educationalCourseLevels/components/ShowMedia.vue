<template>
  <div class="main-container mb-2">
    <div
      v-if="
        media.educationalCourseLevelFileTypeToken == MEDIA_TYPE_TOKENS.image
      "
      class="media-container"
    >
      <img
        class="media-item"
        :src="
          fullPathFileFromServer(
            media.educationalCourseLevelFilePath,
            media.defaultImg
          )
        "
        :onerror="`this.src='${media.defaultImg}'`"
      />
    </div>
    <div
      v-if="
        media.educationalCourseLevelFileTypeToken == MEDIA_TYPE_TOKENS.video
      "
      class="media-container"
    >
      <video controls class="media-item" style="cursor: pointer">
        <source
          :src="
            fullPathFileFromServer(
              media.educationalCourseLevelFilePath,
              media.defaultImg
            )
          "
          type="video/mp4"
          :onerror="`this.src='${media.defaultImg}'`"
        />
        Your browser does not support the video tag.
      </video>
    </div>
    <div
      v-if="
        media.educationalCourseLevelFileTypeToken == MEDIA_TYPE_TOKENS.audio
      "
      class="media-container"
    >
      <audio controls>
        <source :src="`${BASE_URL}${media.educationalCourseLevelFilePath}`" />

        Your browser does not support the audio element.
      </audio>
    </div>
    <div
      v-if="media.educationalCourseLevelFileTypeToken == MEDIA_TYPE_TOKENS.pdf"
      class="media-container"
    >
      <vue-pdf-app
        class="pdf"
        :pdf="
          fullPathFileFromServer(
            media.educationalCourseLevelFilePath,
            media.defaultImg
          )
        "
        theme="dark"
      ></vue-pdf-app>
    </div>
    <div v-if="isExWoPo()" class="media-container">
      <VueDocPreview
        class="office"
        :url="
          fullPathFileFromServer(
            media.educationalCourseLevelFilePath,
            media.defaultImg
          )
        "
        :type="`office`"
      />
    </div>
    <div
      v-if="
        !media.educationalCourseLevelFileTypeToken ||
          media.educationalCourseLevelFileTypeToken == MEDIA_TYPE_TOKENS.other
      "
      class="media-container"
    >
      <img
        class="download"
        src="@/assets/images/download.svg"
        @click="viewFileFromServer(media.educationalCourseLevelFilePath)"
      />
    </div>
  </div>
</template>

<script>
import { MEDIA_TYPE_TOKENS } from "./../../../../utils/constants";
import { BASE_URL } from "./../../../../utils/constants";
import {
  fullPathFileFromServer,
  viewFileFromServer,
} from "./../../../../utils/functions";
import VuePdfApp from "vue-pdf-app";
import "vue-pdf-app/dist/icons/main.css";
import VueDocPreview from "vue-doc-preview";

export default {
  name: "ShowMedia",
  components: {
    VueDocPreview,
    VuePdfApp,
  },
  computed: {},
  data() {
    return {
      MEDIA_TYPE_TOKENS: MEDIA_TYPE_TOKENS,
      BASE_URL,
    };
  },
  props: {
    media: {
      type: Object,
    },
  },
  watch() {},
  methods: {
    fullPathFileFromServer,
    viewFileFromServer,

    isExWoPo() {
      let check =
        this.media.educationalCourseLevelFileTypeToken ==
          MEDIA_TYPE_TOKENS.excel ||
        this.media.educationalCourseLevelFileTypeToken ==
          MEDIA_TYPE_TOKENS.word ||
        this.media.educationalCourseLevelFileTypeToken ==
          MEDIA_TYPE_TOKENS.powerPoint;
      return check;
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.main-container {
  height: 99%;
  max-height: 99%;
  .media-container {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    .media-item {
      max-width: 80%;
    }
    .pdf {
      height: 100%;
      width: 100%;
    }
    .office {
      height: 100%;
      width: 100%;
    }
    .download {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      align-self: center;
      cursor: pointer;
    }
  }
}
</style>

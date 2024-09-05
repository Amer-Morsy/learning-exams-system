<template>
  <div class="home-component">
    <Slider class="animate__animated animate__fadeInDown" />

    <div class="mission-section animate__animated animate__fadeInDownBig">
      <div class="section-illustrator">
        <img
          class="illustrator"
          src="@/assets/images/illustrator-mission.svg"
        />
      </div>
      <div class="section-text">
        <h3>{{ $t("mission") }}</h3>
        <p>{{ $t("missionText") }}</p>
      </div>
    </div>

    <div class="vision-section">
      <div class="section-illustrator">
        <img class="illustrator" src="@/assets/images/illustrator-vision.svg" />
      </div>
      <div class="section-text">
        <h3>{{ $t("vision") }}</h3>
        <p>{{ $t("visionText") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Slider from "./Slider.vue";

export default {
  name: "HomeComponent",
  components: {
    Slider,
  },
  data() {
    return {
      pageContent: document.querySelector(".page-content"),
      navbarLogin: document.querySelector(".navbar-login"),
    };
  },
  computed: {
    ...mapGetters(["userPersonalData"]),
  },
  methods: {},
  created() {},
};
</script>

<style scoped lang="scss">
h2 {
  text-align: center;
  margin-bottom: 2rem;
}
.home-component {
  .mission-section {
    .section-illustrator {
      grid-area: mission-illustrator;
    }
    .section-text {
      grid-area: mission-text;
    }
    display: grid;
    grid-template-columns: 50% 50%;
    align-items: center;
    grid-template-areas: "mission-illustrator mission-text";
    @media (max-width: 768px) {
      grid-template-columns: 100%;
      grid-template-areas:
        "mission-illustrator"
        "mission-text";
    }
  }
  .vision-section {
    .section-illustrator {
      grid-area: vision-illustrator;
    }
    .section-text {
      grid-area: vision-text;
    }
    display: grid;
    grid-template-columns: 50% 50%;
    align-items: center;
    grid-template-areas: "vision-text vision-illustrator";
    @media (max-width: 768px) {
      grid-template-columns: 100%;
      grid-template-areas:
        "vision-illustrator"
        "vision-text";
    }
  }
  .mission-section,
  .vision-section {
    background-color: var(--color-bg-secondary);
    .section-illustrator {
      text-align: center;
      img {
        width: 100%;
      }
    }
    .section-text {
      padding: 50px;
      h3,
      p {
        display: inline-block;
        color: #fff;
        text-align: justify;
        line-height: 2;
      }
      h3 {
        font-size: 32px;
      }
    }
  }

  .footer-section {
    p {
      color: #ececec;
    }
    h4 {
      color: #fff;
    }
    .footer-logo {
      grid-area: footer-logo;
      .logo {
        width: 90px;
        background-color: #fff;
        border-radius: 50%;
        margin: 25px auto;
        img {
          width: 100%;
          height: auto;
          padding: 10px;
        }
      }
    }
    .footer-address {
      grid-area: footer-address;
    }
    .footer-phones {
      grid-area: footer-phones;
      p {
        direction: ltr;
      }
    }
    background-color: var(--color-bg-home-footer);
    text-align: center;
    align-items: center;
    display: grid;
    grid-template-columns: 30% 35% 35%;
    grid-template-areas: "footer-logo footer-address footer-phones";
    @media (max-width: 768px) {
      grid-template-columns: 50% 50%;
      grid-template-areas:
        "footer-logo footer-logo"
        "footer-address footer-phones";
    }
    @media (max-width: 576px) {
      grid-template-columns: 100%;
      grid-template-areas:
        "footer-logo"
        "footer-address"
        "footer-phones";
    }
  }
}
</style>

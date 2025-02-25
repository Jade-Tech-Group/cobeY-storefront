<template>
  <div class="relative mx-auto">
    <div>
      <div class="navigation-wrapper">
        <div ref="container" class="keen-slider">
          <div
            v-for="(node, index) in nodes"
            :key="index"
            class="keen-slider__slide fader__slide min-w-full"
            :style="{ opacity: opacities[index] }"
          >
            <NuxtImg
              width="1920"
              height="800"
              class="cover w-full h-[420px] lg:h-[560px] xl:h-[680px] cursor-pointer"
              :src="node.desktop_image"
              alt="Hero image"
              loading="eager"
              sizes="sm:100vw md:1400px"
              fetchpriority="high"
              preload
              placeholder
              placeholder-class="blur-xl"
            />
          </div>
        </div>
        <svg
          @click="slider?.prev()"
          :class="{
            arrow: true,
            'arrow--left': true,
          }"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
          ></path>
        </svg>
        <svg
          v-if="slider"
          @click="slider.next()"
          class="hover:[#222841]"
          :class="{
            arrow: true,
            'arrow--right': true,
          }"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"></path>
        </svg>
      </div>
      <div v-if="slider" class="dots">
        <button
          v-for="(_slide, idx) in dotHelper"
          @click="slider.moveToIdx(idx)"
          :class="{ dot: true, active: current === idx }"
          :key="idx"
        ></button>
      </div>
    </div>
    <div class="w-full"></div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useKeenSlider } from "keen-slider/vue.es";
import "keen-slider/keen-slider.min.css";
import type { PropType } from "vue";

const props = defineProps({
  nodes: { type: Array as PropType<Banner[]>, required: true },
});

const images = [
  "https://images.unsplash.com/photo-1537832816519-689ad163238b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDkyMnwwfDF8c2VhcmNofDI3fHxmYXNoaW9uJTIwY29sbGVjdGlvbnxlbnwwfHx8fDE2OTY4NzI4NzR8MA&ixlib=rb-4.0.3&q=80&w=2000",
  "https://v3.woonuxt.com/.netlify/images?w=1400&h=800&url=%2Fimages%2Fhero-4.jpg",
];

import type { Banner } from "~/types";
const opacities = ref<number[]>([]);
const current = ref(1);
const [container, slider] = useKeenSlider({
  initial: current.value,
  slides: props.nodes.length,
  loop: true,
  defaultAnimation: {
    duration: 3000,
  },
  detailsChanged: (s) => {
    opacities.value = s.track.details.slides.map((slide) => slide.portion);
  },
  slideChanged: (s) => {
    current.value = s.track.details.rel;
  },
});

const dotHelper = computed(() =>
  slider.value
    ? [...Array(slider.value.track.details.slides.length).keys()]
    : []
);
</script>
<style scoped>
[class^="number-slide"],
[class*=" number-slide"] {
  background: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  color: #fff;
  font-weight: 500;
  height: 800px;
}
.number-slide2 {
  background: rgb(255, 75, 64);
  background: linear-gradient(
    128deg,
    rgba(255, 154, 63, 1) 0%,
    rgba(255, 75, 64, 1) 100%
  );
}
.navigation-wrapper {
  position: relative;
}
.dots {
  position: absolute;
  display: flex;
  padding: 10px 0;
  margin-top: -50px;
  justify-content: center;
  left: 0;
  right: 0;
}
.dot {
  border: none;
  width: 10px;
  height: 10px;
  background: #c5c5c5;
  border-radius: 50%;
  margin: 0 5px;
  padding: 5px;
  cursor: pointer;
}
.dot:focus {
  outline: none;
}
.dot.active {
  background: #000;
}
.arrow {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  fill: rgba(120, 111, 111, 0.5);
  cursor: pointer;
}
.arrow:hover path {
  fill: #222841;
}

.arrow--left {
  left: 5%;
}
.arrow--right {
  left: auto;
  right: 5%;
}
.arrow--hover {
  fill: rgba(120, 111, 111, 0.5);
}
</style>

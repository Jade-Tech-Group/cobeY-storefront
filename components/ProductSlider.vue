<script setup lang="ts">
import { useKeenSlider } from "keen-slider/vue.es";
import "keen-slider/keen-slider.min.css";
import ProductCard from "./productElements/ProductCard.vue";
import type { Product } from "~/types";
import { ref } from "vue";

const props = defineProps<{
  products: Product[] | null;
}>();

const isLoading = ref(true);
const [sliderRef] = useKeenSlider(
  {
    loop: true,
    breakpoints: {
      "(min-width: 360px)": {
        slides: { perView: 2, spacing: 15 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 4, spacing: 15 },
      },
      "(min-width: 1244px)": {
        slides: { perView: 5, spacing: 30 },
      },
      "(min-width: 1920px)": {
        slides: { perView: 5, spacing: 30 },
      },
    },
  },
  [
    (slider) => {
      const animation = useSliderAnimation(slider);

      // Add event listeners for initialization
      slider.on("created", () => {
        isLoading.value = false;
        useSliderEvents(slider, animation);
      });

      // Handle window resize events
      window.addEventListener("resize", () => {
        slider.update();
      });

      // Iniciar el timeout inicial
      animation.nextTimeout();
    },
  ]
);
const useSliderAnimation = (slider: any) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  const mouseOver = ref(false);

  const clearNextTimeout = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  const nextTimeout = () => {
    clearNextTimeout();
    timeout = setTimeout(() => {
      slider.next(250);
    }, 5000);
  };

  return {
    nextTimeout,
    clearNextTimeout,
    mouseOver,
  };
};

// Composable para los eventos
const useSliderEvents = (
  slider: any,
  animation: ReturnType<typeof useSliderAnimation>
) => {
  const { nextTimeout, clearNextTimeout, mouseOver } = animation;

  if (slider.container1) {
    slider.container1.addEventListener("mouseover", () => {
      mouseOver.value = true;
      clearNextTimeout();
    });

    slider.container1.addEventListener("mouseout", () => {
      mouseOver.value = false;
      nextTimeout();
    });
  }

  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", () => {
    if (!mouseOver.value) nextTimeout();
  });
};
</script>

<template>
  <section class="w-full grid sm:gap-12 xs:gap-4 py-10">
    <div ref="sliderRef" class="keen-slider w-full">
      <div
        v-if="products"
        class="w-full flex flex-col justify-center overflow-hidden items-center gap-2"
      >
        <div class="flex w-full">
          <div
            v-for="(product, i) in products"
            :key="i"
            class="keen-slider__slide"
          >
            <ProductCard
              :key="product.id"
              class="w-full"
              :node="product"
              :index="i"
              :class="{
                hidden: i === products.length - 1,
                'lg:block': i === products.length - 1,
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>

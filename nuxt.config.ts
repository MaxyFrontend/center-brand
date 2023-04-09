// https://nuxt.com/docs/api/configuration/nuxt-config
import viteImagemin from 'vite-plugin-imagemin'
export default defineNuxtConfig({
  build: {
    transpile: ['gsap'],
  },
  modules:[
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore', // import { defineStore } from 'pinia'
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
  ],
    vite: {
        css: {
            preprocessorOptions: {
              scss: {
                additionalData: '@use "@/assets/scss/_variables.scss" as *;'
              }
            }
          },
          plugins: [
            viteImagemin({
              gifsicle: {
                optimizationLevel: 7,
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              mozjpeg: {
                quality: 80,
              },
              pngquant: {
                quality: [0.8, 0.9],
                speed: 4,
              },
              svgo: {
                plugins: [
                  {
                    name: 'removeViewBox',
                  },
                  {
                    name: 'removeEmptyAttrs',
                    active: false,
                  },
                ],
              },
            }),
          ]
    },
    nitro: {
      prerender: {
        routes: ['/']
      }
    },
})

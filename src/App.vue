<template lang="pug">
.app-container
  nav
    el-menu(default-active="landing" router)
      h1 utili👔
      el-menu-item(
        v-for="(route, label) in routes"
        :key="label"
        :index="route.name"
        :route="route"
      ) {{ label }}
      .nav-bottom
        .centered
          el-switch.toggle-dark-mode(
            v-model="isDarkModeEnabled"
            :active-icon="IconMoon"
            :inactive-icon="IconSun"
          )
  main: router-view
</template>

<script lang="ts" setup>
import { useDark } from "@vueuse/core"
import { routes } from "@/router/routes"

import IconMoon from "~icons/heroicons-outline/moon"
import IconSun from "~icons/heroicons-outline/sun"

const isDarkModeEnabled = useDark({ initialValue: "dark" })
</script>

<style lang="less">
body {
  margin: 0;
  font-family: system-ui, ui-sans-serif, sans-serif;
  font-size: 16px;
}

* {
  box-sizing: border-box;
}

.app-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  gap: 2rem;

  > main {
    flex: 1;
  }
}

nav {
  height: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  user-select: none;
  position: relative;

  > ul.el-menu {
    height: 100%;
  }

  h1 {
    text-align: center;
    margin-top: 0;
  }

  .nav-bottom {
    position: absolute;
    bottom: 0;
    width: 100%;

    .centered {
      text-align: center;
      width: 100%;
    }

    .toggle-dark-mode {
      .el-icon {
        transform: scale(1.25) translateY(-1px);
      }

      > .el-switch__label--left {
        color: white;
        .el-icon {
          filter: drop-shadow(0 0 3px black);
        }
      }

      > .el-switch__label--right {
        color: black;
        .el-icon {
          filter: drop-shadow(0 0 4px white);
        }
      }
    }
  }
}
</style>

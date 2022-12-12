<template lang="pug">
.landing-view
  .hero
    h1 utili👔
    h3 some kinda useful tools maybe hopefully
  .recents
    span nothing here yet
</template>

<style lang="less" scoped>
.landing-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  .hero {
    h1 {
      font-size: 3rem;
    }

    h3 {
      font-size: 1.25rem;
    }
  }

  .recents {
    opacity: 0.8;
  }
}
</style>

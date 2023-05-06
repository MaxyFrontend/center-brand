<template>
  <section class="control-panel">
    <div class="container control-panel__container">
        <div class="control-panel__content">
            
        </div>
    </div>
  </section>
</template>

<script setup>
defineEmits(["btnClick"]);
</script>

<style lang="scss">
.control-panel {
  position: relative;
  width: 100%;
  padding-bottom: 70px;
  z-index: 1000;
  overflow: hidden;
}
.control-panel__content {
    display: flex;
    align-items: center;
}
@media (max-width:1400px) {
  .control-panel {
    margin-top: 30px;
  }
}
@media(max-width:1000px) {
  .control-panel__send-order-btn-wrapper {
    display: none;
  }
}
@media (max-width:700px) {
  .control-panel {
    padding-bottom: 40px;
    margin-top: 30px;
  }
}
</style>

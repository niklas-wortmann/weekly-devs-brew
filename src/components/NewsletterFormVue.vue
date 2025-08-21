<script setup lang="ts">
// No props required; this is a simple embedded form
</script>

<template>
  <div class="flex justify-center">
    <iframe
      src="https://embeds.beehiiv.com/7f2a69f2-55ae-49e0-87f9-797d92d34188?slim=true"
      data-test-id="beehiiv-embed"
      height="52"
      frameborder="0"
      scrolling="no"
      title="Subscribe to The Weekly Dev's Brew Newsletter"
      aria-label="Subscribe to The Weekly Dev's Brew Newsletter"
      style="margin:auto; width:80%; background-color: transparent"
    />
  </div>
</template>

<style scoped>
/* Ensure rounded corners are not overridden by embed */
iframe {
  border-radius: 0;
}
</style>

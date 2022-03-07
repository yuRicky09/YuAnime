<template>
  <footer
    class="flex flex-col items-center justify-center gap-4 py-10 lg:flex-row"
  >
    <div class="flex items-center gap-4">
      <h3 class="font-bold">YuAnime</h3>
      <a
        href="https://github.com/yuRicky09/my-portfolio"
        target="_blank"
        class="flex items-center gap-2 hover:opacity-80"
      >
        <GithubIcon />
        <span>Source Code</span>
      </a>
    </div>
    <span>&#169; 2022 Yu Ricky. All Rights Reserved.</span>
  </footer>
</template>

<script setup>
import GithubIcon from "@/assets/images/svg/github.svg";
</script>

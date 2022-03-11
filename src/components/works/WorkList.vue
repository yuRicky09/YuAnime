<template>
  <div>
    <slot name="header"></slot>
    <ul class="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
      <slot></slot>
    </ul>
  </div>
</template>

<template>
  <div>
    <slot name="header"></slot>
    <ul class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
      <slot></slot>
    </ul>
  </div>
</template>

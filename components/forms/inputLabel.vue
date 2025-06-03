<script setup lang="ts">
const props = defineProps({
  inputType: {
    type: String,
  },
  place: {
    type: String,

  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
  link: {
    type: String,

  },
  input_name: {
    type: String,

  },
  feedback: {
    type: String,
    default: "",
  },
  visible: {
    type: Boolean,
    default: false,
  },
  disabled:{
    type: Boolean
  }
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | undefined): void;
}>();

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>
<template>
  <label
    :for="link"
    class="text-white font-semibold flex flex-col tracking-wider gap-3.5 uppercase w-[100%] md:text-2xl"
  >
    <span>{{ input_name }}</span>
    <input
      :type="inputType"
      :placeholder="place"
      :value="modelValue"
      @input="updateValue"
      :id="link"
      class="text-center border-b-2 text-xl outline-none focus:border-green-300 transition-all duration-500 md:text-2xl"
      :aria-describedby="visible ? `${link}-feedback`: undefined"
      :disabled="disabled"
    />
    <p :id="`${link}-feedback`" :class="visible ? 'text-red-700 font-semibold text-sm block' : 'hidden'">
      {{ feedback }}
    </p>
  </label>
</template>

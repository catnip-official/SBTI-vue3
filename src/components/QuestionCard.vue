<template>
  <article class="question">
    <div class="question-meta">
      <div class="badge">第 {{ index + 1 }} 题</div>
      <div>{{ metaLabel }}</div>
    </div>
    <div class="question-title">{{ question.text }}</div>
    <div class="options">
      <label
        v-for="(opt, i) in question.options"
        :key="i"
        class="option"
        :class="{ selected: modelValue === opt.value }"
      >
        <input
          type="radio"
          :name="question.id"
          :value="opt.value"
          :checked="modelValue === opt.value"
          @change="$emit('update:modelValue', opt.value)"
        />
        <div class="option-code">{{ ['A', 'B', 'C', 'D'][i] || i + 1 }}</div>
        <div>{{ opt.label }}</div>
      </label>
    </div>
  </article>
</template>

<script setup>
defineProps({
  question: { type: Object, required: true },
  index: { type: Number, required: true },
  metaLabel: { type: String, required: true },
  modelValue: { type: Number, default: undefined }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.question {
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 18px;
  background: linear-gradient(180deg, #ffffff, #fbfdfb);
}

.question-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
  color: var(--muted);
  font-size: 12px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 999px;
  padding: 6px 10px;
  background: var(--soft);
  border: 1px solid var(--line);
}

.question-title {
  font-size: 16px;
  line-height: 1.7;
  white-space: pre-wrap;
}

.options {
  display: grid;
  gap: 10px;
  margin-top: 14px;
}

.option {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px;
  border-radius: 14px;
  border: 1px solid var(--line);
  background: #fff;
  cursor: pointer;
  transition: border-color .16s ease, background .16s ease, transform .16s ease;
}

.option:hover {
  border-color: #bcd0c1;
  background: #f8fcf9;
}

.option.selected {
  border-color: var(--accent-strong);
  background: var(--soft);
}

.option input {
  margin-top: 3px;
  accent-color: var(--accent-strong);
  transform: scale(1.1);
  flex-shrink: 0;
}

.option-code {
  font-weight: 800;
  color: var(--accent-strong);
  min-width: 22px;
}

@media (max-width: 600px) {
  .question-title {
    font-size: 15px;
  }
}
</style>

qishi <template>
  <div class="test-wrap card">
    <ProgressBar
      :percent="store.progress.value"
      :done="store.answeredCount.value"
      :total="store.totalQuestions.value"
    />

    <div class="question-list">
      <QuestionCard
        v-for="(q, idx) in store.visibleQuestions.value"
        :key="q.id"
        :question="q"
        :index="idx"
        :meta-label="store.getQuestionMetaLabel(q)"
        :model-value="store.answers.value[q.id]"
        @update:model-value="handleAnswer(q, $event)"
      />
    </div>

    <div class="actions-bottom">
      <div class="hint">
        {{ store.isComplete.value
          ? '都做完了。现在可以把你的电子魂魄交给结果页审判。'
          : '全选完才会放行。世界已经够乱了，起码把题做完整。'
        }}
      </div>
      <div class="btn-row">
        <button class="btn-secondary" @click="goBack">返回首页</button>
        <button
          class="btn-primary"
          :disabled="!store.isComplete.value"
          @click="handleSubmit"
        >
          提交并查看结果
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { createTestStore } from '../store'
import ProgressBar from '../components/ProgressBar.vue'
import QuestionCard from '../components/QuestionCard.vue'

const router = useRouter()
const store = createTestStore()

if (!store.visibleQuestions.value.length) {
  router.replace('/')
}

function handleAnswer(q, value) {
  store.setAnswer(q.id, value)
}

function handleSubmit() {
  store.submitTest()
  router.push('/result')
}

function goBack() {
  router.push('/')
}
</script>

<style scoped>
.test-wrap {
  margin-top: 22px;
  padding: 22px;
}

.question-list {
  display: grid;
  gap: 16px;
}

.actions-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 18px;
  padding-top: 6px;
}

.hint {
  color: var(--muted);
  font-size: 13px;
  line-height: 1.7;
}

.btn-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

@media (max-width: 600px) {
  .test-wrap {
    padding: 16px;
  }
}
</style>

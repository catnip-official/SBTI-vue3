import { ref, computed } from 'vue'
import { questions, specialQuestions, DRUNK_TRIGGER_QUESTION_ID } from '../data/questions'
import { dimensionMeta, dimensionOrder, DIM_EXPLANATIONS } from '../data/dimensions'
import { TYPE_LIBRARY, TYPE_IMAGES, NORMAL_TYPES } from '../data/types'

function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function sumToLevel(score) {
  if (score <= 3) return 'L'
  if (score === 4) return 'M'
  return 'H'
}

function levelNum(level) {
  return { L: 1, M: 2, H: 3 }[level]
}

function parsePattern(pattern) {
  return pattern.replace(/-/g, '').split('')
}

export function useTest() {
  const currentScreen = ref('intro')
  const shuffledQuestions = ref([])
  const answers = ref({})
  const previewMode = ref(false)
  const result = ref(null)

  const visibleQuestions = computed(() => {
    const visible = [...shuffledQuestions.value]
    const gateIndex = visible.findIndex(q => q.id === 'drink_gate_q1')
    if (gateIndex !== -1 && answers.value['drink_gate_q1'] === 3) {
      visible.splice(gateIndex + 1, 0, specialQuestions[1])
    }
    return visible
  })

  const totalQuestions = computed(() => visibleQuestions.value.length)

  const answeredCount = computed(() =>
    visibleQuestions.value.filter(q => answers.value[q.id] !== undefined).length
  )

  const progress = computed(() =>
    totalQuestions.value ? (answeredCount.value / totalQuestions.value) * 100 : 0
  )

  const isComplete = computed(() =>
    answeredCount.value === totalQuestions.value && totalQuestions.value > 0
  )

  function startTest(preview = false) {
    previewMode.value = preview
    answers.value = {}
    result.value = null
    const shuffledRegular = shuffle(questions)
    const insertIndex = Math.floor(Math.random() * shuffledRegular.length) + 1
    shuffledQuestions.value = [
      ...shuffledRegular.slice(0, insertIndex),
      specialQuestions[0],
      ...shuffledRegular.slice(insertIndex)
    ]
    currentScreen.value = 'test'
  }

  function setAnswer(questionId, value) {
    answers.value = { ...answers.value, [questionId]: value }
  }

  function computeResult() {
    const rawScores = {}
    const levels = {}
    Object.keys(dimensionMeta).forEach(dim => { rawScores[dim] = 0 })

    questions.forEach(q => {
      rawScores[q.dim] += Number(answers.value[q.id] || 0)
    })

    Object.entries(rawScores).forEach(([dim, score]) => {
      levels[dim] = sumToLevel(score)
    })

    const userVector = dimensionOrder.map(dim => levelNum(levels[dim]))
    const ranked = NORMAL_TYPES.map(type => {
      const vector = parsePattern(type.pattern).map(levelNum)
      let distance = 0
      let exact = 0
      for (let i = 0; i < vector.length; i++) {
        const diff = Math.abs(userVector[i] - vector[i])
        distance += diff
        if (diff === 0) exact += 1
      }
      const similarity = Math.max(0, Math.round((1 - distance / 30) * 100))
      return { ...type, ...TYPE_LIBRARY[type.code], distance, exact, similarity }
    }).sort((a, b) => {
      if (a.distance !== b.distance) return a.distance - b.distance
      if (b.exact !== a.exact) return b.exact - a.exact
      return b.similarity - a.similarity
    })

    const bestNormal = ranked[0]
    const drunkTriggered = answers.value[DRUNK_TRIGGER_QUESTION_ID] === 2

    let finalType, modeKicker, badge, sub, special, secondaryType

    if (drunkTriggered) {
      finalType = TYPE_LIBRARY.DRUNK
      secondaryType = bestNormal
      modeKicker = '隐藏人格已激活'
      badge = '匹配度 100% · 酒精异常因子已接管'
      sub = '乙醇亲和性过强，系统已直接跳过常规人格审判。'
      special = true
    } else if (bestNormal.similarity < 60) {
      finalType = TYPE_LIBRARY.HHHH
      modeKicker = '系统强制兜底'
      badge = `标准人格库最高匹配仅 ${bestNormal.similarity}%`
      sub = '标准人格库对你的脑回路集体罢工了，于是系统把你强制分配给了 HHHH。'
      special = true
    } else {
      finalType = bestNormal
      modeKicker = '你的主类型'
      badge = `匹配度 ${bestNormal.similarity}% · 精准命中 ${bestNormal.exact}/15 维`
      sub = '维度命中度较高，当前结果可视为你的第一人格画像。'
      special = false
    }

    return {
      rawScores,
      levels,
      ranked,
      bestNormal,
      finalType,
      modeKicker,
      badge,
      sub,
      special,
      secondaryType: secondaryType || null
    }
  }

  function submitTest() {
    result.value = computeResult()
    currentScreen.value = 'result'
  }

  function goToScreen(screen) {
    currentScreen.value = screen
  }

  function getQuestionMetaLabel(q) {
    if (q.special) return '补充题'
    return previewMode.value ? dimensionMeta[q.dim].name : '维度已隐藏'
  }

  function getTypeImage(code) {
    return TYPE_IMAGES[code] || null
  }

  function getDimensions() {
    if (!result.value) return []
    return dimensionOrder.map(dim => ({
      key: dim,
      name: dimensionMeta[dim].name,
      model: dimensionMeta[dim].model,
      level: result.value.levels[dim],
      score: result.value.rawScores[dim],
      explanation: DIM_EXPLANATIONS[dim][result.value.levels[dim]]
    }))
  }

  return {
    currentScreen,
    shuffledQuestions,
    answers,
    previewMode,
    result,
    visibleQuestions,
    totalQuestions,
    answeredCount,
    progress,
    isComplete,
    startTest,
    setAnswer,
    submitTest,
    goToScreen,
    getQuestionMetaLabel,
    getTypeImage,
    getDimensions
  }
}

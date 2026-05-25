export const KEYWORD_PATTERNS = [
    { label: 'AI', pattern: /\bai\b/i },
    { label: 'blockchain', pattern: /\bblockchain\b/i },
    { label: 'realtime', pattern: /\brealtime\b/i },
    { label: 'payments', pattern: /\bpayments?\b/i },
    { label: 'chat', pattern: /\bchat\b/i },
    { label: 'video streaming', pattern: /\bvideo streaming\b/i },
]

export function normalizeText(input) {
    return input
        .toLowerCase()
        .replace(/[-_]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

export function detectKeywords(input) {
    const normalizedInput = normalizeText(input)

    return KEYWORD_PATTERNS
        .filter(({ pattern }) => pattern.test(normalizedInput))
        .map(({ label }) => label)
}

export function getComplexity(keywordCount) {
    if (keywordCount >= 4) {
        return 'High'
    }

    if (keywordCount >= 2) {
        return 'Medium'
    }

    return 'Low'
}

export function getMVPRecommendation(complexity) {
    if (complexity === 'High') {
        return 'Build a staged MVP, reduce technical risk first, and validate the highest-impact flows before expanding scope.'
    }

    if (complexity === 'Medium') {
        return 'Prioritize the core workflow, sequence the riskiest work early, and validate the main user path before adding enhancements.'
    }

    return 'Keep the MVP lean, validate one primary user workflow, and defer optional features until there is evidence of demand.'
}

export function analyzeIdea(input) {
    const trimmedInput = input.trim()

    if (!trimmedInput) {
        return {
            error: 'Please enter a project idea before analyzing.',
            matchedKeywords: [],
            complexity: null,
            recommendation: null,
            idea: '',
        }
    }

    const matchedKeywords = detectKeywords(trimmedInput)
    const complexity = getComplexity(matchedKeywords.length)

    return {
        error: null,
        matchedKeywords,
        complexity,
        recommendation: getMVPRecommendation(complexity),
        idea: trimmedInput,
    }
}

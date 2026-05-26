export const keywordGroups = {
    ai: ['ai', 'artificial intelligence', 'machine learning', 'ml'],
    blockchain: ['blockchain', 'block chain', 'crypto', 'web3'],
    realtime: ['realtime', 'real-time', 'live', 'instant'],
    payments: ['payment', 'payments', 'banking', 'transactions'],
    chat: ['chat', 'chatbot', 'messaging', 'messages'],
    'video streaming': ['video streaming', 'livestream', 'live stream', 'live video', 'streaming'],
}

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function aliasMatches(normalizedInput, alias) {
    const escapedAlias = escapeRegExp(alias)
    const pattern = new RegExp(`\\b${escapedAlias.replace(/\\s+/g, '\\s+')}\\b`, 'i')

    return pattern.test(normalizedInput)
}

export function normalizeText(input) {
    return input
        .toLowerCase()
        .replace(/[-_]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

export function detectKeywords(input) {
    const normalizedInput = input.toLowerCase()
    const detectedKeywords = []

    Object.entries(keywordGroups).forEach(([mainKeyword, aliases]) => {
        const found = aliases.some((alias) => aliasMatches(normalizedInput, alias))

        if (found) {
            detectedKeywords.push(mainKeyword)
        }
    })

    return detectedKeywords
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

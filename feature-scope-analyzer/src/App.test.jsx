import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { detectKeywords } from './analyzer'
import App from './App'

describe('Feature Scope Analyzer', () => {
    it('detects keywords and calculates high complexity', async () => {
        const user = userEvent.setup()

        render(<App />)

        await user.type(
            screen.getByLabelText(/project idea/i),
            'AI chat payments video streaming realtime blockchain platform'
        )
        await user.click(screen.getByRole('button', { name: /analyze/i }))

        const keywordBlock = screen.getByText('Detected keywords').closest('.detail-block')

        expect(screen.getByText('High')).toBeInTheDocument()
        expect(within(keywordBlock).getByText(/ai, blockchain, realtime, payments, chat, video streaming/i)).toBeInTheDocument()
        expect(screen.getByText(/staged MVP/i)).toBeInTheDocument()
    })

    it('shows a validation error for empty input and does not update results', async () => {
        const user = userEvent.setup()

        render(<App />)

        await user.click(screen.getByRole('button', { name: /analyze/i }))

        expect(screen.getByText(/please enter a project idea/i)).toBeInTheDocument()
        expect(screen.queryByText(/analysis results/i)).not.toBeInTheDocument()
    })

    it('refreshes the results panel after clicking Analyze', async () => {
        const user = userEvent.setup()

        render(<App />)

        const textarea = screen.getByLabelText(/project idea/i)

        await user.type(textarea, 'AI chat product')
        await user.click(screen.getByRole('button', { name: /analyze/i }))

        expect(screen.getByText('Medium')).toBeInTheDocument()
        expect(screen.getByText(/AI, chat/i)).toBeInTheDocument()

        await user.clear(textarea)
        await user.type(textarea, 'payments')
        await user.click(screen.getByRole('button', { name: /analyze/i }))

        const keywordBlock = screen.getByText('Detected keywords').closest('.detail-block')

        expect(screen.getByText('Low')).toBeInTheDocument()
        expect(within(keywordBlock).getByText(/payments/i)).toBeInTheDocument()
    })

    it('does not match substring keywords inside unrelated words', () => {
        expect(detectKeywords('chair')).toEqual([])
        expect(detectKeywords('blockchainy')).toEqual([])
    })

    it('supports singular and plural keyword detection', () => {
        expect(detectKeywords('payment')).toEqual(['payments'])
        expect(detectKeywords('payments')).toEqual(['payments'])
    })

    it('detects aliases for the expanded keyword groups', () => {
        expect(detectKeywords('block chain app')).toEqual(['blockchain'])
        expect(detectKeywords('livestream classes')).toEqual(['video streaming'])
        expect(detectKeywords('chatbot ecommerce assistant')).toEqual(['chat'])
        expect(detectKeywords('crypto donation tracker')).toEqual(['blockchain'])
        expect(detectKeywords('live driver tracking')).toEqual(['realtime'])
        expect(detectKeywords('banking platform')).toEqual(['payments'])
        expect(detectKeywords('instant messaging app')).toEqual(['realtime', 'chat'])
    })

    it('detects multi-word phrases as whole phrases', () => {
        expect(detectKeywords('video streaming')).toEqual(['video streaming'])
        expect(detectKeywords('We need video streaming for live events')).toEqual(['realtime', 'video streaming'])
    })
})

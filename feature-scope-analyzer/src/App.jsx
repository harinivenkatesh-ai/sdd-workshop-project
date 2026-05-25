import { useState } from 'react'
import './App.css'
import { analyzeIdea } from './analyzer'

function App() {
  const [idea, setIdea] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [error, setError] = useState('')

  const handleAnalyze = () => {
    const result = analyzeIdea(idea)

    if (result.error) {
      setError(result.error)
      setAnalysis(null)
      return
    }

    setError('')
    setAnalysis(result)
  }

  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">Feature Scope Analyzer</p>
        <h1>Turn project ideas into a quick complexity signal</h1>
        <p className="subtitle">
          Enter a project concept, click Analyze, and review the scope, complexity,
          and MVP guidance in one place.
        </p>

        <label className="input-label" htmlFor="idea-input">
          Project idea
        </label>
        <textarea
          id="idea-input"
          className="idea-input"
          rows="6"
          placeholder="Describe the product idea, key workflows, and any technical direction."
          value={idea}
          onChange={(event) => setIdea(event.target.value)}
        />

        <div className="actions">
          <button type="button" className="analyze-button" onClick={handleAnalyze}>
            Analyze
          </button>
        </div>

        {error ? <p className="error-message">{error}</p> : null}
      </section>

      {analysis ? (
        <section className="results-panel" aria-live="polite">
          <div className="result-header">
            <h2>Analysis results</h2>
            <span className={`complexity-badge ${analysis.complexity.toLowerCase()}`}>
              {analysis.complexity}
            </span>
          </div>

          <p className="submitted-idea">Submitted idea: {analysis.idea}</p>

          <div className="detail-block">
            <h3>Detected keywords</h3>
            <p>
              {analysis.matchedKeywords.length
                ? analysis.matchedKeywords.join(', ')
                : 'No predefined technical keywords detected'}
            </p>
          </div>

          <div className="detail-block">
            <h3>MVP recommendation</h3>
            <p>{analysis.recommendation}</p>
          </div>
        </section>
      ) : null}
    </main>
  )
}

export default App

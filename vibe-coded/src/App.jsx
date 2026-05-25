function App() {
  const keywords = [
    "ai",
    "blockchain",
    "realtime",
    "payments",
    "chat",
    "video streaming"
  ];

  const analyzeProject = () => {
    const input = document.getElementById("projectInput").value.toLowerCase();

    const foundKeywords = keywords.filter((word) =>
      input.includes(word)
    );

    let complexity = "Low";

    if (foundKeywords.length >= 4) {
      complexity = "High";
    } else if (foundKeywords.length >= 2) {
      complexity = "Medium";
    }

    let suggestion = "Build full MVP";

    if (complexity === "Medium") {
      suggestion = "Focus on core features";
    }

    if (complexity === "High") {
      suggestion = "Start with login + one core feature";
    }

    document.getElementById("result").innerHTML = `
      <h2>Complexity: ${complexity}</h2>
      <p><strong>Detected Keywords:</strong> ${foundKeywords.length > 0
        ? foundKeywords.join(", ")
        : "None"
      }</p>
      <p><strong>Suggested MVP:</strong> ${suggestion}</p>
    `;
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
        maxWidth: "700px",
        margin: "auto",
      }}
    >
      <h1>Feature Scope Analyzer</h1>

      <textarea
        id="projectInput"
        rows="6"
        placeholder="Describe your app idea..."
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          borderRadius: "8px",
        }}
      />

      <br />
      <br />

      <button
        onClick={analyzeProject}
        style={{
          padding: "12px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Analyze Project
      </button>

      <div
        id="result"
        style={{
          marginTop: "30px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      ></div>
    </div>
  );
}

  export default App;
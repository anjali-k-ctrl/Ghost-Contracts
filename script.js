function analyzeInput() {
  const fileInput = document.getElementById('fileInput');
  const textInput = document.getElementById('textInput').value.trim();

  const formData = new FormData();
  let endpoint = '';

  if (fileInput.files.length > 0) {
    formData.append('file', fileInput.files[0]);
    endpoint = 'http://localhost:5000/api/analyze_file';
  } else if (textInput.length > 0) {
    formData.append('text', textInput);
    endpoint = 'http://localhost:5000/api/analyze_text';
  } else {
    return alert('Please upload a file or paste some text.');
  }

  fetch(endpoint, {
    method: 'POST',
    body: formData,
  })
    .then(res => res.json())
    .then(data => {
      const resultsSection = document.getElementById('results');
      const resultsContainer = document.querySelector('.results-container');
      resultsSection.style.display = 'block';
      resultsContainer.innerHTML = '';

      if (data.summary) {
        const summary = document.createElement('div');
        summary.className = 'result-card';
        summary.innerHTML = `<strong>📑 Summary:</strong><br/><p>${data.summary}</p>`;
        resultsContainer.appendChild(summary);
      }

      if (data.clauses) {
        data.clauses.forEach((clause, index) => {
          const div = document.createElement('div');
          div.className = 'result-card ' + (clause.risk || '');
          div.innerHTML = `
            <strong>Clause ${index + 1}</strong><br/>
            <p>${clause.original}</p>
            <em>➡️ ${clause.simplified}</em>
          `;
          resultsContainer.appendChild(div);
        });
      }
    })
    .catch(err => {
      console.error(err);
      alert('Something went wrong while analyzing.');
    });
}



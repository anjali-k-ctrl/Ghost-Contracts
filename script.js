
function analyzeFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (!file) return alert('Please upload a file');

  const formData = new FormData();
  formData.append('file', file);

  fetch('http://localhost:5000/api/analyze', {
    method: 'POST',
    body: formData,
  })
    .then(res => res.json())
    .then(data => {
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = '';
      data.clauses.forEach((clause, index) => {
        const div = document.createElement('div');
        div.className = 'result-card ' + (clause.risk || '');
        div.innerHTML = `
          <strong>Clause ${index + 1}</strong><br/>
          ${clause.original}<br/>
          <em>➡️ ${clause.simplified}</em>
        `;
        resultsDiv.appendChild(div);
      });
    })
    .catch(err => {
      console.error(err);
      alert('Something went wrong while analyzing the file.');
    });
}

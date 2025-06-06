import { useState } from 'react'

const TemplateEditor  = () => {
    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    const [link, setLink] = useState("")
    const [result, setResult] = useState("")

    const generate = () => {
    const text = 
    `
    タイトル "${title}" 
    日付 ${date}
    リンク${link}
    `.trim()
        setResult(text)
    }


  return (
    <div>
        <label>Title: </label><br />
        <input value={title} onChange={e => setTitle(e.target.value)} /><br />
        <label>Date: </label><br />
        <input value={date} onChange={e => setDate(e.target.value)} /><br />
        <label>Link: </label><br />
        <input value={link} onChange={e => setLink(e.target.value)} /><br />
        <button onClick={generate} style={{ marginTop: '10px' }}>作成</button>

      {result && (
        <div>
          <h3>結果</h3>
          <div>{result}</div>
        </div>
      )}

    </div>
  );
};

export default TemplateEditor;
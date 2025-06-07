import { useState } from 'react'
import styles from './TemplateEditor.module.css'

const TemplateEditor  = () => {
    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    const [link, setLink] = useState("")
    const [result, setResult] = useState("")

    const generate = () => {
    const text = 
    `
    タイトル  "${title}" 
    日付 ${date}
    リンク${link}
    `.trim()
        setResult(text)
    }


  return (
    <div>
      <h2>テンプレート編集</h2>
        <label>Title: </label><br />
        <input placeholder="タイトルを入力" value={title} onChange={e => setTitle(e.target.value)} /><br />
        <label>Date: </label><br />
        <input placeholder="日付を入力" value={date} onChange={e => setDate(e.target.value)} /><br />
        <label>Link: </label><br />
        <input placeholder="リンクを入力" value={link} onChange={e => setLink(e.target.value)} /><br />
        <button onClick={generate} style={{ marginTop: '10px' }}>作成</button>

      {result && (
        <div>
          <h3>結果</h3>
          <div className = {styles.result}>{result}</div> <br />
          <button onClick={() => navigator.clipboard.writeText(result)}>結果をコピー</button>
        </div>
      )}

    </div>
  );
};

export default TemplateEditor;
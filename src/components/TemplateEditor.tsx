import { useState, useEffect } from 'react'
import styles from './TemplateEditor.module.css'

const TemplateEditor  = () => {

    // 基本的な状態管理
    const [template, setTemplate] = useState('今日の曲のタイトルは"{title}"で、作者は"{author}"です')
    const [fields, setFields] = useState<Record<string, string>>({})
    const [result, setResult] = useState("")
  
    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    const [link, setLink] = useState("")
    //const [result, setResult] = useState("")

    // テンプレートから{変数}を見つける
    const findVariables = (text : string) => {
        const matches = text.match(/\{([^}]+)\}/g)
      return matches ? matches.map(match => match.slice(1, -1)) : []
    }

    // フィールドの値を更新する関数
    const updateField = (fieldName : string, value : string) => {
      setFields(prev => ({
        ...prev,
        [fieldName]: value
      }))
    }

    // テンプレートに値を入れる関数
    const fillTemplate = (templateText : string, fieldValues : Record<string, string>) => {
      let result = templateText
      Object.entries(fieldValues).forEach(([key, value]) => {
        const placeholder = `{${key}}`
        result = result.replaceAll(placeholder, value || `{${key}}`)
      })
      return result
    }

        // テンプレートが変わったときに実行される
    useEffect(() => {
      // 新しい変数を見つける
      const variables = findVariables(template)
      
      // 新しいフィールドオブジェクトを作る
      const newFields = { ...fields }
      variables.forEach(variable => {
        if (!(variable in newFields)) {
          newFields[variable] = ''
        }
      })
      
      setFields(newFields)
    }, [template])

        // テンプレートかフィールドが変わったときに結果を更新
    useEffect(() => {
      setResult(fillTemplate(template, fields))
    }, [template, fields])

    const variables = findVariables(template)


  useEffect(() => {
    const text = 
    `
     タイトル "${title}"
      日付 ${date}
      リンク ${link}
    `.trim();
   setResult(text);
  }, [title, date, link]);


  return (
    <div>
      {/* Step 1: テンプレート入力 */}
      <div style={{ marginBottom: '20px' }}>
        <h3>📝 テンプレートを入力</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>
          変数は {`{変数名}`} の形式で書いてください
        </p>
        <textarea
          style={{
            width: '100%',
            height: '100px',
            padding: '10px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          placeholder="例: 今日の曲は{title}で、作者は{author}です"
        />
      </div>

        {/* Step 2: 変数の入力フィールド */}
      {variables.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3>✏️ 変数を入力</h3>
          <p style={{ color: '#666', fontSize: '14px' }}>
            見つかった変数: {variables.join(', ')}
          </p>
          {variables.map(variable => (
            <div key={variable} style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                {variable}:
              </label>
              <input
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
                value={fields[variable] || ''}
                onChange={(e) => updateField(variable, e.target.value)}
                placeholder={`${variable}を入力してください`}
              />
            </div>
          ))}
        </div>
        )} 


      <h2>テンプレート編集</h2>
        <label>Title: </label><br />
        <input placeholder="{タイトル}を入力" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
        <label>Date: </label><br />
        <input placeholder="日付を入力" value={date} onChange={(e) => setDate(e.target.value)}/><br />
        <label>Link: </label><br />
        <input placeholder="リンクを入力" value={link} onChange={(e) => setLink(e.target.value)} /><br />



        <h3>結果</h3>
        <textarea 
          className={styles.result}
          value={result}
          onChange={(e) => setResult(e.target.value)}
        />
        <br />
        <button onClick={() => navigator.clipboard.writeText(result)}>結果をコピー</button>


    </div>
  );
};

export default TemplateEditor;
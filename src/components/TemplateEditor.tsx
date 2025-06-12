import { useState, useEffect } from 'react'
import styles from './TemplateEditor.module.css'

const TemplateEditor  = () => {

    //状態管理
    const [template, setTemplate] = useState("曲のタイトルは\"{title}\"で、作者は\"{author}\"です")
    const [fields, setFields] = useState <Record<string, string>>({}) //オブジェクトなのでRecord<>が必要
    const [result, setResult] = useState("")
  

    //テンプレートから{変数}を見つける関数
    const findVariables = (text : string) => {
        const matches = text.match(/\{[^}]+\}/g) //正規表現で{}の文字列を検索
      return matches ? matches.map(match => match.slice(1, -1)) : [] //{}を見つけたときに、{}の括弧をなくした配列をmatchesに入れる
    }

    //フィールドの値を更新する関数
    const updateField = (fieldName : string, value : string) => {

      //スプレッド演算子を使って新しいオブジェクトを作成し元のオブジェクトをコピーする関数 (const new = old としてオブジェクトをコピーすると、参照先しかコピーできていないので、newを変更するとoldも変更される)
      const updatedFields = {
          ...fields,           // 現在のfieldsを展開してupdateFieldsに格納
          [fieldName]: value
      }
    
    setFields(updatedFields)  // 作成したオブジェクトをsetFieldsに渡す  
    }

    // テンプレートに値を入れる関数
    const fillTemplate = (templateText : string, fieldValues : Record<string, string>) => {
      let result = templateText
      Object.entries(fieldValues).forEach(([key, value]) => { //オブジェクトを配列に変換
        const placeholder = `{${key}}`
        result = result.replaceAll(placeholder, value || `{${key}}`) //valueがnullのときkeyの文字列が代入される
      })
      return result
    }

    //テンプレート変更時に、新しい変数が存在したら新しくフィールドオブジェクトを作る
    useEffect(() => {
      //新しい変数を見つける
      const variables = findVariables(template)
      
      //新しいフィールドオブジェクトを作る
      const newFields = { ...fields }
      variables.forEach(variable => {
        if (!(variable in newFields)) { //(variable in newFields)でnewFieldsにvariableがないとfalseになるので、!(false)としてif処理されるようにした
          newFields[variable] = ''
        }
      })
      
      setFields(newFields)
    }, [template])


    //テンプレートかフィールドが変わったときに結果を更新
    useEffect(() => {
      setResult(fillTemplate(template, fields))
    }, [template, fields])


    const variables = findVariables(template) //variables配列を最初に作成


  return (
    <div>
      <div>
        <h2>テンプレートを入力</h2>
        <p>
          変数は {`{変数名}`} の形式で書いてください
        </p>
        <textarea
          className = {styles.templateEditField}
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          placeholder="例: 今日の曲は{title}で、作者は{author}です"
        />
      </div>

      {variables.length > 0 && (  //新しい変数が検出されると、UIに編集フィールドを作成する
        <div>
          <p>
            見つかった変数: {variables.join(', ')}
          </p>
          {variables.map(variable => ( //variables配列配列内のそれぞれの変数に対して処理をする
            <div className = {styles.variables}>
              <label className = {styles.variableName}>
                {variable}:
              </label>
              <input
                className = {styles.editField}
                value={fields[variable] || ''}
                onChange={(e) => updateField(variable, e.target.value)}
                placeholder= {`${variable}を入力してください`}
              />
            </div>
          ))}
        </div>
        )} 

        <h3>結果</h3>
        <textarea 
          className={styles.resultField}
          value={result}
          onChange={(e) => setResult(e.target.value)}
        />
        <br />
        <button onClick={() => navigator.clipboard.writeText(result)}>結果をコピー</button>


    </div>
  );
};

export default TemplateEditor;
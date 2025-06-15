import { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useAuthContext } from '../contexts/AuthContext'
import { db, auth } from '../firebase'
import styles from './TemplateSaver.module.css'

// Props の型定義
interface TemplateSaverProps {
  template: string;
  onSaveSuccess?: () => void;
}


const TemplateSaver = ({ template, onSaveSuccess } : TemplateSaverProps) => {
  const [templateName, setTemplateName] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { user } = useAuthContext()

  const handleSaveTemplate = async () => {
    if (!user) {
      alert('ログインが必要です')
      return
    }

    if (!templateName.trim()) {
      alert('テンプレート名を入力してください')
      return
    }

    if (!template.trim()) {
      alert('保存するテンプレートがありません')
      return
    }

    setIsSaving(true)

    try {
      // Firestoreにテンプレートを保存
      await addDoc(collection(db, "users", user.uid, "templates"), {
        name: templateName.trim(),
        content: template,
        userId: user.uid,
        userEmail: user.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })

      alert('テンプレートが保存されました！')
      setTemplateName('')
      setIsModalOpen(false)
      
      window.location.reload();

    } catch (error) {
      console.error('テンプレートの保存に失敗しました:', error)
      alert('テンプレートの保存に失敗しました。もう一度お試しください。')
    } finally {
      setIsSaving(false)
    }
  }

  const openModal = () => {
    if (!user) {
      alert('ログインが必要です')
      return
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTemplateName('')
  }

  return (
    <div>
      <button 
        onClick={openModal}
        className={styles.saveButton}
        disabled={!template.trim()}
      >
        テンプレートを保存
      </button>

      {isModalOpen && (
        <div>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3>テンプレートを保存</h3>
                
                <div className={styles.preview}>
                    <label>保存するテンプレート:</label>
                    <div className={styles.templatePreview}>
                        {template}
                    </div>
                </div>

                <div className={styles.container}>
                    <label htmlFor="templateName">テンプレート名:</label>
                    <input
                        id="templateName"
                        type="text"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                        placeholder="例: 音楽紹介テンプレート"
                        className={styles.nameInput}
                        disabled={isSaving}
                    />
                </div>

                <div className={styles.buttons}>
                    <button 
                        onClick={handleSaveTemplate}
                        className={styles.confirmButton}
                        disabled={isSaving || !templateName.trim()}
                    >
                        {isSaving ? '保存中...' : '保存'}
                    </button>
                    <button 
                        onClick={closeModal}
                        className={styles.cancelButton}
                        disabled={isSaving}
                    >
                        キャンセル
                    </button>
                </div>
            </div>
        </div>    
      )}
    </div>
  )
}

export default TemplateSaver
import { useState, useEffect } from 'react';
import { doc, deleteDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { useAuthContext } from '../contexts/AuthContext'
import { db, auth } from '../firebase'
import styles from "./TemplateList.module.css"


interface Template {
  id: string;
  name: string;
  content: string;
}

interface TemplateListProps {
  onTemplateSelect: (template: Template) => void;
}

const TemplateList = ({ onTemplateSelect }: TemplateListProps) => {
  const { user } = useAuthContext()
  const [userTemplates, setUserTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserTemplates = async () => {
      if (!user) {
        setUserTemplates([]); // ログアウト時にテンプレートをクリア
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const templatesRef = collection(db, 'users', user.uid, "templates");
        const q = query(templatesRef);
        const querySnapshot = await getDocs(q);
      
        const userTemplates : Template[] = [];

        querySnapshot.forEach((doc) => {
        const data = doc.data();

        userTemplates.push({
          id: doc.id,           // ドキュメントIDを取得
          name: data.name,      // nameフィールドを取得
          content: data.content // contentフィールドを取得
        });
      });

      setUserTemplates(userTemplates);
      console.log('取得したテンプレート:', userTemplates);

      } catch (err) {
        console.error('テンプレートの取得に失敗しました:', err);
      } finally{
        setLoading(false);
      }
    }
 
    fetchUserTemplates();
  }, [user]);

  const handleTemplateSelect = (template: Template) => {
    console.log('選択されたテンプレート:', template);
    onTemplateSelect(template); // 親コンポーネントに選択されたテンプレートを渡す
  };


const handleTemplateDelete = async (template: Template) => {
  if (!user) {
    return;
  }

  try {
    setLoading(true);
    
    // テンプレートのドキュメントを削除
    await deleteDoc(doc(db, "users", user.uid, "templates", template.id));
    window.location.reload();
    console.log('テンプレートが削除されました:', template.name);
    
  } catch (err) {
    console.error('テンプレートの削除に失敗しました:', err);
  } finally {
    setLoading(false);
  }
}

  return (
    <div className = {styles.container}>
      <h2>テンプレート一覧</h2>

      {loading && <p>読み込み中...</p>}
      
      {!loading && userTemplates.length === 0 && (
        <p>テンプレートがありません。</p>
      )}
      
      {!loading && userTemplates.length > 0 && (
        <div className={styles.templateList}>

          {userTemplates.map((template) => (
            <div className={styles.templateItem} onClick={() => handleTemplateSelect(template)}>
              {template.name}

              <div className = {styles.menuContainer}>  
                <button
                  className={styles.deleteTrigger}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === template.id ? null : template.id);
                  }}
                >
                  &#x22EE; {/*特殊文字(&と;で囲む) */}
                </button>

                {openMenuId === template.id && (
                  <div
                    className={styles.deleteMenu}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className={styles.deleteButton}
                      onClick={() => {
                        handleTemplateDelete(template);
                        setOpenMenuId(null);
                      }}
                    >
                      削除
                    </button>
                  </div>
              )}

            </div>

          </div>
        ))}      

      </div>
    )}

    </div>
  )};

export default TemplateList;
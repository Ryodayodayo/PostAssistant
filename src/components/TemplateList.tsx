import { doc, getDoc } from 'firebase/firestore';
import { useAuthContext } from '../contexts/AuthContext'
import { db, auth } from '../firebase'

const docRef = doc(db, 'collection', 'documentId');
const docSnap = await getDoc(docRef);

const TemplateList = () => {

  return (
    <div>
      <h2>テンプレート一覧</h2>
       
    </div>
  );
};

export default TemplateList;
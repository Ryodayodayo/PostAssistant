import {useState} from "react"
import Header from '../components/Header';
import SighUp from '../components/SignUpForm';
import TemplateList from '../components/TemplateList';
import TemplateEditor from '../components/TemplateEditor';
import LogOut from '../components/LogOut';
import styles from './Home.module.css'

interface Template {
  id: string;
  name: string;
  content: string;
}

const Home  = () => {
  const [selectedTemplateContent, setSelectedTemplateContent] = useState<string>('');
  const [selectedTemplateName, setSelectedTemplateName] = useState<string>('');

  // テンプレートが選択されたときの処理
  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplateContent(template.content);
    setSelectedTemplateName(template.name);
    console.log('テンプレートが選択されました:', template.name);
  };

  const handleNewTemplate = () => {
    setSelectedTemplateContent("");
    setSelectedTemplateName("");
    console.log('テンプレートがクリアされました');
  }


  return (
    <div className = {styles.home}>
      <div className = {styles.container}>
        <TemplateList onTemplateSelect={handleTemplateSelect} />
        <TemplateEditor 
          selectedTemplate={selectedTemplateContent} 
          selectedTemplateName={selectedTemplateName}
          onClearTemplate={handleNewTemplate}/>

      </div>
    </div>
  );
};

export default Home ;
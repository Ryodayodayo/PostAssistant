import Header from '../components/Header';
import TemplateList from '../components/TemplateList';
import TemplateEditor from '../components/TemplateEditor';
import styles from './Home.module.css'
export const Home  = () => {
  return (
    <div>
        <Header />
        <div  className = {styles.home}>
          <div className = {styles.container}>
            <TemplateList />
          </div>
          <div className = {styles.container}>
            <TemplateEditor />
          </div>
        </div>
    </div>
  );
};
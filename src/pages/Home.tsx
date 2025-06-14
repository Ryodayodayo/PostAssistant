import Header from '../components/Header';
import SighUp from '../components/SignUpForm';
import TemplateList from '../components/TemplateList';
import TemplateEditor from '../components/TemplateEditor';
import LogOut from '../components/LogOut';
import styles from './Home.module.css'

const Home  = () => {
  return (
    <div className = {styles.home}>
      <div className = {styles.container}>
        <TemplateList />
        <TemplateEditor />
      </div>
    </div>
  );
};

export default Home ;
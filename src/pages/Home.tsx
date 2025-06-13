import Header from '../components/Header';
import SighUp from '../components/SignUp';
import TemplateList from '../components/TemplateList';
import TemplateEditor from '../components/TemplateEditor';
import styles from './Home.module.css'

const Home  = () => {
  return (
    <div>
        <Header />
        <div  className = {styles.home}>
          <SighUp />
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

export default Home ;
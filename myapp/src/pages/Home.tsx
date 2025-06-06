import Header from '../components/Header';
import TemplateEditor from '../components/TemplateEditor';
export const Home  = () => {
  return (
    <div>
        <Header />
        <h1>Home</h1>
        <h2>テンプレート一覧</h2>
        <TemplateEditor />
    </div>
  );
};